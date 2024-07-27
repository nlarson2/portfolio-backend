import { Route, RouteProps, Routes } from 'react-router-dom';

import { PostViewer } from './postViewer';
import { PostListViewer } from './postListViewer';
import React from 'react';

const PostRoutes: React.FC<RouteProps> = () => {
  return (
    <Routes>
      <Route path="" element={<PostListViewer />} />
      <Route path=":postId" element={<PostViewer />} />
    </Routes>
  );
};

export default PostRoutes;
