import React from 'react';
import { Post } from '../types';
import { Link } from 'react-router-dom';

interface PostLinkProps {
  post: Post;
}

export const PostLink: React.FC<PostLinkProps> = ({ post }: PostLinkProps) => {
  if (post.uuid === undefined) {
    return <></>;
  }
  return (
    <>
      <Link
        to={`/post/${post.uuid}`}
        className="text-platinum hover:text-gray-200"
      >
        <div className="bg-space-cadet-blue rounded-lg w-4/5 mx-auto my-2 p-1">
          <p className="text-center my-5 text-white">
            {post.title} - {post.created_at?.split('T')[0]}
          </p>
        </div>
      </Link>
    </>
  );
};
