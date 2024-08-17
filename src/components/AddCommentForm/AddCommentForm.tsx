import React, { useState } from 'react';
import classNames from 'classnames';

import { addPostComment, Post as PostEntity } from '../../firebase';

type Props = {
  id: PostEntity['id'];
  email: string;
};

export function AddCommentForm({ id, email }: Props) {
  const [text, setText] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    await addPostComment(id, {
      text,
      createdAt: Date.now(),
      email,
    });

    setIsLoading(false);
    setText('');

    return false;
  };

  return (
    <div className=" rounded-3xl bg-gray-100 p-4">
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold tracking-tight text-gray-900 sm:text-lg">Новый комментарий:</h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <textarea
              id="text"
              name="text"
              rows={3}
              className={classNames(
                'col-span-full block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                isLoading ? 'cursor-not-allowed' : ''
              )}
              placeholder="(обязательное поле)"
              disabled={isLoading}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              disabled={!text || isLoading}
              className={classNames(
                'rounded-md bg-indigo-500 leading-6 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 inline-flex items-center',
                !text || isLoading ? 'cursor-not-allowed' : ''
              )}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Добавляется...
                </>
              ) : (
                'Добавить'
              )}
            </button>
          </div>
      </form>
    </div>
  );
}
