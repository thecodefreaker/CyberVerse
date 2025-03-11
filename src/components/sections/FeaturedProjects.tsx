'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  // Fixed: Use the correct metadata structure
  const featuredProjects = projects.filter(project => project.metadata?.isFeatured);

  return (
    <section className="py-16 custom-bg-dark-base">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-cyber text-gradient-neon mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <motion.div
              key={project._id}
              className="cyber-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative overflow-hidden rounded-t-lg h-48">
                {project.thumbnail ? (
                  <img 
                    src={project.thumbnail.asset.url} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full custom-bg-dark-tertiary flex items-center justify-center">
                    <span className="custom-text-cyber-blue font-cyber">No Preview</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 py-1 px-3 rounded-full custom-bg-dark-base border custom-border-neon-green">
                  <span className="text-xs font-cyber custom-text-neon-green">
                    {project.metadata?.difficulty || 'intermediate'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-cyber custom-text-cyber-blue mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">
                  {project.description?.[0]?.children?.[0]?.text || 'No description available'}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs py-1 px-2 rounded custom-bg-dark-tertiary custom-text-neon-green"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs py-1 px-2 rounded custom-bg-dark-tertiary text-gray-300">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex space-x-3 mt-4">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button-blue text-sm py-1 px-3"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button text-sm py-1 px-3"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a href="/projects" className="cyber-button">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
