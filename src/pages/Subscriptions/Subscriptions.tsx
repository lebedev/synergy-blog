import React from 'react';

import { useSubscriptions } from '../../SubscriptionsProvider';
import { useUser } from '../../AuthProvider';
import { removeSubscription } from '../../firebase';

export function Subscriptions() {
  const subscriptions = useSubscriptions();
  const user = useUser();

  if (subscriptions.length === 0) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        У вас нет подписок
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 grid gap-y-8">
      {subscriptions.map((subscription) => (
        <div className="grid gap-x-6 gap-y-4 rounded-3xl bg-gray-100 p-4">
          <p className="font-semibold text-gray-900">
            {subscription}
            <span
              className="inline font-normal text-gray-600 text-sm cursor-pointer"
              onClick={() => removeSubscription(user?.email ?? '', subscription)}
            > [Отписаться]</span>
          </p>
        </div>
      ))}
    </div>
  );
}
