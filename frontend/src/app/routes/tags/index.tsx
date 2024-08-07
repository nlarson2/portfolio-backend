import { Route, RouteProps, Routes } from 'react-router-dom';
import { TagEditor } from './tagEditor';
import React from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { NotFound } from '../not-found';

const TagRoutes: React.FC<RouteProps> = () => {
  const { user } = useUser();
  const role: string | undefined = user?.publicMetadata.role as string;
  const isAdmin = role === 'admin';

  return (
    <Routes>
      <Route
        path=""
        element={
          <>
            <SignedIn>{isAdmin ? <TagEditor /> : <NotFound />}</SignedIn>
            <SignedOut>
              <NotFound />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
};

export default TagRoutes;
