import React from 'react';
import { OpposiaLogo } from './OpposiaLogo';

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-75"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <OpposiaLogo />
          
          <div className="mt-12 space-y-4">
            <div className="inline-block">
              <span className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 text-blue-900 tracking-wide">
                Coming Soon
              </span>
            </div>
            
            <p className="text-gray-600 max-w-2xl mx-auto">
              The dating app that celebrates differences. Our unique one-of-a-kind matching algorithm connects you with the person who completes you the most. The person you never knew you needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
