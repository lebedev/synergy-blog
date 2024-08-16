import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';

import { Post as PostEntity, getPost } from '../../firebase';
import { EditPostForm } from '../../components/EditPostForm';
import { useUser } from '../../AuthProvider';

export function EditPost() {
  const { id } = useParams({ from: '/posts/$id/edit' });

  const navigate = useNavigate();
  const user = useUser();

  const [post, setPost] = useState<PostEntity>();

  useEffect(() => {
    (async () => {
      if (!user) {
        await navigate({ to: '/' });

        return;
      }

      setPost(undefined);

      const post = await getPost(id);

      if (post?.email !== user.email) {
        await navigate({to: '/'});

        return;
      }

      setPost(post);
    })();
  }, [navigate, user, id]);

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Загружается...
      </div>
    );
  }

  return (
    <EditPostForm post={post} />
  );
}
