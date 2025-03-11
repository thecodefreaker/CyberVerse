'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaLock, FaUnlock, FaShieldAlt, FaShieldVirus } from 'react-icons/fa';

interface MatrixRainProps {
  intensity: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ intensity }) => {
  const [raindrops, setRaindrops] = useState<Array<{
    id: number;
    left: number;
    duration: number;
    delay: number;
    char: string;
  }>>([]);

  useEffect(() => {
    const generateRaindrops = () => {
      const drops = [];
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      
      for (let i = 0; i < intensity; i++) {
        drops.push({
          id: i,
          left: Math.floor(Math.random() * 100),
          duration: 1 + Math.random() * 2,
          delay: Math.random() * 2,
          char: chars[Math.floor(Math.random() * chars.length)]
        });
      }
      setRaindrops(drops);
    };

    generateRaindrops();
  }, [intensity]);

  return (
    <div className="matrix-container absolute inset-0 overflow-hidden pointer-events-none">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="matrix-raindrop absolute top-0 font-mono text-sm"
          initial={{ y: '-20%', opacity: 0.4 }}
          animate={{ y: '120%', opacity: 0.4 }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            left: `${drop.left}%`,
            color: 'var(--neon-green)'
          }}
        >
          {drop.char}
        </motion.div>
      ))}
    </div>
  );
};

interface ContactInfo {
  github: string;
  linkedin: string;
  email: string;
}

interface FloatingContactProps {
  contactInfo: ContactInfo;
}

const FloatingContact: React.FC<FloatingContactProps> = ({ contactInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [matrixIntensity, setMatrixIntensity] = useState(20);

  useEffect(() => {
    setMatrixIntensity(isExpanded ? 40 : 20);
  }, [isExpanded]);

  const contactLinks = [
    {
      icon: FaGithub,
      url: contactInfo.github,
      label: 'GitHub',
      color: 'var(--neon-purple)'
    },
    {
      icon: FaLinkedin,
      url: contactInfo.linkedin,
      label: 'LinkedIn',
      color: 'var(--cyber-blue)'
    },
    {
      icon: FaEnvelope,
      url: `mailto:${contactInfo.email}`,
      label: 'Email',
      color: 'var(--neon-green)'
    }
  ];

  const scrambleText = useCallback((text: string) => {
    if (isSecure) return text;
    return text.split('').map(char => 
      Math.random() > 0.7 ? '█' : char
    ).join('');
  }, [isSecure]);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-64 p-4 rounded-lg bg-dark-base border border-cyber-blue cyber-card"
            style={{ 
              backdropFilter: 'blur(10px)',
              boxShadow: `0 0 15px ${isSecure ? 'var(--neon-green)' : 'var(--error-red)'}` 
            }}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-dark-tertiary">
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: isSecure ? 0 : 360 }}
                  transition={{ duration: 1, repeat: isSecure ? 0 : Infinity }}
                >
                  {isSecure ? (
                    <FaShieldAlt className="text-neon-green mr-2" />
                  ) : (
                    <FaShieldVirus className="text-red-500 mr-2" />
                  )}
                </motion.div>
                <motion.span 
                  className={`text-xs font-terminal ${isSecure ? 'text-neon-green' : 'text-red-500'}`}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isSecure ? 'SECURE CONNECTION' : 'UNSECURE CONNECTION'}
                </motion.span>
              </div>
              <motion.button
                onClick={() => setIsSecure(!isSecure)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-xs"
              >
                {isSecure ? <FaLock className="text-neon-green" /> : <FaUnlock className="text-red-500" />}
              </motion.button>
            </div>

            <div className="space-y-4 relative">
              <MatrixRain intensity={matrixIntensity} />

              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={isSecure ? link.url : '#'}
                  onClick={e => !isSecure && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 p-2 rounded-md hover:bg-dark-tertiary transition-all group relative z-20 ${!isSecure ? 'cursor-not-allowed' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={isSecure ? { x: 5, scale: 1.02 } : { x: 0 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: !isSecure ? [0, 15, -15, 0] : 0,
                      scale: !isSecure ? [1, 1.1, 0.9, 1] : 1 
                    }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: !isSecure ? Infinity : 0
                    }}
                  >
                    <link.icon
                      className="w-5 h-5 transition-all"
                      style={{ 
                        color: isSecure ? link.color : 'rgba(180, 180, 180, 0.7)',
                        filter: isSecure ? `drop-shadow(0 0 3px ${link.color})` : 'none'
                      }}
                    />
                  </motion.div>
                  <span 
                    className={`text-sm font-cyber ${isSecure ? 'text-white group-hover:text-glow' : 'text-gray-500'}`}
                    style={{ textShadow: isSecure ? `0 0 8px ${link.color}` : 'none' }}
                  >
                    {scrambleText(link.label)}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="cyber-button-sm relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MatrixRain intensity={10} />
        <span className="relative z-10">
          {isExpanded ? 'Close Contact' : 'Contact Me'}
        </span>
      </motion.button>
    </div>
  );
};

export default FloatingContact;
