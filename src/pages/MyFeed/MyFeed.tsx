import React, { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';

import {
  Post as PostEntity,
  getMyPosts,
} from '../../firebase';
import { Post } from '../../components/Post';
import { useUser } from '../../AuthProvider';

export function MyFeed() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const [posts, setPosts] = useState<PostEntity[]>([]);

  useEffect(() => {
    getMyPosts(user?.email ?? '').then((posts: PostEntity[]) => {
      setPosts(posts);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Загружается...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Вы не написали ни одного поста.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 grid gap-y-8">
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
}
