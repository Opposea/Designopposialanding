import React, { useState } from 'react';
import { OpposiaLogoCompact } from './OpposiaLogoCompact';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Logo and messaging */}
          <div className="text-center lg:text-left space-y-4 lg:space-y-6">
            <div className="flex justify-center lg:justify-start">
              <OpposiaLogoCompact />
            </div>
            
            <div className="space-y-2 lg:space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-md border-2 border-blue-300">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-blue-900 tracking-wide">Coming Soon</span>
              </div>
              
              <h1 className="text-white leading-tight">
                Find Your Harmonious Opposite
              </h1>
              
              <p className="text-gray-200 max-w-lg mx-auto lg:mx-0">
                Our unique matching algorithm connects you with the person who completes you. The person you never knew you needed.
              </p>
            </div>

            {/* Featured slogan */}
            <div className="bg-gradient-to-r from-blue-500/20 to-sky-500/20 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border-2 border-blue-400/50 shadow-xl">
              <p className="text-white text-center italic">
                🍳 Hate cooking? They'll love it. Find who completes you.
              </p>
            </div>

            {/* Catchy slogans - compact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-md border border-blue-200 hover:scale-105 transition-transform">
                <p className="text-blue-900 text-center sm:text-left">✨ Ditch the Swipe</p>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-md border border-blue-200 hover:scale-105 transition-transform">
                <p className="text-blue-900 text-center sm:text-left">💫 We do the match, you find the spark</p>
              </div>
            </div>
          </div>

          {/* Right side - Sign up form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border-2 border-blue-200 relative">
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-3 -left-3 w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full opacity-20 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-4 lg:mb-6">
                  <h2 className="text-blue-900 mb-2">
                    Join the Waitlist
                  </h2>
                  <p className="text-gray-600">
                    Be the first to find your perfect opposite
                  </p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Get Early Access
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                    <p className="text-green-600">
                      You're on the list! We'll be in touch soon.
                    </p>
                  </div>
                )}

                <p className="text-center text-gray-400 mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer at bottom */}
      <div className="absolute bottom-2 lg:bottom-4 left-0 right-0 text-center px-4">
        <p className="text-gray-400">
          © 2025 Opposia • Where opposites attract
        </p>
      </div>
    </div>
  );
}