import React, { useState, useEffect } from 'react';
import { X, Settings, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CookiePreferences } from './CookiePreferences';

export interface CookieConsent {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  timestamp: string;
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      essential: true,
      functional: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
    console.log('Cookies accepted:', consent);
  };

  const handleRejectAll = () => {
    const consent: CookieConsent = {
      essential: true, // Essential cookies cannot be rejected
      functional: false,
      analytics: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
    console.log('Non-essential cookies rejected:', consent);
  };

  const handleSavePreferences = (preferences: CookieConsent) => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowPreferences(false);
    setShowBanner(false);
    console.log('Cookie preferences saved:', preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-4 border-blue-500"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-start gap-4">
                <Cookie className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2 flex items-center gap-2">
                    We Value Your Privacy
                  </h3>
                  
                  <p className="text-gray-600 mb-3">
                    We use cookies to make our site work securely and to understand how it is used. Some cookies are essential, while others help us improve your experience. You can choose to accept or reject non-essential cookies.
                  </p>
                  
                  <p className="text-gray-500 mb-4">
                    Essential cookies are always active. They are necessary for the website's basic functions and security. You can set your browser to block them, but some site features may not work.
                  </p>

                  <p className="text-gray-500 mb-4">
                    You can change your consent choices at any time by clicking the "Cookie Settings" link in the footer. For more details, please read our{' '}
                    <a
                      href="#cookie-policy"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Cookie Policy
                    </a>
                    {' '}and{' '}
                    <a
                      href="#privacy-policy"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      Accept All
                    </button>
                    
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Reject All
                    </button>
                    
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="px-6 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Preferences
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowBanner(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                  aria-label="Close banner"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showPreferences && (
        <CookiePreferences
          onClose={() => setShowPreferences(false)}
          onSave={handleSavePreferences}
        />
      )}
    </>
  );
}

// Export function to open preferences from anywhere
export function openCookiePreferences() {
  // Dispatch custom event to open preferences
  window.dispatchEvent(new CustomEvent('openCookiePreferences'));
}