
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-banking-blue to-banking-lightBlue flex items-center justify-center`}>
      <span className="text-white font-display font-bold text-2xl">S</span>
    </div>
  );
};

export default Logo;
