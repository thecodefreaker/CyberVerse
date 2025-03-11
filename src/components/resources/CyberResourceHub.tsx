import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CyberResource } from '@/types';
import { FiBook, FiCode, FiFileText, FiLink, FiSearch, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface CyberResourceHubProps {
  resources: CyberResource[];
}

const CyberResourceHub: React.FC<CyberResourceHubProps> = ({ resources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  
  // Extract all unique categories and levels from resources
  const categories = [...new Set(resources.map(resource => resource.category))];
  const levels = [...new Set(resources.map(resource => resource.level))];
  
  // Filter resources based on search term, category, and level
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === null || resource.category === selectedCategory;
    const matchesLevel = selectedLevel === null || resource.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  const toggleResourceExpansion = (id: string) => {
    if (expandedResource === id) {
      setExpandedResource(null);
    } else {
      setExpandedResource(id);
    }
  };
  
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'article':
        return <FiFileText className="text-neon-green" />;
      case 'tutorial':
        return <FiBook className="text-cyber-blue" />;
      case 'tool':
        return <FiCode className="text-neon-purple" />;
      case 'book':
        return <FiBook className="text-neon-orange" />;
      case 'course':
        return <FiBook className="text-neon-green" />;
      case 'cheatsheet':
        return <FiFileText className="text-cyber-blue" />;
      case 'guide':
        return <FiFileText className="text-neon-purple" />;
      default:
        return <FiLink className="text-neon-orange" />;
    }
  };
  
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-neon-green';
      case 'intermediate':
        return 'text-cyber-blue';
      case 'advanced':
        return 'text-neon-purple';
      default:
        return 'text-neon-green';
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  
  return (
    <section className="my-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-cyber font-bold mb-2 text-gradient-neon">
            Cyber Resource Hub
          </h2>
          <p className="text-cyber-gray max-w-2xl mx-auto">
            A curated collection of high-quality cybersecurity resources, tools, and learning materials for professionals and students
          </p>
        </motion.div>
        
        <div className="mb-8 bg-dark-secondary p-4 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-gray" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-tertiary border border-dark-tertiary focus:border-neon-green text-white pl-10 pr-4 py-2 rounded-md focus:outline-none"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="flex items-center">
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-gray" />
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="appearance-none bg-dark-tertiary border border-dark-tertiary focus:border-neon-green text-white pl-10 pr-8 py-2 rounded-md focus:outline-none"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gray pointer-events-none" />
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center">
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-gray" />
                  <select
                    value={selectedLevel || ''}
                    onChange={(e) => setSelectedLevel(e.target.value || null)}
                    className="appearance-none bg-dark-tertiary border border-dark-tertiary focus:border-neon-green text-white pl-10 pr-8 py-2 rounded-md focus:outline-none"
                  >
                    <option value="">All Levels</option>
                    {levels.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gray pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-cyber-gray">
            <span>Showing {filteredResources.length} of {resources.length} resources</span>
            {(selectedCategory || selectedLevel || searchTerm) && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setSelectedLevel(null);
                }}
                className="ml-4 text-neon-green hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <motion.div 
                key={resource._id}
                className="cyber-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {getResourceIcon(resource.type)}
                      <span className="ml-2 text-xs uppercase font-mono">{resource.type}</span>
                    </div>
                    <span className={`text-xs font-mono ${getLevelColor(resource.level)}`}>
                      {resource.level}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-cyber font-bold mb-2 text-white">{resource.title}</h3>
                  
                  <p className="text-sm text-cyber-gray mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-neon-green"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-cyber-gray">
                          +{resource.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-green text-sm hover:underline flex items-center"
                    >
                      Visit Resource <FiLink className="ml-1" />
                    </a>
                    
                    <button 
                      onClick={() => toggleResourceExpansion(resource._id)}
                      className="text-cyber-gray text-sm flex items-center hover:text-neon-green"
                    >
                      {expandedResource === resource._id ? (
                        <>Less <FiChevronUp className="ml-1" /></>
                      ) : (
                        <>More <FiChevronDown className="ml-1" /></>
                      )}
                    </button>
                  </div>
                  
                  {expandedResource === resource._id && (
                    <motion.div 
                      className="mt-4 pt-4 border-t border-dark-tertiary"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-1">Description</h4>
                          <p className="text-sm text-cyber-gray">
                            {resource.description}
                          </p>
                        </div>
                        
                        {resource.tags && resource.tags.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-1">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              {resource.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-neon-green"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-1">Category</h4>
                            <p className="text-sm text-cyber-gray">{resource.category}</p>
                          </div>
                          
                          {resource.author && (
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-1">Author</h4>
                              <p className="text-sm text-cyber-gray">{resource.author}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-cyber-gray">No resources found matching your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CyberResourceHub;
