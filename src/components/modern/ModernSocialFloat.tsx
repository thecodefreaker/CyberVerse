import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
  color: string;
}

interface ModernSocialFloatProps {
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  email?: string;
}

const ModernSocialFloat: React.FC<ModernSocialFloatProps> = ({
  githubUrl,
  linkedinUrl,
  twitterUrl,
  email
}) => {
  const socialLinks: SocialLink[] = [
    ...(githubUrl ? [{ 
      icon: <FaGithub />, 
      url: githubUrl, 
      label: 'GitHub',
      color: '#50fa7b' 
    }] : []),
    ...(linkedinUrl ? [{ 
      icon: <FaLinkedin />, 
      url: linkedinUrl, 
      label: 'LinkedIn',
      color: '#8be9fd' 
    }] : []),
    ...(twitterUrl ? [{ 
      icon: <FaTwitter />, 
      url: twitterUrl, 
      label: 'Twitter',
      color: '#bd93f9' 
    }] : []),
    ...(email ? [{ 
      icon: <FaEnvelope />, 
      url: `mailto:${email}`, 
      label: 'Email',
      color: '#ffb86c' 
    }] : []),
  ];

  if (socialLinks.length === 0) return null;

  return (
    <motion.div 
      className="social-float"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: `${link.color}20`,
            borderColor: `${link.color}`,
            color: link.color,
            boxShadow: `0 0 15px ${link.color}40`
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={link.label}
        >
          {link.icon}
          <span className="sr-only">{link.label}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default ModernSocialFloat;
