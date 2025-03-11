import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Skill } from '../../types';

interface ModernSkillBarProps {
  skill: Skill;
  delay?: number;
}

const ModernSkillBar: React.FC<ModernSkillBarProps> = ({ skill, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    if (inView) {
      controls.start({ width: `${skill.level}%`, transition: { duration: 1.5, delay } });
    }
  }, [controls, inView, skill.level, delay]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <motion.h4 
          className="text-md font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay }}
        >
          {skill.name}
        </motion.h4>
        <motion.span
          className="text-sm opacity-70"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay }}
        >
          {skill.level}%
        </motion.span>
      </div>
      
      <div className="skill-bar-container" ref={ref}>
        <motion.div
          className="skill-bar"
          initial={{ width: 0 }}
          animate={controls}
          style={{ 
            background: `linear-gradient(90deg, ${skill.color || '#50fa7b'}, ${skill.secondaryColor || '#8be9fd'})` 
          }}
        />
      </div>
    </div>
  );
};

export default ModernSkillBar;
