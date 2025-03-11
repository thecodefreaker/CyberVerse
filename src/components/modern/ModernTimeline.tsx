import React from 'react';
import { motion } from 'framer-motion';
import { Experience, Education } from '../../types';

interface TimelineItem {
  title: string;
  organization: string;
  date: string;
  description: string;
  logo?: string;
}

interface ModernTimelineProps {
  items: (Experience | Education)[];
  type: 'experience' | 'education';
}

const ModernTimeline: React.FC<ModernTimelineProps> = ({ items, type }) => {
  return (
    <div className="timeline py-10">
      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <motion.div
            key={index}
            className={`timeline-item ${isEven ? 'timeline-item-left' : 'timeline-item-right'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="timeline-content">
              <div className="flex items-center mb-2">
                {item.logo && (
                  <img 
                    src={item.logo} 
                    alt={type === 'experience' ? item.company : item.institution} 
                    className="w-10 h-10 object-contain mr-3 rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">
                    {type === 'experience' ? (item as Experience).title : (item as Education).degree}
                  </h3>
                  <p className="text-sm opacity-80">
                    {type === 'experience' ? (item as Experience).company : (item as Education).institution}
                  </p>
                </div>
              </div>
              
              <div className="mb-2 text-sm opacity-70">
                {item.startDate} - {item.endDate || 'Present'}
              </div>
              
              <p className="text-base">
                {item.description}
              </p>
              
              {type === 'education' && (item as Education).achievements && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-1">Achievements:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {(item as Education).achievements?.map((achievement, idx) => (
                      <li key={idx} className="mb-1">{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {type === 'experience' && (item as Experience).responsibilities && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-1">Responsibilities:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {(item as Experience).responsibilities?.map((responsibility, idx) => (
                      <li key={idx} className="mb-1">{responsibility}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ModernTimeline;
