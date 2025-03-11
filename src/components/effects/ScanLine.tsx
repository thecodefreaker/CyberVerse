'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScanLineProps {
  color?: string;
  opacity?: number;
  speed?: 'slow' | 'medium' | 'fast';
  vertical?: boolean;
  width?: number;
  className?: string;
  zIndex?: number;
  glow?: boolean;
  flicker?: boolean;
}

const ScanLine: React.FC<ScanLineProps> = ({
  color = 'var(--neon-green, #50fa7b)',
  opacity = 0.15,
  speed = 'medium',
  vertical = false,
  width = 2,
  className = '',
  zIndex = 10,
  glow = true,
  flicker = true,
}) => {
  // Determine animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return 5;
      case 'fast': return 1.5;
      default: return 3;
    }
  };

  // Animation variants based on direction
  const scanAnimation = vertical
    ? {
        initial: { y: '-100%' },
        animate: { y: '100%' },
      }
    : {
        initial: { x: '-100%' },
        animate: { x: '100%' },
      };

  return (
    <div 
      className={`fixed pointer-events-none ${vertical ? 'h-full w-auto' : 'w-full h-auto'} inset-0 overflow-hidden ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      <motion.div
        className={`absolute ${vertical ? 'h-full' : 'w-full'}`}
        initial={scanAnimation.initial}
        animate={scanAnimation.animate}
        transition={{
          duration: getDuration(),
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
        style={{
          [vertical ? 'width' : 'height']: width,
          background: color,
          opacity: flicker ? undefined : opacity,
          boxShadow: glow ? `0 0 8px 2px ${color}` : 'none',
        }}
      >
        {flicker && (
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [opacity * 0.7, opacity, opacity * 0.8, opacity, opacity * 0.9],
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              times: [0, 0.2, 0.4, 0.6, 1],
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ScanLine;
