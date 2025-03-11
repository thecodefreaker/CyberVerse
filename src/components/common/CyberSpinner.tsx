'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CyberSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'blue' | 'purple';
}

const CyberSpinner: React.FC<CyberSpinnerProps> = ({ 
  size = 'md', 
  color = 'green' 
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorMap = {
    green: 'var(--neon-green)',
    blue: 'var(--cyber-blue)',
    purple: 'var(--neon-purple)'
  };

  return (
    <div className="relative">
      {/* Outer ring */}
      <motion.div
        className={`${sizeMap[size]} border-2 border-transparent rounded-full`}
        style={{
          borderTopColor: colorMap[color],
          borderRightColor: colorMap[color]
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Inner ring */}
      <motion.div
        className={`absolute inset-1 border-2 border-transparent rounded-full`}
        style={{
          borderTopColor: colorMap[color],
          opacity: 0.5
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Center dot */}
      <div 
        className={`absolute inset-0 m-auto rounded-full w-1.5 h-1.5`}
        style={{ backgroundColor: colorMap[color] }}
      />

      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `0 0 15px ${colorMap[color]}`,
          opacity: 0.3
        }}
      />
    </div>
  );
};

export default CyberSpinner;
