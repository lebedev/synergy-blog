import React, { useEffect, useState } from 'react';
import { Link, useParams } from '@tanstack/react-router';

import { Post as PostEntity, getTaggedPosts } from '../../firebase';
import { Post } from '../../components/Post';

export function ByTag() {
  const { tag } = useParams({ from: '/tags/$tag' });
  const [posts, setPosts] = useState<PostEntity[] | undefined>(undefined);

  useEffect(() => {
    setPosts(undefined);

    getTaggedPosts(tag).then((posts: PostEntity[]) => setPosts(posts));
  }, [tag]);

  if (!posts) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Загружается...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Нет постов с тегом "{tag}"
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 grid gap-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Посты по тегу "{tag}"</h2>
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <Post post={post}/>
        </Link>
      ))}
    </div>
  );
}
