import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaLock, FaUnlock } from 'react-icons/fa';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface ModernNavbarProps {
  logoText?: string;
  logoImage?: string;
}

const ModernNavbar: React.FC<ModernNavbarProps> = ({ 
  logoText = "Cyber Portfolio", 
  logoImage 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [secureMode, setSecureMode] = useState(true);
  
  // Example nav items - customize as needed
  const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleSecureMode = () => {
    setSecureMode(!secureMode);
  };

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div 
        className="scroll-indicator"
        style={{ width: `${scrollYProgress * 100}%` }}
      />
      
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 ${
          isScrolled 
            ? 'bg-dark-base/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a 
              href="#home"
              className="flex items-center text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {logoImage ? (
                <img src={logoImage} alt="Logo" className="h-9 mr-2" />
              ) : (
                <div className="h-9 w-9 rounded bg-neon-green/10 flex items-center justify-center mr-2 border border-neon-green/30">
                  <span className="text-neon-green font-cyber">C</span>
                </div>
              )}
              <span className="font-cyber text-lg tracking-wider">
                {logoText}
              </span>
            </motion.a>
            
            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 rounded-md font-terminal text-sm text-gray-300 hover:text-neon-green relative overflow-hidden group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              {/* Secure mode toggle */}
              <motion.button
                className={`w-9 h-9 rounded-full flex items-center justify-center ml-2 transition-all duration-300 ${
                  secureMode 
                    ? 'bg-neon-green/10 text-neon-green' 
                    : 'bg-red-500/10 text-red-400'
                }`}
                onClick={toggleSecureMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {secureMode ? <FaLock size={14} /> : <FaUnlock size={14} />}
              </motion.button>
            </div>
            
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden menu-button w-10 h-10 flex items-center justify-center focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-neon-green text-xl" />
              ) : (
                <FaBars className="text-neon-green text-xl" />
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu md:hidden absolute top-full left-0 w-full bg-dark-base/95 backdrop-blur-md shadow-lg border-t border-neon-green/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block py-3 px-4 text-gray-300 hover:text-neon-green hover:bg-neon-green/5 rounded font-terminal"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                {/* Mobile secure mode toggle */}
                <motion.div
                  className="mt-4 py-3 px-4 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <button
                    className={`flex items-center justify-between w-full ${
                      secureMode 
                        ? 'text-neon-green' 
                        : 'text-red-400'
                    }`}
                    onClick={toggleSecureMode}
                  >
                    <span className="font-terminal">
                      {secureMode ? 'Secure Connection' : 'Insecure Connection'}
                    </span>
                    {secureMode ? <FaLock size={14} /> : <FaUnlock size={14} />}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

// Get scroll progress for the progress bar
const useScrollProgress = () => {
  const [scrollYProgress, setScrollYProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / windowHeight;
      setScrollYProgress(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollYProgress;
};

const scrollYProgress = useScrollProgress();

export default ModernNavbar;
