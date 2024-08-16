import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

import { deletePost, Post as PostEntity } from '../../firebase';
import { useUser } from '../../AuthProvider';

type Props = {
  post: PostEntity;
};

export function Post({ post }: Props) {
  const user = useUser();

  const navigate = useNavigate();

  const handleDelete = async (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!window.confirm('Вы действительно хотите удалить этот пост?')) {
      return;
    }

    await deletePost(post.id);

    if (window.location.pathname === '/') {
      window.location.reload();
    } else {
      await navigate({ to: '/' });
    }
  };

  return (
    <div className="grid gap-x-6 gap-y-4 rounded-3xl bg-gray-100 p-4">
      {post.url ? (
        <img className="rounded-2xl mb-3" src={post.url} />
      ) : null}
      <time
        title={new Date(post.createdAt).toLocaleString('ru-RU')}
        dateTime={new Date(post.createdAt).toLocaleDateString('ru-RU')}
        className="block text-gray-500"
      >
        {new Date(post.createdAt).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {post.title}
        {post.email === user?.email ? (
          <>
            <Link to={`/posts/${post.id}/edit`}>
              <p className="inline font-normal text-gray-600 text-2xl"> (✎)</p>
            </Link>
            <span className="inline font-normal text-red-500 text-2xl cursor-pointer" onClick={handleDelete}> (🗑)</span>
          </>
        ) : null}
      </h2>
      {!post.isPublic ? (
        <h2 className="text-sm tracking-tight text-gray-500 sm:text-sm">(приватный пост)</h2>
      ) : null}
      <p className="mt-2 text-lg leading-8 text-gray-600">{post.text}</p>
      <p className="mt-1 font-semibold text-gray-900">
        {post.email}
        {post.email === user?.email ? (
          <p className="inline font-normal text-gray-600 text-sm"> (Вы)</p>
        ) : null}
      </p>
    </div>
  );
}
