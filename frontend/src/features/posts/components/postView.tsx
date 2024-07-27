import React, { useEffect, useState } from 'react';
import { Post } from '../types';
import { useParams } from 'react-router-dom';
import { GetPostByID } from '../api/get-posts';

export const PostView: React.FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const postData = await GetPostByID(postId);
        setPost(postData);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <p className="text-2xl font-bold">{post?.title}</p>
      <p>Created: {post?.created_at?.split('T')[0]}</p>
      <br />
      <p>{post?.content}</p>
    </div>
  );
};
