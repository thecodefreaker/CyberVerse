'use client';

import React from 'react';
import { motion } from 'framer-motion';

type BadgeVariant = 'skill' | 'cert' | 'clearance' | 'tool';
type BadgeLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

interface CyberBadgeProps {
  label: string;
  variant?: BadgeVariant;
  level?: BadgeLevel;
  icon?: React.ReactNode;
  animated?: boolean;
}

const CyberBadge: React.FC<CyberBadgeProps> = ({
  label,
  variant = 'skill',
  level = 'intermediate',
  icon,
  animated = true
}) => {
  // Map variants to colors
  const variantColors = {
    skill: {
      bg: 'var(--dark-tertiary)',
      border: 'var(--neon-green)',
      text: 'var(--neon-green)'
    },
    cert: {
      bg: 'var(--dark-tertiary)',
      border: 'var(--cyber-blue)',
      text: 'var(--cyber-blue)'
    },
    clearance: {
      bg: 'var(--dark-tertiary)',
      border: 'var(--neon-purple)',
      text: 'var(--neon-purple)'
    },
    tool: {
      bg: 'var(--dark-tertiary)',
      border: '#f8f8f2',
      text: '#f8f8f2'
    }
  };

  // Map levels to intensity
  const levelIntensity = {
    basic: {
      borderWidth: '1px',
      glowIntensity: '0.3',
      borderStyle: 'dashed'
    },
    intermediate: {
      borderWidth: '1px',
      glowIntensity: '0.5',
      borderStyle: 'solid'
    },
    advanced: {
      borderWidth: '2px',
      glowIntensity: '0.7',
      borderStyle: 'solid'
    },
    expert: {
      borderWidth: '2px',
      glowIntensity: '1',
      borderStyle: 'double'
    }
  };

  const colors = variantColors[variant];
  const intensity = levelIntensity[level];

  return (
    <motion.div
      className="inline-flex items-center py-1 px-3 rounded-md m-1 relative overflow-hidden"
      style={{
        backgroundColor: colors.bg,
        border: `${intensity.borderWidth} ${intensity.borderStyle} ${colors.border}`,
        boxShadow: `0 0 5px rgba(${colors.border}, ${intensity.glowIntensity})`,
      }}
      whileHover={animated ? { scale: 1.05 } : {}}
      whileTap={animated ? { scale: 0.95 } : {}}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            ${colors.border} 10px,
            ${colors.border} 12px
          )`
        }}
      />

      {/* Icon */}
      {icon && (
        <motion.div 
          className="mr-2"
          animate={animated ? { rotateY: [0, 360] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          {icon}
        </motion.div>
      )}

      {/* Label */}
      <span
        className="font-cyber text-sm relative z-10"
        style={{ color: colors.text }}
      >
        {label}
      </span>
      
      {/* Scan line animation */}
      {animated && (
        <motion.div
          className="absolute inset-y-0 w-full pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear",
            repeatDelay: 2
          }}
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${colors.border}33 50%, 
              transparent 100%
            )`,
            width: '50%'
          }}
        />
      )}
    </motion.div>
  );
};

export default CyberBadge;
