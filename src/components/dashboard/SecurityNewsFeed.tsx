import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import type { SecurityNewsItem } from '@/types';

interface SecurityNewsFeedProps {
  newsItems: SecurityNewsItem[];
}

const SecurityNewsFeed: React.FC<SecurityNewsFeedProps> = ({ newsItems }) => {
  return (
    <div className="cyber-card h-full overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-cyber custom-text-neon-green">Security News Feed</h3>
      </div>
      <div className="overflow-y-auto max-h-[300px] terminal-scrollbar">
        {newsItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 border-b border-gray-700 hover:bg-gray-800/50 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold mb-1 custom-text-cyber-blue">{item.title}</h4>
                <p className="text-sm text-gray-400 mb-2">{item.date}</p>
                <p className="text-sm text-gray-300">{item.summary}</p>
              </div>
              {item.url && (
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors ml-2 flex items-center"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
            </div>
            <div className="mt-2 flex gap-2">
              {item.tags?.map((tag, tagIndex) => (
                <span 
                  key={tagIndex} 
                  className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SecurityNewsFeed;
