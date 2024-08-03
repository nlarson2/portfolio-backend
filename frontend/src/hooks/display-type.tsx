import React, { useState, useEffect, useLayoutEffect } from 'react';

const useDisplayType = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleSize = () => {
    const width = window.innerWidth;
    setIsMobile(width < 1024);
  };
  useLayoutEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return isMobile;
};

export default useDisplayType;
