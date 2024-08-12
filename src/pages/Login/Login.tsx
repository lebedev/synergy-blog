import React, { useEffect } from 'react';

import { startAuthUI } from '../../firebase';

export function Login() {
  useEffect(() => {
    startAuthUI('.login-page');
  }, []);

  return (
    <div
      className="login-page"
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    ></div>
  );
}
