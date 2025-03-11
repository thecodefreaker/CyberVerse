'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CyberButton from './CyberButton';

export interface ExpandableCardProps {
  title: string;
  children?: React.ReactNode;
  expandedContent?: React.ReactNode;
  className?: string;
  glowColor?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  links?: {
    github?: string;
    live?: string;
  };
  tags?: string[];
  technologies?: string[];
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  children,
  expandedContent,
  className = '',
  glowColor = 'rgba(80, 250, 123, 0.3)',
  description,
  imageUrl,
  category,
  links,
  tags,
  technologies,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      className={`bg-dark-tertiary rounded-lg overflow-hidden border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: `0 0 15px ${glowColor}`,
        scale: 1.01
      }}
    >
      {/* Card Header */}
      <div className="relative">
        {imageUrl && (
          <div className="w-full h-48 relative overflow-hidden">
            <Image 
              src={imageUrl} 
              alt={title} 
              fill 
              className="object-cover transition-all duration-500 filter hover:brightness-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {category && (
              <span className="absolute top-3 right-3 bg-dark-base/80 px-3 py-1 rounded-full text-xs text-neon-green border border-neon-green/30">
                {category}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-xl font-cyber text-cyber-blue mb-2">{title}</h3>
        
        {description && (
          <p className="text-gray-300 mb-3">{description}</p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-dark-base px-2 py-1 rounded-full text-cyber-blue"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Display children content if provided */}
        {children && (
          <div className="mb-4">
            {children}
          </div>
        )}
        
        {/* Links and expand button */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            {links?.github && (
              <CyberButton
                href={links.github}
                type="outline"
                size="sm"
                icon="github"
              >
                Code
              </CyberButton>
            )}
            
            {links?.live && (
              <CyberButton
                href={links.live}
                type="primary"
                size="sm"
                icon="terminal"
              >
                Demo
              </CyberButton>
            )}
          </div>
          
          {expandedContent || (technologies && technologies.length > 0) ? (
            <button 
              onClick={toggleExpanded} 
              className="flex items-center text-neon-green hover:text-cyber-blue transition-colors"
            >
              {isExpanded ? (
                <>
                  <span className="mr-1 text-sm">Less</span>
                  <FaChevronUp size={14} />
                </>
              ) : (
                <>
                  <span className="mr-1 text-sm">More</span>
                  <FaChevronDown size={14} />
                </>
              )}
            </button>
          ) : null}
        </div>
        
        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-neon-green/20">
                {technologies && technologies.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm text-cyber-blue mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-dark-base/80 px-2 py-1 rounded-full text-neon-green border border-neon-green/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {expandedContent && (
                  <div className="text-gray-300">
                    {expandedContent}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ExpandableCard;
