'use client'

import React, { ReactNode } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Profile } from '@/types/schema';

interface FooterProps {
  profile?: Profile | null;
}

export default function Footer({ profile }: FooterProps) {
  const socialIcons: { [key: string]: ReactNode } = {
    github: <FaGithub className="text-neon-green hover:scale-110 transition-transform" size={24} />,
    linkedin: <FaLinkedin className="text-neon-green hover:scale-110 transition-transform" size={24} />,
    twitter: <FaTwitter className="text-neon-green hover:scale-110 transition-transform" size={24} />,
  };

  return (
    <footer className="bg-dark-base p-6 text-center border-t border-neon-green/20">
      <div className="flex justify-center space-x-4 mt-4">
        {profile?.socialLinks && Object.entries(profile.socialLinks).map(([platform, url]) => (
          url && (
            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
              {socialIcons[platform] || <span className="text-neon-green">{platform}</span>}
            </a>
          )
        ))}
      </div>
      <div className="mt-4">
        <img src="/qr-code-placeholder.png" alt="QR Code to Contact" className="mx-auto w-24 h-24" />
      </div>
      <p className="text-sm text-gray-500 mt-2"> 2025 Hardik Srivastava. All rights reserved.</p>
    </footer>
  );
}