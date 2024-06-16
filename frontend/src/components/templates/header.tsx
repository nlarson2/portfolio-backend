import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignOutButton } from '@clerk/clerk-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-space-cadet-blue py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-platinum text-2xl font-bold">Nickolas Larson</h1>

        <nav className="flex space-x-4 mr-5">
          <Link to="/" className="text-platinum hover:text-gray-200">
            Home
          </Link>
          <Link to="/blog" className="text-platinum hover:text-gray-200">
            Blog
          </Link>
          <Link to="/projects" className="text-platinum hover:text-gray-200">
            Projects
          </Link>
          <Link to="/resume" className="text-platinum hover:text-gray-200">
            Resume
          </Link>
          <Link to="/contact" className="text-platinum hover:text-gray-200">
            Contact
          </Link>
          <SignedIn>
            <SignOutButton className="text-platinum hover:text-gray-200" />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
};
