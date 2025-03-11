'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaTerminal, FaThLarge, FaDownload, FaMicrochip, FaCertificate, FaExclamationTriangle } from 'react-icons/fa';

type ButtonType = 'primary' | 'secondary' | 'outline' | 'warning';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconName = 'shield' | 'terminal' | 'grid' | 'download' | 'chip' | 'certificate' | 'alert';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  type?: ButtonType | string;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: IconName | string;
  fullWidth?: boolean;
  className?: string;
}

const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  onClick,
  href,
  download,
  type = 'primary',
  size = 'md',
  disabled = false,
  icon,
  fullWidth = false,
  className = '',
}) => {
  // Map icon names to their components
  const getIconComponent = (iconName?: IconName | string) => {
    if (!iconName) return null;
    
    const iconMap: Record<string, React.ReactNode> = {
      'shield': <FaShieldAlt className="mr-2" />,
      'terminal': <FaTerminal className="mr-2" />,
      'grid': <FaThLarge className="mr-2" />,
      'download': <FaDownload className="mr-2" />,
      'chip': <FaMicrochip className="mr-2" />,
      'certificate': <FaCertificate className="mr-2" />,
      'alert': <FaExclamationTriangle className="mr-2" />
    };
    
    return iconMap[iconName] || null;
  };

  // Button styling based on type
  const getButtonStyles = () => {
    const baseStyles = 'font-cyber relative overflow-hidden transition-all duration-300 flex items-center justify-center';
    
    const sizeStyles = {
      sm: 'text-xs py-2 px-4',
      md: 'text-sm py-3 px-6',
      lg: 'text-base py-4 px-8',
    };
    
    const typeStyles = {
      primary: 'bg-dark-tertiary border-2 border-neon-green text-neon-green hover:bg-dark-base hover:shadow-glow-green',
      secondary: 'bg-dark-tertiary border-2 border-cyber-blue text-cyber-blue hover:bg-dark-base hover:shadow-glow-blue',
      outline: 'bg-transparent border-2 border-neon-purple text-neon-purple hover:bg-dark-tertiary hover:shadow-glow-purple',
      warning: 'bg-dark-tertiary border-2 border-cyber-red text-cyber-red hover:bg-dark-base hover:shadow-[0_0_15px_rgba(255,85,85,0.5)]',
    };
    
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    const widthStyles = fullWidth ? 'w-full' : '';
    
    return `${baseStyles} ${sizeStyles[size]} ${typeStyles[type as ButtonType]} ${disabledStyles} ${widthStyles} ${className}`;
  };
  
  // Get glow color based on type
  const getGlowColor = () => {
    switch (type) {
      case 'primary': return 'var(--neon-green)';
      case 'secondary': return 'var(--cyber-blue)';
      case 'outline': return 'var(--neon-purple)';
      case 'warning': return 'var(--cyber-red)';
      default: return 'var(--neon-green)';
    }
  };
  
  // Render the button content
  const renderButtonContent = () => (
    <>
      {/* Scan line animation */}
      <motion.span
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r"
        style={{ 
          backgroundImage: `linear-gradient(to right, transparent, ${getGlowColor()}, transparent)`,
          opacity: 0.7 
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      />
      
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2" style={{ borderColor: getGlowColor() }} />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2" style={{ borderColor: getGlowColor() }} />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2" style={{ borderColor: getGlowColor() }} />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2" style={{ borderColor: getGlowColor() }} />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center uppercase tracking-wider">
        {getIconComponent(icon)}
        {children}
      </span>
    </>
  );
  
  // Render button or link based on props
  if (href) {
    return (
      <Link 
        href={href} 
        download={download}
        className={getButtonStyles()}
        onClick={!disabled ? onClick : undefined}
      >
        {renderButtonContent()}
      </Link>
    );
  }
  
  return (
    <button 
      className={getButtonStyles()}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {renderButtonContent()}
    </button>
  );
};

export default CyberButton;
