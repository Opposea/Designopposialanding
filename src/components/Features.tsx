import React from 'react';
import { Heart, Sparkles, Users } from 'lucide-react';

export function Features() {
  const slogans = [
    {
      icon: Heart,
      title: "Ditch the Swipe",
      description: "No more endless swiping. Let our algorithm find your perfect opposite."
    },
    {
      icon: Sparkles,
      title: "Find Your Harmonious Opposite",
      description: "Discover someone who balances you in ways you never imagined."
    },
    {
      icon: Users,
      title: "Find Who Completes You",
      description: "Hate cooking? They'll love it. Love adventure? They'll plan it. Together, you're unstoppable."
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {slogans.map((slogan, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-blue-100"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <slogan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-blue-900">
                  {slogan.title}
                </h3>
                <p className="text-gray-600">
                  {slogan.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote section placeholder */}
        <div className="mt-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-12 text-center text-white shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <svg className="w-12 h-12 mx-auto mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-gray-200 italic mb-4">
              Testimonials and user quotes coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
