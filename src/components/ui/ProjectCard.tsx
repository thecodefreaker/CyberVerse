'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { extractPortableText } from '../../lib/portableTextUtils';
import { PortableText } from '../../types/schema';
import CyberCard from './CyberCard';

interface ProjectCardProps {
  title: string;
  description: PortableText | string;
  imageUrl: string;
  category?: string;
  links?: {
    github?: string;
    live?: string;
  };
  technologies?: Array<string | { name: string; icon?: string }>;
  tags?: string[];
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  category = '',
  links,
  technologies = [],
  tags = [],
  className = '',
}) => {
  // Extract plain text from the Portable Text format
  const descriptionText = typeof description === 'string' ? description : extractPortableText(description, '');

  return (
    <CyberCard title={title} className={`cyber-interactive ${className}`}>
      <div className="space-y-4">
        {imageUrl && (
          <div className="relative w-full h-48 overflow-hidden rounded-md mb-4 border border-dark-tertiary">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-dark-base/80 py-1 px-3 rounded-full text-xs text-neon-green border border-neon-green/30">
              {category}
            </div>
          </div>
        )}
        
        <p className="text-gray-300 line-clamp-3 font-terminal text-sm">{descriptionText}</p>
        
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs py-1 px-2 bg-dark-base rounded-md text-cyber-blue border border-cyber-blue/30 font-terminal"
              >
                {typeof tech === 'string' ? tech : tech.name}
              </span>
            ))}
          </div>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs py-1 px-2 bg-dark-tertiary rounded-md text-neon-purple border border-neon-purple/30 font-terminal"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {(links?.github || links?.live) && (
          <div className="flex space-x-3 mt-4">
            {links.github && (
              <motion.a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-gray hover:text-neon-green transition-colors cyber-glow-green"
                whileHover={{ scale: 1.1 }}
                aria-label="View GitHub Repository"
              >
                <FaGithub size={20} />
              </motion.a>
            )}
            {links.live && (
              <motion.a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-gray hover:text-neon-purple transition-colors cyber-glow-purple"
                whileHover={{ scale: 1.1 }}
                aria-label="View Live Project"
              >
                <FaExternalLinkAlt size={18} />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </CyberCard>
  );
};

export default ProjectCard;
