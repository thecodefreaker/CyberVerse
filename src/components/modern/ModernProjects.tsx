import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import ModernProjectCard from './ModernProjectCard';
import { FaFilter } from 'react-icons/fa';

// Define a simple function to extract categories
const extractCategories = (projects: Project[]): string[] => {
  const categories = new Set<string>();
  categories.add('all');
  
  projects.forEach(project => {
    // Add categories from the categories array if it exists
    if (project.categories && Array.isArray(project.categories)) {
      project.categories.forEach(category => {
        if (typeof category === 'string') {
          categories.add(category);
        }
      });
    }
    
    // Add category if it exists
    if (project.category) {
      if (typeof project.category === 'string') {
        categories.add(project.category);
      } else if (typeof project.category === 'object' && project.category.name) {
        categories.add(project.category.name);
      }
    }
  });
  
  return Array.from(categories);
};

interface ModernProjectsProps {
  projects: Project[];
}

const ModernProjects: React.FC<ModernProjectsProps> = ({ projects }) => {
  const [filter, setFilter] = useState<string>('all');
  
  // Get unique categories
  const categories = extractCategories(projects);
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => {
        // Check in categories array
        if (project.categories && project.categories.includes(filter)) {
          return true;
        }
        
        // Check in category property
        if (project.category) {
          if (typeof project.category === 'string') {
            return project.category === filter;
          } else if (typeof project.category === 'object' && project.category.name) {
            return project.category.name === filter;
          }
        }
        
        return false;
      });

  return (
    <section className="py-16">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="section-title font-cyber text-neon-green mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        
        {/* Filter tabs */}
        <div className="mb-10 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-2">
            <motion.div 
              className="flex items-center mr-2 text-sm font-cyber text-cyber-blue"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaFilter className="mr-2" /> Filter:
            </motion.div>
            
            {categories.map((category, index) => (
              <motion.button
                key={`category-${index}-${category}`}
                className={`px-4 py-2 rounded-md text-sm transition-all duration-300 whitespace-nowrap font-terminal ${
                  filter === category 
                    ? 'bg-neon-green/10 text-neon-green border border-neon-green/50' 
                    : 'bg-dark-secondary/50 text-gray-300 border border-transparent hover:border-neon-purple/30 hover:text-neon-purple'
                }`}
                onClick={() => setFilter(category)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Projects grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || `project-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <ModernProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-neon-purple text-5xl mb-4">¯\_(ツ)_/¯</div>
            <h3 className="text-xl mb-2 font-cyber">No projects found</h3>
            <p className="text-gray-400">No projects match the selected filter.</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ModernProjects;
