import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaExclamationTriangle, FaSkull } from 'react-icons/fa';

interface ThreatLevelIndicatorProps {
  level: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
}

const ThreatLevelIndicator: React.FC<ThreatLevelIndicatorProps> = ({ 
  level, 
  description = '' 
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Configure appearance based on threat level
  const getLevelConfig = () => {
    switch (level) {
      case 'low':
        return {
          color: 'var(--neon-green)',
          bgColor: 'rgba(80, 250, 123, 0.1)',
          borderColor: 'var(--neon-green)',
          glowColor: 'var(--neon-green)',
          icon: <FaShieldAlt className="text-2xl" />,
          label: 'Low',
          pulseSpeed: 'slow'
        };
      case 'medium':
        return {
          color: 'var(--neon-yellow)',
          bgColor: 'rgba(241, 250, 140, 0.1)',
          borderColor: 'var(--neon-yellow)',
          glowColor: 'var(--neon-yellow)',
          icon: <FaShieldAlt className="text-2xl" />,
          label: 'Medium',
          pulseSpeed: 'medium'
        };
      case 'high':
        return {
          color: 'var(--neon-orange)',
          bgColor: 'rgba(255, 184, 108, 0.1)',
          borderColor: 'var(--neon-orange)',
          glowColor: 'var(--neon-orange)',
          icon: <FaExclamationTriangle className="text-2xl" />,
          label: 'High',
          pulseSpeed: 'fast'
        };
      case 'critical':
        return {
          color: 'var(--neon-red)',
          bgColor: 'rgba(255, 85, 85, 0.1)',
          borderColor: 'var(--neon-red)',
          glowColor: 'var(--neon-red)',
          icon: <FaSkull className="text-2xl" />,
          label: 'Critical',
          pulseSpeed: 'very-fast'
        };
      default:
        return {
          color: 'var(--neon-green)',
          bgColor: 'rgba(80, 250, 123, 0.1)',
          borderColor: 'var(--neon-green)',
          glowColor: 'var(--neon-green)',
          icon: <FaShieldAlt className="text-2xl" />,
          label: 'Low',
          pulseSpeed: 'slow'
        };
    }
  };
  
  const config = getLevelConfig();
  
  // Set blinking effect for high and critical levels
  useEffect(() => {
    if (level === 'high' || level === 'critical') {
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }
  }, [level]);
  
  // Animation variants for different pulse speeds
  const pulseVariants = {
    slow: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: { 
        duration: 3, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    },
    medium: {
      scale: [1, 1.07, 1],
      opacity: [1, 0.7, 1],
      transition: { 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    },
    fast: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.6, 1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    },
    'very-fast': {
      scale: [1, 1.15, 1],
      opacity: [1, 0.5, 1],
      transition: { 
        duration: 0.8, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    }
  };
  
  // Blink animation variants
  const blinkVariants = {
    blink: {
      opacity: [1, 0.3, 1],
      transition: {
        duration: level === 'critical' ? 0.5 : 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    static: {
      opacity: 1
    }
  };
  
  return (
    <div className="cyber-card h-full overflow-hidden relative">
      {/* Background scan effect */}
      <div className="security-scan"></div>
      
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-cyber custom-text-neon-green">Threat Level</h3>
      </div>
      
      <div className="p-6 flex flex-col items-center justify-center h-[calc(100%-60px)]">
        <motion.div
          animate={isBlinking ? 'blink' : 'static'}
          variants={blinkVariants}
          className="mb-4"
          style={{ color: config.color }}
        >
          {config.icon}
        </motion.div>
        
        <motion.div 
          className="relative"
          animate={config.pulseSpeed as keyof typeof pulseVariants}
          variants={pulseVariants}
        >
          <div 
            className="w-36 h-36 rounded-full flex items-center justify-center border-4"
            style={{ 
              backgroundColor: config.bgColor,
              borderColor: config.borderColor,
              boxShadow: `0 0 15px ${config.glowColor}`,
              color: config.color
            }}
          >
            <div className="text-center">
              <span className="text-sm font-cyber">THREAT LEVEL</span>
              <h2 className="text-2xl font-bold font-cyber">{config.label}</h2>
            </div>
          </div>
          
          {/* Pulse rings for effect */}
          <div 
            className="absolute top-0 left-0 w-full h-full rounded-full animate-ping opacity-20"
            style={{ 
              border: `2px solid ${config.borderColor}`,
              animationDuration: `${level === 'critical' ? '1s' : level === 'high' ? '1.5s' : '2s'}`
            }}
          ></div>
        </motion.div>
        
        {description && (
          <motion.p 
            className="mt-6 text-sm text-center text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </div>
      
      {/* Bottom pattern - cyberpunk grid */}
      <div className="absolute bottom-0 left-0 w-full h-10 opacity-20 cyber-grid"></div>
    </div>
  );
};

export default ThreatLevelIndicator;
