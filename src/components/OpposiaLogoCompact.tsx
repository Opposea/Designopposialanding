import React from 'react';
import logoImage from 'figma:asset/9f8c54c1094496065f7baa2517c5b6daeda9ab9b.png';

export function OpposiaLogoCompact() {
  return (
    <div className="flex items-center justify-center">
      <img 
        src={logoImage} 
        alt="Opposia Logo" 
        className="w-[200px] h-auto lg:w-[280px] drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]"
      />
    </div>
  );
}