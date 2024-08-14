import React, { useEffect, useState } from 'react';

import { Post as PostEntity, getPublicPosts } from '../../firebase';
import { Post } from '../../components/Post';

export function Feed() {
  const [posts, setPosts] = useState<PostEntity[]>([]);

  useEffect(() => {
    getPublicPosts().then((posts: PostEntity[]) => setPosts(posts));
  }, []);

  if (posts.length === 0) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Загружается...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 grid gap-y-8">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
