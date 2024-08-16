import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { AuthProvider } from './AuthProvider';
import { AppWithRouter } from './AppWithRouter';
import { SubscriptionsProvider } from './SubscriptionsProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SubscriptionsProvider>
        <AppWithRouter />
      </SubscriptionsProvider>
    </AuthProvider>
  </React.StrictMode>
);
