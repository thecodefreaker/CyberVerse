'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CyberSpinner from './CyberSpinner';

interface CyberLoadingProps {
  message?: string;
  loadingTime?: number; // Artificial loading time in ms, for demo purposes
}

const CyberLoading: React.FC<CyberLoadingProps> = ({ 
  message = 'Establishing secure connection', 
  loadingTime = 0
}) => {
  const [progress, setProgress] = useState(0);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Security-themed status messages
  const securitySteps = [
    'Initializing secure protocol',
    'Encrypting connection',
    'Verifying digital signature',
    'Performing security scan',
    'Loading encrypted data',
    'Establishing secure tunnel',
    'Connection established'
  ];

  // Progress bar animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // If loadingTime is specified, use that to increment progress
    if (loadingTime > 0) {
      const increment = 100 / (loadingTime / 50); // Update every 50ms
      
      timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return newProgress;
        });
      }, 50);
    } else {
      // If no loadingTime, just do a controlled animation
      timer = setInterval(() => {
        setProgress(prev => {
          // Slow down as we approach 100%
          const increment = (100 - prev) / 10;
          const newProgress = prev + (increment < 0.5 ? 0.5 : increment);
          
          if (newProgress >= 99) {
            clearInterval(timer);
            return 99; // Never quite reaches 100% unless loading is complete
          }
          return newProgress;
        });
      }, 100);
    }
    
    return () => clearInterval(timer);
  }, [loadingTime]);
  
  // Add status messages over time
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (currentStep < securitySteps.length - 1) {
        setStatusMessages(prev => [...prev, securitySteps[currentStep]]);
        setCurrentStep(prev => prev + 1);
      } else {
        clearInterval(messageInterval);
      }
    }, loadingTime ? loadingTime / (securitySteps.length - 1) : 800);
    
    return () => clearInterval(messageInterval);
  }, [currentStep, loadingTime]);
  
  // Matrix characters for background
  const matrixChars: string[] = [];
  for (let i = 0; i < 100; i++) {
    matrixChars.push(String.fromCharCode(33 + Math.floor(Math.random() * 94)));
  }

  return (
    <div className="fixed inset-0 bg-dark-base flex flex-col items-center justify-center z-50">
      {/* Matrix rain background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {matrixChars.map((char, i) => (
          <motion.div
            key={i}
            className="absolute text-neon-green text-opacity-40 font-terminal"
            initial={{ 
              opacity: 0, 
              y: -100,
              x: Math.random() * window.innerWidth
            }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: window.innerHeight + 100 
            }}
            transition={{ 
              duration: Math.random() * 5 + 3, 
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "linear"
            }}
            style={{
              fontSize: `${Math.random() * 18 + 10}px`
            }}
          >
            {char}
          </motion.div>
        ))}
      </div>
      
      {/* Central loading content */}
      <div className="p-8 bg-dark-secondary bg-opacity-70 rounded-lg backdrop-blur-md border border-cyber-blue z-10 max-w-md w-full">
        <div className="flex flex-col items-center">
          {/* Logo placeholder - replace with your actual logo */}
          <motion.div
            className="mb-6 text-4xl font-cyber text-neon-green"
            animate={{ 
              textShadow: [
                "0 0 5px rgba(80, 250, 123, 0.5)", 
                "0 0 15px rgba(80, 250, 123, 0.8)", 
                "0 0 5px rgba(80, 250, 123, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CYBERVERSE
          </motion.div>
          
          {/* Custom spinner */}
          <div className="mb-8">
            <CyberSpinner size="lg" color="green" />
          </div>
          
          {/* Main status message */}
          <motion.div 
            className="text-xl font-cyber text-center mb-4 text-cyber-blue"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-dark-tertiary rounded-full overflow-hidden mb-4 relative">
            <motion.div 
              className="h-full bg-neon-green"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
            />
            
            {/* Scan line animation */}
            <motion.div
              className="absolute top-0 h-full w-4 bg-white opacity-50"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Status message log */}
          <div className="font-terminal text-sm text-gray-300 max-h-32 overflow-y-auto w-full terminal-scrollbar">
            {statusMessages.map((msg, i) => (
              <motion.div 
                key={i}
                className="mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-neon-green mr-2">&gt;</span>
                {msg}
              </motion.div>
            ))}
            
            {/* Typing indicator */}
            {currentStep < securitySteps.length - 1 && (
              <motion.div
                className="flex items-center"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-neon-green mr-2">&gt;</span>
                <span className="h-4 w-2 bg-cyber-blue inline-block"/>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none scan-line opacity-30" />
    </div>
  );
};

export default CyberLoading;
