import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Footer } from '../templates';

interface ContentLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  title,
}) => {
  return (
    <>
      <Helmet>
        <title> {title ? title : 'My Portfolio'}</title>
      </Helmet>
      <Header />
      <div className="mx-auto my-10 h-full lg:p-6 p-20 lg:w-3/5">
        {title && <h1 className="text-2xl font-bold">{title}</h1>}
        {children}
      </div>
      <Footer />
    </>
  );
};
