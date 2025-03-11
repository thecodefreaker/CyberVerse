'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

export interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className = '',
  children,
}) => {
  // Use title prop first, but fall back to children if title is not provided
  const headingContent = title || children;

  return (
    <motion.div 
      className={`mb-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl sm:text-4xl font-cyber text-neon-green mb-2 relative inline-block">
        <GlitchText intensity="low">{headingContent}</GlitchText>
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-neon-green to-transparent"></span>
      </h2>
      {subtitle && (
        <p className="text-gray-400 mt-2 max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
