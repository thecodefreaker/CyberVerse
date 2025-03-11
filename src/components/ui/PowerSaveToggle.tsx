'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PowerSaveToggleProps {
  className?: string;
}

const PowerSaveToggle: React.FC<PowerSaveToggleProps> = ({ className = '' }) => {
  const [isPowerSaveMode, setIsPowerSaveMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if user has previously set power save mode
    const savedPreference = localStorage.getItem('powerSaveMode');
    if (savedPreference) {
      setIsPowerSaveMode(savedPreference === 'true');
    } else {
      // Automatically enable power save for mobile devices
      const isMobile = window.innerWidth < 768 || 
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsPowerSaveMode(isMobile);
    }
  }, []);

  useEffect(() => {
    // Apply power save mode to the body
    if (isPowerSaveMode) {
      document.body.classList.add('power-save-mode');
    } else {
      document.body.classList.remove('power-save-mode');
    }
    
    // Save preference
    localStorage.setItem('powerSaveMode', isPowerSaveMode.toString());
    
    // Also log for debugging
    console.log(`Power save mode: ${isPowerSaveMode ? 'ON' : 'OFF'}`);
  }, [isPowerSaveMode]);

  const togglePowerSave = () => {
    setIsPowerSaveMode(!isPowerSaveMode);
  };

  return (
    <motion.div 
      className={`fixed bottom-4 right-4 z-50 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <button
        onClick={togglePowerSave}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center justify-center py-1.5 px-4 rounded-md
          border transition-all duration-300
          ${isPowerSaveMode 
            ? 'bg-dark-tertiary text-green-400 border-green-400' 
            : 'bg-dark-base text-cyber-blue border-cyber-blue'}
          hover:shadow-lg font-cyber text-xs
        `}
        style={{
          boxShadow: isHovered 
            ? `0 0 10px 2px ${isPowerSaveMode ? '#50fa7b' : '#8be9fd'}` 
            : 'none',
        }}
      >
        <div className="mr-2">
          {isPowerSaveMode ? (
            // Battery saving icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14.5V9.5m-9-4h7a2 2 0 012 2v10a2 2 0 01-2 2h-7m-9-4h7a2 2 0 002-2v-10a2 2 0 00-2-2H3" />
            </svg>
          ) : (
            // Performance icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>
        {isPowerSaveMode ? 'POWER SAVE: ON' : 'PERFORMANCE: ON'}
        
        {/* Animated dots */}
        <span className="ml-1 flex justify-center items-center w-8">
          {!isPowerSaveMode && Array(3).fill(0).map((_, i) => (
            <span 
              key={i} 
              className="h-1.5 w-1.5 rounded-full bg-cyber-blue mx-0.5"
              style={{
                animation: `pulse 1s infinite ${i * 0.2}s`,
                opacity: 0.7 + (i * 0.1)
              }}
            />
          ))}
        </span>
      </button>
    </motion.div>
  );
};

export default PowerSaveToggle;
