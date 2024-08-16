import React from 'react';
import { Link } from '@tanstack/react-router';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { useUser } from '../../AuthProvider';
import { signOut } from '../../firebase';

export function Navbar() {
  const user = useUser();

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 right-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Блог синергии"
                src="https://synergy.ru/assets/template/v5/new3/images/logo.svg"
                className="h-8"
                style={{
                  width: '32px',
                  objectFit: 'cover',
                  objectPosition: 'left',
                }}
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  activeOptions={{ exact: true }}
                  activeProps={{ className: 'bg-gray-900 text-white' }}
                  inactiveProps={{ className: 'text-gray-300 hover:bg-gray-700 hover:text-white' }}
                  className="rounded-md px-3 py-2 text-sm font-medium"
                >
                  Главная
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/posts/new"
                      activeOptions={{ exact: true }}
                      activeProps={{ className: 'bg-gray-900 text-white' }}
                      inactiveProps={{ className: 'text-gray-300 hover:bg-gray-700 hover:text-white' }}
                      className="rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Написать пост
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              // Profile dropdown
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                    {user.displayName}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      onClick={signOut}
                    >
                      Выход
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link
                to="/login"
                activeProps={{ className: 'bg-gray-900 text-white' }}
                inactiveProps={{ className: 'text-gray-300 hover:bg-gray-700 hover:text-white' }}
                className="rounded-md px-3 py-2 text-sm font-medium"
              >
                Вход/регистрация
              </Link>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <DisclosureButton
            as={Link}
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: 'bg-gray-900 text-white' }}
            inactiveProps={{ className: 'text-gray-300 hover:bg-gray-700 hover:text-white' }}
            className="block rounded-md px-3 py-2 text-base font-medium"
          >
            Главная
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
