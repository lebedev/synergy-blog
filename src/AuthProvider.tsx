import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';

import { initAuthStateChanged } from './firebase';

const AuthContext = createContext<firebase.User | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    initAuthStateChanged((userData) => {
      // @ts-ignore
      setUser(userData?.multiFactor.user ?? null)
      setInitialized(true);
    });
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  return useContext(AuthContext);
}
