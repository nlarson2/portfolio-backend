import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignOutButton } from '@clerk/clerk-react';
import { BsList } from 'react-icons/bs';
import useDisplayType from '../../hooks/display-type';

const navOptions: { [key: string]: string } = {
  Home: '/',
  Post: '/post',
  Projects: '/projects',
  Resume: '/resume',
  Contact: '/contact',
};

const WebNav: React.FC = () => {
  return (
    <>
      {Object.entries(navOptions).map(([key, value], index: number) => {
        return (
          <Link
            key={index}
            to={value}
            className="text-platinum hover:text-gray-200"
          >
            {key}
          </Link>
        );
      })}
      <SignedIn>
        <SignOutButton className="text-platinum hover:text-gray-200" />
      </SignedIn>
    </>
  );
};

const MobileNav: React.FC = () => {
  const [visible, setVisible] = useState<boolean>();

  return (
    <div className="relative inline-block text-left">
      <BsList
        className="text-platinum text-4xl font bold"
        onClick={() => {
          setVisible(!visible);
        }}
      />
      {visible && (
        <div
          className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-space-cadet-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {Object.entries(navOptions).map(([key, value], index: number) => {
              return (
                <Link
                  key={index}
                  to={value}
                  className="block text-platinum hover:text-gray-600 my-4 ml-2"
                >
                  {key}
                </Link>
              );
            })}
            <SignedIn>
              <SignOutButton className="block text-platinum hover:text-gray-600 my-4 ml-2" />
            </SignedIn>
          </div>
        </div>
      )}
    </div>
  );
};

export const Header: React.FC = () => {
  const isMobile = useDisplayType();
  return (
    <header className="bg-space-cadet-blue py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-platinum text-2xl font-bold">Nickolas Larson</h1>
        <nav className="flex space-x-4 mr-5">
          {isMobile ? <MobileNav /> : <WebNav />}
        </nav>
      </div>
    </header>
  );
};
