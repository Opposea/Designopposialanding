import React from 'react';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CookiePolicy } from './components/CookiePolicy';
import { CookieBanner } from './components/CookieBanner';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      setCurrentPage(hash || 'home');
    };

    // Set initial page based on hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'privacy-policy') {
    return <PrivacyPolicy />;
  }

  if (currentPage === 'cookie-policy') {
    return <CookiePolicy />;
  }

  return (
    <>
      <CookieBanner />
      <LandingPage />
    </>
  );
}