'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaUnlock, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

interface CyberCardProps {
  title: string;
  content: React.ReactNode;
  image?: string;
  securityLevel?: 'public' | 'confidential' | 'secret' | 'top-secret';
  className?: string;
  onClick?: () => void;
  animated?: boolean;
  initiallyLocked?: boolean;
  children?: React.ReactNode;
}

const CyberCard: React.FC<CyberCardProps> = ({
  title,
  content,
  image,
  securityLevel = 'public',
  className = '',
  onClick,
  animated = true,
  initiallyLocked = false,
  children
}) => {
  const [isLocked, setIsLocked] = useState(initiallyLocked);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [hoverState, setHoverState] = useState(false);

  // Security level colors
  const securityColors = {
    'public': {
      bgColor: 'var(--cyber-blue)',
      borderColor: 'var(--cyber-blue)',
      textColor: 'white'
    },
    'confidential': {
      bgColor: 'var(--neon-green)',
      borderColor: 'var(--neon-green)',
      textColor: 'white'
    },
    'secret': {
      bgColor: 'var(--neon-purple)',
      borderColor: 'var(--neon-purple)',
      textColor: 'white'
    },
    'top-secret': {
      bgColor: 'var(--error-red)',
      borderColor: 'var(--error-red)',
      textColor: 'white'
    }
  };

  const colors = securityColors[securityLevel];
  
  // Handle decryption animation
  useEffect(() => {
    if (isDecrypting) {
      const decryptTimer = setInterval(() => {
        setDecryptProgress(prev => {
          const newProgress = prev + (Math.random() * 10 + 5);
          if (newProgress >= 100) {
            clearInterval(decryptTimer);
            setIsDecrypting(false);
            setIsLocked(false);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      
      return () => clearInterval(decryptTimer);
    }
  }, [isDecrypting]);

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isLocked) {
      setIsDecrypting(true);
      setDecryptProgress(0);
    } else {
      setIsLocked(true);
    }
  };

  const toggleFlip = () => {
    if (onClick) {
      onClick();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  // Generate scrambled text for the locked state
  const getScrambledText = (text: string) => {
    if (!isLocked) return text;
    
    if (typeof text !== 'string') return '[ENCRYPTED]';
    
    return text
      .split('')
      .map(char => 
        Math.random() > 0.2 
          ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) 
          : char
      )
      .join('');
  };

  // Progress indicator for decryption
  const DecryptionProgress = () => (
    <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-800 overflow-hidden">
      <motion.div 
        className="h-full"
        style={{ 
          width: `${decryptProgress}%`, 
          backgroundColor: colors.borderColor
        }}
      />
    </div>
  );

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      whileHover={animated ? { scale: 1.02 } : {}}
      whileTap={animated ? { scale: 0.98 } : {}}
      onHoverStart={() => setHoverState(true)}
      onHoverEnd={() => setHoverState(false)}
    >
      <div 
        className={`
          w-full cursor-pointer transition-all duration-300
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
        onClick={toggleFlip}
      >
        {/* Front of card */}
        <motion.div
          className={`
            bg-dark-secondary border-2 rounded-lg overflow-hidden
            ${isFlipped ? 'hidden' : 'block'}
            relative
          `}
          style={{
            borderColor: colors.borderColor,
            boxShadow: hoverState ? `0 0 15px ${colors.borderColor}` : 'none',
          }}
        >
          {/* Security level badge */}
          <div 
            className="absolute top-3 right-3 z-10 px-2 py-1 rounded-md text-xs font-cyber flex items-center"
            style={{ 
              backgroundColor: `${colors.bgColor}33`,
              color: colors.textColor,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            <FaShieldAlt className="mr-1" />
            {securityLevel.toUpperCase()}
          </div>

          {/* Lock/Unlock button */}
          <button
            className="absolute top-3 left-3 z-10 p-1.5 rounded-full"
            onClick={toggleLock}
            style={{ 
              backgroundColor: 'var(--dark-tertiary)',
              border: `1px solid ${isLocked ? 'var(--error-red)' : 'var(--neon-green)'}`
            }}
          >
            {isLocked ? (
              <FaLock className="text-red-500" size={14} />
            ) : (
              <FaUnlock className="text-neon-green" size={14} />
            )}
          </button>

          {/* Image section */}
          {image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={isLocked ? '' : image}
                alt={title}
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: isLocked ? 0 : 1 }}
              />
              
              {/* Encrypted image placeholder */}
              {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-tertiary">
                  <FaEyeSlash size={30} className="mb-2 text-gray-400" />
                  <div className="text-sm text-gray-400 font-terminal">[ENCRYPTED IMAGE]</div>
                  
                  {/* Noise overlay */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-gray-500"
                        style={{
                          width: `${Math.random() * 5 + 1}px`,
                          height: `${Math.random() * 100 + 10}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.3,
                          transform: `rotate(${Math.random() * 90}deg)`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base to-transparent" />
            </div>
          )}

          {/* Content section */}
          <div className="p-5 relative">
            <h3 
              className="text-xl font-cyber mb-3 text-glow transition-colors"
              style={{ color: isLocked ? 'var(--error-red)' : colors.textColor }}
            >
              {isLocked ? getScrambledText(title) : title}
            </h3>
            
            <div className="text-gray-300 font-normal text-sm relative">
              {/* Content with encryption effect */}
              <div style={{ opacity: isLocked ? 0 : 1 }}>
                {content}
              </div>
              
              {/* Encrypted overlay */}
              {isLocked && (
                <div className="absolute inset-0 font-terminal text-gray-400">
                  {/* Redacted text lines */}
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="mb-2 flex items-center">
                      <div 
                        className="h-3 bg-gray-700 rounded" 
                        style={{ width: `${Math.random() * 50 + 40}%` }}
                      />
                      {Math.random() > 0.7 && (
                        <span className="ml-2 text-xs">
                          [REDACTED]
                        </span>
                      )}
                    </div>
                  ))}
                  
                  {/* Binary code background */}
                  <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-red-500 text-opacity-70 font-terminal text-xs"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                      >
                        {Math.random() > 0.5 ? '1' : '0'}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {isDecrypting && <DecryptionProgress />}
          </div>
          
          {/* Scan line effect */}
          <div className="absolute inset-0 scan-line pointer-events-none" />
          
          {/* Flip indicator */}
          {animated && (
            <motion.div
              className="absolute bottom-2 right-2 text-gray-400"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4h18M3 12h18M3 20h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Back of card */}
        <motion.div
          className={`
            absolute inset-0 bg-dark-secondary border-2 rounded-lg overflow-hidden
            ${isFlipped ? 'block' : 'hidden'}
            rotate-y-180
          `}
          style={{ 
            borderColor: colors.borderColor,
            boxShadow: hoverState ? `0 0 15px ${colors.borderColor}` : 'none'
          }}
        >
          <div className="p-5 h-full flex flex-col">
            {children}
          </div>
          
          {/* Scan line effect */}
          <div className="absolute inset-0 scan-line pointer-events-none" />
        </motion.div>
      </div>
      
      {/* Matrix rain effect - only visible on hover */}
      {animated && hoverState && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xs font-terminal"
              initial={{ y: -20, x: Math.random() * 100 + '%' }}
              animate={{ y: '120%' }}
              transition={{ 
                duration: Math.random() * 2 + 1,
                repeat: Infinity, 
                repeatType: 'loop'
              }}
              style={{ 
                color: colors.textColor,
                opacity: 0.3,
                left: `${Math.random() * 100}%`
              }}
            >
              {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CyberCard;
