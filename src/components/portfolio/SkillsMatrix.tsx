'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types';
import { FaSearch } from 'react-icons/fa';

interface SkillsMatrixProps {
  skills: Skill[];
}

// Group skills by categories
const groupSkillsByCategory = (skills: Skill[]) => {
  const groups: { [key: string]: Skill[] } = {};
  
  skills.forEach(skill => {
    const category = skill.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
  });
  
  return groups;
};

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skills }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [skillGroups, setSkillGroups] = useState<{ [key: string]: Skill[] }>({});
  
  // Initialize skill groups
  useEffect(() => {
    setSkillGroups(groupSkillsByCategory(skills));
  }, [skills]);
  
  // Handle search and category filtering
  useEffect(() => {
    let result = skills;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(skill => skill.category === selectedCategory);
    }
    
    setFilteredSkills(result);
  }, [searchTerm, selectedCategory, skills]);
  
  // Get all categories
  const categories = Object.keys(skillGroups).sort();
  
  // Calculate skill level color
  const getSkillLevelColor = (proficiency: number) => {
    if (proficiency >= 90) return 'var(--neon-green)';
    if (proficiency >= 75) return 'var(--cyber-blue)';
    if (proficiency >= 60) return 'var(--neon-purple)';
    if (proficiency >= 40) return 'var(--neon-orange)';
    return 'var(--neon-red)';
  };

  return (
    <div>
      {/* Search and filter controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-tertiary border border-dark-tertiary focus:border-cyber-blue rounded-md py-2 pl-10 pr-4 text-white focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`cyber-button ${!selectedCategory ? '' : 'opacity-70'}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
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
        </div>
      </div>
      
      {/* Innovative Hexagonal Skills Grid */}
      <div className="relative mb-16">
        {/* Animated radar background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full animate-scan opacity-20"></div>
        </div>
        
        <div className="flex justify-center">
          <div className="honeycomb-grid max-w-4xl">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="honeycomb-cell"
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  '--skill-color': getSkillLevelColor(skill.proficiency)
                } as React.CSSProperties}
              >
                <div className="honeycomb-content cyber-radial-bg">
                  <div 
                    className="skill-progress-ring" 
                    style={{
                      background: `conic-gradient(${getSkillLevelColor(skill.proficiency)} ${skill.proficiency}%, transparent 0)`
                    }}
                  >
                    <div className="skill-icon">{skill.icon || skill.name.charAt(0)}</div>
                  </div>
                  <div className="skill-name">{skill.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Skills detail popup */}
      {hoveredSkill && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-dark-base neon-border p-4 rounded-md z-40 max-w-md"
          style={{
            boxShadow: `0 0 10px ${getSkillLevelColor(hoveredSkill.proficiency)}`,
            borderColor: getSkillLevelColor(hoveredSkill.proficiency)
          }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: `${getSkillLevelColor(hoveredSkill.proficiency)}20`, color: getSkillLevelColor(hoveredSkill.proficiency) }}
            >
              {hoveredSkill.icon || hoveredSkill.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-cyber mb-1" style={{ color: getSkillLevelColor(hoveredSkill.proficiency) }}>
                {hoveredSkill.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 bg-dark-tertiary rounded-full w-full">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${hoveredSkill.proficiency}%`,
                      backgroundColor: getSkillLevelColor(hoveredSkill.proficiency)
                    }}
                  />
                </div>
                <span className="text-sm whitespace-nowrap">{hoveredSkill.proficiency}%</span>
              </div>
              {hoveredSkill.description && (
                <p className="text-sm text-cyber-gray">{hoveredSkill.description}</p>
              )}
              {hoveredSkill.yearsOfExperience && (
                <p className="text-sm mt-1">
                  <span className="text-neon-green">{hoveredSkill.yearsOfExperience}</span> years of experience
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Add custom CSS for hexagonal grid */}
      <style jsx>{`
        .honeycomb-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0 auto;
          padding: 20px;
          max-width: 1200px;
        }
        
        .honeycomb-cell {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 5px;
          cursor: pointer;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1));
          border: 2px solid;
          border-color: var(--skill-color, var(--neon-green));
          transition: all 0.3s ease;
        }
        
        .honeycomb-cell:hover {
          transform: scale(1.1);
          z-index: 2;
          box-shadow: 0 0 15px var(--skill-color, var(--neon-green));
        }
        
        .honeycomb-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background-color: rgba(26, 26, 26, 0.9);
          text-align: center;
        }
        
        .skill-progress-ring {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        
        .skill-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: var(--dark-base);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: var(--skill-color, var(--neon-green));
        }
        
        .skill-name {
          font-size: 12px;
          font-weight: 500;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }
        
        @media (max-width: 768px) {
          .honeycomb-cell {
            width: 90px;
            height: 90px;
          }
          
          .skill-progress-ring {
            width: 45px;
            height: 45px;
          }
          
          .skill-icon {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }
          
          .skill-name {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillsMatrix;
