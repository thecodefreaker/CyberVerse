import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';
import ModernSkillBar from './ModernSkillBar';

interface ModernSkillsSectionProps {
  skills: Skill[];
}

const ModernSkillsSection: React.FC<ModernSkillsSectionProps> = ({ skills }) => {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(skillsByCategory);

  return (
    <section className="py-16">
      <motion.h2 
        className="section-title font-cyber text-neon-green"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {categories.map((category, categoryIndex) => (
          <motion.div 
            key={category}
            className="modern-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <motion.h3 
              className="text-lg font-cyber mb-6 text-cyber-blue"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {category}
            </motion.h3>
            
            <div>
              {skillsByCategory[category].map((skill, index) => (
                <ModernSkillBar 
                  key={skill.name} 
                  skill={skill} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-16">
        {skills.filter(skill => skill.logo).map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center justify-center p-4 modern-card text-center"
            whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {skill.logo && (
              <img 
                src={skill.logo} 
                alt={skill.name} 
                className="h-16 w-16 object-contain mb-3"
              />
            )}
            <h4 className="text-sm font-medium">{skill.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ModernSkillsSection;
