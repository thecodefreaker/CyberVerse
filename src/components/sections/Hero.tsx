'use client'

import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { Profile } from '../../types';

interface HeroProps {
  profile: Profile | null;
}

export default function Hero({ profile }: HeroProps) {
  const handleDownloadVCard = () => {
    alert('vCard download coming soon!'); // Future: Generate from profile data
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-dark-base to-neon-green/20 flex items-center justify-center">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-neon-green mb-4 animate-glitch">
          Welcome to CyberVerse
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          {profile ? `${profile.name} - ${profile.shortBio}` : 'Hardik Srivastava - Cybersecurity Innovator'}
        </p>
        <button className="bg-neon-green text-dark-base px-6 py-3 rounded-full font-bold hover:bg-cyber-blue transition-colors">
          Explore the Hub
        </button>
        <div className="mt-6 flex justify-center space-x-4">
          <motion.img
            src="/qr-code-placeholder.png"
            alt="QR Code to Contact"
            className="w-20 h-20"
            whileHover={{ scale: 1.1 }}
          />
          <motion.button
            onClick={handleDownloadVCard}
            className="flex items-center bg-cyber-blue text-white px-4 py-2 rounded-full hover:bg-neon-green transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <FaDownload className="mr-2" /> Download vCard
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}