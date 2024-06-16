import React from 'react';
import { NotFound } from './routes/not-found';
import { Home } from './routes/home';
import { Resume } from './routes/resume';
import { Contact } from './routes/contact';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignIn,
  useUser,
} from '@clerk/clerk-react';

import BlogRoutes from './routes/blogs';

export const App: React.FC = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/*" element={<BlogRoutes />} />
          <Route
            path="/dashboard"
            element={
              <>
                <h2>Dashboard</h2>
                <p>{user?.fullName}</p>
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <SignedOut>
                  <div style={{ margin: 'auto' }}>
                    <SignIn
                      forceRedirectUrl={'/'}
                      appearance={{
                        elements: {
                          footer: { display: 'none' },
                        },
                      }}
                    />
                  </div>
                </SignedOut>
                <SignedIn>
                  <SignOutButton />
                </SignedIn>
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
