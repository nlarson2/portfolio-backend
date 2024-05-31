import React from 'react';

export const Blog: React.FC = () => {
  const handleClick = async () => {
    console.log('Click');
  };

  return (
    <>
      <p>Blog</p>
      <button onClick={handleClick}> Click Me </button>
    </>
  );
};
