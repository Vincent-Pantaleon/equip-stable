// hooks/useWindowWidth.js
'use client'

import { useState, useEffect } from 'react';

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Check for window existence to handle server-side rendering
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    setWindowWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return windowWidth;
}