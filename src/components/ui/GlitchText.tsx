'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high' | number;
  speed?: number;
  color?: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  children, 
  intensity = 'medium', 
  speed = 1,
  color, 
  className = '' 
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const text = children?.toString() || '';
  
  // Glitch intensity configuration
  const intensityConfig = {
    low: { interval: 10000, duration: 1000, chance: 0.02 },
    medium: { interval: 5000, duration: 2000, chance: 0.05 },
    high: { interval: 2000, duration: 3000, chance: 0.1 },
  };
  
  const getConfig = () => {
    if (typeof intensity === 'number') {
      // Map number (1-10) to configuration
      const numericIntensity = Math.max(1, Math.min(10, intensity));
      return {
        interval: 10000 - (numericIntensity * 800),
        duration: 1000 + (numericIntensity * 200),
        chance: 0.01 + (numericIntensity * 0.01)
      };
    }
    return intensityConfig[intensity];
  };
  
  const config = getConfig();
  
  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < config.chance) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), config.duration);
      }
    }, config.interval);
    
    return () => clearInterval(interval);
  }, [config.chance, config.duration, config.interval]);
  
  // Generate glitch layers with random offsets
  const generateGlitchLayers = () => {
    return [
      { x: -3, y: 2, color: 'rgba(255, 0, 0, 0.5)' },
      { x: 3, y: -2, color: 'rgba(0, 255, 255, 0.5)' },
      { x: 0, y: 0, color: color || 'inherit' }
    ];
  };
  
  return (
    <span className={`relative inline-block ${className}`}>
      {isGlitching ? (
        <span className="glitch-container relative inline-block">
          {generateGlitchLayers().map((layer, index) => (
            <motion.span
              key={index}
              className="absolute top-0 left-0 whitespace-nowrap"
              initial={{ x: 0, y: 0 }}
              animate={{ 
                x: [0, layer.x, -layer.x/2, layer.x*1.5, 0],
                y: [0, layer.y, -layer.y/2, layer.y*1.5, 0],
              }}
              transition={{ 
                duration: 0.5, 
                repeat: 1, 
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ 
                color: layer.color, 
                mixBlendMode: index === 2 ? 'normal' : 'screen',
                zIndex: 10 - index,
                clipPath: index !== 2 ? 'inset(10% 0% 85% 0%)' : undefined 
              }}
            >
              {text}
            </motion.span>
          ))}
        </span>
      ) : (
        <span className="relative">
          {text}
          <motion.span
            className="absolute top-0 left-0 h-full w-full opacity-0"
            animate={{ opacity: [0, 0.05, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: 'loop', 
              duration: 3, 
              ease: 'easeInOut'
            }}
            style={{ 
              backgroundImage: 'linear-gradient(0deg, transparent 0%, var(--neon-green) 50%, transparent 100%)', 
              mixBlendMode: 'overlay' 
            }}
          />
        </span>
      )}
    </span>
  );
};

export default GlitchText;
