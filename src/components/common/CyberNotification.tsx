'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaCheckCircle, 
  FaTimes,
  FaLock,
  FaUnlock
} from 'react-icons/fa';

type NotificationType = 'info' | 'warning' | 'error' | 'success' | 'security';

interface CyberNotificationProps {
  type?: NotificationType;
  message: string;
  details?: string;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showEncryptedEffect?: boolean;
}

const CyberNotification: React.FC<CyberNotificationProps> = ({
  type = 'info',
  message,
  details,
  autoClose = false,
  duration = 5000,
  onClose,
  position = 'top-right',
  showEncryptedEffect = false
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDecrypted, setIsDecrypted] = useState(!showEncryptedEffect);
  const [decryptProgress, setDecryptProgress] = useState(0);

  // Handle auto-close
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (autoClose && isVisible) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoClose, duration, isVisible]);

  // Handle decryption effect
  useEffect(() => {
    if (showEncryptedEffect && !isDecrypted) {
      const decryptionTimer = setInterval(() => {
        setDecryptProgress(prev => {
          const newProgress = prev + (Math.random() * 5 + 2);
          if (newProgress >= 100) {
            clearInterval(decryptionTimer);
            setIsDecrypted(true);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      
      return () => clearInterval(decryptionTimer);
    }
  }, [showEncryptedEffect, isDecrypted]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 300); // Wait for exit animation
    }
  };

  // Position styles
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  // Type-based styles and icons
  const typeConfig = {
    info: {
      icon: FaInfoCircle,
      border: 'var(--cyber-blue)',
      bg: 'rgba(139, 233, 253, 0.1)',
      text: 'var(--cyber-blue)'
    },
    warning: {
      icon: FaExclamationTriangle,
      border: '#f1fa8c',
      bg: 'rgba(241, 250, 140, 0.1)',
      text: '#f1fa8c'
    },
    error: {
      icon: FaUnlock,
      border: 'var(--error-red)',
      bg: 'rgba(255, 85, 85, 0.1)',
      text: 'var(--error-red)'
    },
    success: {
      icon: FaCheckCircle,
      border: 'var(--neon-green)',
      bg: 'rgba(80, 250, 123, 0.1)',
      text: 'var(--neon-green)'
    },
    security: {
      icon: FaShieldAlt,
      border: 'var(--neon-purple)',
      bg: 'rgba(189, 147, 249, 0.1)',
      text: 'var(--neon-purple)'
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;
  
  // Function to scramble text for decryption effect
  const getDisplayText = (text: string) => {
    if (isDecrypted) return text;
    
    return text.split('').map((char, i) => {
      // More characters become decrypted as progress increases
      const charPosition = (i / text.length) * 100;
      if (charPosition < decryptProgress) {
        return char;
      }
      // Return random character otherwise
      return String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }).join('');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 max-w-md w-full ${positionStyles[position]}`}
          initial={{ opacity: 0, y: position.includes('top') ? -20 : 20, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: position.includes('right') ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="rounded-md overflow-hidden relative"
            style={{ 
              borderLeft: `4px solid ${config.border}`,
              backgroundColor: 'var(--dark-secondary)',
              boxShadow: `0 0 15px rgba(0, 0, 0, 0.4), 0 0 5px ${config.border}`
            }}
          >
            {/* Scan line animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none scan-line opacity-20" />
            
            {/* Main content */}
            <div className="p-4 pl-3 pr-10">
              <div className="flex items-start">
                {/* Icon */}
                <motion.div 
                  className="mr-3 mt-0.5 flex-shrink-0"
                  animate={{ 
                    rotate: type === 'error' ? [0, 15, -15, 0] : 0,
                    scale: isDecrypted ? 1 : [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: type === 'error' ? 0.5 : 2, 
                    repeat: Infinity, 
                    repeatType: "loop" 
                  }}
                  style={{ color: config.text }}
                >
                  <IconComponent size={20} />
                </motion.div>

                {/* Text content */}
                <div className="flex-1">
                  <h4 
                    className="font-cyber text-sm mb-1"
                    style={{ color: config.text }}
                  >
                    {getDisplayText(message)}
                  </h4>
                  
                  {details && (
                    <p className="text-gray-300 text-xs font-terminal">
                      {getDisplayText(details)}
                    </p>
                  )}
                  
                  {/* Decryption progress bar */}
                  {showEncryptedEffect && !isDecrypted && (
                    <div className="mt-2 h-1 bg-dark-tertiary w-full rounded overflow-hidden">
                      <motion.div 
                        className="h-full"
                        style={{ 
                          width: `${decryptProgress}%`,
                          backgroundColor: config.text
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <FaTimes size={14} />
            </button>
            
            {/* Status indicator dots */}
            <div className="absolute bottom-2 right-2 flex space-x-1">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.text }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.text }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.text }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              />
            </div>
            
            {/* Matrix characters effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {!isDecrypted && [...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs font-terminal"
                  style={{
                    color: config.text,
                    opacity: 0.3,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: Math.random() * 2
                  }}
                >
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </motion.div>
              ))}
            </div>
            
            {/* Auto-close progress bar */}
            {autoClose && (
              <motion.div 
                className="h-1 bg-gray-700 absolute bottom-0 left-0"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                style={{ backgroundColor: config.border }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Notification Manager Component
export const CyberNotificationManager: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  // This would be the container for multiple notifications
  // In a real implementation, this would manage a queue of notifications
  return (
    <div className="cyber-notification-container">
      {children}
    </div>
  );
};

export default CyberNotification;
