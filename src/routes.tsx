import React from 'react';
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';

import { Navbar } from './components/Navbar';
import { Login } from './pages';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
    </>
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
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
