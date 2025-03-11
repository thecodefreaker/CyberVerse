'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Education, Achievement } from '@/types';
import Image from 'next/image';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaStar } from 'react-icons/fa';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Sort education by date (newest first)
  const sortedEducation = [...education].sort((a, b) => {
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

  // Toggle expanded education item
  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative">
      {/* Animated background grid effect */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedEducation.map((edu, index) => (
          <motion.div
            key={edu._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`cyber-card overflow-hidden transition-all duration-500 ${
              expandedId === edu._id ? 'transform scale-105 z-10 neon-border' : ''
            }`}
            onClick={() => toggleExpanded(edu._id)}
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                {edu.institution.logo ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={edu.institution.logo.asset.url}
                      alt={edu.institution.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-dark-tertiary flex items-center justify-center flex-shrink-0 text-neon-purple">
                    <FaGraduationCap size={32} />
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-cyber text-gradient-neon mb-1">{edu.degree}</h3>
                  <p className="text-lg text-neon-purple font-semibold">{edu.institution.name}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-cyber-gray">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-neon-green" />
                      <span>
                        {formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                      </span>
                    </div>
                    
                    {edu.institution.location && (
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1 text-neon-orange" />
                        <span>{edu.institution.location}</span>
                      </div>
                    )}
                    
                    {edu.gpa && (
                      <div className="flex items-center">
                        <FaStar className="mr-1 text-cyber-blue" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {edu.fieldOfStudy && (
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-dark-tertiary text-cyber-blue">
                    {edu.fieldOfStudy}
                  </span>
                </div>
              )}
              
              {/* Description - shown when expanded or if there are no achievements */}
              {(expandedId === edu._id || !edu.achievements || edu.achievements.length === 0) && edu.description && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="text-cyber-gray space-y-2">
                    {renderDescription(edu.description)}
                  </div>
                </motion.div>
              )}
              
              {/* Achievement summary */}
              {edu.achievements && edu.achievements.length > 0 && expandedId !== edu._id && (
                <div className="flex items-center text-neon-orange mt-2">
                  <FaTrophy className="mr-2" />
                  <span className="text-sm">{edu.achievements.length} Achievement{edu.achievements.length !== 1 ? 's' : ''}</span>
                </div>
              )}
              
              {/* Expanded achievements */}
              <AnimatePresence>
                {expandedId === edu._id && edu.achievements && edu.achievements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-cyber text-neon-orange mb-3 flex items-center">
                      <FaTrophy className="mr-2" />
                      Achievements
                    </h4>
                    
                    <div className="space-y-4">
                      {edu.achievements.map((achievement, i) => (
                        <motion.div
                          key={achievement._id || i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="bg-dark-tertiary p-3 rounded-md"
                        >
                          <h5 className="text-white font-semibold mb-1">{achievement.title}</h5>
                          {achievement.description && (
                            <p className="text-sm text-cyber-gray">{achievement.description}</p>
                          )}
                          
                          {achievement.date && (
                            <div className="text-xs text-neon-green mt-2">
                              {formatDate(achievement.date)}
                            </div>
                          )}
                          
                          {achievement.metrics && achievement.metrics.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {achievement.metrics.map((metric, j) => (
                                <div key={j} className="bg-dark-base rounded p-2 text-center">
                                  <div className="text-xs text-cyber-gray">{metric.name}</div>
                                  <div className="text-neon-orange text-sm font-semibold">{metric.value}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {achievement.evidence && achievement.evidence.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {achievement.evidence.map((item, k) => (
                                <a
                                  key={k}
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs px-2 py-1 bg-dark-base rounded-full text-cyber-blue hover:text-glow-blue transition-all"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {item.type}
                                </a>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Expand/collapse indicator */}
              <div className="text-center mt-3">
                <div className={`inline-block transition-transform duration-300 ${expandedId === edu._id ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Interactive education timeline visualization */}
      <div className="mt-16 relative overflow-hidden pb-8">
        <h3 className="text-xl font-cyber text-cyber-blue mb-8 text-center">Education Timeline</h3>
        
        <div className="relative h-20">
          {/* Timeline bar */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-neon-purple via-cyber-blue to-neon-green transform -translate-y-1/2"></div>
          
          {/* Timeline nodes */}
          {sortedEducation.map((edu, index) => {
            // Calculate position based on start date
            const startDate = new Date(edu.startDate).getTime();
            const endDate = edu.endDate ? new Date(edu.endDate).getTime() : new Date().getTime();
            
            // Find min and max dates for scaling
            const allDates = education.flatMap(e => [
              new Date(e.startDate).getTime(),
              e.endDate ? new Date(e.endDate).getTime() : new Date().getTime()
            ]);
            const minDate = Math.min(...allDates);
            const maxDate = Math.max(...allDates);
            const timeRange = maxDate - minDate;
            
            // Calculate positions as percentages
            const leftPos = ((startDate - minDate) / timeRange) * 100;
            const width = ((endDate - startDate) / timeRange) * 100;
            
            return (
              <div 
                key={edu._id} 
                className="absolute top-0 bottom-0 flex flex-col items-center"
                style={{ left: `${leftPos}%`, width: `${width}%` }}
              >
                {/* Timeline node */}
                <div 
                  className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full cursor-pointer
                    ${expandedId === edu._id ? 'neon-border bg-dark-base' : 'bg-neon-purple'}`}
                  onClick={() => toggleExpanded(edu._id)}
                  onMouseEnter={() => setExpandedId(edu._id)}
                >
                  <div 
                    className={`absolute inset-0.5 rounded-full ${
                      expandedId === edu._id ? 'animate-pulse bg-neon-purple' : ''
                    }`}
                  ></div>
                </div>
                
                {/* Date label - above or below to avoid overlap */}
                <div
                  className={`absolute transform text-xs whitespace-nowrap text-cyber-gray
                    ${index % 2 === 0 ? 'bottom-0' : 'top-0'}`}
                >
                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </div>
                
                {/* Degree label - show on hover */}
                <AnimatePresence>
                  {expandedId === edu._id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute whitespace-nowrap bg-dark-base neon-border p-1 px-2 rounded text-xs
                        ${index % 2 === 0 ? 'top-8' : 'bottom-8'}`}
                    >
                      {edu.degree}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
