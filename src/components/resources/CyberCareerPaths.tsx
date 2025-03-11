import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CyberRole } from '@/types';
import { FiChevronDown, FiChevronUp, FiAward, FiDollarSign, FiTrendingUp, FiBook, FiTarget } from 'react-icons/fi';

interface CyberCareerPathsProps {
  roles: CyberRole[];
}

const CyberCareerPaths: React.FC<CyberCareerPathsProps> = ({ roles }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract all unique categories
  const categories = [...new Set(roles.map(role => role.category))];
  
  // Filter roles based on selected category
  const filteredRoles = selectedCategory 
    ? roles.filter(role => role.category === selectedCategory)
    : roles;
  
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
            Cybersecurity Career Paths
          </h2>
          <p className="text-cyber-gray max-w-2xl mx-auto">
            Explore various career paths in cybersecurity, from entry-level positions to specialized roles and leadership opportunities
          </p>
        </motion.div>
        
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <motion.button
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCategory === null 
                ? 'bg-neon-green text-dark-base font-bold' 
                : 'bg-dark-secondary text-white hover:bg-dark-tertiary'
            }`}
            onClick={() => setSelectedCategory(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Paths
          </motion.button>
          
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-md text-sm ${
                selectedCategory === category 
                  ? 'bg-neon-green text-dark-base font-bold' 
                  : 'bg-dark-secondary text-white hover:bg-dark-tertiary'
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRoles.map((role) => (
            <motion.div 
              key={role._id}
              className="cyber-card relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase font-mono text-cyber-blue">{role.category}</span>
                  <span className={`text-xs font-mono ${
                    role.careerLevel === 'Entry' 
                      ? 'text-neon-green' 
                      : role.careerLevel === 'Mid' 
                        ? 'text-cyber-blue' 
                        : 'text-neon-purple'
                  }`}>
                    {role.careerLevel} Level
                  </span>
                </div>
                
                <h3 className="text-xl font-cyber font-bold mb-2 text-white">{role.title}</h3>
                
                <p className="text-sm text-cyber-gray mb-4">
                  {role.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {role.keySkills.slice(0, 4).map((skill, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-neon-green"
                    >
                      {skill}
                    </span>
                  ))}
                  {role.keySkills.length > 4 && (
                    <span className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-cyber-gray">
                      +{role.keySkills.length - 4} more
                    </span>
                  )}
                </div>
                
                <button 
                  onClick={() => setSelectedRole(selectedRole === role._id ? null : role._id)}
                  className="text-neon-green text-sm flex items-center hover:underline"
                >
                  {selectedRole === role._id ? (
                    <>Show less <FiChevronUp className="ml-1" /></>
                  ) : (
                    <>Learn more <FiChevronDown className="ml-1" /></>
                  )}
                </button>
                
                {selectedRole === role._id && (
                  <motion.div 
                    className="mt-4 pt-4 border-t border-dark-tertiary"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold flex items-center mb-2">
                          <FiBook className="mr-2 text-cyber-blue" /> Responsibilities
                        </h4>
                        <ul className="list-disc list-inside text-sm text-cyber-gray space-y-1">
                          {role.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold flex items-center mb-2">
                          <FiAward className="mr-2 text-neon-orange" /> Recommended Certifications
                        </h4>
                        <ul className="list-disc list-inside text-sm text-cyber-gray space-y-1">
                          {role.recommendedCertifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold flex items-center mb-2">
                            <FiDollarSign className="mr-2 text-neon-green" /> Salary Range
                          </h4>
                          <p className="text-sm text-cyber-gray">{role.salaryRange}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold flex items-center mb-2">
                            <FiTrendingUp className="mr-2 text-neon-purple" /> Growth Outlook
                          </h4>
                          <p className="text-sm text-cyber-gray">{role.growthOutlook}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold flex items-center mb-2">
                          <FiTarget className="mr-2 text-cyber-blue" /> Career Progression
                        </h4>
                        <p className="text-sm text-cyber-gray">{role.careerProgression}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className={`absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16 ${
                  role.careerLevel === 'Entry' 
                    ? 'bg-neon-green' 
                    : role.careerLevel === 'Mid' 
                      ? 'bg-cyber-blue' 
                      : 'bg-neon-purple'
                } opacity-20`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <motion.a 
            href="#" 
            className="cyber-button px-6 py-3 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Career Roadmap
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CyberCareerPaths;
