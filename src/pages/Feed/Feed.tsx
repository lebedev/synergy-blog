import React, { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';

import {
  Post as PostEntity,
  getSubscribedPosts
} from '../../firebase';
import { Post } from '../../components/Post';
import { useSubscriptions } from '../../SubscriptionsProvider';

export function Feed() {
  const [isLoading, setIsLoading] = useState(true);
  const subscriptions = useSubscriptions();
  const [posts, setPosts] = useState<PostEntity[]>([]);

  useEffect(() => {
    setIsLoading(true);

    if (subscriptions.length === 0) {
      setIsLoading(false);

      return;
    }

    getSubscribedPosts(subscriptions).then((posts: PostEntity[]) => {
      setPosts(posts);
      setIsLoading(false);
    });
  }, [subscriptions]);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Загружается...
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        У вас нет подписок
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Вы подписаны на авторов, которые не написали ни одного поста.
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
