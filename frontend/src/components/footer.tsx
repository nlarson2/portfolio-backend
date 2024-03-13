import React from 'react';
import { BsGithub, BsLinkedin, BsEnvelopeFill } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-jet-grey py-4 mt-auto text-white text center">
      <div className="flex justify-center spax-x-4 mb-5">
        <a
          href="https://github.com/nlarson2"
          className="text-gray-300 hover:text-white mx-3"
        >
          <BsGithub style={{ fontSize: '30px' }} />
        </a>
        <a
          href="https://www.linkedin.com/in/nickolas-larson-33671611b/"
          className="text-gray-300 hover:text-white mx-3"
        >
          <BsLinkedin style={{ fontSize: '30px' }} />
        </a>
        <a
          href="mailto:nickolas.a.larson@gmail.com"
          className="text-gray-300 hover:text-white mx-3"
        >
          <BsEnvelopeFill style={{ fontSize: '30px' }} />
        </a>
      </div>
      <div className="flex justify-center spax-x-4">
        <p className="text-platinum text-xs">
          &copy; 2024 All rights reserved. - Designed &amp; Coded by Nickolas
          Larson
        </p>
      </div>
    </footer>
  );
};

export { Footer };
