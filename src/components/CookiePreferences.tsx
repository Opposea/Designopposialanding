import React, { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import { motion } from 'motion/react';
import type { CookieConsent } from './CookieBanner';

interface CookiePreferencesProps {
  onClose: () => void;
  onSave: (preferences: CookieConsent) => void;
}

export function CookiePreferences({ onClose, onSave }: CookiePreferencesProps) {
  const [preferences, setPreferences] = useState<CookieConsent>({
    essential: true,
    functional: false,
    analytics: false,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    // Load existing preferences if available
    const saved = localStorage.getItem('cookieConsent');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    onSave({
      ...preferences,
      essential: true, // Always true
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-blue-50">
          <h2 className="text-gray-900 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-600" />
            Cookie Preferences
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          <p className="text-gray-600 mb-6">
            We use different types of cookies to optimize your experience on our website. Choose which cookies you want to allow. Please note that essential cookies cannot be disabled as they are necessary for the site to function.
          </p>

          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-60">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-500 mt-1">Always Active</p>
                </div>
              </div>
              <div className="bg-white rounded p-3 mt-3">
                <p className="text-gray-700 mb-2"><strong>Examples:</strong></p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li><strong>cookieConsent</strong> - Stores your cookie preferences</li>
                  <li><strong>Session cookies</strong> - Maintains your session state</li>
                  <li><strong>Security tokens</strong> - Prevents cross-site request forgery</li>
                </ul>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">Functional Cookies</h3>
                  <p className="text-gray-600">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. They may be set by us or by third-party providers.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => setPreferences(p => ({ ...p, functional: !p.functional }))}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.functional ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                  <p className="text-gray-500 mt-1">
                    {preferences.functional ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3 mt-3">
                <p className="text-gray-700 mb-2"><strong>Examples:</strong></p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li><strong>Language preferences</strong> - Remember your language choice</li>
                  <li><strong>Theme settings</strong> - Remember your display preferences</li>
                  <li><strong>Form autofill</strong> - Remember previously entered information</li>
                </ul>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">Analytics Cookies</h3>
                  <p className="text-gray-600">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.analytics ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                  <p className="text-gray-500 mt-1">
                    {preferences.analytics ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3 mt-3">
                <p className="text-gray-700 mb-2"><strong>Examples:</strong></p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li><strong>Page views</strong> - Track which pages are visited</li>
                  <li><strong>Session duration</strong> - Understand how long users stay</li>
                  <li><strong>Traffic sources</strong> - See where visitors come from</li>
                </ul>
                <p className="text-gray-500 mt-2">
                  <em>Note: Currently, no analytics cookies are being used on this site.</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Save Preferences
          </button>
        </div>
      </motion.div>
    </div>
  );
}
