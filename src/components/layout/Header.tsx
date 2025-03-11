'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';

export default function Header() {
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('light', theme === 'dark');
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigation links with icons
  const navLinks = [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/hub', label: 'Hub' },
    { href: '/blog', label: 'Blog' },
    { href: '/ctf', label: 'CTF' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-base/90 backdrop-blur-lg shadow-[0_0_15px_rgba(80,250,123,0.2)]' 
          : 'bg-dark-base/70 backdrop-blur-sm'
      }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        {/* Logo with animation */}
        <Link href="/" className="flex items-center group">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="mr-2 text-neon-green"
          >
            <BsFillShieldLockFill className="w-6 h-6" />
          </motion.div>
          <span className="text-neon-green text-xl font-cyber tracking-wider group-hover:text-white transition-colors">
            <span className="text-white">Cyber</span>Verse
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="relative font-cyber text-gray-300 hover:text-neon-green transition-colors py-2 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-green group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="font-cyber ml-4 text-neon-green border border-neon-green px-3 py-1 rounded-sm
                     hover:bg-neon-green hover:text-dark-base transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-neon-green/50"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neon-green" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-dark-secondary/95 backdrop-blur-lg border-t border-neon-green/20"
        >
          <div className="flex flex-col space-y-3 p-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="font-cyber text-gray-300 hover:text-neon-green transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Theme toggle button */}
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="font-cyber text-neon-green border border-neon-green px-3 py-2 rounded-sm
                       hover:bg-neon-green hover:text-dark-base transition-all mt-2
                       focus:outline-none focus:ring-2 focus:ring-neon-green/50"
            >
              {theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}