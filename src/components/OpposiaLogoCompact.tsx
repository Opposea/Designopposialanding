import React from 'react';

export function OpposiaLogoCompact() {
  return (
    <div className="flex items-center gap-3 lg:gap-4">
      <svg
        width="80"
        height="80"
        viewBox="0 0 400 400"
        className="lg:w-[120px] lg:h-[120px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blue gradient for heart - lighter at top, darker at bottom */}
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          
          {/* Glow filter for sun */}
          <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Soft glow for moon */}
          <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Light blue glow for heart */}
          <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
            <feFlood floodColor="#38BDF8" floodOpacity="0.6"/>
            <feComposite in2="coloredBlur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Heart shape */}
        <path
          d="M200,340 C200,340 80,240 80,170 C80,125 110,100 140,100 C165,100 185,115 200,145 C215,115 235,100 260,100 C290,100 320,125 320,170 C320,240 200,340 200,340 Z"
          fill="url(#heartGradient)"
          filter="url(#heartGlow)"
        />

        {/* Crescent Moon - left side */}
        <g filter="url(#moonGlow)">
          <path
            d="M 155,180 Q 155,140 155,140 Q 125,145 125,180 Q 125,215 155,220 Q 155,220 155,180 Q 140,180 140,180 Q 140,160 155,160 Z"
            fill="white"
            opacity="0.95"
          />
          <circle cx="155" cy="180" r="45" fill="white" opacity="0.95" />
          <circle cx="170" cy="180" r="42" fill="#38BDF8" />
        </g>

        {/* Sun - right side with glow */}
        <g filter="url(#sunGlow)">
          {/* Sun center circle */}
          <circle cx="245" cy="180" r="35" fill="white" opacity="0.95" />
          
          {/* Sun rays */}
          <g stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9">
            {/* 8 main rays */}
            <line x1="245" y1="140" x2="245" y2="120" />
            <line x1="245" y1="220" x2="245" y2="240" />
            <line x1="205" y1="180" x2="185" y2="180" />
            <line x1="285" y1="180" x2="305" y2="180" />
            <line x1="217" y1="152" x2="203" y2="138" />
            <line x1="273" y1="208" x2="287" y2="222" />
            <line x1="217" y1="208" x2="203" y2="222" />
            <line x1="273" y1="152" x2="287" y2="138" />
          </g>
        </g>

        {/* Small star dots */}
        <circle cx="150" cy="250" r="4" fill="white" opacity="0.9" />
        <circle cx="180" cy="270" r="3.5" fill="white" opacity="0.85" />
        <circle cx="240" cy="260" r="4" fill="white" opacity="0.9" />
        <circle cx="260" cy="240" r="3" fill="white" opacity="0.8" />
        <circle cx="170" cy="130" r="3" fill="white" opacity="0.85" />
        <circle cx="250" cy="120" r="3.5" fill="white" opacity="0.9" />
      </svg>

      <div>
        <h1 className="text-3xl lg:text-5xl tracking-widest uppercase text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.5)' }}>
          Opposia
        </h1>
      </div>
    </div>
  );
}