import React from 'react';
import { useParams } from 'react-router-dom';
import { ContentLayout } from '../../../components/layouts';

export const BlogViewer: React.FC = () => {
  const { postId } = useParams();
  console.log(postId);
  return (
    <ContentLayout>
      <p>BlogViewer</p>
    </ContentLayout>
  );
};
