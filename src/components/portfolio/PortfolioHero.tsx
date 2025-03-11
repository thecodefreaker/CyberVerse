'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Profile } from '../../types';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';

interface PortfolioHeroProps {
  profile: any; // Using any type temporarily to resolve type conflicts
}

const PortfolioHero: React.FC<PortfolioHeroProps> = ({ profile }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-base z-10" />
      
      <div className="container mx-auto px-4 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          {profile.avatar && (
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden neon-border-cyber-blue">
              <Image 
                src={profile.avatar} 
                alt={profile.name} 
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-cyber mb-2 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <span className="glitch" data-text={profile.name}>{profile.name}</span>
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-2xl font-terminal mb-4 text-cyber-blue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <span className="typing-effect">{profile.title}</span>
          </motion.div>
          
          <motion.p
            className="max-w-2xl mx-auto text-lg text-cyber-gray"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {profile.shortBio}
          </motion.p>
        </motion.div>
        
        <motion.div
          className="flex justify-center space-x-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {profile.githubUrl && (
            <a 
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button cyber-button-green px-4 py-2 rounded-md"
            >
              GitHub
            </a>
          )}
          
          {profile.linkedinUrl && (
            <a 
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button cyber-button-blue px-4 py-2 rounded-md"
            >
              LinkedIn
            </a>
          )}
          
          {profile.resume && (
            <a 
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button cyber-button-purple px-4 py-2 rounded-md"
            >
              Resume
            </a>
          )}
        </motion.div>
        
        <motion.div
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link 
            href="#projects"
            className="text-cyber-blue animate-bounce hover:text-neon-green transition-colors"
            aria-label="Scroll to projects"
          >
            <FaChevronDown className="text-3xl" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioHero;
