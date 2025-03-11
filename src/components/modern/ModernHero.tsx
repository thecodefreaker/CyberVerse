import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa';
import { Profile } from '../../types';

interface ModernHeroProps {
  profile: Profile;
}

const ModernHero: React.FC<ModernHeroProps> = ({ profile }) => {
  const controls = useAnimation();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-dark-base opacity-90"></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full grid grid-cols-6 md:grid-cols-12">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="border-l border-neon-green/20 h-full"></div>
            ))}
          </div>
          <div className="h-full w-full grid grid-rows-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="border-t border-neon-green/20 w-full"></div>
            ))}
          </div>
        </div>
        
        {/* Animated circles */}
        {Array(5).fill(0).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              border: '1px solid',
              borderColor: i % 3 === 0 ? '#50fa7b' : i % 3 === 1 ? '#8be9fd' : '#bd93f9',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05],
              rotate: [0, i % 2 === 0 ? 180 : -180]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Profile image */}
            {profile.imageUrl && (
              <motion.div 
                className="modern-avatar w-40 h-40 md:w-48 md:h-48"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src={profile.imageUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            
            {/* Content */}
            <motion.div
              className="flex-1 text-center md:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              ref={textRef}
            >
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
                  Hi, I'm{' '}
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-cyber-blue">
                    {profile.name}
                  </span>
                </h1>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-cyber mb-4 text-neon-purple">
                  {profile.title}
                </h2>
              </motion.div>
              
              <motion.p 
                className="text-base text-gray-300 mb-6 max-w-2xl"
                variants={itemVariants}
              >
                {profile.bio}
              </motion.p>
              
              {/* Social links */}
              <motion.div 
                className="flex gap-4 justify-center md:justify-start mb-8"
                variants={itemVariants}
              >
                {profile.githubUrl && (
                  <motion.a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon github"
                    whileHover={{ y: -5, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)' }}
                  >
                    <FaGithub size={20} />
                  </motion.a>
                )}
                
                {profile.linkedinUrl && (
                  <motion.a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon linkedin"
                    whileHover={{ y: -5, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)' }}
                  >
                    <FaLinkedin size={20} />
                  </motion.a>
                )}
                
                {profile.twitterUrl && (
                  <motion.a
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon twitter"
                    whileHover={{ y: -5, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)' }}
                  >
                    <FaTwitter size={20} />
                  </motion.a>
                )}
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                variants={itemVariants}
              >
                <motion.a
                  href="#contact"
                  className="modern-button modern-button-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
                
                {profile.resumeUrl && (
                  <motion.a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modern-button modern-button-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Resume
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={handleScrollDown}
      >
        <FaArrowDown className="text-neon-green text-2xl" />
      </motion.div>
    </section>
  );
};

export default ModernHero;
