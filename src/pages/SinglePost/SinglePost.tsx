import React, { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';

import { Post as PostEntity, getPost } from '../../firebase';
import { Post } from '../../components/Post';

export function SinglePost() {
  const { id } = useParams({ from: '/posts/$id' });
  const [post, setPost] = useState<PostEntity>();

  useEffect(() => {
    setPost(undefined);

    getPost(id).then((post: PostEntity | undefined) => setPost(post));
  }, [id]);

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Загружается...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 grid gap-y-8">
      <Post post={post} />
    </div>
  );
}
