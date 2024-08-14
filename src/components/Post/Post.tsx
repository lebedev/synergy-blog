import React from 'react';
import { Link } from '@tanstack/react-router';

import { Post as PostEntity } from '../../firebase';

type Props = {
  post: PostEntity;
};

export function Post({ post }: Props) {
  return (
    <Link to={`/posts/${post.id}`}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 rounded-3xl bg-gray-100 p-4">
        <div className="sm:col-span-4">
          {post.url ? (
            <img className="rounded-2xl mb-3" src={post.url} />
          ) : null}
          <time dateTime={new Date(post.createdAt).toLocaleDateString('ru-RU')} className="block text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">{post.text}</p>
          <p className="mt-1 font-semibold text-gray-900">{post.email}</p>
        </div>
      </div>
    </Link>
  );
}
