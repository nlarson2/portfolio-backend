import React from 'react';
import { ContentLayout } from '../../../components/layouts';
import { PostView } from '../../../features/posts/components';

export const PostViewer: React.FC = () => {
  return (
    <ContentLayout>
      <PostView />
      {/* put comment stuff here */}
    </ContentLayout>
  );
};
