import { Route, RouteProps, Routes } from 'react-router-dom';

import { BlogViewer } from './blogViewer';
import { BlogListViewer } from './blogListViewer';
import React from 'react';

const BlogRoutes: React.FC<RouteProps> = () => {
  return (
    <Routes>
      <Route path="" element={<BlogListViewer />} />
      <Route path=":postId" element={<BlogViewer />} />
    </Routes>
  );
};

export default BlogRoutes;
