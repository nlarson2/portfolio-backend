import React from 'react';
import { useParams } from 'react-router-dom';

export const Post: React.FC = () => {
  const { postId } = useParams();
  return <p>Blog Post ID: {postId}</p>;
};
