import React from 'react';
import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect } from '@tanstack/react-router';

import { Navbar } from './components/Navbar';
import { Home, Login, NewPost, EditPost, Feed } from './pages';
import firebase from 'firebase/compat/app';
import { SinglePost } from './pages/SinglePost';
import { Subscriptions } from './pages/Subscriptions';
import { MyFeed } from './pages/MyFeed';

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

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/feed',
  component: Feed,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/',
      });
    }
  },
});

const subscriptionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subscriptions',
  component: Subscriptions,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/',
      });
    }
  },
});

const myFeedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/my-feed',
  component: MyFeed,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/',
      });
    }
  },
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

const newPostRoute = createRoute({
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
  homeRoute,
  feedRoute,
  subscriptionsRoute,
  myFeedRoute,
  newPostRoute,
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
