import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Footer } from '../seo';

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
      {title && <h1 className="text-2xl font-bold">{title}</h1>}
      {children}
      <Footer />
    </>
  );
};
