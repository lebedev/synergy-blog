import React from 'react';

import { Comment as CommentEntity } from '../../firebase';

type Props = {
  comment: CommentEntity;
};

export function Comment({ comment }: Props) {
  return (
    <div className="grid gap-x-6 gap-y-4 rounded-3xl bg-gray-100 p-4">
      <time
        title={new Date(comment.createdAt).toLocaleString('ru-RU')}
        dateTime={new Date(comment.createdAt).toLocaleDateString('ru-RU')}
        className="block text-gray-500"
      >
        {new Date(comment.createdAt).toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </time>
      <p className="mt-2 text-lg leading-8 text-gray-600">{comment.text}</p>
      <p className="mt-1 font-semibold text-gray-900">
        {comment.email}
      </p>
    </div>
  );
}
