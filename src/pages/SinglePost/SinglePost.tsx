import React, { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';

import { Post as PostEntity, getPost, subscribeToPostComments, Comment as CommentEntity } from '../../firebase';
import { Post } from '../../components/Post';
import { Comment } from '../../components/Comment';
import { AddCommentForm } from '../../components/AddCommentForm';
import { useUser } from '../../AuthProvider';

export function SinglePost() {
  const { id } = useParams({ from: '/posts/$id' });
  const user = useUser();
  const [post, setPost] = useState<PostEntity | null | undefined>(undefined);
  const [comments, setComments] = useState<CommentEntity[] | undefined>(undefined);

  useEffect(() => {
    setPost(undefined);
    setComments(undefined);

    getPost(id).then((post: PostEntity | undefined) => setPost(post ?? null));

    return subscribeToPostComments(id, setComments);
  }, [id]);

  if (post === undefined) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Загружается...
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
        Пост не найден
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8 grid gap-y-8">
      <Post post={post} />
      <div className="flex flex-col mx-4 gap-y-4">
        {user ? (
          <AddCommentForm id={post.id} email={user.email ?? ''}/>
        ) : null}
        {!comments ? (
          'Комментарии загружаются...'
        ) : comments.length === 0 ? (
          'Комментариев нет.'
        ) : (
          <>
            Комментарии:
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
