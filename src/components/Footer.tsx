import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-blue-900 tracking-widest uppercase">
            Opposia
          </p>
          <p className="text-gray-500 text-center">
            Where opposites attract
          </p>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <p className="text-gray-400">
            © 2025 Opposia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
