import React, { useState } from 'react';
import classNames from 'classnames';
import { v4 as uuid4 } from 'uuid';
import { useNavigate } from '@tanstack/react-router';

import { upsertPost } from '../../firebase';
import { useUser } from '../../AuthProvider';

export function UpsertPost() {
  const user = useUser();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const id = uuid4();
    await upsertPost({
      id,
      title,
      url,
      text,
      email: user?.email ?? '',
      createdAt: Date.now(),
      isPublic,
    });

    await navigate({ to: `/posts/${id}` });

    return false;
  };

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
              Заголовок<span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Новый пост (обязательное поле)"
                  className={classNames(
                    'pl-3 block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6',
                    isLoading ? 'cursor-not-allowed' : ''
                  )}                  disabled={isLoading}
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="picture" className="block text-sm font-medium leading-6 text-gray-900">
              URL картинки
            </label>
            <div className="mt-2">
              <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="picture"
                  name="picture"
                  type="text"
                  placeholder="https://tailwindui.com/img/og-default.png"
                  className={classNames(
                    'pl-3 block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6',
                    isLoading ? 'cursor-not-allowed' : ''
                  )}
                  disabled={isLoading}
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
              Текст<span className="text-red-500">*</span>
            </label>
            <div className="mt-2">
              <textarea
                id="text"
                name="text"
                rows={3}
                className={classNames(
                  'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                  isLoading ? 'cursor-not-allowed' : ''
                )}
                placeholder="(обязательное поле)"
                disabled={isLoading}
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full">
            <div className="mt-2 relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="public"
                  name="public"
                  type="checkbox"
                  className={classNames(
                    'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
                    isLoading ? 'cursor-not-allowed' : ''
                  )}
                  disabled={isLoading}
                  checked={isPublic}
                  onChange={(event) => setIsPublic(event.target.checked)}
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="public" className="font-medium text-gray-900">
                  Публичный?
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className={classNames(
              'text-sm font-semibold leading-6 text-gray-900',
              isLoading ? 'cursor-not-allowed' : ''
            )}
            disabled={isLoading}
            onClick={() => window.history.go(-1)}
          >
            Назад
          </button>
          <button
            type="submit"
            disabled={!title || !text || isLoading}
            className={classNames(
              'rounded-md bg-indigo-500 leading-6 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 inline-flex items-center',
              !title || !text || isLoading ? 'cursor-not-allowed' : ''
            )}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Сохраняется...
              </>
            ) : (
              'Сохранить'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
