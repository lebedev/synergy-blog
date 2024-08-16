import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { useUser } from './AuthProvider';
import { subscribeToSubscriptions } from './firebase';

const SubscriptionsContext = createContext<string[]>([]);

export function SubscriptionsProvider({ children }: PropsWithChildren) {
  const user = useUser();

  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    return subscribeToSubscriptions(user.email ?? '', setSubscriptions);
  }, [user]);

  return (
    <SubscriptionsContext.Provider value={subscriptions}>
      {children}
    </SubscriptionsContext.Provider>
  );
}

export function useSubscriptions() {
  return useContext(SubscriptionsContext);
}
