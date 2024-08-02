import { Route, RouteProps, Routes } from 'react-router-dom';

import { PostViewer } from './postViewer';
import { PostListViewer } from './postListViewer';
import { PostEditorView } from './postEditorView';
import React from 'react';
import { SignedIn } from '@clerk/clerk-react';

const PostRoutes: React.FC<RouteProps> = () => {
  return (
    <Routes>
      <Route path="" element={<PostListViewer />} />
      <Route path=":postId" element={<PostViewer />} />
      <Route
        path="create"
        element={
          <SignedIn>
            <PostEditorView />
          </SignedIn>
        }
      />
      <Route
        path="update/:postId"
        element={
          <SignedIn>
            <PostEditorView />
          </SignedIn>
        }
      />
    </Routes>
  );
};

export default PostRoutes;
