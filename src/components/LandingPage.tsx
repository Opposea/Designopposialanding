import React, { useState } from 'react';
import { OpposiaLogoCompact } from './OpposiaLogoCompact';
import { Mail, CheckCircle, Sparkles, Heart, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { CookiePreferences } from './CookiePreferences';
import type { CookieConsent } from './CookieBanner';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cbc95482/waitlist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      console.log('Successfully joined waitlist:', email);
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Error submitting email:', err);
      setError(err instanceof Error ? err.message : 'Failed to join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCookiePreferences = (preferences: CookieConsent) => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowCookiePreferences(false);
    console.log('Cookie preferences saved:', preferences);
  };

  // Floating hearts animation
  const floatingHearts = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 8 + Math.random() * 4,
    x: Math.random() * 100,
    scale: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-25"
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating hearts */}
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-400/20"
            style={{ left: `${heart.x}%` }}
            initial={{ bottom: '-10%', opacity: 0 }}
            animate={{ 
              bottom: '110%',
              opacity: [0, 0.6, 0],
              x: [0, 30, -20, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut"
            }}
          >
            <Heart size={24 * heart.scale} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Logo and messaging */}
          <motion.div 
            className="text-center lg:text-left space-y-4 lg:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center lg:justify-start">
              <OpposiaLogoCompact />
            </div>
            
            <h2 className="text-white text-center lg:text-left leading-tight px-4 lg:px-0">
              Sign up for a limited free early access space
            </h2>
            
            <motion.div 
              className="space-y-2 lg:space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-md border-2 border-blue-300 animate-pulse hover:animate-none hover:scale-110 transition-transform cursor-default">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-blue-900 tracking-wide bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient" style={{ backgroundSize: '200% auto', animation: 'gradient 3s linear infinite' }}>
                  Coming Soon
                </span>
              </div>
              
              <h1 className="text-white leading-tight">
                Find Your Harmonious Opposite
              </h1>
              
              <p className="text-gray-200 max-w-lg mx-auto lg:mx-0">
                Our unique matching algorithm connects you with the person who completes you. The person you never knew you needed.
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Sign up form */}
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border-2 border-blue-200 relative hover:border-pink-300 transition-all duration-300 hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]">
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="absolute -bottom-3 -left-3 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-2xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              
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
                    <motion.div 
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors focus:ring-4 focus:ring-blue-200/50"
                      />
                    </motion.div>
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl shadow-lg relative overflow-hidden group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5" />
                        Get Early Access
                      </span>
                    </motion.button>
                  </form>
                ) : (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <motion.p 
                      className="text-green-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      You're on the list! We'll be in touch soon.
                    </motion.p>
                  </motion.div>
                )}

                {error && (
                  <motion.p 
                    className="text-red-500 text-center mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {error}
                  </motion.p>
                )}

                <p className="text-center text-gray-400 mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer at bottom */}
      <div className="absolute bottom-2 lg:bottom-4 left-0 right-0 text-center px-4">
        <p className="text-gray-400">
          © 2025 Opposia • Where opposites attract •{' '}
          <a 
            href="#privacy-policy" 
            className="text-blue-300 hover:text-blue-200 underline transition-colors"
          >
            Privacy Policy
          </a>
          {' '}•{' '}
          <a 
            href="#cookie-policy" 
            className="text-blue-300 hover:text-blue-200 underline transition-colors"
          >
            Cookie Policy
          </a>
          {' '}•{' '}
          <button
            onClick={() => setShowCookiePreferences(true)}
            className="text-blue-300 hover:text-blue-200 underline transition-colors"
          >
            Cookie Settings
          </button>
        </p>
      </div>

      {showCookiePreferences && (
        <CookiePreferences
          onClose={() => setShowCookiePreferences(false)}
          onSave={handleSaveCookiePreferences}
        />
      )}
    </div>
  );
}