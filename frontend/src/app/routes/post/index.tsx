import { Route, RouteProps, Routes } from 'react-router-dom';

import { PostViewer } from './postViewer';
import { PostListViewer } from './postListViewer';
import { PostEditorView } from './postEditorView';
import React from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { NotFound } from '../not-found';

const PostRoutes: React.FC<RouteProps> = () => {
  const { user } = useUser();
  const role: string | undefined = user?.publicMetadata.role as string;
  const isAdmin = role === 'admin';

  return (
    <Routes>
      <Route path="" element={<PostListViewer />} />
      <Route path=":postId" element={<PostViewer />} />
      <Route
        path="create"
        element={
          <>
            <SignedIn>{isAdmin ? <PostEditorView /> : <NotFound />}</SignedIn>
            <SignedOut>
              <NotFound />
            </SignedOut>
          </>
        }
      />
      <Route
        path="update/:postId"
        element={
          <>
            <SignedIn>{isAdmin ? <PostEditorView /> : <NotFound />}</SignedIn>
            <SignedOut>
              <NotFound />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
};

export default PostRoutes;
