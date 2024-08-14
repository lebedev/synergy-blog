import React from 'react';
import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect } from '@tanstack/react-router';

import { Navbar } from './components/Navbar';
import { Login, UpsertPost } from './pages';
import firebase from 'firebase/compat/app';

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

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  },
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
  path: '/upsertPost',
  component: UpsertPost,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: '/',
      });
    }
  },
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, upsertPostRoute]);

export const router = createRouter({ routeTree, context: { user: null } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
