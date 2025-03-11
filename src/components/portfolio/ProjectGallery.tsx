'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaBook, FaInfoCircle } from 'react-icons/fa';

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = new Set<string>();
    projects.forEach(project => {
      project.categories?.forEach(category => {
        uniqueCategories.add(category.name);
      });
    });
    setCategories(Array.from(uniqueCategories));
  }, [projects]);

  // Filter projects by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => 
          project.categories?.some(category => category.name === selectedCategory)
        )
      );
    }
  }, [selectedCategory, projects]);

  // Function to render project description from Portable Text
  const renderDescription = (description: any[] | undefined) => {
    if (!description) return '';
    
    return description.map((block, index) => {
      if (block.children) {
        return block.children.map((child: any, childIndex: number) => (
          <span key={`${index}-${childIndex}`}>{child.text}</span>
        ));
      }
      return null;
    });
  };

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          className={`cyber-button ${selectedCategory === 'all' ? '' : 'opacity-70'}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Projects
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`cyber-button ${selectedCategory === category ? '' : 'opacity-70'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="holo-card group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail.asset.url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-tertiary flex items-center justify-center">
                    <span className="text-cyber-blue font-cyber">No Image</span>
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 py-1 rounded-full neon-border text-neon-green"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full neon-border text-neon-green">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-cyber text-glow mb-2">{project.title}</h3>
                <p className="text-sm text-cyber-gray mb-4 line-clamp-2">
                  {renderDescription(project.description)}
                </p>
                
                {/* Project links */}
                <div className="flex gap-3">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-neon-green hover:text-glow transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyber-blue hover:text-glow-blue transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt size={18} />
                    </a>
                  )}
                  {project.docsLink && (
                    <a 
                      href={project.docsLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-neon-purple hover:text-glow-purple transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaBook size={18} />
                    </a>
                  )}
                </div>
                
                {/* Status badge */}
                {project.metadata?.status && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold bg-dark-base bg-opacity-80">
                    <span className={`
                      ${project.metadata.status === 'completed' ? 'text-neon-green' : ''}
                      ${project.metadata.status === 'in-progress' ? 'text-neon-orange' : ''}
                      ${project.metadata.status === 'planned' ? 'text-neon-purple' : ''}
                    `}>
                      {project.metadata.status.replace('-', ' ')}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-base bg-opacity-90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="cyber-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                {selectedProject.thumbnail ? (
                  <Image
                    src={selectedProject.thumbnail.asset.url}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-tertiary flex items-center justify-center">
                    <span className="text-cyber-blue font-cyber">No Image</span>
                  </div>
                )}
                <button
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-base bg-opacity-80 flex items-center justify-center text-neon-red hover:text-glow-red transition-all"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl md:text-3xl font-cyber text-gradient-neon mb-4">
                  {selectedProject.title}
                </h2>
                
                {/* Project metadata */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedProject.metadata?.difficulty && (
                    <span className="text-xs px-3 py-1 rounded-full neon-border-blue text-cyber-blue">
                      {selectedProject.metadata.difficulty}
                    </span>
                  )}
                  {selectedProject.categories?.map(category => (
                    <span 
                      key={category._id} 
                      className="text-xs px-3 py-1 rounded-full neon-border-purple text-neon-purple"
                    >
                      {category.name}
                    </span>
                  ))}
                  {selectedProject.startDate && (
                    <span className="text-xs px-3 py-1 rounded-full neon-border text-neon-green">
                      {new Date(selectedProject.startDate).getFullYear()}
                      {selectedProject.endDate && ` - ${new Date(selectedProject.endDate).getFullYear()}`}
                    </span>
                  )}
                </div>
                
                {/* Project description */}
                <div className="mb-6 text-cyber-gray">
                  {renderDescription(selectedProject.description)}
                </div>
                
                {/* Technologies */}
                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-cyber text-cyber-blue mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-sm px-3 py-1 rounded-full bg-dark-tertiary text-neon-green"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Project links */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.githubLink && (
                    <a 
                      href={selectedProject.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button flex items-center gap-2"
                    >
                      <FaGithub /> View Code
                    </a>
                  )}
                  {selectedProject.demoLink && (
                    <a 
                      href={selectedProject.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button-blue flex items-center gap-2"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {selectedProject.docsLink && (
                    <a 
                      href={selectedProject.docsLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button-purple flex items-center gap-2"
                    >
                      <FaBook /> Documentation
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery;
