import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import AppContext from 'context/AppContext';
import { defaultProfilePicture, supabaseBucketPhotosURL } from 'constants';
import { signOut } from 'api/auth';
import {
  LOGIN_ROUTE, SIGNUP_ROUTE, PROFILE_ROUTE,
} from 'routes';
import { Command, DropdownMenuItem } from '..';

const HeaderMenu = () => {
  const { asPath } = useRouter();
  const { data: { userSession, userData } } = useContext(AppContext);
  const userIsLoggedIn = userSession?.access_token;
  const [open, setOpen] = useState(false);

  const handleOpen = (value) => {
    setOpen(value);
  };

  if (!userIsLoggedIn) {
    return (
      <div className="flex items-center">
        {
          asPath === LOGIN_ROUTE || asPath === SIGNUP_ROUTE ? (
            <Link href={asPath === LOGIN_ROUTE ? SIGNUP_ROUTE : LOGIN_ROUTE}>
              <div className="bg-primary hover:bg-blue-700 transition duration-300 rounded-sm px-6 py-1 text-white cursor-pointer">
                <span className="mr-2">{asPath === LOGIN_ROUTE ? 'Create an account' : 'Sign in'}</span>
              </div>
            </Link>
          ) : (
            <>
              <Link href={LOGIN_ROUTE}>
                <div className="transition duration-300 rounded-sm mx-6 px-2 py-1 text-white hover:text-gray-300 cursor-pointer">
                  <span className="mr-2">Sign in</span>
                </div>
              </Link>
              <Link href={SIGNUP_ROUTE}>
                <div className="bg-primary hover:bg-blue-700 transition duration-300 rounded-sm px-4 py-1 text-white cursor-pointer">
                  <span className="mr-2">Create an account</span>
                </div>
              </Link>
            </>
          )
        }
      </div>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={handleOpen}>
      <DropdownMenuTrigger className="cursor-pointer hover:bg-gray-800 rounded-md px-4 py-2 -mr-4 transition duration-300" asChild>
        <div className="flex items-center text-white">
          <img src={userData.profile_photo ? `${supabaseBucketPhotosURL}/${userData.profile_photo}` : defaultProfilePicture} width="24" height="24" className="rounded-full w-6 h-6" alt="user_profile_photo" />
          <span className={`ml-2 ${open && 'transform rotate-180'}`}><ChevronDownIcon /></span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 text-white rounded-sm shadow-xl py-2 transition duration-200 w-48" sideOffset={5}>
        <Link href={PROFILE_ROUTE}>
          <DropdownMenuItem className={`my-1 px-6 ${asPath === PROFILE_ROUTE ? 'bg-blue-600' : 'hover:bg-gray-700 focus:bg-gray-700'}`}>
            <span className="mr-2">Profile</span>
            <Command>p</Command>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="border border-gray-700 my-2" />
        <DropdownMenuItem className="my-1 py-1 w-full hover:bg-gray-700 px-6 focus:bg-gray-700" onClick={signOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
