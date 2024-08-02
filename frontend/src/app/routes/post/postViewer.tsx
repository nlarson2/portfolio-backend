import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContentLayout } from '../../../components/layouts';
import { PostView } from '../../../features/posts/components';
import { GetPostByID } from '../../../features/posts/api/get-posts';
import { Post } from '../../../features/posts/types';

export const PostViewer: React.FC = () => {
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
    <ContentLayout>
      {post && <PostView post={post} cantUpdate={true} />}
      {/* put comment stuff here */}
    </ContentLayout>
  );
};
