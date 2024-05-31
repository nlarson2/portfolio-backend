import React from 'react';
import { NotFound } from './pages/not-found';
import { Home } from './pages/home';
import { Resume } from './pages/resume';
import { Contact } from './pages/contact';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
