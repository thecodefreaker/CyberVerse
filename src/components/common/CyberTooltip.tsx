'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CyberTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'info' | 'warning' | 'error' | 'success';
}

const CyberTooltip: React.FC<CyberTooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'info'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const variantStyles = {
    info: {
      border: 'border-cyber-blue',
      text: 'text-cyber-blue',
      shadow: '0 0 10px var(--cyber-blue)'
    },
    warning: {
      border: 'border-yellow-400',
      text: 'text-yellow-400',
      shadow: '0 0 10px #EAB308'
    },
    error: {
      border: 'border-red-500',
      text: 'text-red-500',
      shadow: '0 0 10px #EF4444'
    },
    success: {
      border: 'border-neon-green',
      text: 'text-neon-green',
      shadow: '0 0 10px var(--neon-green)'
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`
              absolute z-50 w-max max-w-xs
              ${positionStyles[position]}
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <div 
              className={`
                relative p-2 rounded
                bg-dark-secondary bg-opacity-95
                border ${variantStyles[variant].border}
                ${variantStyles[variant].text}
                text-sm font-terminal
              `}
              style={{
                boxShadow: variantStyles[variant].shadow
              }}
            >
              {/* Matrix rain background */}
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="matrix-rain"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${Math.random() * 2 + 1}s`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  >
                    {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <span className="mr-1">&gt;</span>
                {content}
              </div>

              {/* Scan line effect */}
              <div className="absolute inset-0 scan-line pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CyberTooltip;
