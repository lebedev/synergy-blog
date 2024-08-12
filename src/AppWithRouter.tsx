import React, { useEffect } from 'react';
import { RouterProvider } from '@tanstack/react-router';

import './App.css';

import { useUser } from './AuthProvider';
import { router } from './routes';

export function AppWithRouter() {
  const user = useUser();

  useEffect(() => {
    router.invalidate();
  }, [user]);

  return (
    <RouterProvider router={router} context={{ user }} />
  );
}
