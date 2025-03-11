'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from '@/types';
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaLaptopCode, FaTrophy } from 'react-icons/fa';

interface ExperienceTimelineProps {
  experience: Experience[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  
  // Sort experiences by date (newest first)
  const sortedExperience = [...experience].sort((a, b) => {
    const dateA = a.endDate || new Date().toISOString();
    const dateB = b.endDate || new Date().toISOString();
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // Format date string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to render description from Portable Text
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

  // Handle experience click
  const handleExperienceClick = (exp: Experience) => {
    setActiveExperience(exp);
    setShowSidePanel(true);
  };

  return (
    <div className="relative">
      {/* Matrix-like background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="matrix-container h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j}>
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Timeline */}
        <div className="flex-1">
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-neon-green to-neon-purple"></div>
            
            {/* Timeline items */}
            {sortedExperience.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-10 pl-12 ${activeExperience?._id === exp._id ? 'active-timeline-item' : ''}`}
                onClick={() => handleExperienceClick(exp)}
              >
                {/* Timeline node */}
                <div 
                  className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 cyber-node ${activeExperience?._id === exp._id ? 'active-node' : ''}`}
                >
                  <div className="cyber-node-inner"></div>
                </div>
                
                {/* Experience card */}
                <div className={`cyber-card p-5 cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02] ${activeExperience?._id === exp._id ? 'neon-border-blue' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <h3 className="text-lg md:text-xl font-cyber text-glow-blue">{exp.jobTitle}</h3>
                    <div className="text-sm text-cyber-blue flex items-center space-x-1">
                      <FaCalendarAlt />
                      <span>
                        {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3 text-cyber-gray">
                    <FaBuilding className="mr-2 text-neon-green" />
                    <span className="font-semibold mr-4">{exp.company}</span>
                    {exp.location && (
                      <>
                        <FaMapMarkerAlt className="mr-2 text-neon-purple" />
                        <span>{exp.location}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="mb-4 text-sm text-cyber-gray line-clamp-2">
                    {renderDescription(exp.description)}
                  </div>
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      <FaLaptopCode className="text-neon-green mt-1" />
                      {exp.technologies.slice(0, 5).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs px-2 py-1 rounded-full bg-dark-tertiary text-neon-green"
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.technologies.length > 5 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-dark-tertiary text-neon-green">
                          +{exp.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="flex items-center text-neon-orange text-sm">
                      <FaTrophy className="mr-2" />
                      <span>{exp.achievements.length} Achievement{exp.achievements.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  
                  <div className="mt-3 text-center">
                    <span className="text-xs text-neon-green">Click for details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Side panel with details */}
        <AnimatePresence>
          {showSidePanel && activeExperience && (
            <motion.div 
              className="lg:w-2/5 xl:w-1/3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="sticky top-20">
                <div className="cyber-card neon-border-blue overflow-hidden">
                  {/* Header with close button */}
                  <div className="cyber-pulse-header flex justify-between items-center">
                    <h3 className="text-xl font-cyber text-cyber-blue">{activeExperience.jobTitle}</h3>
                    <button 
                      className="text-neon-red hover:text-glow-red transition-all"
                      onClick={() => setShowSidePanel(false)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4 text-cyber-gray">
                      <FaBuilding className="mr-2 text-neon-green" />
                      <span className="font-semibold mr-4">{activeExperience.company}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-dark-tertiary rounded-md p-3">
                        <div className="text-sm text-cyber-gray mb-1">Duration</div>
                        <div className="text-neon-green">
                          {formatDate(activeExperience.startDate)} — {activeExperience.endDate ? formatDate(activeExperience.endDate) : 'Present'}
                        </div>
                      </div>
                      
                      {activeExperience.location && (
                        <div className="bg-dark-tertiary rounded-md p-3">
                          <div className="text-sm text-cyber-gray mb-1">Location</div>
                          <div className="text-neon-purple">{activeExperience.location}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-cyber text-neon-green mb-2">Description</h4>
                      <div className="text-cyber-gray space-y-2">
                        {renderDescription(activeExperience.description)}
                      </div>
                    </div>
                    
                    {activeExperience.achievements && activeExperience.achievements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-cyber text-neon-orange mb-2">Key Achievements</h4>
                        <ul className="space-y-3">
                          {activeExperience.achievements.map((achievement, i) => (
                            <motion.li 
                              key={achievement._id || i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="flex"
                            >
                              <FaTrophy className="text-neon-orange mt-1 mr-3 flex-shrink-0" />
                              <div>
                                <div className="text-white">{achievement.title}</div>
                                {achievement.description && (
                                  <div className="text-sm text-cyber-gray mt-1">{achievement.description}</div>
                                )}
                                {achievement.metrics && achievement.metrics.length > 0 && (
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    {achievement.metrics.map((metric, j) => (
                                      <div key={j} className="bg-dark-tertiary rounded p-2 text-center">
                                        <div className="text-xs text-cyber-gray">{metric.name}</div>
                                        <div className="text-neon-green text-sm font-semibold">{metric.value}</div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {activeExperience.technologies && activeExperience.technologies.length > 0 && (
                      <div>
                        <h4 className="text-lg font-cyber text-neon-green mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeExperience.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="text-sm px-3 py-1 rounded-full bg-dark-tertiary text-neon-green"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx>{`
        .cyber-node {
          background: var(--dark-base);
          border: 2px solid var(--neon-green);
          box-shadow: 0 0 10px var(--neon-green);
          transition: all 0.3s ease;
        }
        
        .active-node {
          border-color: var(--cyber-blue);
          box-shadow: 0 0 15px var(--cyber-blue);
        }
        
        .cyber-node-inner {
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background-color: var(--neon-green);
          animation: pulse 2s infinite;
        }
        
        .active-node .cyber-node-inner {
          background-color: var(--cyber-blue);
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.8;
          }
        }
        
        .active-timeline-item {
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default ExperienceTimeline;
