'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CyberCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

const CyberCard: React.FC<CyberCardProps> = ({
  title,
  children,
  className = '',
  glowColor = 'rgba(80, 250, 123, 0.6)', // Default to neon green glow
  onClick,
}) => {
  return (
    <motion.div 
      className={`relative bg-dark-tertiary border border-neon-green/20 rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: `0 0 15px ${glowColor}`,
        scale: 1.02
      }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-5 h-5 overflow-hidden">
        <div className="absolute transform rotate-45 bg-neon-green w-10 h-2 -right-2 top-2"></div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        {title && (
          <h3 className="text-xl font-cyber text-cyber-blue mb-4">{title}</h3>
        )}
        
        <div className="text-gray-300">
          {children}
        </div>
      </div>
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-40"></div>
    </motion.div>
  );
};

export default CyberCard;
