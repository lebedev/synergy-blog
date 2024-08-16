import React from 'react';
import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect } from '@tanstack/react-router';

import { Navbar } from './components/Navbar';
import { Feed, Login, NewPost, EditPost } from './pages';
import firebase from 'firebase/compat/app';
import { SinglePost } from './pages/SinglePost';

type RouterContext = {
  user: firebase.User | null;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Navbar />
      <Outlet />
    </div>
  ),
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Feed,
});

const editPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$id/edit',
  component: EditPost,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/',
      });
    }
  },
});

const singlePostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$id',
  component: SinglePost,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: '/',
      });
    }
  },
});

const upsertPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/new',
  component: NewPost,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/',
      });
    }
  },
});

const routeTree = rootRoute.addChildren([
  upsertPostRoute,
  feedRoute,
  editPostRoute,
  singlePostRoute,
  loginRoute,
]);

export const router = createRouter({ routeTree, context: { user: null } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
