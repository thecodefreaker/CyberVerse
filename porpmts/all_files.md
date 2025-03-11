
++++=== [1] ./next-env.d.ts ===+++
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

++++=== [2] ./next.config.ts ===+++
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

++++=== [3] ./src/app/components-showcase/page.tsx ===+++
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CyberLoading from '@/components/common/CyberLoading';
import CyberNotification from '@/components/common/CyberNotification';
import BinaryBackground from '@/components/common/BinaryBackground';
import CyberCard from '@/components/common/CyberCard';
import { PasswordInputWithMeter } from '@/components/common/PasswordStrengthMeter';
import CyberBadge from '@/components/common/CyberBadge';
import FloatingContact from '@/components/common/FloatingContact';
import Link from 'next/link';

const ComponentShowcase: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; type: any; message: string; details?: string }>>([]);
  
  const addNotification = (type: any, message: string, details?: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message, details }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 8000);
  };
  
  const simulateLoading = () => {
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 5000);
  };

  return (
    <div className="min-h-screen bg-dark-base text-white">
      <BinaryBackground opacity={0.05} speed="slow">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-12 text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-cyber mb-4 text-neon-green"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Cybersecurity UI Components
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Interactive, animated components with a cybersecurity theme for your portfolio
            </motion.p>
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                href="/"
                className="px-6 py-3 bg-dark-tertiary text-neon-green border border-neon-green rounded-md hover:bg-dark-secondary transition-colors"
              >
                Return to Portfolio
              </Link>
            </motion.div>
          </div>

          {/* Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CyberLoading */}
            <motion.div 
              className="bg-dark-secondary rounded-lg p-6 border border-dark-tertiary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-xl font-cyber mb-4 text-cyber-blue">CyberLoading</h2>
              <p className="text-sm text-gray-300 mb-4">
                A cybersecurity-themed loading screen with matrix rain effect and security status messages.
              </p>
              <button 
                onClick={simulateLoading}
                className="w-full py-2 bg-dark-tertiary text-cyber-blue border border-cyber-blue rounded hover:bg-opacity-50 transition-colors"
              >
                Simulate Loading (5s)
              </button>
            </motion.div>

            {/* CyberNotification */}
            <motion.div 
              className="bg-dark-secondary rounded-lg p-6 border border-dark-tertiary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-xl font-cyber mb-4 text-neon-purple">CyberNotification</h2>
              <p className="text-sm text-gray-300 mb-4">
                Security-themed notifications with encryption/decryption animations.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => addNotification('info', 'Information', 'This is an informational message')}
                  className="py-2 bg-dark-tertiary text-cyber-blue border border-cyber-blue rounded hover:bg-opacity-50 transition-colors"
                >
                  Info
                </button>
                <button 
                  onClick={() => addNotification('success', 'Success', 'Operation completed successfully')}
                  className="py-2 bg-dark-tertiary text-neon-green border border-neon-green rounded hover:bg-opacity-50 transition-colors"
                >
                  Success
                </button>
                <button 
                  onClick={() => addNotification('warning', 'Warning', 'Potential security issue detected')}
                  className="py-2 bg-dark-tertiary text-yellow-300 border border-yellow-300 rounded hover:bg-opacity-50 transition-colors"
                >
                  Warning
                </button>
                <button 
                  onClick={() => addNotification('error', 'Security Breach', 'Unauthorized access attempt detected')}
                  className="py-2 bg-dark-tertiary text-red-500 border border-red-500 rounded hover:bg-opacity-50 transition-colors"
                >
                  Error
                </button>
                <button 
                  onClick={() => addNotification('security', 'Security Alert', 'New vulnerability patch available')}
                  className="py-2 bg-dark-tertiary text-neon-purple border border-neon-purple rounded hover:bg-opacity-50 transition-colors col-span-2"
                >
                  Security + Encryption Effect
                </button>
              </div>
            </motion.div>

            {/* BinaryBackground */}
            <motion.div 
              className="bg-dark-secondary rounded-lg p-6 border border-dark-tertiary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-xl font-cyber mb-4 text-neon-green">BinaryBackground</h2>
              <p className="text-sm text-gray-300 mb-4">
                Animated binary code background for cybersecurity aesthetics.
              </p>
              <div className="h-40 border border-dark-tertiary rounded-md overflow-hidden">
                <BinaryBackground speed="medium" density="medium" color="var(--neon-green)" opacity={0.3}>
                  <div className="h-full flex items-center justify-center">
                    <span className="text-neon-green font-cyber">CONTENT AREA</span>
                  </div>
                </BinaryBackground>
              </div>
            </motion.div>

            {/* CyberCard */}
            <motion.div 
              className="bg-dark-secondary rounded-lg p-6 border border-dark-tertiary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <h2 className="text-xl font-cyber mb-4 text-cyber-blue">CyberCard</h2>
              <p className="text-sm text-gray-300 mb-4">
                Interactive cards with security clearance levels and encryption effects.
              </p>
              <div className="w-full">
                <CyberCard
                  title="Project Alpha"
                  content={
                    <p>A secure communication protocol with end-to-end encryption and zero-knowledge proofs.</p>
                  }
                  securityLevel="confidential"
                  animated={true}
                  initiallyLocked={false}
                >
                  <div className="h-full flex flex-col items-center justify-center">
                    <h3 className="text-neon-green font-cyber mb-2">TECHNICAL DETAILS</h3>
                    <p className="text-sm text-center text-gray-300">
                      This project utilizes elliptic curve cryptography with a 256-bit key length.
                    </p>
                  </div>
                </CyberCard>
              </div>
            </motion.div>

            {/* PasswordStrengthMeter */}
            <motion.div 
              className="bg-dark-secondary rounded-lg p-6 border border-dark-tertiary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h2 className="text-xl font-cyber mb-4 text-neon-green">PasswordStrengthMeter</h2>
              <p className="text-sm text-gray-300 mb-4">
                Interactive password strength checker with cybersecurity-themed animations.
              </p>
              <PasswordInputWithMeter />
            </motion.div>

            {/* CyberBadge */}
            <motion.div 
              className="bg-dark-secondary rounded-lg p-6 border border-dark-tertiary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h2 className="text-xl font-cyber mb-4 text-neon-purple">CyberBadge</h2>
              <p className="text-sm text-gray-300 mb-4">
                Cybersecurity badges to highlight skills, certifications, and security clearances.
              </p>
              <div className="flex flex-wrap gap-2">
                <CyberBadge label="Penetration Testing" variant="skill" level="expert" />
                <CyberBadge label="CISSP" variant="cert" level="intermediate" />
                <CyberBadge label="Secret" variant="clearance" level="advanced" />
                <CyberBadge label="Wireshark" variant="tool" level="basic" />
              </div>
            </motion.div>

            {/* FloatingContact */}
            <motion.div 
              className="bg-dark-secondary rounded-lg p-6 border border-dark-tertiary col-span-full md:col-span-2 lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <h2 className="text-xl font-cyber mb-4 text-cyber-blue">FloatingContact</h2>
              <p className="text-sm text-gray-300 mb-4">
                Floating contact widget with secure/unsecure toggle and matrix rain effect.
              </p>
              <div className="flex justify-center py-8">
                <FloatingContact contactInfo={{
                  github: 'https://github.com',
                  linkedin: 'https://linkedin.com',
                  email: 'cyber@example.com'
                }} />
              </div>
            </motion.div>
          </div>
        </div>
      </BinaryBackground>

      {/* Notifications */}
      <div className="fixed z-50 top-4 right-4 space-y-4 w-full max-w-md">
        {notifications.map(notification => (
          <CyberNotification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            details={notification.details}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            position="top-right"
            showEncryptedEffect={notification.type === 'security'}
          />
        ))}
      </div>

      {/* Loading Overlay */}
      {showLoading && <CyberLoading loadingTime={5000} />}
    </div>
  );
};

export default ComponentShowcase;

++++=== [4] ./src/app/globals.css ===+++
@import "tailwindcss/preflight";
@tailwind utilities;

/* Custom Font Declarations - Using Google Fonts instead of local files */
/* Note: We're keeping these declarations but updating the sources to use Google Fonts */
@font-face {
  font-family: 'Share Tech Mono';
  src: url('https://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFcLowEFA87Heg.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fira Code';
  src: url('https://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_A9sJVD7MOzlojwUKaJO.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

:root {
  /* Define our custom color variables */
  --dark-base: #1a1b26;
  --dark-secondary: #282a36;
  --dark-tertiary: #44475a;
  --neon-green: #50fa7b;
  --neon-purple: #bd93f9;
  --neon-blue: #8be9fd;
  --neon-orange: #ffb86c;
  --neon-red: #ff5555;
  --neon-yellow: #f1fa8c;
  --cyber-blue: #8be9fd;
  --cyber-purple: #bd93f9;
  --cyber-gray: #6272a4;
  --cyber-orange: #ffb86c;
  --cyber-red: #ff5555;
  --error-red: #ff5555;
  --primary-color: #50fa7b;
  --secondary-color: #8be9fd;
  --accent-color: #bd93f9;
  --background-dark: #282a36;
  --background-light: #1a1b26;
  --text-color: #ffffff;
}

/* Apply base styles */
body {
  background-color: var(--background-dark);
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* Typography */
.font-cyber {
  font-family: 'Share Tech Mono', monospace;
}

.font-terminal {
  font-family: 'Fira Code', monospace;
}

.font-cyber-heading {
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Layout Systems */
.cyber-grid-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  width: 100%;
}

.cyber-grid-layout-dense {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
}

.cyber-flex-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.cyber-flex-centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cyber-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.cyber-section {
  margin: 4rem 0;
  position: relative;
  overflow: hidden;
}

.cyber-section-divider {
  position: relative;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, transparent, var(--neon-green), transparent);
  margin: 3rem 0;
}

/* Custom background classes */
.custom-bg-dark-base {
  background-color: var(--dark-base);
}

.custom-bg-dark-secondary {
  background-color: var(--dark-secondary);
}

.custom-bg-dark-tertiary {
  background-color: var(--dark-tertiary);
}

.custom-bg-neon-green {
  background-color: var(--neon-green);
}

.custom-bg-neon-purple {
  background-color: var(--neon-purple);
}

.custom-bg-neon-blue {
  background-color: var(--neon-blue);
}

.custom-bg-cyber-blue {
  background-color: var(--cyber-blue);
}

.custom-bg-cyber-purple {
  background-color: var(--cyber-purple);
}

.custom-bg-cyber-orange {
  background-color: var(--cyber-orange);
}

/* Custom text color classes */
.custom-text-neon-green {
  color: var(--neon-green);
}

.custom-text-neon-purple {
  color: var(--neon-purple);
}

.custom-text-neon-blue {
  color: var(--neon-blue);
}

.custom-text-cyber-blue {
  color: var(--cyber-blue);
}

.custom-text-cyber-purple {
  color: var(--cyber-purple);
}

.custom-text-cyber-gray {
  color: var(--cyber-gray);
}

.custom-text-cyber-orange {
  color: var(--cyber-orange);
}

.custom-text-cyber-red {
  color: var(--cyber-red);
}

.custom-text-green {
  color: var(--neon-green);
}

.custom-text-red {
  color: var(--neon-red);
}

/* Custom border classes */
.custom-border-neon-green {
  border-color: var(--neon-green);
}

.custom-border-neon-purple {
  border-color: var(--neon-purple);
}

.custom-border-cyber-blue {
  border-color: var(--cyber-blue);
}

/* Text gradients */
.text-gradient-neon {
  background: linear-gradient(90deg, var(--neon-green), var(--cyber-blue));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

/* Cyber components */
.cyber-card {
  background-color: var(--dark-secondary);
  border: 1px solid rgba(80, 250, 123, 0.3);
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--neon-green), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-card:hover::before {
  opacity: 1;
}

/* Responsive Card Grids */
.cyber-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

@media (max-width: 768px) {
  .cyber-card-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .cyber-card-grid {
    grid-template-columns: 1fr;
  }
}

.terminal-window {
  background-color: var(--dark-base);
  border: 1px solid var(--neon-green);
  border-radius: 0.5rem;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
}

.cyber-button {
  background-color: transparent;
  border: 1px solid var(--neon-green);
  color: var(--neon-green);
  font-family: 'Share Tech Mono', monospace;
  padding: 0.5rem 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  border-radius: 0.25rem;
}

.cyber-button:hover {
  background-color: rgba(80, 250, 123, 0.1);
  box-shadow: 0 0 10px rgba(80, 250, 123, 0.5);
}

.cyber-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--neon-green);
  transition: width 0.3s ease;
}

.cyber-button:hover::after {
  width: 100%;
}

.cyber-button-blue {
  background-color: transparent;
  border: 1px solid var(--neon-blue);
  color: var(--neon-blue);
  font-family: 'Share Tech Mono', monospace;
  padding: 0.5rem 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  border-radius: 0.25rem;
}

.cyber-button-blue:hover {
  background-color: rgba(139, 233, 253, 0.1);
  box-shadow: 0 0 10px rgba(139, 233, 253, 0.5);
}

/* Glow effects */
.shadow-glow-green {
  box-shadow: 0 0 15px rgba(80, 250, 123, 0.5);
}

.shadow-glow-blue {
  box-shadow: 0 0 15px rgba(139, 233, 253, 0.5);
}

.shadow-glow-purple {
  box-shadow: 0 0 15px rgba(189, 147, 249, 0.5);
}

.shadow-glow-orange {
  box-shadow: 0 0 15px rgba(255, 184, 108, 0.5);
}

/* Pulse dot */
.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--neon-green);
  display: inline-block;
}

/* Cyber pulse dashboard */
.cyber-pulse-dashboard {
  background-color: rgba(26, 27, 38, 0.8);
  border: 1px solid rgba(80, 250, 123, 0.3);
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

/* Animation elements */
.matrix-drop {
  position: absolute;
  font-family: 'Fira Code', monospace;
}

/* Cyberpunk grid background */
.cyber-grid {
  background-image: 
    linear-gradient(rgba(80, 250, 123, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(80, 250, 123, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: center center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
}

.cyber-scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    transparent,
    rgba(139, 233, 253, 0.1),
    transparent
  );
  animation: scan 3s ease-in-out infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes scan {
  0%, 100% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(100%);
  }
}

/* Hero section styles */
.hero-section {
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.hero-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--neon-green), transparent);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-family: 'Share Tech Mono', monospace;
}

/* Responsive Grid Layout */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

.col-span-12 { grid-column: span 12 / span 12; }
.col-span-11 { grid-column: span 11 / span 11; }
.col-span-10 { grid-column: span 10 / span 10; }
.col-span-9 { grid-column: span 9 / span 9; }
.col-span-8 { grid-column: span 8 / span 8; }
.col-span-7 { grid-column: span 7 / span 7; }
.col-span-6 { grid-column: span 6 / span 6; }
.col-span-5 { grid-column: span 5 / span 5; }
.col-span-4 { grid-column: span 4 / span 4; }
.col-span-3 { grid-column: span 3 / span 3; }
.col-span-2 { grid-column: span 2 / span 2; }
.col-span-1 { grid-column: span 1 / span 1; }

@media (max-width: 1024px) {
  .lg-col-span-12 { grid-column: span 12 / span 12; }
  .lg-col-span-6 { grid-column: span 6 / span 6; }
  .lg-col-span-4 { grid-column: span 4 / span 4; }
  .lg-col-span-3 { grid-column: span 3 / span 3; }
}

@media (max-width: 768px) {
  .md-col-span-12 { grid-column: span 12 / span 12; }
  .md-col-span-6 { grid-column: span 6 / span 6; }
}

@media (max-width: 640px) {
  .sm-col-span-12 { grid-column: span 12 / span 12; }
}

/* Security scan effect */
.security-scan {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(80, 250, 123, 0.05),
    transparent
  );
  animation: security-scan 4s linear infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes security-scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

/* Dashboard pulse effect */
.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--neon-green);
  display: inline-block;
}

/* Floating animation */
.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Custom shadows for cards and sections */
.cyber-shadow {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(80, 250, 123, 0.1),
    0 0 0 3px rgba(80, 250, 123, 0.05);
}

.cyber-shadow-blue {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(139, 233, 253, 0.1),
    0 0 0 3px rgba(139, 233, 253, 0.05);
}

.cyber-shadow-purple {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(189, 147, 249, 0.1),
    0 0 0 3px rgba(189, 147, 249, 0.05);
}

/* Holographic effect - use on cards or images */
.holographic {
  position: relative;
  overflow: hidden;
}

.holographic::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(80, 250, 123, 0.1),
    rgba(139, 233, 253, 0.1),
    rgba(189, 147, 249, 0.1),
    transparent
  );
  transform: rotate(30deg);
  animation: holographic-shift 6s linear infinite;
  pointer-events: none;
}

@keyframes holographic-shift {
  0% {
    transform: rotate(0deg) translateY(-50%) translateX(-50%);
  }
  100% {
    transform: rotate(360deg) translateY(-50%) translateX(-50%);
  }
}

/* Typographic Styles */
.font-cyber-heading {
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.font-terminal {
  font-family: 'Fira Code', monospace;
}

/* Glitch text effect */
.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.glitch-text::before {
  color: var(--neon-blue);
  animation: glitch-anim 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  animation-delay: 0.1s;
}

.glitch-text::after {
  color: var(--neon-red);
  animation: glitch-anim 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
  animation-delay: 0.2s;
}

@keyframes glitch-anim {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

/* Network node animation */
.network-node {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--neon-green);
  position: relative;
}

.network-node::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  border: 1px solid var(--neon-green);
  opacity: 0.5;
  animation: node-pulse 2s infinite;
}

@keyframes node-pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  70% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Terminal cursor blinking animation */
.terminal-cursor {
  display: inline-block;
  width: 10px;
  height: 16px;
  background-color: var(--neon-green);
  animation: terminal-blink 1s step-end infinite;
}

@keyframes terminal-blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Security scan animation */
.security-scan {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--neon-green);
  opacity: 0.7;
  box-shadow: 0 0 10px var(--neon-green);
  animation: security-scan 2s ease-in-out infinite;
}

@keyframes security-scan {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}

/* Scroll animation */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid var(--neon-green);
  border-bottom: 2px solid var(--neon-green);
  transform: rotate(45deg);
  animation: scroll-arrow 2s infinite;
  margin: -10px;
}

.scroll-arrow:nth-child(2) {
  animation-delay: 0.2s;
}

.scroll-arrow:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes scroll-arrow {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-5px, -5px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(5px, 5px);
  }
}

/* Parallax container */
.parallax-container {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.parallax-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.parallax-layer-back {
  transform: translateZ(-1px) scale(2);
}

.parallax-layer-base {
  transform: translateZ(0);
}

/* Enhanced card hover effects */
.hover-card-3d {
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.hover-card-3d:hover {
  transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
}

/* Cyber Grid Background */
.cyber-grid-bg {
  background-color: var(--dark-base);
  background-image: 
    linear-gradient(var(--cyber-blue) 1px, transparent 1px),
    linear-gradient(90deg, var(--cyber-blue) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center center;
  position: relative;
  overflow: hidden;
}

.cyber-grid-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 0%, var(--dark-base) 100%);
  pointer-events: none;
}

/* Cyber Button */
.cyber-button-sm {
  background: var(--dark-tertiary);
  color: var(--neon-green);
  border: 2px solid var(--neon-green);
  padding: 0.5rem 1rem;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(80, 250, 123, 0.3);
  border-radius: 4px;
}

.cyber-button-sm:hover {
  background: var(--dark-base);
  box-shadow: 0 0 20px rgba(80, 250, 123, 0.5);
}

.cyber-button-sm:active {
  transform: scale(0.95);
}

/* Cyber Card */
.cyber-card {
  background: rgba(26, 27, 38, 0.8);
  border: 1px solid var(--cyber-blue);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.cyber-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent,
    var(--cyber-blue),
    transparent
  );
  animation: scanline 2s linear infinite;
}

/* Matrix Rain Effect */
.matrix-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.matrix-raindrop {
  font-family: 'Share Tech Mono', monospace;
  text-shadow: 0 0 8px var(--neon-green);
  white-space: nowrap;
}

/* Scan Line Effect */
@keyframes scanline {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Neon Text Effects */
.text-glow {
  text-shadow: 0 0 10px currentColor;
}

.custom-text-neon-green {
  color: var(--neon-green);
  text-shadow: 0 0 8px var(--neon-green);
}

.custom-text-cyber-blue {
  color: var(--cyber-blue);
  text-shadow: 0 0 8px var(--cyber-blue);
}

.custom-text-neon-purple {
  color: var(--neon-purple);
  text-shadow: 0 0 8px var(--neon-purple);
}

/* Grid Layouts */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.cyber-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

/* Shadow Effects */
.shadow-glow-green {
  box-shadow: 0 0 15px rgba(80, 250, 123, 0.3);
}

.shadow-glow-blue {
  box-shadow: 0 0 15px rgba(139, 233, 253, 0.3);
}

.shadow-glow-purple {
  box-shadow: 0 0 15px rgba(189, 147, 249, 0.3);
}

/* Container */
.cyber-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.95);
  }
}

.pulse-animation {
  animation: pulse 2s ease-in-out infinite;
}

/* Custom Background Colors */
.custom-bg-dark-base {
  background-color: var(--dark-base);
}

.custom-bg-dark-secondary {
  background-color: var(--dark-secondary);
}

.custom-bg-dark-tertiary {
  background-color: var(--dark-tertiary);
}

/* Global Styles Enhancements */

/* Consistent Theme */
/* Typography */
.font-cyber {
  font-family: 'Share Tech Mono', monospace;
}

.font-terminal {
  font-family: 'Fira Code', monospace;
}

/* Layout and Alignment */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Interactive Elements */
.button {
  background-color: var(--primary-color);
  border: none;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
  background-color: var(--accent-color);
}

.card {
  background-color: var(--background-light);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-10px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
++++=== [5] ./src/app/layout.tsx ===+++
"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/index.css";
import "@/styles/performance.css"; // Import performance optimizations
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import ClientPowerSaveWrapper from "@/components/ui/ClientPowerSaveWrapper";
import { metadata } from "./metadata";

// Load main fonts with optimized settings
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false, // Disable font fallback which improves performance
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TEMPORARY DEBUG - Log when layout renders
  if (typeof window !== 'undefined') {
    console.log('[DEBUG] RootLayout rendering');
    console.log('[DEBUG] CSS Classes loaded:', {
      documentClasses: document.documentElement.className,
      bodyClasses: document.body.className,
    });
    
    // Check if stylesheets are loaded properly
    const styleSheets = Array.from(document.styleSheets);
    console.log('[DEBUG] Stylesheets loaded:', styleSheets.length);
    styleSheets.forEach((sheet, index) => {
      try {
        console.log(`[DEBUG] Sheet ${index} href:`, sheet.href);
      } catch (e) {
        console.log(`[DEBUG] Sheet ${index} (cannot access href - might be CORS restricted)`);
      }
    });
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Performance optimization: Preload critical font assets */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap"
          as="style"
        />
        
        {/* Google Fonts for cybersecurity theme with optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load only essential font weights to reduce bandwidth */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Fira+Code:wght@400;500&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-dark-base text-white min-h-screen flex flex-col`}
      >
        {/* TEMPORARY DEBUG - Visible debugging info */}
        <div style={{ 
          position: 'fixed', 
          top: '0', 
          right: '0', 
          background: 'rgba(0,0,0,0.8)', 
          color: '#50fa7b', 
          padding: '10px', 
          zIndex: '9999',
          fontFamily: 'monospace',
          fontSize: '12px',
          maxWidth: '300px',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          <div>DEBUG MODE</div>
          <div>Theme: {typeof window !== 'undefined' ? document.documentElement.dataset.theme || 'none' : 'SSR'}</div>
          <div>Body Classes: {typeof window !== 'undefined' ? document.body.className : 'SSR'}</div>
        </div>

        <div className="flex-grow flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ClientPowerSaveWrapper />
        </div>
        
        {/* Performance measurement script - loads after everything else */}
        <Script id="performance-metrics" strategy="afterInteractive">
          {`
            // Report performance metrics
            window.addEventListener('load', () => {
              // Give browser time to finish all work
              setTimeout(() => {
                if (window.performance) {
                  const perfData = window.performance.timing;
                  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                  console.log('[DEBUG] Page load time:', pageLoadTime + 'ms');
                  
                  // Debug stylesheet status
                  const styleSheets = Array.from(document.styleSheets);
                  console.log('[DEBUG] StyleSheets after full load:', styleSheets.length);
                  
                  // Check critical CSS classes
                  console.log('[DEBUG] Critical CSS classes check:');
                  ['bg-dark-base', 'text-neon-green', 'font-cyber'].forEach(className => {
                    const testEl = document.createElement('div');
                    testEl.className = className;
                    document.body.appendChild(testEl);
                    const styles = window.getComputedStyle(testEl);
                    console.log(\`[DEBUG] Class "\${className}" applied: \`, {
                      backgroundColor: styles.backgroundColor,
                      color: styles.color,
                      fontFamily: styles.fontFamily
                    });
                    document.body.removeChild(testEl);
                  });
                }
              }, 0);
            });
            
            // Save resources by pausing animations when tab is not visible
            document.addEventListener('visibilitychange', () => {
              document.body.classList.toggle('tab-hidden', document.visibilityState !== 'visible');
              console.log('[DEBUG] Visibility changed:', document.visibilityState);
            });
          `}
        </Script>
      </body>
    </html>
  );
}

++++=== [6] ./src/app/metadata.ts ===+++
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberVerse - Cybersecurity Portfolio",
  description: "A cybersecurity professional portfolio showcasing skills, projects, and expertise in the field of information security",
  keywords: "cybersecurity, ethical hacking, penetration testing, information security, portfolio",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: '/favicon.ico',
  },
};

++++=== [7] ./src/app/page.tsx ===+++
'use client';
import "@/app/globals.css"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaShieldAlt, FaLaptopCode, FaNetworkWired, FaLock, FaServer, FaBug } from 'react-icons/fa';
import { GiCircuitry } from 'react-icons/gi';
import { MdSecurity } from 'react-icons/md';
import { CyberCard, CyberButton, GlitchText, ExpandableCard, SectionHeading, ProjectCard } from '../components/ui';
import ScanLine from '../components/effects/ScanLine';
import MatrixRainBackground from '../components/effects/MatrixRainBackground';
import ParticleBackground from '../components/effects/ParticleBackground';
import { extractPortableText, SimplePortableText } from '../lib/portableTextUtils';
import Layout from '../components/layout/Layout';
import CyberTerminal from '../components/interactive/CyberTerminal';
import NetworkGraph from '../components/interactive/NetworkGraph';
import CyberPulseDashboard from '../components/dashboard/CyberPulseDashboard';
import FloatingContact from '../components/common/FloatingContact';
import { client } from '../lib/sanity';
import { Profile, Project, Certification, Skill, SanityImage } from '../types/schema';
import { dashboardData } from '../data/dashboardData';

// Dynamic imports for performance optimization
const CyberGlobe = dynamic(() => import('../components/interactive/CyberGlobe'), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] bg-dark-secondary rounded-lg animate-pulse"></div>
});

// Mock contact data - replace with real data later
const contactData = {
  githubUrl: 'https://github.com/hardikethicalhacker',
  linkedinUrl: 'https://linkedin.com/in/hardikethicalhacker',
  email: 'contact@hardiketh.com'
};

// Data for cyber globe interactions
const cyberThreatLocations = [
  { lat: 37.7749, lng: -122.4194, label: "San Francisco", size: 0.5, color: "#8be9fd", type: "Data Breach" },
  { lat: 40.7128, lng: -74.0060, label: "New York", size: 0.7, color: "#bd93f9", type: "Ransomware" },
  { lat: 51.5074, lng: -0.1278, label: "London", size: 0.6, color: "#ff5555", type: "DDoS Attack" },
  { lat: 28.7041, lng: 77.1025, label: "Delhi", size: 0.8, color: "#50fa7b", type: "Phishing Campaign" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", size: 0.5, color: "#ffb86c", type: "Social Engineering" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", size: 0.6, color: "#ff79c6", type: "APT Attack" },
  { lat: 55.7558, lng: 37.6173, label: "Moscow", size: 0.7, color: "#ff5555", type: "Zero-day Exploit" },
];

const cyberDefenseConnections = [
  { startLat: 37.7749, startLng: -122.4194, endLat: 28.7041, endLng: 77.1025, color: "#50fa7b" },
  { startLat: 28.7041, startLng: 77.1025, endLat: 51.5074, endLng: -0.1278, color: "#8be9fd" },
  { startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.0060, color: "#bd93f9" },
  { startLat: 40.7128, startLng: -74.0060, endLat: -33.8688, endLng: 151.2093, color: "#ff79c6" },
  { startLat: -33.8688, startLng: 151.2093, endLat: 35.6762, endLng: 139.6503, color: "#ffb86c" },
];

// Helper function to get image URL from Sanity image object
const getSanityImageUrl = (image: SanityImage | string): string => {
  if (typeof image === 'string') return image;
  return image?.asset?.url || '';
};

export default function Home() {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // States for various schema data
  const [profile, setProfile] = useState<Profile | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showRecentVulnerabilities, setShowRecentVulnerabilities] = useState(false);
  const [latestCVEs, setLatestCVEs] = useState<any[]>([]);

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      // Fetch profile
      const profileQuery = '*[_type == "profile"][0]{ name, title, shortBio, longBio, avatar, socialLinks, githubUrl, linkedinUrl, email }';
      const profileData = await client.fetch<Profile>(profileQuery);
      setProfile(profileData);

      // Fetch featured projects with detailed structure
      const projectQuery = `*[_type == "project" && metadata.isFeatured == true]{
        _id, 
        title, 
        description, 
        thumbnail, 
        "imageUrl": thumbnail.asset->url, 
        tags, 
        githubUrl, 
        liveUrl, 
        category,
        technologiesUsed[]->{ name, "icon": icon.asset->url }
      }`;
      const projectData = await client.fetch<Project[]>(projectQuery);
      setFeaturedProjects(projectData);

      // Fetch certifications
      const certQuery = '*[_type == "certification"]{ _id, title, issuingOrganization, dateIssued, certificateURL, "badgeUrl": badge.asset->url }';
      const certData = await client.fetch<Certification[]>(certQuery);
      setCertifications(certData);

      // Fetch top skills
      const skillQuery = '*[_type == "skill"]{ _id, name, proficiency, category, "iconUrl": icon.asset->url } | order(proficiency desc)[0...12]';
      const skillData = await client.fetch<Skill[]>(skillQuery);
      setSkills(skillData);
    };

    fetchData().catch(console.error);
  }, []);

  // Fetch latest CVE data
  useEffect(() => {
    if (showRecentVulnerabilities) {
      const fetchCVEs = async () => {
        try {
          // This would typically be an API call to a CVE database or use a CORS proxy
          // For demo purposes, we'll use a simulated response
          const response = await fetch('/api/latest-cves');
          const data = await response.json();
          setLatestCVEs(data.slice(0, 5)); // Show top 5 vulnerabilities
        } catch (error) {
          console.error("Failed to fetch CVE data:", error);
          // Fallback to mock data
          setLatestCVEs([
            { id: "CVE-2025-1234", severity: "high", description: "Remote code execution in popular web framework" },
            { id: "CVE-2025-5678", severity: "critical", description: "Authentication bypass in cloud service" },
            { id: "CVE-2025-9012", severity: "medium", description: "SQL injection vulnerability in database driver" }
          ]);
        }
      };
      fetchCVEs();
    }
  }, [showRecentVulnerabilities]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <Layout>
      <main className="min-h-screen bg-dark-base overflow-hidden relative">
        {/* Global effects */}
        <ParticleBackground />
        <ScanLine />
        
        {/* Hero section */}
        <motion.div 
          className="h-screen relative overflow-hidden flex items-center"
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ 
            opacity: heroOpacity,
            scale: heroScale 
          }}
        >
          {/* Matrix Rain Background Effect */}
          <div className="absolute inset-0 z-0">
            <MatrixRainBackground 
              density={0.8}
              speed={1.2}
              color="#50fa7b"
              glowIntensity={0.8}
              className="opacity-20"
            />
          </div>
          
          {/* Scan Line Effect */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <ScanLine 
              color="rgba(80, 250, 123, 0.3)" 
              speed="fast"
              glow={true}
              flicker={true}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div 
                className="w-full md:w-7/12"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="mb-4">
                  <div className="inline-flex items-center bg-dark-secondary/60 backdrop-blur-sm py-1 px-3 rounded-md border border-neon-green/30">
                    <span className="text-lg text-cyber-blue font-terminal mb-0 inline-block">
                      <span className="inline-block mr-2 text-neon-green">~$</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        sys.out.introduce()
                      </motion.span>
                    </span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-cyber mb-4 text-white drop-shadow-[0_0_5px_rgba(80,250,123,0.5)]">
                  <GlitchText intensity={0.3} speed={1.5}>HARDIK SRIVASTAVA</GlitchText>
                </h1>
                
                <div className="bg-dark-secondary/40 backdrop-blur-sm border-l-4 border-neon-green p-2 mb-6">
                  <h2 className="text-xl md:text-2xl font-terminal text-neon-green">
                    <span className="text-cyber-blue">{"{"}</span> Ethical Hacker <span className="text-cyber-blue">|</span> Cybersecurity Innovator <span className="text-cyber-blue">{"}"}</span>
                  </h2>
                </div>
                
                <div className="bg-dark-base/70 backdrop-blur-sm p-4 border border-dark-tertiary rounded-md shadow-[0_0_15px_rgba(80,250,123,0.1)] mb-8">
                  <p className="text-lg text-gray-300 font-terminal leading-relaxed max-w-2xl">
                    {profile?.shortBio || "Exposing vulnerabilities so they can be fixed before they're exploited. Cybersecurity professional specializing in penetration testing, secure coding practices, and vulnerability assessments."}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <CyberButton 
                    onClick={() => setIsTerminalOpen(true)}
                    type="primary"
                    icon="terminal"
                  >
                    Access Terminal
                  </CyberButton>
                  
                  <CyberButton 
                    href="/portfolio"
                    type="secondary"
                    icon="shield"
                  >
                    View Portfolio
                  </CyberButton>
                  
                  <CyberButton 
                    href="/files/hardik-srivastava.vcf"
                    download
                    type="outline"
                    icon="download"
                  >
                    Download vCard
                  </CyberButton>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-5/12 flex justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -inset-4 border border-neon-green/30 rounded-lg"></div>
                  <div className="absolute -inset-6 border border-neon-blue/20 rounded-lg"></div>
                  
                  {/* Interactive dashboard or terminal */}
                  <div className="w-full max-w-md bg-dark-secondary/80 backdrop-blur-md p-4 border border-neon-green/30 rounded-md shadow-[0_0_30px_rgba(80,250,123,0.15)]">
                    <div className="flex items-center justify-between mb-4 border-b border-dark-tertiary pb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-neon-red mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-cyber-orange mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-neon-green"></div>
                      </div>
                      <div className="font-terminal text-sm text-cyber-blue">cybersecurity@matrix:~</div>
                    </div>
                    <div className="font-terminal text-sm space-y-2">
                      <div className="flex items-start">
                        <span className="text-neon-green mr-2">$</span>
                        <span className="text-gray-300">scanning_perimeter --target=global --mode=defensive</span>
                      </div>
                      <div className="text-gray-400 pl-4">
                        <div className="animate-pulse">Analyzing network traffic patterns...</div>
                        <div className="mt-1">Potential threats identified: <span className="text-neon-red">12</span></div>
                        <div className="mt-1">Active monitoring engaged</div>
                      </div>
                      <div className="flex items-start mt-2">
                        <span className="text-neon-green mr-2">$</span>
                        <span className="text-gray-300">deploy_countermeasures --auto</span>
                      </div>
                      <div className="text-gray-400 pl-4">
                        <div>Firewall rules updated</div>
                        <div>IDS signatures refreshed</div>
                        <div className="text-neon-green">System secured</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
            
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-cyber-blue font-terminal text-sm mb-2">SCROLL DOWN</span>
            <motion.div 
              className="w-6 h-10 border-2 border-cyber-blue rounded-full flex justify-center p-1"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-1 h-2 bg-neon-green rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* About section with profile */}
        <section className="py-24 bg-dark-secondary relative">
          <div className="container mx-auto px-4">
            <SectionHeading>About Me</SectionHeading>
            
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <motion.div 
                className="w-full lg:w-1/3 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {profile?.avatar ? (
                    <div className="cyber-frame w-full h-full">
                      <Image 
                        src={getSanityImageUrl(profile.avatar)} 
                        alt={profile.name || "Hardik Srivastava"}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="cyber-frame w-full h-full bg-dark-tertiary flex items-center justify-center">
                      <span className="text-neon-green text-6xl">HS</span>
                    </div>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-2/3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-cyber text-neon-green mb-4">
                  <span className="text-cyber-blue">[</span> Background <span className="text-cyber-blue">]</span>
                </h3>
                
                <div className="font-terminal text-gray-300 space-y-4">
                  <SimplePortableText value={extractPortableText(profile?.longBio, "I'm a cybersecurity professional with expertise in ethical hacking, penetration testing, and security research. My journey in cybersecurity began with a fascination for understanding how systems can be secured against increasingly sophisticated threats.")} />
                  
                  <p>With specialized training in identifying vulnerabilities and implementing robust security measures, I help organizations fortify their digital infrastructure against potential cyber attacks.</p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CyberCard title="Expertise">
                    <ul className="list-disc pl-5 font-terminal text-gray-300 space-y-1">
                      <li>Network Penetration Testing</li>
                      <li>Web Application Security</li>
                      <li>Vulnerability Assessment</li>
                      <li>Security Awareness Training</li>
                    </ul>
                  </CyberCard>
                  
                  <CyberCard title="Approach">
                    <ul className="list-disc pl-5 font-terminal text-gray-300 space-y-1">
                      <li>Proactive Security Mindset</li>
                      <li>Continuous Learning</li>
                      <li>Ethical Practice</li>
                      <li>Clear Communication</li>
                    </ul>
                  </CyberCard>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured projects section */}
        <section className="py-24 cyber-grid-bg relative">
          <div className="container mx-auto px-4">
            <SectionHeading>Featured Projects</SectionHeading>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {featuredProjects.map(project => (
                <motion.div key={project._id} variants={itemVariants}>
                  <ProjectCard 
                    title={project.title}
                    description={project.description}
                    imageUrl={getSanityImageUrl(project.imageUrl)}
                    category={project.category}
                    links={{
                      github: project.githubUrl,
                      live: project.liveUrl
                    }}
                    technologies={project.technologiesUsed || []}
                  />
                </motion.div>
              ))}
              
              {featuredProjects.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <motion.div 
                    className="inline-block"
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="text-lg font-terminal text-cyber-blue">Loading projects...</span>
                  </motion.div>
                </div>
              )}
            </motion.div>
            
            <div className="mt-12 text-center">
              <CyberButton 
                href="/portfolio#projects"
                type="secondary"
                icon="grid"
              >
                View All Projects
              </CyberButton>
            </div>
          </div>
        </section>
        
        {/* Skills section */}
        <section className="py-24 bg-dark-secondary relative">
          <div className="container mx-auto px-4">
            <SectionHeading>Technical Arsenal</SectionHeading>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="col-span-full mb-8"
                variants={itemVariants}
              >
                <div className="p-6 bg-dark-tertiary border border-cyber-blue rounded-lg h-[400px] overflow-hidden">
                  <h3 className="text-xl font-cyber text-white mb-4 text-center">Skill Network Visualization</h3>
                  {useMemo(() => (
                    <NetworkGraph 
                      skills={skills.map(skill => ({
                        id: skill._id,
                        name: skill.name,
                        category: skill.category || 'General',
                        proficiency: skill.proficiency,
                        description: skill.description || '',
                        color: skill.category === 'Cybersecurity' ? '#50fa7b' :
                               skill.category === 'Programming' ? '#8be9fd' :
                               skill.category === 'Tools' ? '#bd93f9' : 
                               '#ffb86c'
                      }))}
                    />
                  ), [skills])}
                </div>
              </motion.div>
              {skills.map(skill => (
                <motion.div key={skill._id} variants={itemVariants}>
                  <div className="p-4 bg-dark-tertiary border border-cyber-blue rounded-md h-full flex flex-col items-center text-center hover:border-neon-green transition-colors duration-300">
                    {skill.iconUrl ? (
                      <Image 
                        src={getSanityImageUrl(skill.iconUrl)} 
                        alt={skill.name} 
                        width={48} 
                        height={48} 
                        className="mb-3"
                      />
                    ) : (
                      <div className="w-12 h-12 mb-3 bg-dark-base rounded-full flex items-center justify-center">
                        <span className="text-neon-green text-xl">{skill.name.charAt(0)}</span>
                      </div>
                    )}
                    
                    <h3 className="text-sm font-cyber text-white mb-2">{skill.name}</h3>
                    
                    <div className="mt-auto">
                      <div className="w-full bg-dark-base h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-neon-green"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-xs font-terminal text-cyber-blue mt-1">
                        {`${skill.proficiency}%`}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-12 text-center">
              <CyberButton 
                href="/portfolio#skills"
                type="secondary"
                icon="chip"
              >
                View Skill Network
              </CyberButton>
            </div>
          </div>
        </section>
        
        {/* Certifications section */}
        <section className="py-24 cyber-grid-bg relative">
          <div className="container mx-auto px-4">
            <SectionHeading>Certifications</SectionHeading>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {certifications.slice(0, 3).map(cert => (
                <motion.div key={cert._id} variants={itemVariants}>
                  <div className="bg-dark-tertiary border border-cyber-blue rounded-lg overflow-hidden h-full hover:border-neon-green transition-colors duration-300">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        {cert.badgeUrl ? (
                          <div className="mr-4">
                            <Image 
                              src={getSanityImageUrl(cert.badgeUrl)} 
                              alt={`${cert.title} badge`} 
                              width={60} 
                              height={60} 
                              className="rounded"
                            />
                          </div>
                        ) : (
                          <div className="mr-4 w-14 h-14 bg-dark-base rounded-full flex items-center justify-center">
                            <span className="text-neon-green text-2xl">🔒</span>
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-lg font-cyber text-white">{cert.title}</h3>
                          <p className="text-sm font-terminal text-gray-400">
                            {cert.issuingOrganization 
                              ? (typeof cert.issuingOrganization === 'object' && cert.issuingOrganization !== null 
                                ? (cert.issuingOrganization as { name: string }).name 
                                : String(cert.issuingOrganization))
                              : 'Unknown Organization'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="text-sm font-terminal text-gray-400 mb-4">
                          {new Date(cert.dateIssued).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </div>
                        
                        {cert.certificateURL && (
                          <a 
                            href={cert.certificateURL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-terminal text-cyber-blue hover:text-neon-green transition-colors flex items-center"
                          >
                            <span className="mr-1">View Certificate</span>
                            <span>→</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-12 text-center">
              <CyberButton 
                href="/portfolio#certifications"
                type="secondary"
                icon="certificate"
              >
                View All Credentials
              </CyberButton>
            </div>
          </div>
        </section>
        
        {/* Cyber Pulse Dashboard section */}
        <section className="py-24 bg-dark-base relative">
          <div className="container mx-auto px-4">
            <SectionHeading>Cyber Pulse</SectionHeading>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <CyberPulseDashboard data={dashboardData} />
              
              <div className="mt-8">
                <div className="flex justify-center">
                  <CyberButton 
                    onClick={() => setShowRecentVulnerabilities(!showRecentVulnerabilities)}
                    type="warning"
                    icon="alert"
                  >
                    {showRecentVulnerabilities ? "Hide" : "Show"} Recent Vulnerabilities
                  </CyberButton>
                </div>
                
                {showRecentVulnerabilities && (
                  <motion.div 
                    className="mt-6 p-6 border border-cyber-red bg-dark-secondary rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-xl font-cyber text-cyber-red mb-4">Recent Critical CVEs</h3>
                    
                    <div className="space-y-4">
                      {latestCVEs.map((cve, index) => (
                        <div key={cve.id} className="p-4 bg-dark-tertiary rounded border-l-4 border-cyber-red">
                          <div className="flex justify-between">
                            <h4 className="font-terminal text-cyber-blue">{cve.id}</h4>
                            <span className={`text-sm font-terminal px-2 py-0.5 rounded ${
                              cve.severity === 'critical' ? 'bg-red-900 text-red-200' :
                              cve.severity === 'high' ? 'bg-orange-900 text-orange-200' :
                              'bg-yellow-900 text-yellow-200'
                            }`}>
                              {cve.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="mt-2 text-sm font-terminal text-gray-300">{cve.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cyber Terminal (conditionally rendered) */}
        {isTerminalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 sm:p-8">
            <div className="w-full max-w-4xl max-h-[90vh]">
              <div className="flex justify-end mb-2">
                <button 
                  onClick={() => setIsTerminalOpen(false)}
                  className="text-gray-400 hover:text-white text-lg focus:outline-none"
                  aria-label="Close terminal"
                >
                  × Close
                </button>
              </div>
              <CyberTerminal 
                welcomeMessage={
                  <div>
                    <div className="text-neon-green font-mono">Welcome, {profile?.name || 'Guest'}!</div>
                    <div className="text-gray-300 mt-2">Use this terminal to explore my portfolio.</div>
                    <div className="text-cyber-blue mt-1">Try commands like: <span className="text-neon-green">help</span>, <span className="text-neon-green">whoami</span>, <span className="text-neon-green">skills</span>, or <span className="text-neon-green">projects</span></div>
                  </div>
                }
                height="60vh"
                initialClearanceLevel={1}
              />
            </div>
          </div>
        )}
        
        {/* Floating Contact Component */}
        <FloatingContact 
          contactInfo={{
            github: profile?.githubUrl || contactData.githubUrl,
            linkedin: profile?.linkedinUrl || contactData.linkedinUrl,
            email: profile?.email || contactData.email
          }} 
        />
      </main>
    </Layout>
  );
}
++++=== [8] ./src/app/portfolio/page.tsx ===+++
import React from 'react';
import { Metadata } from 'next';
import { fetchAllProjects, fetchCertifications, fetchSkills, fetchExperience, fetchEducation, fetchProfile } from '../../lib/sanityMiddleware';
import { PortfolioClient } from '../../components/portfolio';

export const metadata: Metadata = {
  title: 'Cybersecurity Portfolio | Projects & Experience',
  description: 'Explore my cybersecurity projects, skills, certifications, and professional experience in this interactive portfolio.',
};

export const revalidate = 3600; // Revalidate the page every hour

export default async function PortfolioPage() {
  // Fetch data from Sanity
  const projects = await fetchAllProjects();
  const certifications = await fetchCertifications();
  const skills = await fetchSkills();
  const experience = await fetchExperience();
  const education = await fetchEducation();
  const profile = await fetchProfile();

  return (
    <div className="min-h-screen bg-dark-base text-white overflow-hidden">
      <PortfolioClient
        projects={projects}
        certifications={certifications}
        skills={skills}
        experience={experience}
        education={education}
        profile={profile}
      />
    </div>
  );
}

++++=== [9] ./src/components/common/BinaryBackground.tsx ===+++
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface BinaryBackgroundProps {
  speed?: 'slow' | 'medium' | 'fast';
  density?: 'low' | 'medium' | 'high';
  color?: string;
  opacity?: number;
  animate?: boolean;
  children?: React.ReactNode;
}

interface BinaryStream {
  id: number;
  x: number;
  y: number;
  length: number;
  speed: number;
  chars: string[];
  opacity: number;
}

const BinaryBackground: React.FC<BinaryBackgroundProps> = ({
  speed = 'medium',
  density = 'medium',
  color = 'var(--neon-green)',
  opacity = 0.15,
  animate = true,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [streams, setStreams] = useState<BinaryStream[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number | null>(null);
  
  // Speed configuration
  const speedConfig = {
    slow: { min: 0.5, max: 1.5 },
    medium: { min: 1, max: 3 },
    fast: { min: 2, max: 5 }
  };
  
  // Density configuration
  const densityConfig = {
    low: 20,
    medium: 40,
    high: 80
  };

  // Initialize binary streams
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Create streams based on dimensions and density
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const streamCount = Math.floor((dimensions.width / 1200) * densityConfig[density]);
    const newStreams: BinaryStream[] = [];
    
    for (let i = 0; i < streamCount; i++) {
      const x = Math.random() * dimensions.width;
      const length = Math.floor(Math.random() * 15) + 8; // 8-22 characters in length
      const chars = [];
      
      // Generate binary + occasional special chars
      for (let j = 0; j < length; j++) {
        // 90% chance of binary, 10% special characters
        if (Math.random() > 0.1) {
          chars.push(Math.random() > 0.5 ? '1' : '0');
        } else {
          // Special characters occasionally for visual interest
          const options = ['$', '#', '%', '&', '+', '*', '!', '?', '<', '>'];
          chars.push(options[Math.floor(Math.random() * options.length)]);
        }
      }
      
      newStreams.push({
        id: i,
        x,
        y: Math.random() * -300, // Start above the viewport
        length,
        speed: Math.random() * (speedConfig[speed].max - speedConfig[speed].min) + speedConfig[speed].min,
        chars,
        opacity: (Math.random() * 0.5) + 0.3 // Varying opacity
      });
    }
    
    setStreams(newStreams);
  }, [dimensions, density, speed]);
  
  // Animate the streams
  useEffect(() => {
    if (!animate || streams.length === 0) return;
    
    let lastTime = 0;
    
    const animateStreams = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;
      
      setStreams(prevStreams => {
        return prevStreams.map(stream => {
          // Move the stream down
          let y = stream.y + stream.speed * (deltaTime / 16);
          
          // Reset if it's gone off screen
          if (y > dimensions.height + 200) {
            y = Math.random() * -300;
            
            // Occasionally change the characters
            if (Math.random() > 0.7) {
              const newChars = [...stream.chars];
              const changeIndex = Math.floor(Math.random() * stream.length);
              if (Math.random() > 0.1) {
                newChars[changeIndex] = Math.random() > 0.5 ? '1' : '0';
              } else {
                const options = ['$', '#', '%', '&', '+', '*', '!', '?', '<', '>'];
                newChars[changeIndex] = options[Math.floor(Math.random() * options.length)];
              }
              return { ...stream, y, chars: newChars };
            }
          }
          
          return { ...stream, y };
        });
      });
      
      animationRef.current = requestAnimationFrame(animateStreams);
    };
    
    animationRef.current = requestAnimationFrame(animateStreams);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, streams, dimensions.height]);
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {animate ? (
        // Canvas for binary streams
        <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
          {streams.map(stream => (
            <div
              key={stream.id}
              className="absolute font-terminal text-xs leading-none tracking-widest"
              style={{
                left: `${stream.x}px`,
                top: `${stream.y}px`,
                color,
                opacity: stream.opacity
              }}
            >
              {stream.chars.map((char, i) => (
                <div 
                  key={i}
                  style={{
                    opacity: 1 - (i / stream.length)
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Static version with motion div
        <motion.div 
          className="absolute inset-0 pointer-events-none font-terminal text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          transition={{ duration: 1 }}
        >
          {[...Array(densityConfig[density])].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color,
                opacity: (Math.random() * 0.5) + 0.3
              }}
            >
              {[...Array(Math.floor(Math.random() * 10) + 5)].map((_, j) => (
                <div key={j}>
                  {Math.random() > 0.1 
                    ? (Math.random() > 0.5 ? '1' : '0')
                    : ['$', '#', '%', '&', '+', '*'][Math.floor(Math.random() * 6)]
                  }
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      )}
      
      {/* Content layered on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BinaryBackground;

++++=== [10] ./src/components/common/CyberBadge.tsx ===+++
'use client';

import React from 'react';
import { motion } from 'framer-motion';

type BadgeVariant = 'skill' | 'cert' | 'clearance' | 'tool';
type BadgeLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

interface CyberBadgeProps {
  label: string;
  variant?: BadgeVariant;
  level?: BadgeLevel;
  icon?: React.ReactNode;
  animated?: boolean;
}

const CyberBadge: React.FC<CyberBadgeProps> = ({
  label,
  variant = 'skill',
  level = 'intermediate',
  icon,
  animated = true
}) => {
  // Map variants to colors
  const variantColors = {
    skill: {
      bg: 'var(--dark-tertiary)',
      border: 'var(--neon-green)',
      text: 'var(--neon-green)'
    },
    cert: {
      bg: 'var(--dark-tertiary)',
      border: 'var(--cyber-blue)',
      text: 'var(--cyber-blue)'
    },
    clearance: {
      bg: 'var(--dark-tertiary)',
      border: 'var(--neon-purple)',
      text: 'var(--neon-purple)'
    },
    tool: {
      bg: 'var(--dark-tertiary)',
      border: '#f8f8f2',
      text: '#f8f8f2'
    }
  };

  // Map levels to intensity
  const levelIntensity = {
    basic: {
      borderWidth: '1px',
      glowIntensity: '0.3',
      borderStyle: 'dashed'
    },
    intermediate: {
      borderWidth: '1px',
      glowIntensity: '0.5',
      borderStyle: 'solid'
    },
    advanced: {
      borderWidth: '2px',
      glowIntensity: '0.7',
      borderStyle: 'solid'
    },
    expert: {
      borderWidth: '2px',
      glowIntensity: '1',
      borderStyle: 'double'
    }
  };

  const colors = variantColors[variant];
  const intensity = levelIntensity[level];

  return (
    <motion.div
      className="inline-flex items-center py-1 px-3 rounded-md m-1 relative overflow-hidden"
      style={{
        backgroundColor: colors.bg,
        border: `${intensity.borderWidth} ${intensity.borderStyle} ${colors.border}`,
        boxShadow: `0 0 5px rgba(${colors.border}, ${intensity.glowIntensity})`,
      }}
      whileHover={animated ? { scale: 1.05 } : {}}
      whileTap={animated ? { scale: 0.95 } : {}}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            ${colors.border} 10px,
            ${colors.border} 12px
          )`
        }}
      />

      {/* Icon */}
      {icon && (
        <motion.div 
          className="mr-2"
          animate={animated ? { rotateY: [0, 360] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          {icon}
        </motion.div>
      )}

      {/* Label */}
      <span
        className="font-cyber text-sm relative z-10"
        style={{ color: colors.text }}
      >
        {label}
      </span>
      
      {/* Scan line animation */}
      {animated && (
        <motion.div
          className="absolute inset-y-0 w-full pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear",
            repeatDelay: 2
          }}
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${colors.border}33 50%, 
              transparent 100%
            )`,
            width: '50%'
          }}
        />
      )}
    </motion.div>
  );
};

export default CyberBadge;

++++=== [11] ./src/components/common/CyberCard.tsx ===+++
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaUnlock, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

interface CyberCardProps {
  title: string;
  content: React.ReactNode;
  image?: string;
  securityLevel?: 'public' | 'confidential' | 'secret' | 'top-secret';
  className?: string;
  onClick?: () => void;
  animated?: boolean;
  initiallyLocked?: boolean;
  children?: React.ReactNode;
}

const CyberCard: React.FC<CyberCardProps> = ({
  title,
  content,
  image,
  securityLevel = 'public',
  className = '',
  onClick,
  animated = true,
  initiallyLocked = false,
  children
}) => {
  const [isLocked, setIsLocked] = useState(initiallyLocked);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [hoverState, setHoverState] = useState(false);

  // Security level colors
  const securityColors = {
    'public': {
      bgColor: 'var(--cyber-blue)',
      borderColor: 'var(--cyber-blue)',
      textColor: 'white'
    },
    'confidential': {
      bgColor: 'var(--neon-green)',
      borderColor: 'var(--neon-green)',
      textColor: 'white'
    },
    'secret': {
      bgColor: 'var(--neon-purple)',
      borderColor: 'var(--neon-purple)',
      textColor: 'white'
    },
    'top-secret': {
      bgColor: 'var(--error-red)',
      borderColor: 'var(--error-red)',
      textColor: 'white'
    }
  };

  const colors = securityColors[securityLevel];
  
  // Handle decryption animation
  useEffect(() => {
    if (isDecrypting) {
      const decryptTimer = setInterval(() => {
        setDecryptProgress(prev => {
          const newProgress = prev + (Math.random() * 10 + 5);
          if (newProgress >= 100) {
            clearInterval(decryptTimer);
            setIsDecrypting(false);
            setIsLocked(false);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      
      return () => clearInterval(decryptTimer);
    }
  }, [isDecrypting]);

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isLocked) {
      setIsDecrypting(true);
      setDecryptProgress(0);
    } else {
      setIsLocked(true);
    }
  };

  const toggleFlip = () => {
    if (onClick) {
      onClick();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  // Generate scrambled text for the locked state
  const getScrambledText = (text: string) => {
    if (!isLocked) return text;
    
    if (typeof text !== 'string') return '[ENCRYPTED]';
    
    return text
      .split('')
      .map(char => 
        Math.random() > 0.2 
          ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) 
          : char
      )
      .join('');
  };

  // Progress indicator for decryption
  const DecryptionProgress = () => (
    <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-800 overflow-hidden">
      <motion.div 
        className="h-full"
        style={{ 
          width: `${decryptProgress}%`, 
          backgroundColor: colors.borderColor
        }}
      />
    </div>
  );

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      whileHover={animated ? { scale: 1.02 } : {}}
      whileTap={animated ? { scale: 0.98 } : {}}
      onHoverStart={() => setHoverState(true)}
      onHoverEnd={() => setHoverState(false)}
    >
      <div 
        className={`
          w-full cursor-pointer transition-all duration-300
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
        onClick={toggleFlip}
      >
        {/* Front of card */}
        <motion.div
          className={`
            bg-dark-secondary border-2 rounded-lg overflow-hidden
            ${isFlipped ? 'hidden' : 'block'}
            relative
          `}
          style={{
            borderColor: colors.borderColor,
            boxShadow: hoverState ? `0 0 15px ${colors.borderColor}` : 'none',
          }}
        >
          {/* Security level badge */}
          <div 
            className="absolute top-3 right-3 z-10 px-2 py-1 rounded-md text-xs font-cyber flex items-center"
            style={{ 
              backgroundColor: `${colors.bgColor}33`,
              color: colors.textColor,
              border: `1px solid ${colors.borderColor}`
            }}
          >
            <FaShieldAlt className="mr-1" />
            {securityLevel.toUpperCase()}
          </div>

          {/* Lock/Unlock button */}
          <button
            className="absolute top-3 left-3 z-10 p-1.5 rounded-full"
            onClick={toggleLock}
            style={{ 
              backgroundColor: 'var(--dark-tertiary)',
              border: `1px solid ${isLocked ? 'var(--error-red)' : 'var(--neon-green)'}`
            }}
          >
            {isLocked ? (
              <FaLock className="text-red-500" size={14} />
            ) : (
              <FaUnlock className="text-neon-green" size={14} />
            )}
          </button>

          {/* Image section */}
          {image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={isLocked ? '' : image}
                alt={title}
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: isLocked ? 0 : 1 }}
              />
              
              {/* Encrypted image placeholder */}
              {isLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-tertiary">
                  <FaEyeSlash size={30} className="mb-2 text-gray-400" />
                  <div className="text-sm text-gray-400 font-terminal">[ENCRYPTED IMAGE]</div>
                  
                  {/* Noise overlay */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-gray-500"
                        style={{
                          width: `${Math.random() * 5 + 1}px`,
                          height: `${Math.random() * 100 + 10}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          opacity: Math.random() * 0.3,
                          transform: `rotate(${Math.random() * 90}deg)`
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base to-transparent" />
            </div>
          )}

          {/* Content section */}
          <div className="p-5 relative">
            <h3 
              className="text-xl font-cyber mb-3 text-glow transition-colors"
              style={{ color: isLocked ? 'var(--error-red)' : colors.textColor }}
            >
              {isLocked ? getScrambledText(title) : title}
            </h3>
            
            <div className="text-gray-300 font-normal text-sm relative">
              {/* Content with encryption effect */}
              <div style={{ opacity: isLocked ? 0 : 1 }}>
                {content}
              </div>
              
              {/* Encrypted overlay */}
              {isLocked && (
                <div className="absolute inset-0 font-terminal text-gray-400">
                  {/* Redacted text lines */}
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="mb-2 flex items-center">
                      <div 
                        className="h-3 bg-gray-700 rounded" 
                        style={{ width: `${Math.random() * 50 + 40}%` }}
                      />
                      {Math.random() > 0.7 && (
                        <span className="ml-2 text-xs">
                          [REDACTED]
                        </span>
                      )}
                    </div>
                  ))}
                  
                  {/* Binary code background */}
                  <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-red-500 text-opacity-70 font-terminal text-xs"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                      >
                        {Math.random() > 0.5 ? '1' : '0'}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {isDecrypting && <DecryptionProgress />}
          </div>
          
          {/* Scan line effect */}
          <div className="absolute inset-0 scan-line pointer-events-none" />
          
          {/* Flip indicator */}
          {animated && (
            <motion.div
              className="absolute bottom-2 right-2 text-gray-400"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4h18M3 12h18M3 20h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Back of card */}
        <motion.div
          className={`
            absolute inset-0 bg-dark-secondary border-2 rounded-lg overflow-hidden
            ${isFlipped ? 'block' : 'hidden'}
            rotate-y-180
          `}
          style={{ 
            borderColor: colors.borderColor,
            boxShadow: hoverState ? `0 0 15px ${colors.borderColor}` : 'none'
          }}
        >
          <div className="p-5 h-full flex flex-col">
            {children}
          </div>
          
          {/* Scan line effect */}
          <div className="absolute inset-0 scan-line pointer-events-none" />
        </motion.div>
      </div>
      
      {/* Matrix rain effect - only visible on hover */}
      {animated && hoverState && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xs font-terminal"
              initial={{ y: -20, x: Math.random() * 100 + '%' }}
              animate={{ y: '120%' }}
              transition={{ 
                duration: Math.random() * 2 + 1,
                repeat: Infinity, 
                repeatType: 'loop'
              }}
              style={{ 
                color: colors.textColor,
                opacity: 0.3,
                left: `${Math.random() * 100}%`
              }}
            >
              {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CyberCard;

++++=== [12] ./src/components/common/CyberErrorBoundary.tsx ===+++
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class CyberErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by CyberErrorBoundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-base flex items-center justify-center p-4">
          <motion.div
            className="max-w-md w-full p-6 bg-dark-secondary rounded-lg border border-cyber-blue relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Matrix rain effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="matrix-rain"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </div>
              ))}
            </div>

            {/* Error content */}
            <div className="relative z-10">
              <motion.div
                className="text-red-500 text-4xl font-cyber mb-4 glitch-text"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ERROR DETECTED
              </motion.div>

              <div className="font-terminal text-gray-300 mb-6">
                <div className="mb-2">
                  <span className="text-cyber-blue">&gt;</span> Status: Critical
                </div>
                <div className="mb-2">
                  <span className="text-cyber-blue">&gt;</span> Error Code: {this.state.error?.name || 'Unknown'}
                </div>
                <div className="mb-4">
                  <span className="text-cyber-blue">&gt;</span> Message: {this.state.error?.message || 'An unexpected error occurred'}
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  className="cyber-button-blue font-cyber text-sm"
                  onClick={this.handleRetry}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  INITIATE RECOVERY SEQUENCE
                </motion.button>
              </div>
            </div>

            {/* Scan line effect */}
            <div className="absolute inset-0 scan-line pointer-events-none" />
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CyberErrorBoundary;

++++=== [13] ./src/components/common/CyberLoading.tsx ===+++
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CyberSpinner from './CyberSpinner';

interface CyberLoadingProps {
  message?: string;
  loadingTime?: number; // Artificial loading time in ms, for demo purposes
}

const CyberLoading: React.FC<CyberLoadingProps> = ({ 
  message = 'Establishing secure connection', 
  loadingTime = 0
}) => {
  const [progress, setProgress] = useState(0);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Security-themed status messages
  const securitySteps = [
    'Initializing secure protocol',
    'Encrypting connection',
    'Verifying digital signature',
    'Performing security scan',
    'Loading encrypted data',
    'Establishing secure tunnel',
    'Connection established'
  ];

  // Progress bar animation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // If loadingTime is specified, use that to increment progress
    if (loadingTime > 0) {
      const increment = 100 / (loadingTime / 50); // Update every 50ms
      
      timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return newProgress;
        });
      }, 50);
    } else {
      // If no loadingTime, just do a controlled animation
      timer = setInterval(() => {
        setProgress(prev => {
          // Slow down as we approach 100%
          const increment = (100 - prev) / 10;
          const newProgress = prev + (increment < 0.5 ? 0.5 : increment);
          
          if (newProgress >= 99) {
            clearInterval(timer);
            return 99; // Never quite reaches 100% unless loading is complete
          }
          return newProgress;
        });
      }, 100);
    }
    
    return () => clearInterval(timer);
  }, [loadingTime]);
  
  // Add status messages over time
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (currentStep < securitySteps.length - 1) {
        setStatusMessages(prev => [...prev, securitySteps[currentStep]]);
        setCurrentStep(prev => prev + 1);
      } else {
        clearInterval(messageInterval);
      }
    }, loadingTime ? loadingTime / (securitySteps.length - 1) : 800);
    
    return () => clearInterval(messageInterval);
  }, [currentStep, loadingTime]);
  
  // Matrix characters for background
  const matrixChars: string[] = [];
  for (let i = 0; i < 100; i++) {
    matrixChars.push(String.fromCharCode(33 + Math.floor(Math.random() * 94)));
  }

  return (
    <div className="fixed inset-0 bg-dark-base flex flex-col items-center justify-center z-50">
      {/* Matrix rain background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {matrixChars.map((char, i) => (
          <motion.div
            key={i}
            className="absolute text-neon-green text-opacity-40 font-terminal"
            initial={{ 
              opacity: 0, 
              y: -100,
              x: Math.random() * window.innerWidth
            }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: window.innerHeight + 100 
            }}
            transition={{ 
              duration: Math.random() * 5 + 3, 
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "linear"
            }}
            style={{
              fontSize: `${Math.random() * 18 + 10}px`
            }}
          >
            {char}
          </motion.div>
        ))}
      </div>
      
      {/* Central loading content */}
      <div className="p-8 bg-dark-secondary bg-opacity-70 rounded-lg backdrop-blur-md border border-cyber-blue z-10 max-w-md w-full">
        <div className="flex flex-col items-center">
          {/* Logo placeholder - replace with your actual logo */}
          <motion.div
            className="mb-6 text-4xl font-cyber text-neon-green"
            animate={{ 
              textShadow: [
                "0 0 5px rgba(80, 250, 123, 0.5)", 
                "0 0 15px rgba(80, 250, 123, 0.8)", 
                "0 0 5px rgba(80, 250, 123, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CYBERVERSE
          </motion.div>
          
          {/* Custom spinner */}
          <div className="mb-8">
            <CyberSpinner size="lg" color="green" />
          </div>
          
          {/* Main status message */}
          <motion.div 
            className="text-xl font-cyber text-center mb-4 text-cyber-blue"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-dark-tertiary rounded-full overflow-hidden mb-4 relative">
            <motion.div 
              className="h-full bg-neon-green"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
            />
            
            {/* Scan line animation */}
            <motion.div
              className="absolute top-0 h-full w-4 bg-white opacity-50"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Status message log */}
          <div className="font-terminal text-sm text-gray-300 max-h-32 overflow-y-auto w-full terminal-scrollbar">
            {statusMessages.map((msg, i) => (
              <motion.div 
                key={i}
                className="mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-neon-green mr-2">&gt;</span>
                {msg}
              </motion.div>
            ))}
            
            {/* Typing indicator */}
            {currentStep < securitySteps.length - 1 && (
              <motion.div
                className="flex items-center"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-neon-green mr-2">&gt;</span>
                <span className="h-4 w-2 bg-cyber-blue inline-block"/>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none scan-line opacity-30" />
    </div>
  );
};

export default CyberLoading;

++++=== [14] ./src/components/common/CyberNotification.tsx ===+++
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaCheckCircle, 
  FaTimes,
  FaLock,
  FaUnlock
} from 'react-icons/fa';

type NotificationType = 'info' | 'warning' | 'error' | 'success' | 'security';

interface CyberNotificationProps {
  type?: NotificationType;
  message: string;
  details?: string;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showEncryptedEffect?: boolean;
}

const CyberNotification: React.FC<CyberNotificationProps> = ({
  type = 'info',
  message,
  details,
  autoClose = false,
  duration = 5000,
  onClose,
  position = 'top-right',
  showEncryptedEffect = false
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDecrypted, setIsDecrypted] = useState(!showEncryptedEffect);
  const [decryptProgress, setDecryptProgress] = useState(0);

  // Handle auto-close
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (autoClose && isVisible) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoClose, duration, isVisible]);

  // Handle decryption effect
  useEffect(() => {
    if (showEncryptedEffect && !isDecrypted) {
      const decryptionTimer = setInterval(() => {
        setDecryptProgress(prev => {
          const newProgress = prev + (Math.random() * 5 + 2);
          if (newProgress >= 100) {
            clearInterval(decryptionTimer);
            setIsDecrypted(true);
            return 100;
          }
          return newProgress;
        });
      }, 100);
      
      return () => clearInterval(decryptionTimer);
    }
  }, [showEncryptedEffect, isDecrypted]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 300); // Wait for exit animation
    }
  };

  // Position styles
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  // Type-based styles and icons
  const typeConfig = {
    info: {
      icon: FaInfoCircle,
      border: 'var(--cyber-blue)',
      bg: 'rgba(139, 233, 253, 0.1)',
      text: 'var(--cyber-blue)'
    },
    warning: {
      icon: FaExclamationTriangle,
      border: '#f1fa8c',
      bg: 'rgba(241, 250, 140, 0.1)',
      text: '#f1fa8c'
    },
    error: {
      icon: FaUnlock,
      border: 'var(--error-red)',
      bg: 'rgba(255, 85, 85, 0.1)',
      text: 'var(--error-red)'
    },
    success: {
      icon: FaCheckCircle,
      border: 'var(--neon-green)',
      bg: 'rgba(80, 250, 123, 0.1)',
      text: 'var(--neon-green)'
    },
    security: {
      icon: FaShieldAlt,
      border: 'var(--neon-purple)',
      bg: 'rgba(189, 147, 249, 0.1)',
      text: 'var(--neon-purple)'
    }
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;
  
  // Function to scramble text for decryption effect
  const getDisplayText = (text: string) => {
    if (isDecrypted) return text;
    
    return text.split('').map((char, i) => {
      // More characters become decrypted as progress increases
      const charPosition = (i / text.length) * 100;
      if (charPosition < decryptProgress) {
        return char;
      }
      // Return random character otherwise
      return String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }).join('');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 max-w-md w-full ${positionStyles[position]}`}
          initial={{ opacity: 0, y: position.includes('top') ? -20 : 20, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: position.includes('right') ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="rounded-md overflow-hidden relative"
            style={{ 
              borderLeft: `4px solid ${config.border}`,
              backgroundColor: 'var(--dark-secondary)',
              boxShadow: `0 0 15px rgba(0, 0, 0, 0.4), 0 0 5px ${config.border}`
            }}
          >
            {/* Scan line animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none scan-line opacity-20" />
            
            {/* Main content */}
            <div className="p-4 pl-3 pr-10">
              <div className="flex items-start">
                {/* Icon */}
                <motion.div 
                  className="mr-3 mt-0.5 flex-shrink-0"
                  animate={{ 
                    rotate: type === 'error' ? [0, 15, -15, 0] : 0,
                    scale: isDecrypted ? 1 : [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: type === 'error' ? 0.5 : 2, 
                    repeat: Infinity, 
                    repeatType: "loop" 
                  }}
                  style={{ color: config.text }}
                >
                  <IconComponent size={20} />
                </motion.div>

                {/* Text content */}
                <div className="flex-1">
                  <h4 
                    className="font-cyber text-sm mb-1"
                    style={{ color: config.text }}
                  >
                    {getDisplayText(message)}
                  </h4>
                  
                  {details && (
                    <p className="text-gray-300 text-xs font-terminal">
                      {getDisplayText(details)}
                    </p>
                  )}
                  
                  {/* Decryption progress bar */}
                  {showEncryptedEffect && !isDecrypted && (
                    <div className="mt-2 h-1 bg-dark-tertiary w-full rounded overflow-hidden">
                      <motion.div 
                        className="h-full"
                        style={{ 
                          width: `${decryptProgress}%`,
                          backgroundColor: config.text
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <FaTimes size={14} />
            </button>
            
            {/* Status indicator dots */}
            <div className="absolute bottom-2 right-2 flex space-x-1">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.text }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.text }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.text }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              />
            </div>
            
            {/* Matrix characters effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {!isDecrypted && [...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs font-terminal"
                  style={{
                    color: config.text,
                    opacity: 0.3,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: Math.random() * 2
                  }}
                >
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </motion.div>
              ))}
            </div>
            
            {/* Auto-close progress bar */}
            {autoClose && (
              <motion.div 
                className="h-1 bg-gray-700 absolute bottom-0 left-0"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                style={{ backgroundColor: config.border }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Notification Manager Component
export const CyberNotificationManager: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  // This would be the container for multiple notifications
  // In a real implementation, this would manage a queue of notifications
  return (
    <div className="cyber-notification-container">
      {children}
    </div>
  );
};

export default CyberNotification;

++++=== [15] ./src/components/common/CyberSpinner.tsx ===+++
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CyberSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'blue' | 'purple';
}

const CyberSpinner: React.FC<CyberSpinnerProps> = ({ 
  size = 'md', 
  color = 'green' 
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorMap = {
    green: 'var(--neon-green)',
    blue: 'var(--cyber-blue)',
    purple: 'var(--neon-purple)'
  };

  return (
    <div className="relative">
      {/* Outer ring */}
      <motion.div
        className={`${sizeMap[size]} border-2 border-transparent rounded-full`}
        style={{
          borderTopColor: colorMap[color],
          borderRightColor: colorMap[color]
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Inner ring */}
      <motion.div
        className={`absolute inset-1 border-2 border-transparent rounded-full`}
        style={{
          borderTopColor: colorMap[color],
          opacity: 0.5
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Center dot */}
      <div 
        className={`absolute inset-0 m-auto rounded-full w-1.5 h-1.5`}
        style={{ backgroundColor: colorMap[color] }}
      />

      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `0 0 15px ${colorMap[color]}`,
          opacity: 0.3
        }}
      />
    </div>
  );
};

export default CyberSpinner;

++++=== [16] ./src/components/common/CyberTooltip.tsx ===+++
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CyberTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'info' | 'warning' | 'error' | 'success';
}

const CyberTooltip: React.FC<CyberTooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'info'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const variantStyles = {
    info: {
      border: 'border-cyber-blue',
      text: 'text-cyber-blue',
      shadow: '0 0 10px var(--cyber-blue)'
    },
    warning: {
      border: 'border-yellow-400',
      text: 'text-yellow-400',
      shadow: '0 0 10px #EAB308'
    },
    error: {
      border: 'border-red-500',
      text: 'text-red-500',
      shadow: '0 0 10px #EF4444'
    },
    success: {
      border: 'border-neon-green',
      text: 'text-neon-green',
      shadow: '0 0 10px var(--neon-green)'
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`
              absolute z-50 w-max max-w-xs
              ${positionStyles[position]}
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <div 
              className={`
                relative p-2 rounded
                bg-dark-secondary bg-opacity-95
                border ${variantStyles[variant].border}
                ${variantStyles[variant].text}
                text-sm font-terminal
              `}
              style={{
                boxShadow: variantStyles[variant].shadow
              }}
            >
              {/* Matrix rain background */}
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="matrix-rain"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${Math.random() * 2 + 1}s`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  >
                    {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <span className="mr-1">&gt;</span>
                {content}
              </div>

              {/* Scan line effect */}
              <div className="absolute inset-0 scan-line pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CyberTooltip;

++++=== [17] ./src/components/common/DynamicQRCode.tsx ===+++
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode.react';
import { Profile } from '@/types';

interface DynamicQRCodeProps {
  profile: Profile;
  size?: number;
  includeVCard?: boolean;
}

const DynamicQRCode: React.FC<DynamicQRCodeProps> = ({ 
  profile, 
  size = 150,
  includeVCard = true 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [qrType, setQrType] = useState<'portfolio' | 'linkedin' | 'github' | 'email'>('portfolio');
  
  // Generate portfolio URL (default QR code value)
  const portfolioUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  // Find social links
  const linkedinUrl = profile.socialLinks?.find(link => 
    link.platform.toLowerCase() === 'linkedin'
  )?.url || '';
  
  const githubUrl = profile.socialLinks?.find(link => 
    link.platform.toLowerCase() === 'github'
  )?.url || '';
  
  // Generate vCard data
  const generateVCardData = () => {
    let vCardData = 'BEGIN:VCARD\nVERSION:3.0\n';
    vCardData += `FN:${profile.name}\n`;
    
    if (profile.email) {
      vCardData += `EMAIL:${profile.email}\n`;
    }
    
    if (profile.phone) {
      vCardData += `TEL:${profile.phone}\n`;
    }
    
    profile.socialLinks?.forEach(link => {
      if (link.platform.toLowerCase() === 'linkedin') {
        vCardData += `URL;type=LINKEDIN:${link.url}\n`;
      } else if (link.platform.toLowerCase() === 'github') {
        vCardData += `URL;type=GITHUB:${link.url}\n`;
      } else if (link.platform.toLowerCase() === 'twitter') {
        vCardData += `URL;type=TWITTER:${link.url}\n`;
      }
    });
    
    vCardData += `URL;type=PORTFOLIO:${portfolioUrl}\n`;
    vCardData += 'END:VCARD';
    
    return vCardData;
  };
  
  // Update QR code value based on selected type
  useEffect(() => {
    switch (qrType) {
      case 'portfolio':
        setQrValue(portfolioUrl);
        break;
      case 'linkedin':
        setQrValue(linkedinUrl);
        break;
      case 'github':
        setQrValue(githubUrl);
        break;
      case 'email':
        setQrValue(`mailto:${profile.email}`);
        break;
      default:
        setQrValue(portfolioUrl);
    }
  }, [qrType, portfolioUrl, linkedinUrl, githubUrl, profile.email]);
  
  // Handle QR code flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Handle QR type change
  const changeQrType = (type: 'portfolio' | 'linkedin' | 'github' | 'email') => {
    setQrType(type);
  };
  
  // Generate vCard file download
  const downloadVCard = () => {
    const vCardData = generateVCardData();
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="qr-code-container" style={{ width: size, height: size }}>
        <div 
          className="qr-code" 
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          onClick={handleFlip}
        >
          <div className="qr-code-front bg-white p-2">
            <QRCode 
              value={qrValue}
              size={size - 20}
              level="H"
              imageSettings={{
                src: '/logo.png',
                excavate: true,
                width: 30,
                height: 30
              }}
            />
          </div>
          <div className="qr-code-back">
            <div className="flex flex-col items-center justify-center h-full p-2">
              <h4 className="text-xs font-cyber mb-3 text-center text-neon-green">Select QR Type</h4>
              <div className="grid grid-cols-2 gap-2 w-full">
                <button 
                  onClick={() => changeQrType('portfolio')}
                  className={`text-xs px-2 py-1 rounded ${
                    qrType === 'portfolio' 
                      ? 'bg-neon-green text-dark-base' 
                      : 'bg-dark-tertiary text-white'
                  }`}
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => changeQrType('linkedin')}
                  className={`text-xs px-2 py-1 rounded ${
                    qrType === 'linkedin' 
                      ? 'bg-neon-green text-dark-base' 
                      : 'bg-dark-tertiary text-white'
                  }`}
                  disabled={!linkedinUrl}
                >
                  LinkedIn
                </button>
                <button 
                  onClick={() => changeQrType('github')}
                  className={`text-xs px-2 py-1 rounded ${
                    qrType === 'github' 
                      ? 'bg-neon-green text-dark-base' 
                      : 'bg-dark-tertiary text-white'
                  }`}
                  disabled={!githubUrl}
                >
                  GitHub
                </button>
                <button 
                  onClick={() => changeQrType('email')}
                  className={`text-xs px-2 py-1 rounded ${
                    qrType === 'email' 
                      ? 'bg-neon-green text-dark-base' 
                      : 'bg-dark-tertiary text-white'
                  }`}
                  disabled={!profile.email}
                >
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-cyber-gray mt-2">
        {isFlipped ? 'Select QR type' : `Scan for ${qrType}`}
      </div>
      
      <div className="text-xs text-cyber-gray mt-1 mb-3">
        (Click to {isFlipped ? 'show QR' : 'change'})
      </div>
      
      {includeVCard && (
        <motion.button
          onClick={downloadVCard}
          className="vcard-download"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download vCard</span>
        </motion.button>
      )}
    </div>
  );
};

export default DynamicQRCode;

++++=== [18] ./src/components/common/FloatingContact.tsx ===+++
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaLock, FaUnlock, FaShieldAlt, FaShieldVirus } from 'react-icons/fa';

interface MatrixRainProps {
  intensity: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ intensity }) => {
  const [raindrops, setRaindrops] = useState<Array<{
    id: number;
    left: number;
    duration: number;
    delay: number;
    char: string;
  }>>([]);

  useEffect(() => {
    const generateRaindrops = () => {
      const drops = [];
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      
      for (let i = 0; i < intensity; i++) {
        drops.push({
          id: i,
          left: Math.floor(Math.random() * 100),
          duration: 1 + Math.random() * 2,
          delay: Math.random() * 2,
          char: chars[Math.floor(Math.random() * chars.length)]
        });
      }
      setRaindrops(drops);
    };

    generateRaindrops();
  }, [intensity]);

  return (
    <div className="matrix-container absolute inset-0 overflow-hidden pointer-events-none">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="matrix-raindrop absolute top-0 font-mono text-sm"
          initial={{ y: '-20%', opacity: 0.4 }}
          animate={{ y: '120%', opacity: 0.4 }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            left: `${drop.left}%`,
            color: 'var(--neon-green)'
          }}
        >
          {drop.char}
        </motion.div>
      ))}
    </div>
  );
};

interface ContactInfo {
  github: string;
  linkedin: string;
  email: string;
}

interface FloatingContactProps {
  contactInfo: ContactInfo;
}

const FloatingContact: React.FC<FloatingContactProps> = ({ contactInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const [matrixIntensity, setMatrixIntensity] = useState(20);

  useEffect(() => {
    setMatrixIntensity(isExpanded ? 40 : 20);
  }, [isExpanded]);

  const contactLinks = [
    {
      icon: FaGithub,
      url: contactInfo.github,
      label: 'GitHub',
      color: 'var(--neon-purple)'
    },
    {
      icon: FaLinkedin,
      url: contactInfo.linkedin,
      label: 'LinkedIn',
      color: 'var(--cyber-blue)'
    },
    {
      icon: FaEnvelope,
      url: `mailto:${contactInfo.email}`,
      label: 'Email',
      color: 'var(--neon-green)'
    }
  ];

  const scrambleText = useCallback((text: string) => {
    if (isSecure) return text;
    return text.split('').map(char => 
      Math.random() > 0.7 ? '█' : char
    ).join('');
  }, [isSecure]);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-64 p-4 rounded-lg bg-dark-base border border-cyber-blue cyber-card"
            style={{ 
              backdropFilter: 'blur(10px)',
              boxShadow: `0 0 15px ${isSecure ? 'var(--neon-green)' : 'var(--error-red)'}` 
            }}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-dark-tertiary">
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: isSecure ? 0 : 360 }}
                  transition={{ duration: 1, repeat: isSecure ? 0 : Infinity }}
                >
                  {isSecure ? (
                    <FaShieldAlt className="text-neon-green mr-2" />
                  ) : (
                    <FaShieldVirus className="text-red-500 mr-2" />
                  )}
                </motion.div>
                <motion.span 
                  className={`text-xs font-terminal ${isSecure ? 'text-neon-green' : 'text-red-500'}`}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isSecure ? 'SECURE CONNECTION' : 'UNSECURE CONNECTION'}
                </motion.span>
              </div>
              <motion.button
                onClick={() => setIsSecure(!isSecure)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-xs"
              >
                {isSecure ? <FaLock className="text-neon-green" /> : <FaUnlock className="text-red-500" />}
              </motion.button>
            </div>

            <div className="space-y-4 relative">
              <MatrixRain intensity={matrixIntensity} />

              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={isSecure ? link.url : '#'}
                  onClick={e => !isSecure && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 p-2 rounded-md hover:bg-dark-tertiary transition-all group relative z-20 ${!isSecure ? 'cursor-not-allowed' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={isSecure ? { x: 5, scale: 1.02 } : { x: 0 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: !isSecure ? [0, 15, -15, 0] : 0,
                      scale: !isSecure ? [1, 1.1, 0.9, 1] : 1 
                    }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: !isSecure ? Infinity : 0
                    }}
                  >
                    <link.icon
                      className="w-5 h-5 transition-all"
                      style={{ 
                        color: isSecure ? link.color : 'rgba(180, 180, 180, 0.7)',
                        filter: isSecure ? `drop-shadow(0 0 3px ${link.color})` : 'none'
                      }}
                    />
                  </motion.div>
                  <span 
                    className={`text-sm font-cyber ${isSecure ? 'text-white group-hover:text-glow' : 'text-gray-500'}`}
                    style={{ textShadow: isSecure ? `0 0 8px ${link.color}` : 'none' }}
                  >
                    {scrambleText(link.label)}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="cyber-button-sm relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MatrixRain intensity={10} />
        <span className="relative z-10">
          {isExpanded ? 'Close Contact' : 'Contact Me'}
        </span>
      </motion.button>
    </div>
  );
};

export default FloatingContact;

++++=== [19] ./src/components/common/PasswordStrengthMeter.tsx ===+++
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaLock, FaUnlock, FaShieldAlt } from 'react-icons/fa';

interface PasswordStrengthMeterProps {
  password: string;
  showFeedback?: boolean;
}

type StrengthLevel = 'empty' | 'weak' | 'medium' | 'strong' | 'very-strong';

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  showFeedback = true,
}) => {
  const [strength, setStrength] = useState<StrengthLevel>('empty');
  const [score, setScore] = useState(0);
  const [feedbackItems, setFeedbackItems] = useState<{text: string, met: boolean}[]>([]);
  const [crackTime, setCrackTime] = useState('');
  const [decoding, setDecoding] = useState(false);
  
  // Evaluate password strength
  useEffect(() => {
    if (!password) {
      setStrength('empty');
      setScore(0);
      setCrackTime('');
      return;
    }
    
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    const isLongEnough = password.length >= 8;
    const isVeryLong = password.length >= 12;
    
    let newScore = 0;
    if (hasUppercase) newScore += 1;
    if (hasLowercase) newScore += 1;
    if (hasNumbers) newScore += 1;
    if (hasSpecialChars) newScore += 1;
    if (isLongEnough) newScore += 1;
    if (isVeryLong) newScore += 1;
    
    let newStrength: StrengthLevel = 'weak';
    if (newScore === 0) newStrength = 'empty';
    else if (newScore <= 2) newStrength = 'weak';
    else if (newScore <= 4) newStrength = 'medium';
    else if (newScore <= 5) newStrength = 'strong';
    else newStrength = 'very-strong';
    
    setScore(newScore);
    setStrength(newStrength);
    
    // Update feedback items
    setFeedbackItems([
      { text: 'Contains uppercase letters (A-Z)', met: hasUppercase },
      { text: 'Contains lowercase letters (a-z)', met: hasLowercase },
      { text: 'Contains numbers (0-9)', met: hasNumbers },
      { text: 'Contains special characters (!@#$...)', met: hasSpecialChars },
      { text: 'At least 8 characters long', met: isLongEnough },
      { text: 'At least 12 characters long (recommended)', met: isVeryLong }
    ]);
    
    // Simulate crack time calculation
    setDecoding(true);
    setTimeout(() => {
      setDecoding(false);
      
      let timeEstimate = '';
      if (newStrength === 'weak') timeEstimate = 'Seconds to minutes';
      else if (newStrength === 'medium') timeEstimate = 'Hours to days';
      else if (newStrength === 'strong') timeEstimate = 'Months to years';
      else if (newStrength === 'very-strong') timeEstimate = 'Centuries';
      
      setCrackTime(timeEstimate);
    }, 800);
    
  }, [password]);
  
  // Color mapping
  const colorMap = {
    'empty': 'gray',
    'weak': 'var(--error-red)',
    'medium': 'orange',
    'strong': 'var(--neon-green)',
    'very-strong': 'var(--cyber-blue)'
  };
  
  // Label mapping
  const labelMap = {
    'empty': 'No Password',
    'weak': 'Weak',
    'medium': 'Medium',
    'strong': 'Strong',
    'very-strong': 'Very Strong'
  };

  return (
    <div className="w-full p-4 bg-dark-base border border-dark-tertiary rounded-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center">
          {strength === 'empty' ? (
            <FaUnlock className="mr-2 text-gray-500" />
          ) : (
            <motion.div
              animate={{ 
                rotate: strength === 'weak' ? [0, 15, -15, 0] : 0 
              }}
              transition={{ 
                duration: 0.5, 
                repeat: strength === 'weak' ? Infinity : 0,
                repeatDelay: 2
              }}
            >
              <FaLock 
                className="mr-2" 
                style={{ color: colorMap[strength] as string }} 
              />
            </motion.div>
          )}
          
          <div className="font-cyber text-sm" style={{ color: colorMap[strength] as string }}>
            {labelMap[strength]}
          </div>
        </div>
        
        {crackTime && !decoding && (
          <div className="text-xs font-terminal text-gray-400 flex items-center">
            <span className="mr-1">Estimated crack time:</span>
            <motion.span
              style={{ color: colorMap[strength] as string }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {crackTime}
            </motion.span>
          </div>
        )}
        
        {decoding && (
          <motion.div 
            className="text-xs font-terminal text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            Calculating...
          </motion.div>
        )}
      </div>
      
      {/* Strength meter */}
      <div className="h-2 w-full bg-dark-tertiary rounded-full mb-4 overflow-hidden relative">
        <motion.div
          className="h-full absolute top-0 left-0"
          style={{ 
            backgroundColor: colorMap[strength] as string,
            width: strength === 'empty' ? '0%' : `${(score / 6) * 100}%`
          }}
          initial={{ width: '0%' }}
          animate={{ width: strength === 'empty' ? '0%' : `${(score / 6) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Scan line effect */}
        {strength !== 'empty' && (
          <motion.div
            className="absolute top-0 h-full w-4 bg-white"
            initial={{ left: '-10%' }}
            animate={{ left: '110%' }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: 'loop',
              ease: 'linear'
            }}
            style={{ opacity: 0.3 }}
          />
        )}
      </div>
      
      {/* Feedback section */}
      {showFeedback && (
        <div className="space-y-2">
          <div className="text-xs uppercase font-terminal tracking-wide text-gray-400 mb-1 flex items-center">
            <FaShieldAlt className="mr-1" />
            Security Requirements
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {feedbackItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.met ? (
                  <FaCheckCircle className="text-neon-green mt-0.5 mr-2 flex-shrink-0" size={14} />
                ) : (
                  <FaTimesCircle className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" size={14} />
                )}
                <span className={`text-xs ${item.met ? 'text-gray-300' : 'text-gray-500'}`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Binary decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none overflow-hidden opacity-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute font-terminal text-xs"
            style={{
              color: colorMap[strength] as string,
              top: `${Math.random() * 100}%`,
              right: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>
    </div>
  );
};

// Demo component with input
export const PasswordInputWithMeter: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to test strength"
          className="w-full p-3 bg-dark-secondary border border-dark-tertiary rounded-md text-white font-terminal"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      
      <PasswordStrengthMeter password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;

++++=== [20] ./src/components/dashboard/ActiveIncidentsTracker.tsx ===+++
import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationCircle, FaSearch, FaShieldAlt, FaLock } from 'react-icons/fa';
import type { SecurityIncident } from '@/types';

interface ActiveIncidentsTrackerProps {
  incidents: SecurityIncident[];
}

const ActiveIncidentsTracker: React.FC<ActiveIncidentsTrackerProps> = ({ incidents }) => {
  // Get icon based on incident type
  const getIncidentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'intrusion':
        return <FaExclamationCircle className="text-red-500" />;
      case 'reconnaissance':
        return <FaSearch className="text-yellow-400" />;
      case 'malware':
        return <FaShieldAlt className="text-orange-400" />;
      case 'data breach':
        return <FaLock className="text-red-600" />;
      default:
        return <FaExclamationCircle className="text-yellow-400" />;
    }
  };

  // Get style based on severity
  const getSeverityStyle = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-900/30 border-red-500 text-red-400';
      case 'high':
        return 'bg-orange-900/30 border-orange-500 text-orange-400';
      case 'medium':
        return 'bg-yellow-900/30 border-yellow-500 text-yellow-400';
      case 'low':
        return 'bg-green-900/30 border-green-500 text-green-400';
      default:
        return 'bg-blue-900/30 border-blue-500 text-blue-400';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="cyber-card h-full overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-cyber custom-text-neon-green">Active Incidents</h3>
        <span className="bg-gray-800 rounded-full px-3 py-1 text-sm font-mono">
          {incidents.length} Active
        </span>
      </div>
      
      <motion.div 
        className="overflow-y-auto max-h-[300px] terminal-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {incidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <FaShieldAlt className="text-3xl mb-2 custom-text-neon-green" />
            <p>No active incidents</p>
          </div>
        ) : (
          incidents.map((incident, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-3 border-l-2 m-3 rounded ${getSeverityStyle(incident.severity)} relative overflow-hidden`}
            >
              {/* Animated scan line effect for critical incidents */}
              {incident.severity.toLowerCase() === 'critical' && (
                <div className="absolute inset-0 security-scan opacity-20"></div>
              )}
              
              {/* Glitch effect for critical text */}
              <div className="flex items-start mb-1">
                <div className="mr-3 mt-1">{getIncidentIcon(incident.type)}</div>
                <div>
                  <h4 className={incident.severity.toLowerCase() === 'critical' ? "font-bold glitch-text" : "font-bold"} data-text={incident.title}>
                    {incident.title}
                  </h4>
                  <div className="flex text-xs mt-1 space-x-3">
                    <span className="text-gray-400">ID: {incident.id}</span>
                    <span className="text-gray-400">{incident.timestamp}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm mt-2 text-gray-300 ml-8">{incident.description}</p>
              
              {/* Status indicator with pulse animation */}
              <div className="flex items-center mt-3 ml-8">
                <div className="relative mr-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75"></div>
                </div>
                <span className="text-xs text-gray-400">
                  {incident.status} • {incident.assignedTo ? `Assigned to ${incident.assignedTo}` : 'Unassigned'}
                </span>
              </div>
              
              {/* Actions row */}
              <div className="flex space-x-2 mt-3 ml-8">
                <button className="text-xs cyber-button-blue py-1 px-2">
                  Investigate
                </button>
                <button className="text-xs cyber-button py-1 px-2">
                  Resolve
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default ActiveIncidentsTracker;

++++=== [21] ./src/components/dashboard/CyberPulseDashboard.tsx ===+++
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaExclamationCircle, FaServer, FaBug, FaLock, FaChartLine, FaTools, FaNetworkWired, FaDatabase } from 'react-icons/fa';
import { CyberPulseDashboard as CyberPulseDashboardType } from '@/types';
import ThreatLevelIndicator from './ThreatLevelIndicator';
import ActiveIncidentsTracker from './ActiveIncidentsTracker';
import GlobalThreatMap from './GlobalThreatMap';
import SecurityNewsFeed from './SecurityNewsFeed';

interface CyberPulseDashboardProps {
  data: CyberPulseDashboardType;
}

const CyberPulseDashboard: React.FC<CyberPulseDashboardProps> = ({ data }) => {
  const [timeString, setTimeString] = useState('--:--:--');
  const [dateString, setDateString] = useState('--- --, ----');

  // Update the time and date every second - client side only
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: false }));
      setDateString(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };

    // Initial update
    updateTime();

    // Set interval for updates
    const interval = setInterval(updateTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 150 }
    }
  };

  // Calculate severity counts for displaying in cards
  const criticalCount = Array.isArray(data.activeIncidents) ? 
    data.activeIncidents.filter(incident => incident.severity === 'critical').length : 0;
  
  const highCount = Array.isArray(data.activeIncidents) ? 
    data.activeIncidents.filter(incident => incident.severity === 'high').length : 0;
  
  const mediumCount = Array.isArray(data.activeIncidents) ? 
    data.activeIncidents.filter(incident => incident.severity === 'medium').length : 0;
  
  const lowCount = Array.isArray(data.activeIncidents) ? 
    data.activeIncidents.filter(incident => incident.severity === 'low').length : 0;

  // Count active attacks from the threat map
  const activeAttacks = Array.isArray(data.globalThreatMap) ? 
    data.globalThreatMap.filter(threat => threat.isAttacking).length : 0;

  // Get latest vulnerability trends data
  const getVulnerabilityTrendTotals = () => {
    if (!Array.isArray(data.vulnerabilityTrends) || data.vulnerabilityTrends.length === 0) {
      return { critical: 0, high: 0, medium: 0, low: 0 };
    }
    const latest = data.vulnerabilityTrends[data.vulnerabilityTrends.length - 1];
    return {
      critical: latest.critical,
      high: latest.high,
      medium: latest.medium,
      low: latest.low
    };
  };

  const vulnerabilityTotals = getVulnerabilityTrendTotals();

  // Color helpers
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'custom-text-cyber-red';
      case 'high': return 'custom-text-cyber-orange';
      case 'medium': return 'custom-text-neon-yellow';
      case 'low': return 'custom-text-neon-green';
      default: return 'custom-text-cyber-blue';
    }
  };

  return (
    <motion.div 
      className="custom-bg-dark-base cyber-container py-8 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background cyber grid */}
      <div className="cyber-grid"></div>
      
      {/* Security scan effect */}
      <div className="cyber-scan-line"></div>
    
      {/* Header section */}
      <motion.div 
        className="responsive-grid mb-8 z-10 relative"
        variants={itemVariants}
      >
        <div className="col-span-8 md-col-span-6">
          <h2 className="text-3xl md:text-4xl font-cyber-heading custom-text-neon-green mb-2">
            CyberPulse Dashboard
          </h2>
          <p className="text-gray-400 mb-2 font-terminal">
            Real-time security monitoring and analytics
          </p>
        </div>
        
        <div className="col-span-4 md-col-span-6 flex flex-col items-end">
          <div className="text-xl font-terminal custom-text-neon-blue">
            {timeString}
          </div>
          <div className="text-gray-400 font-terminal text-sm">
            {dateString}
          </div>
        </div>
      </motion.div>
      
      {/* Main dashboard content */}
      <div className="responsive-grid gap-6 z-10 relative">
        {/* Threat Level */}
        <motion.div variants={itemVariants} className="col-span-12 md-col-span-6 lg-col-span-4">
          <ThreatLevelIndicator 
            level={data.threatLevel} 
            description={data.threatLevelDescription || ''} 
          />
        </motion.div>
        
        {/* Active Incidents */}
        <motion.div variants={itemVariants} className="col-span-12 md-col-span-6 lg-col-span-8">
          <ActiveIncidentsTracker incidents={data.activeIncidents || []} />
        </motion.div>
        
        {/* Security Status Cards */}
        <motion.div variants={itemVariants} className="col-span-12">
          <div className="cyber-card-grid">
            {/* Security Score */}
            <div className="cyber-card p-4 shadow-glow-green flex flex-col items-center justify-center">
              <FaShieldAlt className="text-3xl custom-text-neon-green mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Security Score</h3>
              <p className="text-2xl font-bold font-cyber custom-text-neon-green">
                {data.securityScore}%
              </p>
            </div>
            
            {/* Active Threats */}
            <div className="cyber-card p-4 shadow-glow-red flex flex-col items-center justify-center">
              <FaExclamationCircle className="text-3xl custom-text-cyber-red mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Active Threats</h3>
              <p className="text-2xl font-bold font-cyber custom-text-cyber-red">
                {activeAttacks}
              </p>
            </div>
            
            {/* Vulnerabilities */}
            <div className="cyber-card p-4 cyber-shadow-blue flex flex-col items-center justify-center">
              <FaBug className="text-3xl custom-text-cyber-orange mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Vulnerabilities</h3>
              <p className="text-2xl font-bold font-cyber custom-text-cyber-orange">
                {Array.isArray(data.vulnerabilities) ? data.vulnerabilities.length : 0}
              </p>
            </div>
            
            {/* System Status */}
            <div className="cyber-card p-4 cyber-shadow flex flex-col items-center justify-center">
              <FaServer className="text-3xl custom-text-cyber-blue mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Systems</h3>
              <p className="text-2xl font-bold font-cyber custom-text-cyber-blue">
                {Array.isArray(data.systemStatus) ? 
                  `${data.systemStatus.filter(s => s.status === 'online').length}/${data.systemStatus.length}` : 
                  '0/0'}
              </p>
            </div>
            
            {/* Patch Status */}
            <div className="cyber-card p-4 cyber-shadow-purple flex flex-col items-center justify-center">
              <FaTools className="text-3xl custom-text-neon-purple mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Patches</h3>
              <p className="text-2xl font-bold font-cyber custom-text-neon-purple">
                {data.patches ? `${data.patches.applied}/${data.patches.available}` : '0/0'}
              </p>
            </div>
            
            {/* Network Traffic */}
            <div className="cyber-card p-4 cyber-shadow flex flex-col items-center justify-center">
              <FaNetworkWired className="text-3xl custom-text-neon-blue mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Network Traffic</h3>
              <p className="text-2xl font-bold font-cyber custom-text-neon-blue">
                {data.networkTraffic || '0 B/s'}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Global Threat Map */}
        <motion.div variants={itemVariants} className="col-span-12 lg-col-span-8">
          <GlobalThreatMap threatData={data.globalThreatMap} />
        </motion.div>
        
        {/* Security News Feed */}
        <motion.div variants={itemVariants} className="col-span-12 lg-col-span-4">
          <SecurityNewsFeed newsItems={data.securityNewsFeed} />
        </motion.div>
        
        {/* Vulnerability Details Section */}
        <motion.div variants={itemVariants} className="col-span-12 mt-4">
          <div className="cyber-card p-6">
            <h3 className="font-cyber-heading text-xl custom-text-neon-green mb-4">
              Vulnerability Assessment
            </h3>
            
            <div className="responsive-grid gap-6">
              {/* Vulnerability Trend Chart */}
              <div className="col-span-12 lg-col-span-7">
                <div className="custom-bg-dark-secondary p-4 rounded-lg min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <FaChartLine className="text-4xl custom-text-neon-blue mb-3 mx-auto" />
                    <p className="font-terminal text-gray-400">Vulnerability Trend Visualization</p>
                  </div>
                </div>
              </div>
              
              {/* Vulnerability Counts */}
              <div className="col-span-12 lg-col-span-5">
                <div className="custom-bg-dark-secondary p-4 rounded-lg h-full">
                  <h4 className="font-terminal text-sm text-gray-400 mb-3">Vulnerability Severity Breakdown</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-terminal text-sm">Critical</span>
                      <div className="flex items-center">
                        <div className="w-[100px] bg-gray-700 h-3 rounded overflow-hidden mr-2">
                          <motion.div 
                            className="h-full custom-bg-cyber-red"
                            initial={{ width: 0 }}
                            animate={{ width: `${(vulnerabilityTotals.critical / (vulnerabilityTotals.critical + vulnerabilityTotals.high + vulnerabilityTotals.medium + vulnerabilityTotals.low)) * 100}%` }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <span className="custom-text-cyber-red font-cyber text-sm">{vulnerabilityTotals.critical}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-terminal text-sm">High</span>
                      <div className="flex items-center">
                        <div className="w-[100px] bg-gray-700 h-3 rounded overflow-hidden mr-2">
                          <motion.div 
                            className="h-full custom-bg-cyber-orange"
                            initial={{ width: 0 }}
                            animate={{ width: `${(vulnerabilityTotals.high / (vulnerabilityTotals.critical + vulnerabilityTotals.high + vulnerabilityTotals.medium + vulnerabilityTotals.low)) * 100}%` }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <span className="custom-text-cyber-orange font-cyber text-sm">{vulnerabilityTotals.high}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-terminal text-sm">Medium</span>
                      <div className="flex items-center">
                        <div className="w-[100px] bg-gray-700 h-3 rounded overflow-hidden mr-2">
                          <motion.div 
                            className="h-full custom-bg-neon-yellow"
                            initial={{ width: 0 }}
                            animate={{ width: `${(vulnerabilityTotals.medium / (vulnerabilityTotals.critical + vulnerabilityTotals.high + vulnerabilityTotals.medium + vulnerabilityTotals.low)) * 100}%` }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <span className="custom-text-neon-yellow font-cyber text-sm">{vulnerabilityTotals.medium}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-terminal text-sm">Low</span>
                      <div className="flex items-center">
                        <div className="w-[100px] bg-gray-700 h-3 rounded overflow-hidden mr-2">
                          <motion.div 
                            className="h-full custom-bg-neon-green"
                            initial={{ width: 0 }}
                            animate={{ width: `${(vulnerabilityTotals.low / (vulnerabilityTotals.critical + vulnerabilityTotals.high + vulnerabilityTotals.medium + vulnerabilityTotals.low)) * 100}%` }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <span className="custom-text-neon-green font-cyber text-sm">{vulnerabilityTotals.low}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer section */}
      <motion.div
        variants={itemVariants}
        className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500 flex justify-between items-center z-10 relative"
      >
        <div className="font-terminal">
          CyberPulse v1.0 <span className="px-2">|</span> Last updated: {new Date().toLocaleDateString()}
        </div>
        <div className="flex items-center">
          <FaLock className="mr-2" /> 
          <span className="font-cyber custom-text-neon-green">Secured Connection</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CyberPulseDashboard;

++++=== [22] ./src/components/dashboard/GlobalThreatMap.tsx ===+++
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { ThreatData } from '@/types';

interface GlobalThreatMapProps {
  threatData: ThreatData[];
}

const GlobalThreatMap: React.FC<GlobalThreatMapProps> = ({ threatData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match its display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(26, 27, 38, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw world map outline (simplified)
    drawWorldMap(ctx, canvas.width, canvas.height);
    
    // Draw threat points
    drawThreats(ctx, threatData, canvas.width, canvas.height);
    
    // Animate connections
    animateConnections(ctx, threatData, canvas.width, canvas.height);
    
    return () => {
      // Cleanup animation frames if needed
    };
  }, [threatData]);
  
  const drawWorldMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // This is a very simplified representation - in a real app, you'd use GeoJSON data
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(68, 71, 90, 0.5)';
    ctx.lineWidth = 1;
    
    // Draw a simplified world outline - just for demonstration
    // In a real implementation, you would use proper map coordinates
    // North America
    ctx.moveTo(width * 0.1, height * 0.3);
    ctx.lineTo(width * 0.3, height * 0.3);
    ctx.lineTo(width * 0.3, height * 0.5);
    ctx.lineTo(width * 0.1, height * 0.5);
    ctx.lineTo(width * 0.1, height * 0.3);
    
    // South America
    ctx.moveTo(width * 0.2, height * 0.5);
    ctx.lineTo(width * 0.3, height * 0.5);
    ctx.lineTo(width * 0.25, height * 0.8);
    ctx.lineTo(width * 0.2, height * 0.5);
    
    // Europe
    ctx.moveTo(width * 0.4, height * 0.2);
    ctx.lineTo(width * 0.5, height * 0.2);
    ctx.lineTo(width * 0.5, height * 0.4);
    ctx.lineTo(width * 0.4, height * 0.4);
    ctx.lineTo(width * 0.4, height * 0.2);
    
    // Africa
    ctx.moveTo(width * 0.4, height * 0.4);
    ctx.lineTo(width * 0.5, height * 0.4);
    ctx.lineTo(width * 0.5, height * 0.7);
    ctx.lineTo(width * 0.4, height * 0.7);
    ctx.lineTo(width * 0.4, height * 0.4);
    
    // Asia
    ctx.moveTo(width * 0.5, height * 0.2);
    ctx.lineTo(width * 0.8, height * 0.2);
    ctx.lineTo(width * 0.8, height * 0.5);
    ctx.lineTo(width * 0.5, height * 0.5);
    ctx.lineTo(width * 0.5, height * 0.2);
    
    // Australia
    ctx.moveTo(width * 0.7, height * 0.6);
    ctx.lineTo(width * 0.8, height * 0.6);
    ctx.lineTo(width * 0.8, height * 0.7);
    ctx.lineTo(width * 0.7, height * 0.7);
    ctx.lineTo(width * 0.7, height * 0.6);
    
    ctx.stroke();
  };
  
  const drawThreats = (
    ctx: CanvasRenderingContext2D, 
    threats: ThreatData[], 
    width: number, 
    height: number
  ) => {
    threats.forEach(threat => {
      // Convert lat/long to x,y coordinates
      // This is a simplified conversion for demonstration
      const x = width * (threat.longitude + 180) / 360;
      const y = height * (90 - threat.latitude) / 180;
      
      // Draw threat point
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      
      // Color based on threat severity
      let color;
      switch (threat.severity) {
        case 'high':
          color = 'rgba(255, 85, 85, 0.8)'; // Neon red
          break;
        case 'medium':
          color = 'rgba(255, 184, 108, 0.8)'; // Neon orange
          break;
        case 'low':
          color = 'rgba(241, 250, 140, 0.8)'; // Neon yellow
          break;
        default:
          color = 'rgba(80, 250, 123, 0.8)'; // Neon green
      }
      
      ctx.fillStyle = color;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };
  
  const animateConnections = (
    ctx: CanvasRenderingContext2D, 
    threats: ThreatData[], 
    width: number, 
    height: number
  ) => {
    // For demonstration - let's connect some threats to show attack paths
    if (threats.length < 2) return;
    
    // Destination point - let's say it's in the USA
    const destX = width * 0.2;
    const destY = height * 0.35;
    
    threats.forEach((threat, i) => {
      // Convert lat/long to x,y coordinates - simplified conversion
      const x = width * (threat.longitude + 180) / 360;
      const y = height * (90 - threat.latitude) / 180;
      
      // Only draw connections for attacking threats
      if (threat.isAttacking) {
        // Create a gradient line
        const gradient = ctx.createLinearGradient(x, y, destX, destY);
        
        let startColor;
        switch (threat.severity) {
          case 'high':
            startColor = 'rgba(255, 85, 85, 0.8)'; // Neon red
            break;
          case 'medium':
            startColor = 'rgba(255, 184, 108, 0.8)'; // Neon orange
            break;
          case 'low':
            startColor = 'rgba(241, 250, 140, 0.8)'; // Neon yellow
            break;
          default:
            startColor = 'rgba(80, 250, 123, 0.8)'; // Neon green
        }
        
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, 'rgba(139, 233, 253, 0.5)'); // Target point color
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(destX, destY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Animate pulse along the line
        const pulsePos = (Date.now() % 2000) / 2000;
        const pulseX = x + (destX - x) * pulsePos;
        const pulseY = y + (destY - y) * pulsePos;
        
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 233, 253, 0.8)';
        ctx.fill();
      }
    });
    
    // Set up animation loop
    requestAnimationFrame(() => {
      // Redraw only the connections (not the entire map)
      // Clear line areas to avoid complete redraw
      ctx.fillStyle = 'rgba(26, 27, 38, 0.3)';
      ctx.fillRect(0, 0, width, height);
      drawWorldMap(ctx, width, height);
      drawThreats(ctx, threats, width, height);
      animateConnections(ctx, threats, width, height);
    });
  };
  
  return (
    <motion.div 
      className="cyber-card h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-cyber custom-text-neon-green">Global Threat Map</h3>
      </div>
      <div className="relative w-full h-[300px]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full bg-transparent" 
        />
        <div className="absolute bottom-2 right-2 bg-gray-800/80 p-2 rounded text-xs">
          <div className="flex items-center mb-1">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            <span className="text-gray-300">High Severity</span>
          </div>
          <div className="flex items-center mb-1">
            <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            <span className="text-gray-300">Medium Severity</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full mr-2"></span>
            <span className="text-gray-300">Low Severity</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GlobalThreatMap;

++++=== [23] ./src/components/dashboard/SecurityNewsFeed.tsx ===+++
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

++++=== [24] ./src/components/dashboard/ThreatLevelIndicator.tsx ===+++
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaExclamationTriangle, FaSkull } from 'react-icons/fa';

interface ThreatLevelIndicatorProps {
  level: 'low' | 'medium' | 'high' | 'critical';
  description?: string;
}

const ThreatLevelIndicator: React.FC<ThreatLevelIndicatorProps> = ({ 
  level, 
  description = '' 
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Configure appearance based on threat level
  const getLevelConfig = () => {
    switch (level) {
      case 'low':
        return {
          color: 'var(--neon-green)',
          bgColor: 'rgba(80, 250, 123, 0.1)',
          borderColor: 'var(--neon-green)',
          glowColor: 'var(--neon-green)',
          icon: <FaShieldAlt className="text-2xl" />,
          label: 'Low',
          pulseSpeed: 'slow'
        };
      case 'medium':
        return {
          color: 'var(--neon-yellow)',
          bgColor: 'rgba(241, 250, 140, 0.1)',
          borderColor: 'var(--neon-yellow)',
          glowColor: 'var(--neon-yellow)',
          icon: <FaShieldAlt className="text-2xl" />,
          label: 'Medium',
          pulseSpeed: 'medium'
        };
      case 'high':
        return {
          color: 'var(--neon-orange)',
          bgColor: 'rgba(255, 184, 108, 0.1)',
          borderColor: 'var(--neon-orange)',
          glowColor: 'var(--neon-orange)',
          icon: <FaExclamationTriangle className="text-2xl" />,
          label: 'High',
          pulseSpeed: 'fast'
        };
      case 'critical':
        return {
          color: 'var(--neon-red)',
          bgColor: 'rgba(255, 85, 85, 0.1)',
          borderColor: 'var(--neon-red)',
          glowColor: 'var(--neon-red)',
          icon: <FaSkull className="text-2xl" />,
          label: 'Critical',
          pulseSpeed: 'very-fast'
        };
      default:
        return {
          color: 'var(--neon-green)',
          bgColor: 'rgba(80, 250, 123, 0.1)',
          borderColor: 'var(--neon-green)',
          glowColor: 'var(--neon-green)',
          icon: <FaShieldAlt className="text-2xl" />,
          label: 'Low',
          pulseSpeed: 'slow'
        };
    }
  };
  
  const config = getLevelConfig();
  
  // Set blinking effect for high and critical levels
  useEffect(() => {
    if (level === 'high' || level === 'critical') {
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }
  }, [level]);
  
  // Animation variants for different pulse speeds
  const pulseVariants = {
    slow: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: { 
        duration: 3, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    },
    medium: {
      scale: [1, 1.07, 1],
      opacity: [1, 0.7, 1],
      transition: { 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    },
    fast: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.6, 1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    },
    'very-fast': {
      scale: [1, 1.15, 1],
      opacity: [1, 0.5, 1],
      transition: { 
        duration: 0.8, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    }
  };
  
  // Blink animation variants
  const blinkVariants = {
    blink: {
      opacity: [1, 0.3, 1],
      transition: {
        duration: level === 'critical' ? 0.5 : 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    static: {
      opacity: 1
    }
  };
  
  return (
    <div className="cyber-card h-full overflow-hidden relative">
      {/* Background scan effect */}
      <div className="security-scan"></div>
      
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-cyber custom-text-neon-green">Threat Level</h3>
      </div>
      
      <div className="p-6 flex flex-col items-center justify-center h-[calc(100%-60px)]">
        <motion.div
          animate={isBlinking ? 'blink' : 'static'}
          variants={blinkVariants}
          className="mb-4"
          style={{ color: config.color }}
        >
          {config.icon}
        </motion.div>
        
        <motion.div 
          className="relative"
          animate={config.pulseSpeed as keyof typeof pulseVariants}
          variants={pulseVariants}
        >
          <div 
            className="w-36 h-36 rounded-full flex items-center justify-center border-4"
            style={{ 
              backgroundColor: config.bgColor,
              borderColor: config.borderColor,
              boxShadow: `0 0 15px ${config.glowColor}`,
              color: config.color
            }}
          >
            <div className="text-center">
              <span className="text-sm font-cyber">THREAT LEVEL</span>
              <h2 className="text-2xl font-bold font-cyber">{config.label}</h2>
            </div>
          </div>
          
          {/* Pulse rings for effect */}
          <div 
            className="absolute top-0 left-0 w-full h-full rounded-full animate-ping opacity-20"
            style={{ 
              border: `2px solid ${config.borderColor}`,
              animationDuration: `${level === 'critical' ? '1s' : level === 'high' ? '1.5s' : '2s'}`
            }}
          ></div>
        </motion.div>
        
        {description && (
          <motion.p 
            className="mt-6 text-sm text-center text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </div>
      
      {/* Bottom pattern - cyberpunk grid */}
      <div className="absolute bottom-0 left-0 w-full h-10 opacity-20 cyber-grid"></div>
    </div>
  );
};

export default ThreatLevelIndicator;

++++=== [25] ./src/components/effects/MatrixRainBackground.tsx ===+++
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MatrixRainBackgroundProps {
  className?: string;
  density?: number;
  speed?: number;
  fontSize?: number;
  glowIntensity?: number;
  color?: string;
}

const MatrixRainBackground: React.FC<MatrixRainBackgroundProps> = ({
  className = '',
  density = 0.8, // Increased density for better visual appeal
  speed = 1.5,   // Increased from 1.0 to 1.5 for more dynamic effect
  fontSize = 14, // Default font size for matrix characters
  glowIntensity = 0.7, // Controls how strong the glow effect is
  color = '#50fa7b', // Default neon green color
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isTabVisible, setIsTabVisible] = useState(true);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateDimensions = () => {
      if (!canvasRef.current) return;
      
      const { width, height } = document.body.getBoundingClientRect();
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      setDimensions({ width, height });
      
      // Re-init ctx after resize for better rendering
      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      ctx.textAlign = 'center';
    };
    
    updateDimensions();
    
    // Characters for matrix rain - katakana and some special characters for cybersecurity feel
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ><@{}[]#$%&()=*+-/:;,.?!~^|\\░▒▓█▄▀▐▌■□▪▫';
    
    // Calculate drop count based on window width and density
    const cols = Math.floor(dimensions.width / (fontSize * 0.6));
    const drops: number[] = [];
    
    // Initialize drop positions - vary starting points for a more natural look
    for (let i = 0; i < cols; i++) {
      drops[i] = Math.random() * -dimensions.height;
    }
    
    // Object to track which characters should glow
    const glowingChars: Record<number, Record<number, boolean>> = {};
    
    // Initialize matrix color as THREE.Color to manipulate it
    const mainColor = color; // Use the user-defined color
    const dimColor = adjustColorBrightness(mainColor, 0.5); // Dimmer version of main color
    const brightColor = adjustColorBrightness(mainColor, 1.2); // Brighter version for glowing characters
    
    // Helper function to adjust color brightness
    function adjustColorBrightness(hexColor: string, factor: number): string {
      // Convert hex to RGB
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      
      // Adjust brightness
      const adjustedR = Math.min(255, Math.max(0, Math.floor(r * factor)));
      const adjustedG = Math.min(255, Math.max(0, Math.floor(g * factor)));
      const adjustedB = Math.min(255, Math.max(0, Math.floor(b * factor)));
      
      // Convert back to hex
      return `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
    }
    
    // Drawing function
    const draw = () => {
      if (!isTabVisible) {
        return;
      }
      
      if (!ctx || !canvasRef.current) return;
      
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 10, 20, 0.05)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      
      // For each column
      for (let i = 0; i < drops.length; i++) {
        // Initialize this column in the glowing characters tracker if needed
        if (!glowingChars[i]) {
          glowingChars[i] = {};
        }
        
        // Get random character
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // x position of the character
        const x = i * fontSize * 0.6;
        
        // Random chance for a character to glow
        if (Math.random() < 0.01 * glowIntensity) {
          const y = Math.floor(drops[i] / fontSize) * fontSize;
          glowingChars[i][y] = true;
          
          // Remove glow after a while
          setTimeout(() => {
            if (glowingChars[i]) {
              delete glowingChars[i][y];
            }
          }, Math.random() * 3000 + 1000);
        }
        
        // Check if this character should glow
        const charY = Math.floor(drops[i]);
        const shouldGlow = glowingChars[i][charY];
        
        // Vary character brightness based on position in column and randomness
        const positionFactor = 1 - (drops[i] / dimensions.height) * 0.5; // Characters at top are brighter
        const randomFactor = 0.7 + Math.random() * 0.3;
        
        if (shouldGlow) {
          // Add glow effect
          ctx.shadowBlur = 15;
          ctx.shadowColor = mainColor;
          ctx.fillStyle = brightColor;
        } else {
          // Vary between main color and dimmer color based on position
          ctx.shadowBlur = 0;
          const opacity = Math.min(1, Math.max(0.1, positionFactor * randomFactor));
          ctx.fillStyle = drops[i] < fontSize * 5 ? brightColor : dimColor;
          ctx.globalAlpha = opacity;
        }
        
        // Draw the character
        ctx.fillText(char, x, drops[i]);
        
        // Reset alpha
        ctx.globalAlpha = 1;
        
        // Move drop position down
        drops[i] += fontSize * (0.4 + Math.random() * 0.2) * speed;
        
        // Send drop back to top when it reaches the bottom
        if (drops[i] > dimensions.height * 1.5) {
          drops[i] = Math.random() * -dimensions.height * 0.5;
          
          // Clean up old glowing characters for this column
          glowingChars[i] = {};
        }
      }
    };
    
    // Animation loop using requestAnimationFrame for better performance
    let animationFrameId: number | null = null;
    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      
      // Throttle the animation when tab is not active or for performance
      if (!isTabVisible) {
        // Check occasionally if tab becomes visible
        if (frameCount % 30 === 0) {
          frameCount = 0;
          animationFrameId = requestAnimationFrame(animate);
        } else {
          animationFrameId = requestAnimationFrame(animate);
        }
        return;
      }
      
      // Throttle to a reasonable FPS based on density and speed for performance
      const targetFPS = Math.min(30, Math.max(15, Math.floor(30 * density * speed)));
      
      if (frameCount % Math.ceil(60 / targetFPS) === 0) {
        draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      updateDimensions();
    };
    
    // Handle visibility change
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [density, speed, fontSize, dimensions.width, dimensions.height, glowIntensity, color, isTabVisible]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className} matrix-rain-container`}
    />
  );
};

export default MatrixRainBackground;

++++=== [26] ./src/components/effects/ParticleBackground.tsx ===+++
'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  className?: string;
  color?: string;
  density?: number;
  speed?: number; // Added speed prop to be compatible with PortfolioClient
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  color = '#50fa7b',
  density = 0.8, // Increased from 0.3 to 0.8 for better visual appearance
  speed = 1.0,    // Added default value for speed
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  // Use a generic Object3D ref and cast as needed
  const particlesRef = useRef<THREE.Object3D | null>(null);
  const frameCountRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up THREE.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    sceneRef.current = scene;
    cameraRef.current = camera;

    // Create WebGL renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      // @ts-ignore - powerPreference exists in WebGLRendererParameters
      powerPreference: 'high-performance',
    });
    
    // Limit pixel ratio to 2 for performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Position camera
    camera.position.z = 30;

    // Create particles
    const createParticles = () => {
      // Remove old particles
      if (particlesRef.current) {
        // @ts-ignore - remove exists on Scene
        scene.remove(particlesRef.current);
        
        // Cast to any to dispose of geometry and material
        const points = particlesRef.current as any;
        if (points.geometry) points.geometry.dispose();
        if (points.material) {
          if (Array.isArray(points.material)) {
            points.material.forEach((m: any) => m.dispose && m.dispose());
          } else if (points.material.dispose) {
            points.material.dispose();
          }
        }
      }

      // Calculate the number of particles based on screen size and density
      const screenArea = window.innerWidth * window.innerHeight;
      // This formula gives a good balance between visual appeal and performance
      const baseCount = Math.min(screenArea / 5000, 300);
      // Scale by density but keep a reasonable cap
      const particleCount = Math.min(Math.floor(baseCount * density), 500);
      
      // Create particle geometry
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleSizes = new Float32Array(particleCount);
      const particleColors = new Float32Array(particleCount * 3);
      
      // Generate random positions, sizes and colors
      for (let i = 0; i < particleCount; i++) {
        // For x and y coordinates, keep them within the visible area with some spacing from edges
        const i3 = i * 3;
        particlePositions[i3] = (Math.random() - 0.5) * window.innerWidth * 0.8;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * window.innerHeight * 0.8;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 30;
        
        // Vary particle sizes for more visual interest
        particleSizes[i] = Math.random() * 3 + 1;
        
        // Add color variation - mix between primary and secondary colors
        // Use colors from the cybersecurity portfolio color scheme
        const mainColor = new THREE.Color(color); // Primary neon green
        const secondaryColors = [
          new THREE.Color('#8be9fd'), // Cyber blue
          new THREE.Color('#bd93f9'), // Neon purple
          new THREE.Color('#ff79c6')  // Add pink accent for variety
        ];
        
        // Pick a random secondary color and mix with primary
        const secondColor = secondaryColors[Math.floor(Math.random() * secondaryColors.length)];
        const mixFactor = Math.random();
        
        // Manual color lerp that works with TypeScript
        const r = mainColor.r * (1 - mixFactor) + secondColor.r * mixFactor;
        const g = mainColor.g * (1 - mixFactor) + secondColor.g * mixFactor;
        const b = mainColor.b * (1 - mixFactor) + secondColor.b * mixFactor;
        
        particleColors[i3] = r;
        particleColors[i3 + 1] = g;
        particleColors[i3 + 2] = b;
      }
      
      // Set the attributes
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      
      // Create material with glowing effect
      const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          uniform float time;
          uniform float pixelRatio;
          
          varying vec3 vColor;
          
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Add subtle movement to particles
            float yMovement = sin(position.x * 0.01 + time) * 2.0 * ${speed.toFixed(1)};
            float xMovement = cos(position.y * 0.01 + time) * 2.0 * ${speed.toFixed(1)};
            
            mvPosition.x += xMovement;
            mvPosition.y += yMovement;
            
            gl_Position = projectionMatrix * mvPosition;
            
            // Size attenuation based on distance
            gl_PointSize = size * (300.0 / -mvPosition.z) * pixelRatio;
            
            // Pass color to fragment shader with slight variation
            float brightness = 0.7 + 0.3 * sin(time + position.x * 0.01);
            vColor = color * brightness;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            // Calculate distance from center of point
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            
            // Discard pixels outside circle and create soft edge
            if (dist > 0.5) discard;
            
            // Create glowing particle with soft edge
            float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        // @ts-ignore - depthWrite exists in ShaderMaterialParameters
        depthWrite: false,
        vertexColors: true,
      });
      
      // Create particle system using Object3D constructor
      // @ts-ignore - THREE.Points exists at runtime
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particlesRef.current = particles;
      scene.add(particles);
    };
    
    createParticles();
    
    // Animation loop
    const animate = () => {
      if (!isTabVisible) {
        // Skip frames when tab is not visible, but check occasionally
        if (frameCountRef.current % 30 === 0) {
          frameCountRef.current = 0;
          animationRef.current = requestAnimationFrame(animate);
        } else {
          frameCountRef.current++;
          animationRef.current = requestAnimationFrame(animate);
        }
        return;
      }
      
      if (particlesRef.current && sceneRef.current && cameraRef.current && rendererRef.current) {
        // Update particle animation - cast to any for the material.uniforms access
        const material = (particlesRef.current as any).material;
        if (material && material.uniforms) {
          material.uniforms.time.value += 0.01 * speed;
        }
        
        // Rotate particles slightly for more dynamic effect
        particlesRef.current.rotation.x += 0.0005 * speed;
        particlesRef.current.rotation.y += 0.0003 * speed;
        
        // Render scene
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Handle window resize with debouncing
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        if (cameraRef.current && rendererRef.current) {
          // Update camera
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
          
          // Update renderer
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
          
          // Recreate particles for new dimensions
          createParticles();
        }
      }, 200); // Debounce resize for 200ms
    };
    
    // Handle visibility change
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    
    // Set up event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup function
    return () => {
      // Cancel animation frame
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clear timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Dispose of THREE.js objects to prevent memory leaks
      if (rendererRef.current) {
        const rendererDom = rendererRef.current.domElement;
        if (rendererDom.parentNode) {
          rendererDom.parentNode.removeChild(rendererDom);
        }
        rendererRef.current.dispose();
      }
      
      if (particlesRef.current) {
        // Cast to any to dispose of geometry and material
        const points = particlesRef.current as any;
        if (points.geometry) points.geometry.dispose();
        if (points.material) {
          if (Array.isArray(points.material)) {
            points.material.forEach((m: any) => m.dispose && m.dispose());
          } else if (points.material.dispose) {
            points.material.dispose();
          }
        }
      }
    };
  }, [color, density, isTabVisible, speed]);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className} particle-container`}
    />
  );
};

export default ParticleBackground;

++++=== [27] ./src/components/effects/ScanLine.tsx ===+++
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScanLineProps {
  color?: string;
  opacity?: number;
  speed?: 'slow' | 'medium' | 'fast';
  vertical?: boolean;
  width?: number;
  className?: string;
  zIndex?: number;
  glow?: boolean;
  flicker?: boolean;
}

const ScanLine: React.FC<ScanLineProps> = ({
  color = 'var(--neon-green, #50fa7b)',
  opacity = 0.15,
  speed = 'medium',
  vertical = false,
  width = 2,
  className = '',
  zIndex = 10,
  glow = true,
  flicker = true,
}) => {
  // Determine animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return 5;
      case 'fast': return 1.5;
      default: return 3;
    }
  };

  // Animation variants based on direction
  const scanAnimation = vertical
    ? {
        initial: { y: '-100%' },
        animate: { y: '100%' },
      }
    : {
        initial: { x: '-100%' },
        animate: { x: '100%' },
      };

  return (
    <div 
      className={`fixed pointer-events-none ${vertical ? 'h-full w-auto' : 'w-full h-auto'} inset-0 overflow-hidden ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      <motion.div
        className={`absolute ${vertical ? 'h-full' : 'w-full'}`}
        initial={scanAnimation.initial}
        animate={scanAnimation.animate}
        transition={{
          duration: getDuration(),
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
        style={{
          [vertical ? 'width' : 'height']: width,
          background: color,
          opacity: flicker ? undefined : opacity,
          boxShadow: glow ? `0 0 8px 2px ${color}` : 'none',
        }}
      >
        {flicker && (
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [opacity * 0.7, opacity, opacity * 0.8, opacity, opacity * 0.9],
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              times: [0, 0.2, 0.4, 0.6, 1],
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ScanLine;

++++=== [28] ./src/components/interactive/CyberGlobe.tsx ===+++
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CyberButton from '../ui/CyberButton';

interface Coordinate {
  lat: number;
  lng: number;
  intensity?: number; // 0-1 value for threat intensity
  type?: 'attack' | 'defense' | 'alert';
  name?: string;
}

interface CyberGlobeProps {
  coordinates?: Coordinate[];
  height?: number;
  width?: number;
  autoRotate?: boolean;
  showControls?: boolean;
  className?: string;
  backgroundColor?: string;
  globeColor?: string;
  highlightColor?: string;
}

const CyberGlobe: React.FC<CyberGlobeProps> = ({
  coordinates = [],
  height = 400,
  width = 400,
  autoRotate = true,
  showControls = true,
  className = '',
  backgroundColor = '#171923',
  globeColor = '#44475a',
  highlightColor = '#50fa7b',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const markerGroupRef = useRef<THREE.Group | null>(null);
  const arcsGroupRef = useRef<THREE.Group | null>(null);
  const [activeCoordinate, setActiveCoordinate] = useState<Coordinate | null>(null);
  const [viewMode, setViewMode] = useState<'globe' | 'connections'>('globe');
  const animationFrameRef = useRef<number | null>(null);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const visibleRef = useRef<boolean>(true);
  const frameCountRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  // Helper to convert lat/lng to 3D position
  const latLngToVector3 = (lat: number, lng: number, radius: number = 1): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  };

  // Observer to lazy load the globe when it's visible
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Initialize THREE.js scene only when visible
  useEffect(() => {
    if (!containerRef.current || !isVisible) return;

    // Setup renderer with precision adjustment for performance
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      // @ts-ignore - precision is a valid parameter but not in the type definitions
      precision: 'mediump' // Use medium precision instead of highp
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio)); // Limit pixel ratio
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3;
    cameraRef.current = camera;

    // Setup controls with reduced performance impact
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = showControls;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.3; // Slower rotation
    // @ts-ignore - enablePan exists on OrbitControls but is missing from type definitions
    controls.enablePan = false; // Disable panning for performance
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Add directional light (only one light for performance)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create the globe with reduced geometry complexity
    const globeRadius = 1;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 32, 32); // Reduced from 64,64
    
    // Create simplified shader material
    const globeMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform vec3 glowColor;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        float grid(vec2 uv, float res) {
          vec2 grid = fract(uv * res);
          return (step(0.98, grid.x) + step(0.98, grid.y)) * 0.5;
        }
        
        void main() {
          // Base grid pattern - simplified
          float baseGrid = grid(vUv, 8.0);
          
          // Edge highlight - simplified calculation
          float edgeHighlight = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.5);
          
          // Combine effects with fewer calculations
          vec3 finalColor = mix(color, glowColor, edgeHighlight * 0.3);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(globeColor) },
        glowColor: { value: new THREE.Color(highlightColor) }
      },
      transparent: true
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    globeRef.current = globe;

    // Create a group for markers
    const markerGroup = new THREE.Group();
    scene.add(markerGroup);
    markerGroupRef.current = markerGroup;

    // Create a group for connection arcs
    const arcsGroup = new THREE.Group();
    scene.add(arcsGroup);
    arcsGroupRef.current = arcsGroup;

    // Set the globe as ready
    setIsGlobeReady(true);

    // Visibility detection to pause animation when not visible
    const handleVisibilityChange = () => {
      visibleRef.current = document.visibilityState === 'visible';
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation loop with frame skipping
    const animate = () => {
      // Skip frames when tab is not visible
      if (!visibleRef.current || frameCountRef.current++ % 2 !== 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      if (globeRef.current && globeRef.current.material instanceof THREE.ShaderMaterial) {
        globeRef.current.material.uniforms.time.value += 0.01;
      }
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Dispose of all THREE objects
      if (globeRef.current) {
        if (globeRef.current.geometry) {
          // @ts-ignore - dispose exists on BufferGeometry but TypeScript doesn't recognize it
          globeRef.current.geometry.dispose();
        }
        if (globeRef.current.material) {
          if (Array.isArray(globeRef.current.material)) {
            // @ts-ignore - dispose exists on Material but TypeScript doesn't recognize it
            globeRef.current.material.forEach(material => material.dispose());
          } else {
            // @ts-ignore - dispose exists on Material but TypeScript doesn't recognize it
            globeRef.current.material.dispose();
          }
        }
      }
    };
  }, [isVisible, backgroundColor, width, height, autoRotate, showControls, globeColor, highlightColor]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const parentWidth = containerRef.current.clientWidth;
        const parentHeight = containerRef.current.clientHeight || height;
        
        rendererRef.current.setSize(parentWidth, parentHeight);
        
        if (cameraRef.current) {
          cameraRef.current.aspect = parentWidth / parentHeight;
          cameraRef.current.updateProjectionMatrix();
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [height]);

  // Update markers and connections when coordinates change
  useEffect(() => {
    if (!isGlobeReady || !markerGroupRef.current || !arcsGroupRef.current) return;
    
    // Clear existing markers and arcs
    while (markerGroupRef.current.children.length > 0) {
      markerGroupRef.current.remove(markerGroupRef.current.children[0]);
    }
    
    while (arcsGroupRef.current.children.length > 0) {
      arcsGroupRef.current.remove(arcsGroupRef.current.children[0]);
    }
    
    // Add markers for each coordinate
    coordinates.forEach((coord, index) => {
      const { lat, lng, type = 'attack', intensity = 0.7 } = coord;
      const position = latLngToVector3(lat, lng);
      
      // Get marker color based on type
      let markerColor;
      switch (type) {
        case 'defense': markerColor = new THREE.Color('#8be9fd'); break;
        case 'alert': markerColor = new THREE.Color('#ff5555'); break;
        default: markerColor = new THREE.Color('#ffb86c'); break;
      }
      
      // Create marker geometry
      const markerSize = 0.02 + (intensity * 0.03);
      const markerGeometry = new THREE.SphereGeometry(markerSize, 16, 16);
      
      // Create marker material with glow effect
      const markerMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float intensity;
          uniform float time;
          varying vec3 vNormal;
          
          void main() {
            float pulse = 0.5 + 0.5 * sin(time * 3.0 + ${index} * 0.7);
            vec3 glow = color * (intensity * 1.5) * pulse;
            gl_FragColor = vec4(glow, 1.0);
          }
        `,
        uniforms: {
          color: { value: markerColor },
          intensity: { value: intensity },
          time: { value: 0 }
        },
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      
      // Create marker mesh
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position.multiplyScalar(1.01)); // Slightly above globe surface
      marker.userData = { coordinate: coord, index };
      
      // Add to marker group
      if (markerGroupRef.current) {
        markerGroupRef.current.add(marker);
      }
      
      // Draw connection arcs if in connections mode
      if (viewMode === 'connections' && index < coordinates.length - 1) {
        // Create a random connection to another point
        const targetIndex = (index + 1 + Math.floor(Math.random() * (coordinates.length - 2))) % coordinates.length;
        const targetCoord = coordinates[targetIndex];
        const targetPosition = latLngToVector3(targetCoord.lat, targetCoord.lng);
        
        // Create curved line between points
        const arcPoints = [];
        const start = position.clone().multiplyScalar(1.01);
        const end = targetPosition.clone().multiplyScalar(1.01);
        const altitude = 0.2 + Math.random() * 0.1;
        
        // Calculate middle control point for the curve
        const midPoint = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(1 + altitude);
        
        // Create smooth curve
        for (let i = 0; i <= 20; i++) {
          const t = i / 20;
          
          // Quadratic Bezier curve
          const point = new THREE.Vector3()
            .copy(start)
            .multiplyScalar(Math.pow(1 - t, 2))
            .add(midPoint.clone().multiplyScalar(2 * (1 - t) * t))
            .add(end.clone().multiplyScalar(t * t));
          
          arcPoints.push(point);
        }
        
        // Create curve geometry
        const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
        
        // Create curve material
        const arcMaterial = new THREE.LineBasicMaterial({
          color: markerColor,
          transparent: true,
          opacity: 0.6,
          linewidth: 1
        });
        
        // Create curve mesh
        const arc = new THREE.Line(arcGeometry, arcMaterial);
        if (arcsGroupRef.current) {
          arcsGroupRef.current.add(arc);
        }
      }
    });
    
    // Animation update function for markers
    const updateMarkers = () => {
      markerGroupRef.current?.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
          child.material.uniforms.time.value += 0.01;
        }
      });
    };
    
    // Add update to animation loop
    const animate = () => {
      updateMarkers();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [coordinates, viewMode, isGlobeReady]);

  // Toggle view mode between globe and connections
  const toggleViewMode = () => {
    setViewMode(viewMode === 'globe' ? 'connections' : 'globe');
  };

  return (
    <div className={`cyber-globe-container relative ${className}`} style={{ height, width }}>
      <div 
        ref={containerRef} 
        className="w-full h-full relative rounded-lg overflow-hidden border border-neon-green"
        style={{ boxShadow: `0 0 15px rgba(80, 250, 123, 0.3)` }}
      />
      
      {/* View mode toggle */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-10">
          <CyberButton
            onClick={toggleViewMode}
            size="sm"
            type="secondary"
            icon="grid"
          >
            {viewMode === 'globe' ? 'Show Connections' : 'Hide Connections'}
          </CyberButton>
        </div>
      )}
      
      {/* Info panel for active coordinate */}
      {activeCoordinate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-4 left-4 p-3 bg-dark-tertiary border border-neon-green rounded z-10 text-xs max-w-[200px]"
        >
          <h4 className="text-neon-green font-bold mb-1">
            {activeCoordinate.name || `Point ${activeCoordinate.lat.toFixed(2)}, ${activeCoordinate.lng.toFixed(2)}`}
          </h4>
          <div className="text-gray-300">
            Type: <span className="text-cyber-blue">{activeCoordinate.type || 'Unknown'}</span>
          </div>
          {activeCoordinate.intensity !== undefined && (
            <div className="text-gray-300">
              Intensity: <span className="text-cyber-blue">{Math.round(activeCoordinate.intensity * 100)}%</span>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Loading overlay */}
      {!isGlobeReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-base bg-opacity-70 z-20">
          <div className="text-neon-green">Initializing Cyber Globe...</div>
        </div>
      )}
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-neon-green opacity-30"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default CyberGlobe;

++++=== [29] ./src/components/interactive/CyberTerminal.tsx ===+++
'use client';

import React, { useState, useRef, useEffect, KeyboardEvent, ReactElement, ReactNode } from 'react';
import { motion } from 'framer-motion';
import GlitchText from '../ui/GlitchText';

interface Command {
  name: string;
  description: string;
  usage?: string;
  action: (args: string[]) => string | ReactElement;
  isHidden?: boolean;
  clearanceLevel?: number;
}

interface CommandHistoryItem {
  input: string;
  output: string | ReactNode;
  isError?: boolean;
}

interface CyberTerminalProps {
  initialClearanceLevel?: number;
  welcomeMessage?: string | ReactNode;
  prompt?: string;
  className?: string;
  height?: string;
}

const CyberTerminal: React.FC<CyberTerminalProps> = ({
  initialClearanceLevel = 1,
  welcomeMessage,
  prompt = 'guest@cyber-sec:~$',
  className = '',
  height = '400px',
}) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [clearanceLevel, setClearanceLevel] = useState(initialClearanceLevel);
  const [isBlinking, setIsBlinking] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ASCII art banner
  const asciiArt = `
  ██████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗███████╗ ██████╗
 ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝
 ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝███████╗█████╗  ██║     
 ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗╚════██║██╔══╝  ██║     
 ╚██████╗   ██║   ██████╔╝███████╗██║  ██║███████║███████╗╚██████╗
  ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝
                         [ TERMINAL v3.4.1 ]                          
  ACCESS LEVEL: ${initialClearanceLevel} | TYPE 'help' FOR COMMANDS
  `;

  // Define terminal commands
  const commands: Command[] = [
    {
      name: 'help',
      description: 'List available commands',
      action: (args) => {
        if (args.length > 0) {
          const commandName = args[0];
          const command = commands.find(cmd => cmd.name === commandName && (!cmd.isHidden || clearanceLevel >= 3));
          
          if (command) {
            return (
              <div className="p-2 border border-neon-green bg-dark-tertiary rounded">
                <div className="text-neon-green font-bold">{command.name}</div>
                <div className="text-gray-300">{command.description}</div>
                {command.usage && <div className="text-gray-400 mt-1">Usage: {command.usage}</div>}
                {command.clearanceLevel && command.clearanceLevel > clearanceLevel && 
                  <div className="text-cyber-red mt-1">Required clearance level: {command.clearanceLevel}</div>
                }
              </div>
            );
          }
          
          return `Command not found: ${commandName}`;
        }
        
        const availableCommands = commands
          .filter(cmd => !cmd.isHidden || clearanceLevel >= 3)
          .map(cmd => {
            const isLocked = cmd.clearanceLevel && cmd.clearanceLevel > clearanceLevel;
            return `${cmd.name}${isLocked ? ' 🔒' : ''} - ${cmd.description}`;
          });
          
        return (
          <div className="grid grid-cols-1 gap-1">
            <div className="col-span-1 mb-2 text-cyber-blue">Available commands:</div>
            {availableCommands.map((cmd, i) => (
              <div key={i} className="text-gray-300 hover:text-neon-green transition-colors ml-2">{cmd}</div>
            ))}
            <div className="text-gray-400 mt-2 text-sm">Type 'help [command]' for more information about a specific command.</div>
          </div>
        );
      },
    },
    {
      name: 'clear',
      description: 'Clear the terminal screen',
      action: () => {
        setTimeout(() => {
          setCommandHistory([]);
        }, 100);
        return '';
      },
    },
    {
      name: 'whoami',
      description: 'Display current user information',
      action: () => {
        return (
          <div className="my-2">
            <div className="text-neon-green">User: guest</div>
            <div className="text-cyber-blue">Clearance Level: {clearanceLevel}</div>
            <div className="text-gray-300">Session: {Math.floor(Math.random() * 100000)}</div>
            <div className="text-gray-300">IP: 192.168.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}</div>
          </div>
        );
      },
    },
    {
      name: 'skills',
      description: 'List security skills and proficiency',
      action: () => {
        const skills = [
          { name: 'Penetration Testing', level: 90 },
          { name: 'Network Security', level: 85 },
          { name: 'Malware Analysis', level: 80 },
          { name: 'OSINT', level: 75 },
          { name: 'Cryptography', level: 70 },
        ];
        
        return (
          <div>
            <div className="text-cyber-blue mb-2">Skill Proficiency</div>
            {skills.map((skill, i) => (
              <div key={i} className="mb-1">
                <div className="flex justify-between">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-neon-green">{skill.level}%</span>
                </div>
                <div className="w-full bg-dark-tertiary h-2 rounded-sm overflow-hidden">
                  <div 
                    className="bg-neon-green h-full rounded-sm" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      name: 'access',
      description: 'Change terminal access level with proper authorization',
      usage: 'access [level] [passcode]',
      action: (args) => {
        if (args.length < 2) {
          return 'Usage: access [level] [passcode]';
        }
        
        const level = parseInt(args[0]);
        const passcode = args[1];
        
        // Secret passcodes (in a real app these would be securely stored)
        const passcodes: Record<number, string> = {
          2: 'cyber',
          3: 'shadow',
          4: 'matrix',
          5: 'nebuchadnezzar',
        };
        
        if (isNaN(level) || level < 1 || level > 5) {
          return 'Invalid access level. Valid levels are 1-5.';
        }
        
        if (level <= clearanceLevel) {
          setClearanceLevel(level);
          return `Access level downgraded to ${level}`;
        }
        
        if (passcodes[level] === passcode) {
          setClearanceLevel(level);
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 1000);
          return (
            <div>
              <GlitchText intensity="high" className="text-neon-green">ACCESS GRANTED</GlitchText>
              <div className="text-cyber-blue">Clearance level upgraded to {level}</div>
            </div>
          );
        }
        
        return (
          <div className="text-cyber-red">
            ACCESS DENIED. Invalid passcode for level {level}.
          </div>
        );
      },
    },
    {
      name: 'scan',
      description: 'Scan system for vulnerabilities',
      action: () => {
        // Simulate scanning with typing effect (this will be rendered as is)
        return (
          <div className="typing-animation">
            <div>Initializing scan...</div>
            <div>Scanning system ports...</div>
            <div>Analyzing network traffic...</div>
            <div>Checking for outdated software...</div>
            <div>Performing vulnerability assessment...</div>
            <div className="text-neon-green">Scan complete. 3 potential vulnerabilities found.</div>
            <div className="text-cyber-red mt-2">CVE-2023-1234: Medium risk in outdated packages</div>
            <div className="text-cyber-red">CVE-2023-5678: Low risk in network configuration</div>
            <div className="text-cyber-red">CVE-2023-9012: Low risk in open ports</div>
          </div>
        );
      },
    },
    {
      name: 'projects',
      description: 'List cybersecurity projects',
      action: () => {
        const projects = [
          { id: 'PRJ-001', name: 'Network Penetration Framework', status: 'Complete' },
          { id: 'PRJ-002', name: 'Encrypted Communication System', status: 'In Progress' },
          { id: 'PRJ-003', name: 'Threat Intelligence Dashboard', status: 'Complete' },
          { id: 'PRJ-004', name: 'Forensic Analysis Toolkit', status: 'Planning' },
        ];
        
        return (
          <div className="my-2">
            <div className="text-cyber-blue mb-2">Project Repository</div>
            <div className="grid grid-cols-3 gap-2 font-bold text-neon-green">
              <div>ID</div>
              <div>Name</div>
              <div>Status</div>
            </div>
            {projects.map((project, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 text-gray-300 hover:bg-dark-tertiary">
                <div>{project.id}</div>
                <div>{project.name}</div>
                <div className={project.status === 'Complete' ? 'text-neon-green' : project.status === 'In Progress' ? 'text-cyber-blue' : 'text-cyber-orange'}>
                  {project.status}
                </div>
              </div>
            ))}
            <div className="text-gray-400 mt-2 text-sm">Use 'project [ID]' for details (clearance level 2+ required)</div>
          </div>
        );
      },
    },
    {
      name: 'project',
      description: 'View project details',
      usage: 'project [id]',
      clearanceLevel: 2,
      action: (args) => {
        if (clearanceLevel < 2) {
          return 'Insufficient clearance level. Level 2+ required.';
        }
        
        if (args.length === 0) {
          return 'Usage: project [id]';
        }
        
        const projectId = args[0].toUpperCase();
        const projects: Record<string, { name: string, description: string, tech: string[] }> = {
          'PRJ-001': {
            name: 'Network Penetration Framework',
            description: 'Comprehensive framework for automated network security assessment and penetration testing.',
            tech: ['Python', 'Rust', 'Docker', 'Kubernetes'],
          },
          'PRJ-002': {
            name: 'Encrypted Communication System',
            description: 'End-to-end encrypted messaging system with quantum-resistant algorithms for secure communications.',
            tech: ['Rust', 'WebAssembly', 'Signal Protocol', 'Libsodium'],
          },
          'PRJ-003': {
            name: 'Threat Intelligence Dashboard',
            description: 'Real-time monitoring system for tracking and analyzing cybersecurity threats and vulnerabilities.',
            tech: ['React', 'TypeScript', 'Node.js', 'Elasticsearch'],
          },
          'PRJ-004': {
            name: 'Forensic Analysis Toolkit',
            description: 'Advanced toolkit for digital forensics and incident response scenarios.',
            tech: ['Python', 'Go', 'Electron', 'YARA Rules'],
          },
        };
        
        const project = projects[projectId];
        
        if (!project) {
          return `Project ${projectId} not found`;
        }
        
        return (
          <div className="p-2 border border-neon-green bg-dark-tertiary rounded">
            <div className="text-neon-green font-bold text-lg">{project.name}</div>
            <div className="text-gray-300 my-2">{project.description}</div>
            <div className="text-cyber-blue mt-2">Technologies:</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-2 py-1 rounded bg-dark-base text-neon-green text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      name: 'matrix',
      description: 'Enter the Matrix',
      isHidden: true,
      action: () => {
        setTimeout(() => {
          window.location.href = '#matrix-easter-egg';
        }, 2000);
        
        return (
          <div className="typing-animation">
            <GlitchText intensity="high" className="text-neon-green text-lg">
              Wake up, Neo...
            </GlitchText>
            <div className="text-cyber-blue mt-2">The Matrix has you...</div>
            <div className="text-neon-green mt-2">Follow the white rabbit.</div>
            <div className="text-neon-green mt-4">Knock, knock, Neo.</div>
          </div>
        );
      },
    },
    {
      name: 'hack',
      description: 'Hollywood-style "hacking" simulation',
      isHidden: true,
      action: () => {
        return (
          <div className="typing-animation">
            <div className="text-cyber-red">INITIATING FAKE HACK SEQUENCE...</div>
            <div className="text-neon-green mt-1">$ ssh -p 22 root@target-server</div>
            <div className="mt-1">Password authentication bypassed...</div>
            <div className="mt-1">Accessing main directory...</div>
            <div className="mt-1">$ sudo cat /etc/shadow</div>
            <div className="mt-1">$ sudo find / -name "*.conf" -type f</div>
            <div className="mt-1">$ netstat -tuln</div>
            <div className="mt-1">Bypassing firewall...</div>
            <div className="mt-1">$ sudo iptables -F</div>
            <div className="mt-1">Injecting code...</div>
            <div className="mt-1">$ echo "Backdoor installed" {'>'} /dev/null</div>
            <div className="text-cyber-red mt-2">[ THIS IS JUST FOR FUN - NOT ACTUAL HACKING ]</div>
            <div className="text-neon-green mt-1">Remember: Real hacking without permission is illegal and unethical.</div>
          </div>
        );
      },
    },
  ];

  // Default welcome message if not provided
  const defaultWelcome = (
    <div className="text-cyber-blue">
      <pre className="text-neon-green font-mono text-sm">{asciiArt}</pre>
      <div className="my-2">Welcome to the CyberSec Terminal.</div>
      <div className="mb-3">Type <span className="text-neon-green">help</span> to see available commands.</div>
    </div>
  );

  // Set initial welcome message
  useEffect(() => {
    setCommandHistory([
      { 
        input: '', 
        output: welcomeMessage || defaultWelcome
      }
    ]);
  }, [welcomeMessage]);

  // Focus input on terminal click
  useEffect(() => {
    const handleTerminalClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    if (terminalRef.current) {
      terminalRef.current.addEventListener('click', handleTerminalClick);
    }

    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener('click', handleTerminalClick);
      }
    };
  }, []);

  // Auto-scroll to bottom on new command
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Handle executing a command
  const executeCommand = (cmdInput: string) => {
    // Split the input into command and arguments
    const trimmedInput = cmdInput.trim();
    const [cmdName, ...args] = trimmedInput.split(' ');
    
    // Find the command
    const command = commands.find(cmd => cmd.name === cmdName);
    
    // Store in input history
    if (trimmedInput) {
      setInputHistory(prev => [trimmedInput, ...prev]);
    }
    
    // Execute the command or show error
    if (command) {
      // Check clearance level
      if (command.clearanceLevel && clearanceLevel < command.clearanceLevel) {
        setCommandHistory(prev => [
          ...prev,
          {
            input: trimmedInput,
            output: `Access denied: Insufficient clearance level. Required: ${command.clearanceLevel}, Current: ${clearanceLevel}`,
            isError: true
          }
        ]);
        return;
      }
      
      const output = command.action(args);
      setCommandHistory(prev => [
        ...prev,
        {
          input: trimmedInput,
          output
        }
      ]);
    } else if (trimmedInput) {
      setCommandHistory(prev => [
        ...prev,
        {
          input: trimmedInput,
          output: `Command not found: ${cmdName}. Type 'help' for available commands.`,
          isError: true
        }
      ]);
    }
  };

  // Handle key presses
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle Up/Down arrow for command history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < inputHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
    // Handle Tab for command completion
    else if (e.key === 'Tab') {
      e.preventDefault();
      
      // Get the partial command
      const partialCmd = input.split(' ')[0];
      
      // Find matching commands
      const matchingCmds = commands
        .filter(cmd => cmd.name.startsWith(partialCmd) && (!cmd.isHidden || clearanceLevel >= 3))
        .map(cmd => cmd.name);
      
      // Complete if there's a single match
      if (matchingCmds.length === 1) {
        setInput(matchingCmds[0] + ' ');
      }
      // Show all options if there are multiple matches
      else if (matchingCmds.length > 1) {
        setCommandHistory(prev => [
          ...prev,
          {
            input: '',
            output: (
              <div>
                <div className="text-cyber-blue">Matching commands:</div>
                <div className="flex flex-wrap gap-2">
                  {matchingCmds.map((cmd, i) => (
                    <span key={i} className="text-neon-green">{cmd}</span>
                  ))}
                </div>
              </div>
            )
          }
        ]);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
    setHistoryIndex(-1);
  };

  // Custom styling for the terminal, making it look like an old-school terminal
  return (
    <div 
      className={`font-mono bg-dark-base border-2 border-neon-green rounded-md overflow-hidden ${className}`} 
      style={{ boxShadow: '0 0 15px rgba(80, 250, 123, 0.5)' }}
    >
      {/* Terminal title bar */}
      <div className="bg-dark-tertiary px-4 py-2 border-b border-neon-green flex justify-between items-center">
        <div className="text-neon-green font-bold">CyberSec Terminal</div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-cyber-red"></div>
          <div className="h-3 w-3 rounded-full bg-cyber-orange"></div>
          <div className="h-3 w-3 rounded-full bg-neon-green"></div>
        </div>
      </div>
      
      {/* Terminal output */}
      <div 
        ref={terminalRef}
        className={`overflow-y-auto p-4 ${isBlinking ? 'terminal-blink' : ''}`} 
        style={{ height, overflowY: 'auto' }}
      >
        {commandHistory.map((item, index) => (
          <div key={index} className="mb-2">
            {/* Input with prompt */}
            {item.input && (
              <div className="flex">
                <span className="text-cyber-blue mr-2">{prompt}</span>
                <span className="text-gray-300">{item.input}</span>
              </div>
            )}
            
            {/* Command output */}
            <div className={`ml-0 ${item.isError ? 'text-cyber-red' : 'text-gray-300'}`}>
              {item.output}
            </div>
          </div>
        ))}
        
        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-cyber-blue mr-2">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-gray-300 focus:outline-none w-full"
            aria-label="Terminal input"
            autoFocus
          />
          <motion.span 
            className="h-4 w-2 bg-neon-green"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
          />
        </form>
      </div>
      
      {/* Terminal status bar */}
      <div className="bg-dark-tertiary px-4 py-1 border-t border-neon-green text-xs flex justify-between">
        <div className="text-cyber-blue">
          Clearance: <span className="text-neon-green">Level {clearanceLevel}</span>
        </div>
        <div className="text-neon-green">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      {/* Styles for typing animation and blinking effect */}
      <style jsx>{`
        .terminal-blink {
          animation: terminal-blink 0.2s steps(1) 5;
        }
        
        @keyframes terminal-blink {
          0%, 100% { background-color: var(--dark-base); }
          50% { background-color: var(--neon-green); color: var(--dark-base); }
        }
        
        .typing-animation > div {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 0.5s steps(40, end);
          margin-top: 0.25rem;
        }
        
        .typing-animation > div:nth-child(1) { animation-delay: 0s; }
        .typing-animation > div:nth-child(2) { animation-delay: 0.5s; }
        .typing-animation > div:nth-child(3) { animation-delay: 1s; }
        .typing-animation > div:nth-child(4) { animation-delay: 1.5s; }
        .typing-animation > div:nth-child(5) { animation-delay: 2s; }
        .typing-animation > div:nth-child(6) { animation-delay: 2.5s; }
        .typing-animation > div:nth-child(7) { animation-delay: 3s; }
        .typing-animation > div:nth-child(8) { animation-delay: 3.5s; }
        .typing-animation > div:nth-child(9) { animation-delay: 4s; }
        .typing-animation > div:nth-child(10) { animation-delay: 4.5s; }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
};

export default CyberTerminal;

++++=== [30] ./src/components/interactive/NetworkGraph.tsx ===+++
'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import GlitchText from '../ui/GlitchText';

interface Skill {
  id: string;
  name: string;
  proficiency: number; // 0-100
  category: string;
  relatedTo?: string[]; // IDs of related skills
  description?: string;
}

interface NetworkGraphProps {
  skills: Skill[];
  height?: number;
  width?: number;
  className?: string;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({
  skills,
  height = 500,
  width = 800,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Skill | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    skills.forEach(skill => uniqueCategories.add(skill.category));
    return Array.from(uniqueCategories);
  }, [skills]);

  // Calculate the filtered skills
  const filteredSkills = useMemo(() => {
    let result = skills;
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(skill => 
        skill.name.toLowerCase().includes(lowerSearchTerm) || 
        skill.category.toLowerCase().includes(lowerSearchTerm) ||
        (skill.description && skill.description.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    // Filter by category
    if (filteredCategory) {
      result = result.filter(skill => skill.category === filteredCategory);
    }
    
    return result;
  }, [skills, searchTerm, filteredCategory]);

  // Setup and update the network graph
  useEffect(() => {
    if (!svgRef.current || filteredSkills.length === 0) return;

    // Clear existing graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Create a map for easy skill lookup
    const skillMap = new Map(skills.map(skill => [skill.id, skill]));

    // Define the nodes and links for the graph
    const nodes = filteredSkills.map(skill => ({
      id: skill.id,
      name: skill.name,
      proficiency: skill.proficiency,
      category: skill.category,
      radius: 10 + (skill.proficiency / 10), // Size based on proficiency
    }));

    // Create links between related skills
    const links = [] as Array<{ source: string; target: string; strength: number; }>;
    filteredSkills.forEach(skill => {
      if (skill.relatedTo) {
        skill.relatedTo.forEach(relatedId => {
          if (skillMap.has(relatedId) && filteredSkills.some(s => s.id === relatedId)) {
            links.push({
              source: skill.id,
              target: relatedId,
              // Strength based on average proficiency of connected nodes
              strength: (skill.proficiency + (skillMap.get(relatedId)?.proficiency || 0)) / 200
            });
          }
        });
      }
    });

    // Set up the SVG with a force-directed graph
    const svg = d3.select(svgRef.current);
    const container = svg.append('g');

    // Create a responsive viewBox
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    // Set up the simulation
    const simulation = d3.forceSimulation<any>(nodes)
      .force('charge', d3.forceManyBody().strength(-150))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.radius + 5))
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100).strength((d: any) => d.strength));

    // Color scale for categories
    const colorScale = d3.scaleOrdinal()
      .domain(categories)
      .range([
        'var(--neon-green, #50fa7b)', 
        'var(--cyber-blue, #8be9fd)', 
        'var(--neon-purple, #bd93f9)',
        'var(--cyber-orange, #ffb86c)', 
        'var(--cyber-red, #ff5555)'
      ]);

    // Create links
    const link = container.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'rgba(128, 128, 128, 0.3)')
      .attr('stroke-width', 1)
      .attr('class', (d: any) => `link-${d.source.id} link-${d.target.id}`);

    // Create nodes
    const node = container.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', (d: any) => `node-${d.id}`)
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles to nodes
    node.append('circle')
      .attr('r', (d: any) => d.radius)
      .attr('fill', (d: any) => colorScale(d.category) as string)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('class', 'node-circle')
      .style('filter', 'url(#glow)');

    // Add text to nodes
    node.append('text')
      .text((d: any) => d.name)
      .attr('x', 0)
      .attr('y', (d: any) => -d.radius - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('class', 'node-text')
      .style('font-size', '10px')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 0 3px rgba(0,0,0,0.8)');

    // Create glow filter for nodes
    const defs = svg.append('defs');
    
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
      
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');
      
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Add interactivity
    node.on('click', function(event: any, d: any) {
      event.stopPropagation();
      const skill = skillMap.get(d.id);
      if (skill) {
        setSelectedNode(skill);
      }
    })
    .on('mouseover', function(event: any, d: any) {
      setHoveredNode(d.id);
      
      // Highlight related links
      d3.selectAll(`line.link-${d.id}`)
        .attr('stroke', 'rgba(255, 255, 255, 0.8)')
        .attr('stroke-width', 2);
        
      // Highlight this node
      d3.select(this).select('circle')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3);
    })
    .on('mouseout', function(event: any, d: any) {
      setHoveredNode(null);
      
      // Reset links
      d3.selectAll(`line.link-${d.id}`)
        .attr('stroke', 'rgba(128, 128, 128, 0.3)')
        .attr('stroke-width', 1);
        
      // Reset this node
      d3.select(this).select('circle')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);
    });

    // Add click handler to clear selection when clicking on empty space
    svg.on('click', () => {
      setSelectedNode(null);
    });

    // Update node and link positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform.toString());
      });

    svg.call(zoom);

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup on component unmount
    return () => {
      simulation.stop();
    };
  }, [filteredSkills, width, height, categories, skills]);

  // Focus on node when searching
  useEffect(() => {
    if (!svgRef.current || !searchTerm || filteredSkills.length === 0) return;
    
    const matchingSkill = filteredSkills.find(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (matchingSkill) {
      setSelectedNode(matchingSkill);
      
      // Visually highlight the node
      d3.select(svgRef.current)
        .select(`.node-${matchingSkill.id}`)
        .select('circle')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3);
    }
  }, [searchTerm, filteredSkills]);

  // Add entrance animation on first render
  useEffect(() => {
    if (!isInitialized && svgRef.current) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter
  const handleCategoryFilter = (category: string | null) => {
    setFilteredCategory(category === filteredCategory ? null : category);
  };

  return (
    <div className={`network-graph-container ${className}`}>
      {/* Controls and filters */}
      <div className="mb-4 p-4 bg-dark-tertiary rounded-md border border-neon-green flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 bg-dark-base text-gray-200 border border-neon-green rounded focus:outline-none focus:ring-2 focus:ring-neon-green"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryFilter(null)}
            className={`px-3 py-1 rounded-full text-xs border ${
              !filteredCategory 
                ? 'bg-neon-green text-dark-base border-neon-green' 
                : 'bg-transparent text-gray-300 border-gray-600 hover:border-neon-green'
            }`}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-3 py-1 rounded-full text-xs border ${
                filteredCategory === category 
                  ? 'bg-neon-green text-dark-base border-neon-green' 
                  : 'bg-transparent text-gray-300 border-gray-600 hover:border-neon-green'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main graph visualization */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-grow relative border border-neon-green rounded-md bg-dark-base overflow-hidden">
          <div className="absolute top-2 left-2 text-xs text-gray-400 z-10">
            {filteredSkills.length} of {skills.length} skills | 
            Drag to move nodes, scroll to zoom
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <svg 
              ref={svgRef} 
              width="100%" 
              height={height}
              className="w-full"
            />
          </motion.div>
          
          {/* Help overlay for empty state */}
          {filteredSkills.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-dark-base bg-opacity-80">
              <div className="text-center p-6">
                <GlitchText className="text-xl mb-2">No skills found</GlitchText>
                <p className="text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Skill detail panel */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="lg:w-80 p-4 border border-neon-green rounded-md bg-dark-tertiary"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-cyber text-neon-green">{selectedNode.name}</h3>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-3">
              <span className="text-cyber-blue text-sm">Category:</span>
              <span className="ml-2 px-2 py-1 rounded text-xs bg-dark-base">
                {selectedNode.category}
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-cyber-blue text-sm">Proficiency:</span>
              <div className="mt-1 w-full bg-dark-base h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-neon-green h-full"
                  style={{ width: `${selectedNode.proficiency}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>
            
            {selectedNode.description && (
              <div className="mb-4">
                <span className="text-cyber-blue text-sm">Description:</span>
                <p className="mt-1 text-gray-300 text-sm">
                  {selectedNode.description}
                </p>
              </div>
            )}
            
            {selectedNode.relatedTo && selectedNode.relatedTo.length > 0 && (
              <div>
                <span className="text-cyber-blue text-sm">Related Skills:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedNode.relatedTo.map(relatedId => {
                    const relatedSkill = skills.find(s => s.id === relatedId);
                    return relatedSkill ? (
                      <button
                        key={relatedId}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNode(relatedSkill);
                          setFilteredCategory(null); // Clear filters to ensure the node is visible
                          setSearchTerm('');
                        }}
                        className={`px-2 py-1 text-xs rounded bg-dark-base border 
                          ${hoveredNode === relatedId 
                            ? 'border-white text-white' 
                            : 'border-gray-600 text-gray-300 hover:border-neon-green'
                          }`}
                      >
                        {relatedSkill.name}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NetworkGraph;

++++=== [31] ./src/components/layout/Footer.tsx ===+++
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
++++=== [32] ./src/components/layout/Header.tsx ===+++
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
++++=== [33] ./src/components/layout/Layout.tsx ===+++
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

// Layout component to structure the page
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dark-base text-white font-mono">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
++++=== [34] ./src/components/modern/index.ts ===+++
// Modern Component Exports
export { default as ModernNavbar } from './ModernNavbar';
export { default as ModernHero } from './ModernHero';
export { default as ModernProjectCard } from './ModernProjectCard';
export { default as ModernProjects } from './ModernProjects';
export { default as ModernSkillBar } from './ModernSkillBar';
export { default as ModernSkillsSection } from './ModernSkillsSection';
export { default as ModernTimeline } from './ModernTimeline';
export { default as ModernContactForm } from './ModernContactForm';
export { default as ModernSocialFloat } from './ModernSocialFloat';

++++=== [35] ./src/components/modern/ModernContactForm.tsx ===+++
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaLock } from 'react-icons/fa';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const ModernContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="modern-card p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex items-center">
        <motion.div
          className="w-10 h-10 rounded-full bg-dark-secondary flex items-center justify-center mr-3"
          animate={{ 
            boxShadow: ['0 0 0 rgba(80, 250, 123, 0.4)', '0 0 20px rgba(80, 250, 123, 0.6)', '0 0 0 rgba(80, 250, 123, 0.4)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaLock className="text-neon-green" />
        </motion.div>
        <h2 className="text-xl font-cyber">Secure Contact</h2>
      </div>
      
      {submitted ? (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-16 h-16 mx-auto bg-neon-green/20 rounded-full flex items-center justify-center mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <FaPaperPlane className="text-neon-green text-xl" />
          </motion.div>
          <h3 className="text-lg font-medium mb-2">Message Sent!</h3>
          <p className="opacity-70">Thanks for reaching out. I'll get back to you soon.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="modern-form-control">
            <label className="modern-form-label">Name</label>
            <motion.input
              type="text"
              name="name"
              className="modern-input"
              placeholder="Your name"
              value={formState.name}
              onChange={handleChange}
              required
              whileFocus={{ borderColor: '#50fa7b', boxShadow: '0 0 10px rgba(80, 250, 123, 0.3)' }}
            />
          </div>
          
          <div className="modern-form-control">
            <label className="modern-form-label">Email</label>
            <motion.input
              type="email"
              name="email"
              className="modern-input"
              placeholder="Your email"
              value={formState.email}
              onChange={handleChange}
              required
              whileFocus={{ borderColor: '#50fa7b', boxShadow: '0 0 10px rgba(80, 250, 123, 0.3)' }}
            />
          </div>
          
          <div className="modern-form-control">
            <label className="modern-form-label">Message</label>
            <motion.textarea
              name="message"
              className="modern-input min-h-[120px] resize-none"
              placeholder="Your message"
              value={formState.message}
              onChange={handleChange}
              required
              whileFocus={{ borderColor: '#50fa7b', boxShadow: '0 0 10px rgba(80, 250, 123, 0.3)' }}
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          
          <motion.button
            type="submit"
            className="modern-button modern-button-primary w-full py-3 mt-2"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FaPaperPlane className="mr-2" /> Send Message
              </span>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default ModernContactForm;

++++=== [36] ./src/components/modern/ModernHero.tsx ===+++
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

++++=== [37] ./src/components/modern/ModernNavbar.tsx ===+++
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

++++=== [38] ./src/components/modern/ModernProjectCard.tsx ===+++
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '../../types';

interface ModernProjectCardProps {
  project: Project;
  index: number;
}

const ModernProjectCard: React.FC<ModernProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {project.imageUrl && (
        <div className="overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="project-image"
          />
        </div>
      )}
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        
        <p className="project-description">{project.description}</p>
        
        <div className="project-tags">
          {project.technologies?.map((tech, idx) => (
            <span key={idx} className="project-tag">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="project-links mt-4">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modern-button modern-button-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub /> Code
            </motion.a>
          )}
          
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modern-button modern-button-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ModernProjectCard;

++++=== [39] ./src/components/modern/ModernProjects.tsx ===+++
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import ModernProjectCard from './ModernProjectCard';
import { FaFilter } from 'react-icons/fa';

// Define a simple function to extract categories
const extractCategories = (projects: Project[]): string[] => {
  const categories = new Set<string>();
  categories.add('all');
  
  projects.forEach(project => {
    // Add categories from the categories array if it exists
    if (project.categories && Array.isArray(project.categories)) {
      project.categories.forEach(category => {
        if (typeof category === 'string') {
          categories.add(category);
        }
      });
    }
    
    // Add category if it exists
    if (project.category) {
      if (typeof project.category === 'string') {
        categories.add(project.category);
      } else if (typeof project.category === 'object' && project.category.name) {
        categories.add(project.category.name);
      }
    }
  });
  
  return Array.from(categories);
};

interface ModernProjectsProps {
  projects: Project[];
}

const ModernProjects: React.FC<ModernProjectsProps> = ({ projects }) => {
  const [filter, setFilter] = useState<string>('all');
  
  // Get unique categories
  const categories = extractCategories(projects);
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => {
        // Check in categories array
        if (project.categories && project.categories.includes(filter)) {
          return true;
        }
        
        // Check in category property
        if (project.category) {
          if (typeof project.category === 'string') {
            return project.category === filter;
          } else if (typeof project.category === 'object' && project.category.name) {
            return project.category.name === filter;
          }
        }
        
        return false;
      });

  return (
    <section className="py-16">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="section-title font-cyber text-neon-green mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        
        {/* Filter tabs */}
        <div className="mb-10 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-2">
            <motion.div 
              className="flex items-center mr-2 text-sm font-cyber text-cyber-blue"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaFilter className="mr-2" /> Filter:
            </motion.div>
            
            {categories.map((category, index) => (
              <motion.button
                key={`category-${index}-${category}`}
                className={`px-4 py-2 rounded-md text-sm transition-all duration-300 whitespace-nowrap font-terminal ${
                  filter === category 
                    ? 'bg-neon-green/10 text-neon-green border border-neon-green/50' 
                    : 'bg-dark-secondary/50 text-gray-300 border border-transparent hover:border-neon-purple/30 hover:text-neon-purple'
                }`}
                onClick={() => setFilter(category)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Projects grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || `project-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <ModernProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-neon-purple text-5xl mb-4">¯\_(ツ)_/¯</div>
            <h3 className="text-xl mb-2 font-cyber">No projects found</h3>
            <p className="text-gray-400">No projects match the selected filter.</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default ModernProjects;

++++=== [40] ./src/components/modern/ModernSkillBar.tsx ===+++
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Skill } from '../../types';

interface ModernSkillBarProps {
  skill: Skill;
  delay?: number;
}

const ModernSkillBar: React.FC<ModernSkillBarProps> = ({ skill, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  
  useEffect(() => {
    if (inView) {
      controls.start({ width: `${skill.level}%`, transition: { duration: 1.5, delay } });
    }
  }, [controls, inView, skill.level, delay]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <motion.h4 
          className="text-md font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay }}
        >
          {skill.name}
        </motion.h4>
        <motion.span
          className="text-sm opacity-70"
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay }}
        >
          {skill.level}%
        </motion.span>
      </div>
      
      <div className="skill-bar-container" ref={ref}>
        <motion.div
          className="skill-bar"
          initial={{ width: 0 }}
          animate={controls}
          style={{ 
            background: `linear-gradient(90deg, ${skill.color || '#50fa7b'}, ${skill.secondaryColor || '#8be9fd'})` 
          }}
        />
      </div>
    </div>
  );
};

export default ModernSkillBar;

++++=== [41] ./src/components/modern/ModernSkillsSection.tsx ===+++
import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';
import ModernSkillBar from './ModernSkillBar';

interface ModernSkillsSectionProps {
  skills: Skill[];
}

const ModernSkillsSection: React.FC<ModernSkillsSectionProps> = ({ skills }) => {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(skillsByCategory);

  return (
    <section className="py-16">
      <motion.h2 
        className="section-title font-cyber text-neon-green"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {categories.map((category, categoryIndex) => (
          <motion.div 
            key={category}
            className="modern-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <motion.h3 
              className="text-lg font-cyber mb-6 text-cyber-blue"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {category}
            </motion.h3>
            
            <div>
              {skillsByCategory[category].map((skill, index) => (
                <ModernSkillBar 
                  key={skill.name} 
                  skill={skill} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-16">
        {skills.filter(skill => skill.logo).map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center justify-center p-4 modern-card text-center"
            whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {skill.logo && (
              <img 
                src={skill.logo} 
                alt={skill.name} 
                className="h-16 w-16 object-contain mb-3"
              />
            )}
            <h4 className="text-sm font-medium">{skill.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ModernSkillsSection;

++++=== [42] ./src/components/modern/ModernSocialFloat.tsx ===+++
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

++++=== [43] ./src/components/modern/ModernTimeline.tsx ===+++
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

++++=== [44] ./src/components/portfolio/CertificationShowcase.tsx ===+++
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certification } from '@/types';
import Image from 'next/image';
import { FaAward, FaCalendarAlt, FaExternalLinkAlt, FaCertificate, FaSearch } from 'react-icons/fa';

interface CertificationShowcaseProps {
  certifications: Certification[];
}

const CertificationShowcase: React.FC<CertificationShowcaseProps> = ({ certifications }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCerts, setFilteredCerts] = useState<Certification[]>(certifications);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  
  // Filter certifications based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCerts(certifications);
      return;
    }
    
    const filtered = certifications.filter(cert => 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuingOrganization.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredCerts(filtered);
  }, [searchTerm, certifications]);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Function to get badge color based on status
  const getStatusBadgeColor = (status?: string) => {
    if (!status) return 'var(--neon-green)';
    
    switch (status) {
      case 'active': return 'var(--neon-green)';
      case 'expired': return 'var(--neon-red)';
      case 'pending': return 'var(--neon-orange)';
      default: return 'var(--neon-green)';
    }
  };
  
  // Calculate certifications by category
  const certsByCategory = filteredCerts.reduce((acc, cert) => {
    if (cert.categories && cert.categories.length > 0) {
      cert.categories.forEach(category => {
        if (!acc[category.name]) {
          acc[category.name] = [];
        }
        acc[category.name].push(cert);
      });
    } else {
      if (!acc['Uncategorized']) {
        acc['Uncategorized'] = [];
      }
      acc['Uncategorized'].push(cert);
    }
    return acc;
  }, {} as { [key: string]: Certification[] });
  
  // Handle card flip
  const toggleCardFlip = (certId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [certId]: !prev[certId]
    }));
  };
  
  // Open modal with cert details
  const openCertModal = (cert: Certification) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  // Render certification description from Portable Text
  const renderDescription = (description: any[] | undefined) => {
    if (!description) return '';
    
    return description.map((block, index) => {
      if (block.children) {
        return block.children.map((child: any, childIndex: number) => (
          <span key={`${index}-${childIndex}`}>{child.text}</span>
        ));
      }
      return null;
    });
  };

  return (
    <div>
      {/* Search input */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search certifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-tertiary border border-dark-tertiary focus:border-cyber-blue rounded-md py-2 pl-10 pr-4 text-white focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
        </div>
      </div>
      
      {/* Certificates by category */}
      {Object.keys(certsByCategory).map(category => (
        <div key={category} className="mb-12">
          <h3 className="text-xl font-cyber mb-6 text-glow-blue">
            <FaCertificate className="inline-block mr-2" />
            {category}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certsByCategory[category].map(cert => (
              <motion.div 
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card-3d-container"
                onClick={() => openCertModal(cert)}
              >
                <div className={`card-3d ${flippedCards[cert._id] ? 'flipped' : ''}`}>
                  {/* Front of card */}
                  <div className="card-3d-front cyber-card p-0 cursor-pointer h-full">
                    <div className="relative h-40 overflow-hidden">
                      {cert.certificateImage ? (
                        <Image
                          src={cert.certificateImage.asset.url}
                          alt={cert.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-dark-tertiary to-dark-secondary flex items-center justify-center">
                          <FaAward className="text-5xl text-cyber-blue" />
                        </div>
                      )}
                      
                      {/* Status badge */}
                      {cert.status && (
                        <div 
                          className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold"
                          style={{ 
                            backgroundColor: `${getStatusBadgeColor(cert.status)}20`,
                            color: getStatusBadgeColor(cert.status)
                          }}
                        >
                          {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                        </div>
                      )}
                      
                      {/* Issuing org logo */}
                      {cert.issuingOrganization.logo && (
                        <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <Image
                            src={cert.issuingOrganization.logo.asset.url}
                            alt={cert.issuingOrganization.name}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      )}
                      
                      {/* Flip button */}
                      <button 
                        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-dark-base bg-opacity-80 flex items-center justify-center text-cyber-blue hover:text-glow-blue transition-all"
                        onClick={(e) => toggleCardFlip(cert._id, e)}
                      >
                        ↻
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-cyber text-glow mb-1 line-clamp-1">{cert.title}</h3>
                      <p className="text-sm text-cyber-gray mb-3">{cert.issuingOrganization.name}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-neon-green">
                          <FaCalendarAlt className="mr-1" />
                          <span>{formatDate(cert.dateIssued)}</span>
                        </div>
                        
                        {cert.verificationLink && (
                          <a 
                            href={cert.verificationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neon-purple hover:text-glow-purple transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt /> 
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="card-3d-back cyber-card p-4 cursor-pointer h-full flex flex-col">
                    <h3 className="text-lg font-cyber text-glow mb-2">{cert.title}</h3>
                    
                    <div className="flex-1">
                      {cert.description ? (
                        <p className="text-sm text-cyber-gray mb-3 line-clamp-4">
                          {renderDescription(cert.description)}
                        </p>
                      ) : (
                        <p className="text-sm text-cyber-gray mb-3">
                          Issued by {cert.issuingOrganization.name} on {formatDate(cert.dateIssued)}
                          {cert.expirationDate && ` (Valid until ${formatDate(cert.expirationDate)})`}
                        </p>
                      )}
                      
                      {cert.categories && cert.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {cert.categories.map(cat => (
                            <span 
                              key={cat._id} 
                              className="text-xs px-2 py-0.5 rounded-full bg-dark-tertiary text-neon-green"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-auto">
                      <p className="text-xs text-center text-neon-purple">Click for details</p>
                      
                      {/* Flip back button */}
                      <button 
                        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-dark-base bg-opacity-80 flex items-center justify-center text-cyber-blue hover:text-glow-blue transition-all"
                        onClick={(e) => toggleCardFlip(cert._id, e)}
                      >
                        ↻
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Empty state */}
      {filteredCerts.length === 0 && (
        <div className="text-center py-12">
          <FaCertificate className="text-5xl text-cyber-blue mx-auto mb-4 opacity-50" />
          <p className="text-cyber-gray">No certifications found matching "{searchTerm}"</p>
          <button 
            className="mt-4 cyber-button"
            onClick={() => setSearchTerm('')}
          >
            Clear search
          </button>
        </div>
      )}
      
      {/* Certificate detail modal */}
      <AnimatePresence>
        {showModal && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-base bg-opacity-90 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="cyber-card max-w-2xl w-full max-h-[90vh] overflow-y-auto holographic"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {selectedCert.certificateImage ? (
                  <div className="h-60 md:h-72 relative">
                    <Image
                      src={selectedCert.certificateImage.asset.url}
                      alt={selectedCert.title}
                      fill
                      className="object-contain bg-dark-tertiary"
                    />
                  </div>
                ) : (
                  <div className="h-60 md:h-72 bg-gradient-to-br from-dark-tertiary to-dark-secondary flex items-center justify-center">
                    <FaAward className="text-8xl text-cyber-blue" />
                  </div>
                )}
                
                <button
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-base bg-opacity-80 flex items-center justify-center text-neon-red hover:text-glow-red transition-all"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  {selectedCert.issuingOrganization.logo ? (
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={selectedCert.issuingOrganization.logo.asset.url}
                        alt={selectedCert.issuingOrganization.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-dark-tertiary flex items-center justify-center flex-shrink-0">
                      <FaCertificate className="text-3xl text-cyber-blue" />
                    </div>
                  )}
                  
                  <div>
                    <h2 className="text-2xl font-cyber text-gradient-neon mb-2">
                      {selectedCert.title}
                    </h2>
                    <p className="text-lg text-cyber-gray">
                      {selectedCert.issuingOrganization.name}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-dark-tertiary rounded-md p-3">
                    <div className="text-sm text-cyber-gray mb-1">Issued</div>
                    <div className="text-neon-green">{formatDate(selectedCert.dateIssued)}</div>
                  </div>
                  
                  {selectedCert.expirationDate && (
                    <div className="bg-dark-tertiary rounded-md p-3">
                      <div className="text-sm text-cyber-gray mb-1">Expires</div>
                      <div 
                        className="font-semibold" 
                        style={{ color: getStatusBadgeColor(selectedCert.status) }}
                      >
                        {formatDate(selectedCert.expirationDate)}
                      </div>
                    </div>
                  )}
                </div>
                
                {selectedCert.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-cyber text-cyber-blue mb-3">Description</h3>
                    <div className="text-cyber-gray space-y-2">
                      {renderDescription(selectedCert.description)}
                    </div>
                  </div>
                )}
                
                {selectedCert.categories && selectedCert.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-cyber text-neon-purple mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.categories.map(cat => (
                        <span 
                          key={cat._id} 
                          className="px-3 py-1 rounded-full neon-border-purple text-neon-purple"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedCert.verificationLink && (
                  <div className="text-center mt-6">
                    <a 
                      href={selectedCert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button-blue inline-flex items-center gap-2"
                    >
                      <FaExternalLinkAlt /> Verify Certificate
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .flipped {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default CertificationShowcase;

++++=== [45] ./src/components/portfolio/CyberTerminal.tsx ===+++
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Profile, Project, Skill } from '../../types';
import { extractPortableText } from '../../lib/portableTextUtils';
import { FaTerminal, FaUserSecret, FaLaptopCode, FaShieldAlt, FaFileAlt, FaKey, FaDownload, FaGithub } from 'react-icons/fa';

interface CyberTerminalProps {
  profile: Profile;
  projects?: Project[];
  skills?: Skill[];
}

interface TerminalCommand {
  input: string;
  output: React.ReactNode;
}

const CyberTerminal: React.FC<CyberTerminalProps> = ({ profile, projects = [], skills = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Available commands
  const commands = {
    help: () => (
      <div className="space-y-2">
        <p className="text-neon-green">Available commands:</p>
        <ul className="space-y-1 ml-4">
          <li><span className="text-cyber-blue">help</span> - Display this help message</li>
          <li><span className="text-cyber-blue">about</span> - About me</li>
          <li><span className="text-cyber-blue">skills</span> - List my technical skills</li>
          <li><span className="text-cyber-blue">projects</span> - View my projects</li>
          <li><span className="text-cyber-blue">contact</span> - Contact information</li>
          <li><span className="text-cyber-blue">resume</span> - Download resume</li>
          <li><span className="text-cyber-blue">clear</span> - Clear terminal</li>
          <li><span className="text-cyber-blue">exit</span> - Close terminal</li>
        </ul>
        <p className="text-neon-orange mt-2">Pro tip: Try <span className="text-cyber-blue">scan [target]</span> for a simulated security scan</p>
      </div>
    ),
    about: () => (
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-neon-green">
          <FaUserSecret />
          <span className="font-cyber">{profile.name}</span>
        </div>
        <p className="text-cyber-gray">{profile.shortBio}</p>
        {profile.longBio && (
          <div className="mt-2 text-cyber-gray">
            <p>{extractPortableText(profile.longBio, "Cybersecurity professional with expertise in threat analysis, penetration testing, and secure system design.")}</p>
          </div>
        )}
      </div>
    ),
    skills: () => {
      // Group skills by category
      const categories = skills.reduce((acc, skill) => {
        const category = skill.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      }, {} as Record<string, Skill[]>);

      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-neon-green">
            <FaLaptopCode />
            <span className="font-cyber">TECHNICAL SKILLS</span>
          </div>
          {Object.entries(categories).map(([category, categorySkills]) => (
            <div key={category} className="ml-2">
              <div className="text-cyber-blue mb-1 font-semibold">{category}:</div>
              <div className="ml-4 grid grid-cols-2 gap-1">
                {categorySkills.map(skill => (
                  <div key={skill._id} className="flex items-center">
                    <div className="w-2 h-2 bg-neon-green rounded-full mr-2"></div>
                    <span className="text-white">{skill.name}</span>
                    <div className="ml-2 w-16 h-1 bg-dark-tertiary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-neon-green" 
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    },
    projects: () => (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-neon-green">
          <FaShieldAlt />
          <span className="font-cyber">CYBER PROJECTS</span>
        </div>
        <div className="space-y-3">
          {projects.slice(0, 5).map(project => (
            <div key={project._id} className="border border-dark-tertiary p-2 rounded">
              <div className="font-semibold text-cyber-blue">{project.title}</div>
              <div className="text-sm text-cyber-gray line-clamp-2">
                {project.description?.[0]?.children.map(c => c.text).join(' ')}
              </div>
              <div className="flex space-x-3 mt-2">
                {project.githubLink && (
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neon-green hover:text-glow flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub />
                    <span className="text-xs">Code</span>
                  </a>
                )}
                {project.demoLink && (
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neon-purple hover:text-glow-purple flex items-center space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs">Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        {projects.length > 5 && (
          <p className="text-neon-orange text-sm">+ {projects.length - 5} more projects. View all in the Projects section.</p>
        )}
      </div>
    ),
    contact: () => (
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-neon-green">
          <FaKey />
          <span className="font-cyber">SECURE CONTACT CHANNELS</span>
        </div>
        {profile.email && (
          <div className="ml-4 flex items-center space-x-2">
            <span className="text-cyber-blue">EMAIL:</span>
            <a 
              href={`mailto:${profile.email}`} 
              className="text-white hover:text-glow transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {profile.email}
            </a>
          </div>
        )}
        {profile.socialLinks && profile.socialLinks.map((link, i) => (
          <div key={i} className="ml-4 flex items-center space-x-2">
            <span className="text-cyber-blue">{link.platform.toUpperCase()}:</span>
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-glow transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {link.url}
            </a>
          </div>
        ))}
        {profile.contactInstructions && (
          <div className="mt-4 text-neon-orange">{profile.contactInstructions}</div>
        )}
      </div>
    ),
    resume: () => (
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-neon-green">
          <FaFileAlt />
          <span className="font-cyber">RESUME</span>
        </div>
        {profile.resume ? (
          <div className="ml-4">
            <a 
              href={profile.resume.asset.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-white hover:text-glow transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FaDownload />
              <span>Download Resume</span>
            </a>
          </div>
        ) : (
          <p className="text-neon-red ml-4">Resume not available in the database.</p>
        )}
      </div>
    ),
    scan: (target: string) => {
      if (!target) {
        return <p className="text-neon-red">Error: No target specified. Usage: scan [target]</p>;
      }
      
      // Simulated scan animation
      return (
        <div className="space-y-1 animate-scan">
          <p className="text-neon-green">[*] Initializing security scan on target: {target}</p>
          <p className="text-cyber-blue">[*] Running port scan...</p>
          <p className="text-cyber-blue">[+] Port 22 (SSH): Open</p>
          <p className="text-cyber-blue">[+] Port 80 (HTTP): Open</p>
          <p className="text-cyber-blue">[+] Port 443 (HTTPS): Open</p>
          <p className="text-neon-green">[*] Checking for common vulnerabilities...</p>
          <p className="text-neon-orange">[!] Warning: Outdated software versions detected</p>
          <p className="text-neon-orange">[!] CVE-2023-XXXX: Medium severity</p>
          <p className="text-neon-red">[!] Potential XSS vulnerability detected</p>
          <p className="text-neon-green">[*] Generating report...</p>
          <p className="text-white">[*] Scan complete. This was a simulated security scan for demonstration purposes only.</p>
        </div>
      );
    },
    clear: () => null,
    exit: () => {
      setTimeout(() => setIsOpen(false), 500);
      return <p className="text-neon-green">Closing terminal...</p>;
    },
  };

  // Toggle cursor visibility for blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle command execution
  const handleExecuteCommand = () => {
    if (!currentInput.trim()) return;
    
    const input = currentInput.trim();
    const [cmd, ...args] = input.split(' ');
    
    let output: React.ReactNode;
    
    if (cmd in commands) {
      // @ts-ignore - we're checking if the command exists
      if (typeof commands[cmd] === 'function') {
        // @ts-ignore
        output = commands[cmd](args.join(' '));
      } else {
        // @ts-ignore
        output = commands[cmd];
      }
      
      if (cmd === 'clear') {
        setHistory([]);
      } else {
        setHistory(prev => [...prev, { input, output }]);
      }
    } else {
      output = <p className="text-neon-red">Command not recognized: {cmd}. Type 'help' for available commands.</p>;
      setHistory(prev => [...prev, { input, output }]);
    }
    
    setCurrentInput('');
  };

  // Handle key presses
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExecuteCommand();
    }
  };

  return (
    <div className="fixed z-50 bottom-20 right-6">
      {/* Terminal toggle button */}
      <button
        className="w-12 h-12 rounded-full bg-dark-secondary flex items-center justify-center border-2 border-neon-green hover:border-cyber-blue transition-colors shadow-lg"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <FaTerminal className="text-neon-green" size={20} />
      </button>
      
      {/* Terminal window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 md:w-[500px] h-[400px] bg-dark-base neon-border-blue rounded-md overflow-hidden shadow-2xl"
          >
            {/* Terminal header */}
            <div className="bg-dark-tertiary py-2 px-4 border-b border-dark-tertiary flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-neon-red"></span>
                <span className="w-3 h-3 rounded-full bg-neon-orange"></span>
                <span className="w-3 h-3 rounded-full bg-neon-green"></span>
              </div>
              <div className="text-sm font-cyber text-cyber-blue">CYBERSEC TERMINAL</div>
              <button 
                className="text-neon-red hover:text-glow-red transition-all"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            
            {/* Terminal content */}
            <div 
              ref={terminalRef}
              className="h-[calc(100%-80px)] overflow-y-auto p-4 font-terminal text-sm"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Welcome message */}
              {history.length === 0 && (
                <div className="space-y-1 mb-4">
                  <p className="text-neon-green">Welcome to CyberSec Terminal v1.0</p>
                  <p className="text-cyber-blue">Type <span className="text-neon-green">'help'</span> to see available commands</p>
                  <p className="text-white">------------------------------</p>
                </div>
              )}
              
              {/* Command history */}
              {history.map((item, index) => (
                <div key={index} className="mb-4">
                  <div className="flex space-x-2 text-cyber-blue mb-1">
                    <span>$</span>
                    <span>{item.input}</span>
                  </div>
                  <div className="ml-4">{item.output}</div>
                </div>
              ))}
              
              {/* Current command line */}
              <div className="flex space-x-2 text-cyber-blue">
                <span>$</span>
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={e => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent outline-none border-none text-cyber-blue"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {currentInput.length === 0 && cursorVisible && (
                    <span className="absolute left-0 top-0 bg-neon-green opacity-70 w-2 h-full"></span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Terminal footer */}
            <div className="h-10 border-t border-dark-tertiary flex items-center justify-end px-4">
              <div className="text-xs text-cyber-gray">
                Press <span className="text-neon-green">Enter</span> to execute
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CyberTerminal;

++++=== [46] ./src/components/portfolio/EducationSection.tsx ===+++
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Education, Achievement } from '@/types';
import Image from 'next/image';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaStar } from 'react-icons/fa';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Sort education by date (newest first)
  const sortedEducation = [...education].sort((a, b) => {
    const dateA = a.endDate || new Date().toISOString();
    const dateB = b.endDate || new Date().toISOString();
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // Format date string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to render description from Portable Text
  const renderDescription = (description: any[] | undefined) => {
    if (!description) return '';
    
    return description.map((block, index) => {
      if (block.children) {
        return block.children.map((child: any, childIndex: number) => (
          <span key={`${index}-${childIndex}`}>{child.text}</span>
        ));
      }
      return null;
    });
  };

  // Toggle expanded education item
  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative">
      {/* Animated background grid effect */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedEducation.map((edu, index) => (
          <motion.div
            key={edu._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`cyber-card overflow-hidden transition-all duration-500 ${
              expandedId === edu._id ? 'transform scale-105 z-10 neon-border' : ''
            }`}
            onClick={() => toggleExpanded(edu._id)}
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                {edu.institution.logo ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={edu.institution.logo.asset.url}
                      alt={edu.institution.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-dark-tertiary flex items-center justify-center flex-shrink-0 text-neon-purple">
                    <FaGraduationCap size={32} />
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-cyber text-gradient-neon mb-1">{edu.degree}</h3>
                  <p className="text-lg text-neon-purple font-semibold">{edu.institution.name}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-cyber-gray">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1 text-neon-green" />
                      <span>
                        {formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                      </span>
                    </div>
                    
                    {edu.institution.location && (
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1 text-neon-orange" />
                        <span>{edu.institution.location}</span>
                      </div>
                    )}
                    
                    {edu.gpa && (
                      <div className="flex items-center">
                        <FaStar className="mr-1 text-cyber-blue" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {edu.fieldOfStudy && (
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-dark-tertiary text-cyber-blue">
                    {edu.fieldOfStudy}
                  </span>
                </div>
              )}
              
              {/* Description - shown when expanded or if there are no achievements */}
              {(expandedId === edu._id || !edu.achievements || edu.achievements.length === 0) && edu.description && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className="text-cyber-gray space-y-2">
                    {renderDescription(edu.description)}
                  </div>
                </motion.div>
              )}
              
              {/* Achievement summary */}
              {edu.achievements && edu.achievements.length > 0 && expandedId !== edu._id && (
                <div className="flex items-center text-neon-orange mt-2">
                  <FaTrophy className="mr-2" />
                  <span className="text-sm">{edu.achievements.length} Achievement{edu.achievements.length !== 1 ? 's' : ''}</span>
                </div>
              )}
              
              {/* Expanded achievements */}
              <AnimatePresence>
                {expandedId === edu._id && edu.achievements && edu.achievements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-cyber text-neon-orange mb-3 flex items-center">
                      <FaTrophy className="mr-2" />
                      Achievements
                    </h4>
                    
                    <div className="space-y-4">
                      {edu.achievements.map((achievement, i) => (
                        <motion.div
                          key={achievement._id || i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="bg-dark-tertiary p-3 rounded-md"
                        >
                          <h5 className="text-white font-semibold mb-1">{achievement.title}</h5>
                          {achievement.description && (
                            <p className="text-sm text-cyber-gray">{achievement.description}</p>
                          )}
                          
                          {achievement.date && (
                            <div className="text-xs text-neon-green mt-2">
                              {formatDate(achievement.date)}
                            </div>
                          )}
                          
                          {achievement.metrics && achievement.metrics.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {achievement.metrics.map((metric, j) => (
                                <div key={j} className="bg-dark-base rounded p-2 text-center">
                                  <div className="text-xs text-cyber-gray">{metric.name}</div>
                                  <div className="text-neon-orange text-sm font-semibold">{metric.value}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {achievement.evidence && achievement.evidence.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {achievement.evidence.map((item, k) => (
                                <a
                                  key={k}
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs px-2 py-1 bg-dark-base rounded-full text-cyber-blue hover:text-glow-blue transition-all"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {item.type}
                                </a>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Expand/collapse indicator */}
              <div className="text-center mt-3">
                <div className={`inline-block transition-transform duration-300 ${expandedId === edu._id ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Interactive education timeline visualization */}
      <div className="mt-16 relative overflow-hidden pb-8">
        <h3 className="text-xl font-cyber text-cyber-blue mb-8 text-center">Education Timeline</h3>
        
        <div className="relative h-20">
          {/* Timeline bar */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-neon-purple via-cyber-blue to-neon-green transform -translate-y-1/2"></div>
          
          {/* Timeline nodes */}
          {sortedEducation.map((edu, index) => {
            // Calculate position based on start date
            const startDate = new Date(edu.startDate).getTime();
            const endDate = edu.endDate ? new Date(edu.endDate).getTime() : new Date().getTime();
            
            // Find min and max dates for scaling
            const allDates = education.flatMap(e => [
              new Date(e.startDate).getTime(),
              e.endDate ? new Date(e.endDate).getTime() : new Date().getTime()
            ]);
            const minDate = Math.min(...allDates);
            const maxDate = Math.max(...allDates);
            const timeRange = maxDate - minDate;
            
            // Calculate positions as percentages
            const leftPos = ((startDate - minDate) / timeRange) * 100;
            const width = ((endDate - startDate) / timeRange) * 100;
            
            return (
              <div 
                key={edu._id} 
                className="absolute top-0 bottom-0 flex flex-col items-center"
                style={{ left: `${leftPos}%`, width: `${width}%` }}
              >
                {/* Timeline node */}
                <div 
                  className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full cursor-pointer
                    ${expandedId === edu._id ? 'neon-border bg-dark-base' : 'bg-neon-purple'}`}
                  onClick={() => toggleExpanded(edu._id)}
                  onMouseEnter={() => setExpandedId(edu._id)}
                >
                  <div 
                    className={`absolute inset-0.5 rounded-full ${
                      expandedId === edu._id ? 'animate-pulse bg-neon-purple' : ''
                    }`}
                  ></div>
                </div>
                
                {/* Date label - above or below to avoid overlap */}
                <div
                  className={`absolute transform text-xs whitespace-nowrap text-cyber-gray
                    ${index % 2 === 0 ? 'bottom-0' : 'top-0'}`}
                >
                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </div>
                
                {/* Degree label - show on hover */}
                <AnimatePresence>
                  {expandedId === edu._id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute whitespace-nowrap bg-dark-base neon-border p-1 px-2 rounded text-xs
                        ${index % 2 === 0 ? 'top-8' : 'bottom-8'}`}
                    >
                      {edu.degree}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;

++++=== [47] ./src/components/portfolio/ExperienceTimeline.tsx ===+++
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from '@/types';
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaLaptopCode, FaTrophy } from 'react-icons/fa';

interface ExperienceTimelineProps {
  experience: Experience[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  
  // Sort experiences by date (newest first)
  const sortedExperience = [...experience].sort((a, b) => {
    const dateA = a.endDate || new Date().toISOString();
    const dateB = b.endDate || new Date().toISOString();
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  // Format date string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to render description from Portable Text
  const renderDescription = (description: any[] | undefined) => {
    if (!description) return '';
    
    return description.map((block, index) => {
      if (block.children) {
        return block.children.map((child: any, childIndex: number) => (
          <span key={`${index}-${childIndex}`}>{child.text}</span>
        ));
      }
      return null;
    });
  };

  // Handle experience click
  const handleExperienceClick = (exp: Experience) => {
    setActiveExperience(exp);
    setShowSidePanel(true);
  };

  return (
    <div className="relative">
      {/* Matrix-like background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="matrix-container h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j}>
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Timeline */}
        <div className="flex-1">
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-neon-green to-neon-purple"></div>
            
            {/* Timeline items */}
            {sortedExperience.map((exp, index) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-10 pl-12 ${activeExperience?._id === exp._id ? 'active-timeline-item' : ''}`}
                onClick={() => handleExperienceClick(exp)}
              >
                {/* Timeline node */}
                <div 
                  className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 cyber-node ${activeExperience?._id === exp._id ? 'active-node' : ''}`}
                >
                  <div className="cyber-node-inner"></div>
                </div>
                
                {/* Experience card */}
                <div className={`cyber-card p-5 cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02] ${activeExperience?._id === exp._id ? 'neon-border-blue' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <h3 className="text-lg md:text-xl font-cyber text-glow-blue">{exp.jobTitle}</h3>
                    <div className="text-sm text-cyber-blue flex items-center space-x-1">
                      <FaCalendarAlt />
                      <span>
                        {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3 text-cyber-gray">
                    <FaBuilding className="mr-2 text-neon-green" />
                    <span className="font-semibold mr-4">{exp.company}</span>
                    {exp.location && (
                      <>
                        <FaMapMarkerAlt className="mr-2 text-neon-purple" />
                        <span>{exp.location}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="mb-4 text-sm text-cyber-gray line-clamp-2">
                    {renderDescription(exp.description)}
                  </div>
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      <FaLaptopCode className="text-neon-green mt-1" />
                      {exp.technologies.slice(0, 5).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs px-2 py-1 rounded-full bg-dark-tertiary text-neon-green"
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.technologies.length > 5 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-dark-tertiary text-neon-green">
                          +{exp.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="flex items-center text-neon-orange text-sm">
                      <FaTrophy className="mr-2" />
                      <span>{exp.achievements.length} Achievement{exp.achievements.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  
                  <div className="mt-3 text-center">
                    <span className="text-xs text-neon-green">Click for details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Side panel with details */}
        <AnimatePresence>
          {showSidePanel && activeExperience && (
            <motion.div 
              className="lg:w-2/5 xl:w-1/3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="sticky top-20">
                <div className="cyber-card neon-border-blue overflow-hidden">
                  {/* Header with close button */}
                  <div className="cyber-pulse-header flex justify-between items-center">
                    <h3 className="text-xl font-cyber text-cyber-blue">{activeExperience.jobTitle}</h3>
                    <button 
                      className="text-neon-red hover:text-glow-red transition-all"
                      onClick={() => setShowSidePanel(false)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4 text-cyber-gray">
                      <FaBuilding className="mr-2 text-neon-green" />
                      <span className="font-semibold mr-4">{activeExperience.company}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-dark-tertiary rounded-md p-3">
                        <div className="text-sm text-cyber-gray mb-1">Duration</div>
                        <div className="text-neon-green">
                          {formatDate(activeExperience.startDate)} — {activeExperience.endDate ? formatDate(activeExperience.endDate) : 'Present'}
                        </div>
                      </div>
                      
                      {activeExperience.location && (
                        <div className="bg-dark-tertiary rounded-md p-3">
                          <div className="text-sm text-cyber-gray mb-1">Location</div>
                          <div className="text-neon-purple">{activeExperience.location}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-cyber text-neon-green mb-2">Description</h4>
                      <div className="text-cyber-gray space-y-2">
                        {renderDescription(activeExperience.description)}
                      </div>
                    </div>
                    
                    {activeExperience.achievements && activeExperience.achievements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-cyber text-neon-orange mb-2">Key Achievements</h4>
                        <ul className="space-y-3">
                          {activeExperience.achievements.map((achievement, i) => (
                            <motion.li 
                              key={achievement._id || i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="flex"
                            >
                              <FaTrophy className="text-neon-orange mt-1 mr-3 flex-shrink-0" />
                              <div>
                                <div className="text-white">{achievement.title}</div>
                                {achievement.description && (
                                  <div className="text-sm text-cyber-gray mt-1">{achievement.description}</div>
                                )}
                                {achievement.metrics && achievement.metrics.length > 0 && (
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    {achievement.metrics.map((metric, j) => (
                                      <div key={j} className="bg-dark-tertiary rounded p-2 text-center">
                                        <div className="text-xs text-cyber-gray">{metric.name}</div>
                                        <div className="text-neon-green text-sm font-semibold">{metric.value}</div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {activeExperience.technologies && activeExperience.technologies.length > 0 && (
                      <div>
                        <h4 className="text-lg font-cyber text-neon-green mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeExperience.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="text-sm px-3 py-1 rounded-full bg-dark-tertiary text-neon-green"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx>{`
        .cyber-node {
          background: var(--dark-base);
          border: 2px solid var(--neon-green);
          box-shadow: 0 0 10px var(--neon-green);
          transition: all 0.3s ease;
        }
        
        .active-node {
          border-color: var(--cyber-blue);
          box-shadow: 0 0 15px var(--cyber-blue);
        }
        
        .cyber-node-inner {
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background-color: var(--neon-green);
          animation: pulse 2s infinite;
        }
        
        .active-node .cyber-node-inner {
          background-color: var(--cyber-blue);
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.8;
          }
        }
        
        .active-timeline-item {
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default ExperienceTimeline;

++++=== [48] ./src/components/portfolio/index.ts ===+++
// Export Portfolio components
export { default as PortfolioClient } from './PortfolioClient';
export { default as CyberTerminal } from './CyberTerminal';
export { default as NetworkGraph } from './NetworkGraph';
export { default as ExperienceTimeline } from './ExperienceTimeline';
export { default as CertificationShowcase } from './CertificationShowcase';
export { default as EducationSection } from './EducationSection';
export { default as PortfolioHero } from './PortfolioHero';
export { default as ProjectGallery } from './ProjectGallery';
export { default as SkillsMatrix } from './SkillsMatrix';

++++=== [49] ./src/components/portfolio/NetworkGraph.tsx ===+++
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/types';
import dynamic from 'next/dynamic';
import * as d3 from 'd3-force';
import { FaSearch, FaNetworkWired } from 'react-icons/fa';
import { NodeObject, LinkObject } from 'react-force-graph-2d';

// Add resizeTimer to Window interface
declare global {
  interface Window {
    resizeTimer: ReturnType<typeof setTimeout>;
  }
}

interface NetworkGraphProps {
  skills: Skill[];
}

// Define node and link types for the graph
interface Node extends NodeObject {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  color?: string;
  highlight?: boolean;
  val?: number;
}

interface Link extends LinkObject {
  source: string;
  target: string;
  value: number;
  connection?: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

const CATEGORY_COLORS = {
  'Offensive Security': '#ff5555',
  'Defensive Security': '#50fa7b',
  'Cloud Security': '#8be9fd',
  'Network Security': '#bd93f9',
  'Application Security': '#ffb86c', 
  'Governance': '#f1fa8c',
  'Identity & Access': '#ff79c6',
  'Other': '#6272a4'
};

const DEFAULT_COLOR = '#bd93f9';

// Dynamically import ForceGraph2D with no SSR to avoid window is not defined error
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center bg-dark-tertiary rounded-lg border border-cyber-blue">
      <div className="text-neon-green animate-pulse">
        <span className="text-xl font-cyber">Loading Network Graph...</span>
      </div>
    </div>
  )
});

const NetworkGraph: React.FC<NetworkGraphProps> = ({ skills }) => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  
  // Prepare graph data from skills
  useEffect(() => {
    if (!skills.length) return;
    
    const nodes: Node[] = skills.map(skill => ({
      id: skill._id,
      name: skill.name,
      category: skill.category || 'Other',
      proficiency: skill.proficiency || 50,
      color: CATEGORY_COLORS[skill.category as keyof typeof CATEGORY_COLORS] || DEFAULT_COLOR,
      val: (skill.proficiency || 50) / 10, // Node size based on proficiency
    }));
    
    // Create related links based on category relationships and other factors
    const links: Link[] = [];
    
    // Group skills by category
    const categorizedSkills: Record<string, Skill[]> = {};
    skills.forEach(skill => {
      const category = skill.category || 'Other';
      if (!categorizedSkills[category]) {
        categorizedSkills[category] = [];
      }
      categorizedSkills[category].push(skill);
    });
    
    // Connect skills within the same category
    Object.entries(categorizedSkills).forEach(([category, categorySkills]) => {
      for (let i = 0; i < categorySkills.length; i++) {
        for (let j = i + 1; j < categorySkills.length; j++) {
          // Only connect if both skills have high enough proficiency
          if ((categorySkills[i].proficiency || 0) >= 40 && (categorySkills[j].proficiency || 0) >= 40) {
            links.push({
              source: categorySkills[i]._id,
              target: categorySkills[j]._id,
              value: 2,
              connection: 'category'
            });
          }
        }
      }
    });
    
    // Connect complementary skills across categories (simplified example)
    const complementaryPairs = [
      ['Penetration Testing', 'Network Security'],
      ['Vulnerability Management', 'SIEM'],
      ['Threat Hunting', 'Malware Analysis'],
      ['AWS', 'Cloud Security'],
      ['Incident Response', 'Digital Forensics'],
      ['Risk Assessment', 'Compliance'],
      ['Python', 'Automation'],
      ['Kubernetes', 'Docker']
    ];
    
    complementaryPairs.forEach(pair => {
      const skill1 = nodes.find(node => node.name.includes(pair[0]));
      const skill2 = nodes.find(node => node.name.includes(pair[1]));
      
      if (skill1 && skill2) {
        links.push({
          source: skill1.id,
          target: skill2.id,
          value: 4, // Stronger connection
          connection: 'complementary'
        });
      }
    });
    
    // Add some random connections between high-proficiency skills to make the graph more interesting
    const highProficiencySkills = nodes.filter(node => node.proficiency >= 70);
    if (highProficiencySkills.length > 5) {
      for (let i = 0; i < Math.min(10, highProficiencySkills.length); i++) {
        const sourceIndex = Math.floor(Math.random() * highProficiencySkills.length);
        let targetIndex = Math.floor(Math.random() * highProficiencySkills.length);
        
        // Ensure we don't connect a node to itself
        while (targetIndex === sourceIndex) {
          targetIndex = Math.floor(Math.random() * highProficiencySkills.length);
        }
        
        links.push({
          source: highProficiencySkills[sourceIndex].id,
          target: highProficiencySkills[targetIndex].id,
          value: 1,
          connection: 'expertise'
        });
      }
    }
    
    setGraphData({ nodes, links });
  }, [skills]);
  
  // Handle searching/filtering
  useEffect(() => {
    if (!searchTerm.trim() || !graphData.nodes.length) {
      // Reset all highlighting
      setGraphData(prev => ({
        ...prev,
        nodes: prev.nodes.map(node => ({ ...node, highlight: false }))
      }));
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const matchingNodeIds = new Set<string>();
    
    // Find nodes that match the search term
    graphData.nodes.forEach(node => {
      if (
        node.name.toLowerCase().includes(term) || 
        node.category.toLowerCase().includes(term)
      ) {
        matchingNodeIds.add(node.id);
      }
    });
    
    // Update nodes with highlight status
    setGraphData(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => ({
        ...node,
        highlight: matchingNodeIds.has(node.id)
      }))
    }));
    
    // If we have a graph instance, we can center on the first matching node
    if (graphRef.current && matchingNodeIds.size > 0) {
      const matchingNode = graphData.nodes.find(node => matchingNodeIds.has(node.id));
      if (matchingNode && matchingNode.x !== undefined && matchingNode.y !== undefined) {
        graphRef.current.centerAt(
          matchingNode.x,
          matchingNode.y,
          1000
        );
        graphRef.current.zoom(2, 1000);
      }
    }
  }, [searchTerm, graphData.nodes.length]);
  
  // Handle resizing
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height: Math.max(500, height) });
    };
    
    // Initial dimension calculation
    updateDimensions();
    
    // Set up resize handler
    const handleResize = () => {
      setIsResizing(true);
      updateDimensions();
      
      // Debounce resizing state to avoid excessive re-renders
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => setIsResizing(false), 500);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Paint the graph canvas
  const paintNode = (node: Node, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const { x, y, val, color, highlight } = node;
    
    // Handle possibly undefined x and y coordinates
    if (x === undefined || y === undefined) return;
    
    const size = (val || 3) * 3;
    const fontSize = 12 / globalScale;
    
    // Outer glow effect
    ctx.beginPath();
    ctx.arc(x, y, size * 1.4, 0, 2 * Math.PI);
    ctx.fillStyle = highlight ? `${color}50` : 'transparent';
    ctx.fill();
    
    // Main node circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color || DEFAULT_COLOR;
    ctx.fill();
    
    // Inner glow
    ctx.beginPath();
    ctx.arc(x, y, size * 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = `${color}40` || `${DEFAULT_COLOR}40`;
    ctx.fill();
    
    // Text label for highlighted nodes
    if (highlight) {
      ctx.font = `${fontSize}px Share Tech Mono`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = globalScale * 2;
      ctx.strokeText(node.name, x, y + size * 2);
      ctx.fillText(node.name, x, y + size * 2);
    }
  };
  
  // Handle node hover
  const handleNodeHover = (node: any) => {
    setHoveredNode(node);
    
    if (graphRef.current) {
      graphRef.current.refresh();
    }
  };
  
  // Handle node click
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };
  
  // Handle link render
  const getLinkWidth = (link: Link) => {
    return link.value || 1;
  };
  
  // Handle link color
  const getLinkColor = (link: Link) => {
    return link.connection === 'strong' ? DEFAULT_COLOR : 'rgba(255,255,255,0.2)';
  };

  return (
    <div className="relative mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FaNetworkWired className="text-cyber-blue" />
          <h3 className="text-xl font-cyber text-glow-blue">Skills Network</h3>
        </div>
        
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-tertiary border border-dark-tertiary focus:border-cyber-blue rounded-md py-2 pl-10 pr-4 text-white focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
          <div key={category} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-sm text-cyber-gray">{category}</span>
          </div>
        ))}
      </div>
      
      {/* Graph container */}
      <div 
        ref={containerRef} 
        className="w-full h-[70vh] bg-dark-tertiary rounded-lg border border-cyber-blue overflow-hidden"
      >
        {dimensions.width > 0 && !isResizing && (
          <ForceGraph2D
            graphData={graphData as any}
            width={dimensions.width}
            height={dimensions.height}
            nodeAutoColorBy="category"
            nodeVal="val"
            nodeLabel="name"
            linkWidth={getLinkWidth as any}
            linkColor={getLinkColor as any}
            nodeCanvasObject={paintNode as any}
            onNodeHover={handleNodeHover as any}
            onNodeClick={handleNodeClick as any}
            cooldownTicks={100}
            onEngineStop={() => graphRef.current && graphRef.current.zoomToFit(400)}
            nodeRelSize={3}
            nodeColor={(node) => {
              const category = (node as Node).category;
              // Check if category exists in CATEGORY_COLORS
              return (category in CATEGORY_COLORS) 
                ? CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] 
                : DEFAULT_COLOR;
            }}
            d3Force={(key, force) => {
              if (key === 'charge') {
                force.strength(-150);
              }
              if (key === 'collision') {
                force.strength(1).radius((node: any) => (node.val || 3) * 4);
              }
            }}
            ref={el => { graphRef.current = el; }}
          />
        )}
        
        {graphData.nodes.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <FaNetworkWired className="mx-auto text-4xl text-cyber-gray mb-4" />
              <p className="text-cyber-gray">No skills data available</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Skill details panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 top-20 w-80 cyber-card neon-border z-10"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-cyber" style={{ color: selectedNode.color }}>
                {selectedNode.name}
              </h4>
              <button 
                className="text-neon-red hover:text-glow-red"
                onClick={() => setSelectedNode(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-cyber-gray mb-1">Category</div>
                <div className="text-white">{selectedNode.category}</div>
              </div>
              
              <div>
                <div className="text-sm text-cyber-gray mb-1">Proficiency</div>
                <div className="h-2 bg-dark-tertiary rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${selectedNode.proficiency}%`,
                      backgroundColor: selectedNode.color 
                    }}
                  ></div>
                </div>
                <div className="text-right text-xs mt-1 text-cyber-gray">
                  {selectedNode.proficiency}%
                </div>
              </div>
              
              {/* Connected skills */}
              <div>
                <div className="text-sm text-cyber-gray mb-2">Connected Skills</div>
                <div className="space-y-1">
                  {graphData.links
                    .filter(link => 
                      link.source === selectedNode.id || 
                      link.target === selectedNode.id
                    )
                    .map((link, i) => {
                      const connectedNodeId = link.source === selectedNode.id ? link.target : link.source;
                      const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
                      
                      if (!connectedNode) return null;
                      
                      return (
                        <div 
                          key={i}
                          className="flex items-center justify-between text-sm p-1 rounded hover:bg-dark-tertiary cursor-pointer"
                          onClick={() => {
                            const node = graphData.nodes.find(n => n.id === connectedNodeId);
                            if (node) setSelectedNode(node);
                          }}
                        >
                          <span>{connectedNode.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-dark-tertiary" style={{ color: connectedNode.color }}>
                            {link.connection}
                          </span>
                        </div>
                      );
                    })
                  }
                  
                  {graphData.links.filter(link => 
                    link.source === selectedNode.id || 
                    link.target === selectedNode.id
                  ).length === 0 && (
                    <div className="text-cyber-gray text-sm">No connections found</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-4 text-center text-sm text-cyber-gray">
        <p>Hover over nodes to see skill names. Click on a node to view detailed information.</p>
      </div>
    </div>
  );
};

export default NetworkGraph;

++++=== [50] ./src/components/portfolio/PortfolioClient.tsx ===+++
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Profile, Project, Skill, Certification, Experience, Education } from '../../types'; 
import { extractPortableText } from '../../lib/portableTextUtils';
import CyberTerminal from './CyberTerminal';
import NetworkGraph from './NetworkGraph';
import ExperienceTimeline from './ExperienceTimeline';
import CertificationShowcase from './CertificationShowcase';
import EducationSection from './EducationSection';
import FloatingContact from '../common/FloatingContact';
import PortfolioHero from './PortfolioHero';
import ProjectGallery from './ProjectGallery';
import SkillsMatrix from './SkillsMatrix';
import ParticleBackground from '../effects/ParticleBackground';
import MatrixRainBackground from '../effects/MatrixRainBackground';

interface PortfolioClientProps {
  projects: Project[]; 
  certifications: Certification[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  profile: Profile;
}

const adaptProfile = (sanityProfile: any): Profile => {
  if (!sanityProfile) {
    return {
      _id: '',
      name: '',
      title: '',
      bio: '',
      shortBio: '',
      longBio: [],
      email: '',
      githubUrl: '',
      linkedinUrl: '',
      location: { lat: 0, lng: 0 },
      avatar: '',
      resume: { asset: { url: '' } },
      skills: [],
      projects: [],
      experience: [],
      education: [],
      certifications: [],
      socialLinks: []
    } as Profile;
  }

  // Process avatar and resume URLs from Sanity format
  const avatarUrl = sanityProfile.avatar?.asset?.url || '';
  const resumeUrl = sanityProfile.resume?.asset?.url || '';

  // Create a properly typed Profile object
  return {
    _id: sanityProfile._id || '',
    name: sanityProfile.name || '',
    title: sanityProfile.title || '',
    bio: sanityProfile.bio || '',
    shortBio: sanityProfile.shortBio || '',
    longBio: sanityProfile.longBio || [],
    email: sanityProfile.email || '',
    githubUrl: sanityProfile.githubUrl || '',
    linkedinUrl: sanityProfile.linkedinUrl || '',
    location: sanityProfile.location || { lat: 0, lng: 0 },
    avatar: avatarUrl,
    resume: { asset: { url: resumeUrl } },
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certifications: [],
    socialLinks: sanityProfile.socialLinks || []
  } as Profile;
};

const adaptProjects = (sanityProjects: any[]): Project[] => {
  return sanityProjects.map(project => ({
    _id: project._id,
    title: project.title,
    description: project.description,
    technologies: project.technologies || [],
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    image: project.imageUrl?.asset?.url,
    featured: project.featured || false,
    startDate: project.startDate || '',
    endDate: project.endDate,
    category: project.category || ''
  }));
};

const adaptExperiences = (sanityExperiences: any[]): Experience[] => {
  return sanityExperiences.map(exp => ({
    _id: exp._id,
    company: exp.company,
    jobTitle: exp.jobTitle || '',
    position: exp.jobTitle || '', 
    location: exp.location || '',
    startDate: exp.startDate || '',
    endDate: exp.endDate,
    current: exp.isCurrent,
    description: exp.description,
    technologies: exp.metadata?.technologies || [],
    achievements: exp.achievements?.map((a: any) => ({
      title: a.title || '',
      description: a.description || '',
      metric: a.metric
    })) || []
  }));
};

const adaptCertifications = (sanityCertifications: any[]): Certification[] => {
  return sanityCertifications.map(cert => ({
    _id: cert._id,
    title: cert.title || '',
    description: cert.description,
    dateIssued: cert.dateIssued || '',
    expirationDate: cert.expirationDate,
    credentialId: cert.credentialId || '',
    verificationLink: cert.verificationLink || '',
    certificateImage: cert.certificateImage,
    categories: cert.categories || [],
    status: cert.status || 'active',
    issuingOrganization: {
      name: cert.issuingOrganization?.name || '',
      website: cert.issuingOrganization?.website || '',
      logo: cert.issuingOrganization?.logo
    }
  }));
};

const adaptEducation = (sanityEducation: any[]): Education[] => {
  return sanityEducation.map(edu => ({
    _id: edu._id,
    institution: edu.institution || '',
    degree: edu.degree || '',
    field: edu.field || '',
    startDate: edu.startDate || '',
    endDate: edu.endDate,
    description: edu.description,
    achievements: edu.achievements || [],
    logo: edu.logo?.asset?.url || ''
  }));
};

const PortfolioClient: React.FC<PortfolioClientProps> = ({
  projects,
  certifications,
  skills,
  experience,
  education,
  profile,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const adaptedProfile = adaptProfile(profile);
  const adaptedProjects = adaptProjects(projects);
  const adaptedExperience = adaptExperiences(experience);
  const adaptedCertifications = adaptCertifications(certifications);
  const adaptedEducation = adaptEducation(education);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen bg-dark-base">
      {/* Background effects */}
      <ParticleBackground color="#50fa7b" density={30} speed={0.5} />
      <MatrixRainBackground density={0.3} speed={0.5} glowIntensity={0.5} className="opacity-5" />
      
      {/* Hero section */}
      <PortfolioHero profile={adaptedProfile} />
      
      {/* Projects section */}
      <section id="projects" className="py-16 cyber-grid-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-cyber text-gradient-neon mb-8">
              <span className="glitch" data-text="Projects & Explorations">Projects & Explorations</span>
            </h2>
            <ProjectGallery projects={adaptedProjects} />
          </motion.div>
        </div>
      </section>
      
      {/* Skills section */}
      <section id="skills" className="py-16 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-cyber text-gradient-neon mb-8">
              <span className="glitch" data-text="Technical Arsenal">Technical Arsenal</span>
            </h2>
            <div className="mb-16">
              <NetworkGraph skills={skills} />
            </div>
            <SkillsMatrix skills={skills} />
          </motion.div>
        </div>
      </section>
      
      {/* Experience section */}
      <section id="experience" className="py-16 cyber-grid-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-cyber text-gradient-neon mb-8">
              <span className="glitch" data-text="Professional Journey">Professional Journey</span>
            </h2>
            <ExperienceTimeline experience={adaptedExperience} />
          </motion.div>
        </div>
      </section>
      
      {/* Certifications section */}
      <section id="certifications" className="py-16 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-cyber text-gradient-neon mb-8">
              <span className="glitch" data-text="Credentials & Certifications">Credentials & Certifications</span>
            </h2>
            <CertificationShowcase certifications={adaptedCertifications} />
          </motion.div>
        </div>
      </section>
      
      {/* Education section */}
      <section id="education" className="py-16 cyber-grid-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-cyber text-gradient-neon mb-8">
              <span className="glitch" data-text="Educational Background">Educational Background</span>
            </h2>
            <EducationSection education={adaptedEducation} />
          </motion.div>
        </div>
      </section>
      
      {/* Floating contact component */}
      {adaptedProfile && adaptedProfile.githubUrl && adaptedProfile.linkedinUrl && adaptedProfile.email && (
        <FloatingContact 
          contactInfo={{
            github: adaptedProfile.githubUrl,
            linkedin: adaptedProfile.linkedinUrl,
            email: adaptedProfile.email
          }} 
        />
      )}
      
      {/* Interactive cyber terminal */}
      {adaptedProfile && <CyberTerminal profile={adaptedProfile} projects={adaptedProjects} skills={skills} />}
    </main>
  );
};

export default PortfolioClient;

++++=== [51] ./src/components/portfolio/PortfolioHero.tsx ===+++
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

++++=== [52] ./src/components/portfolio/ProjectGallery.tsx ===+++
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaBook, FaInfoCircle } from 'react-icons/fa';

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = new Set<string>();
    projects.forEach(project => {
      project.categories?.forEach(category => {
        uniqueCategories.add(category.name);
      });
    });
    setCategories(Array.from(uniqueCategories));
  }, [projects]);

  // Filter projects by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => 
          project.categories?.some(category => category.name === selectedCategory)
        )
      );
    }
  }, [selectedCategory, projects]);

  // Function to render project description from Portable Text
  const renderDescription = (description: any[] | undefined) => {
    if (!description) return '';
    
    return description.map((block, index) => {
      if (block.children) {
        return block.children.map((child: any, childIndex: number) => (
          <span key={`${index}-${childIndex}`}>{child.text}</span>
        ));
      }
      return null;
    });
  };

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          className={`cyber-button ${selectedCategory === 'all' ? '' : 'opacity-70'}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Projects
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`cyber-button ${selectedCategory === category ? '' : 'opacity-70'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="holo-card group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail.asset.url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-tertiary flex items-center justify-center">
                    <span className="text-cyber-blue font-cyber">No Image</span>
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 py-1 rounded-full neon-border text-neon-green"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full neon-border text-neon-green">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-cyber text-glow mb-2">{project.title}</h3>
                <p className="text-sm text-cyber-gray mb-4 line-clamp-2">
                  {renderDescription(project.description)}
                </p>
                
                {/* Project links */}
                <div className="flex gap-3">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-neon-green hover:text-glow transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyber-blue hover:text-glow-blue transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt size={18} />
                    </a>
                  )}
                  {project.docsLink && (
                    <a 
                      href={project.docsLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-neon-purple hover:text-glow-purple transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaBook size={18} />
                    </a>
                  )}
                </div>
                
                {/* Status badge */}
                {project.metadata?.status && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold bg-dark-base bg-opacity-80">
                    <span className={`
                      ${project.metadata.status === 'completed' ? 'text-neon-green' : ''}
                      ${project.metadata.status === 'in-progress' ? 'text-neon-orange' : ''}
                      ${project.metadata.status === 'planned' ? 'text-neon-purple' : ''}
                    `}>
                      {project.metadata.status.replace('-', ' ')}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-base bg-opacity-90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="cyber-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                {selectedProject.thumbnail ? (
                  <Image
                    src={selectedProject.thumbnail.asset.url}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-tertiary flex items-center justify-center">
                    <span className="text-cyber-blue font-cyber">No Image</span>
                  </div>
                )}
                <button
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-base bg-opacity-80 flex items-center justify-center text-neon-red hover:text-glow-red transition-all"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl md:text-3xl font-cyber text-gradient-neon mb-4">
                  {selectedProject.title}
                </h2>
                
                {/* Project metadata */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedProject.metadata?.difficulty && (
                    <span className="text-xs px-3 py-1 rounded-full neon-border-blue text-cyber-blue">
                      {selectedProject.metadata.difficulty}
                    </span>
                  )}
                  {selectedProject.categories?.map(category => (
                    <span 
                      key={category._id} 
                      className="text-xs px-3 py-1 rounded-full neon-border-purple text-neon-purple"
                    >
                      {category.name}
                    </span>
                  ))}
                  {selectedProject.startDate && (
                    <span className="text-xs px-3 py-1 rounded-full neon-border text-neon-green">
                      {new Date(selectedProject.startDate).getFullYear()}
                      {selectedProject.endDate && ` - ${new Date(selectedProject.endDate).getFullYear()}`}
                    </span>
                  )}
                </div>
                
                {/* Project description */}
                <div className="mb-6 text-cyber-gray">
                  {renderDescription(selectedProject.description)}
                </div>
                
                {/* Technologies */}
                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-cyber text-cyber-blue mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-sm px-3 py-1 rounded-full bg-dark-tertiary text-neon-green"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Project links */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.githubLink && (
                    <a 
                      href={selectedProject.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button flex items-center gap-2"
                    >
                      <FaGithub /> View Code
                    </a>
                  )}
                  {selectedProject.demoLink && (
                    <a 
                      href={selectedProject.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button-blue flex items-center gap-2"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {selectedProject.docsLink && (
                    <a 
                      href={selectedProject.docsLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button-purple flex items-center gap-2"
                    >
                      <FaBook /> Documentation
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery;

++++=== [53] ./src/components/portfolio/SkillsMatrix.tsx ===+++
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types';
import { FaSearch } from 'react-icons/fa';

interface SkillsMatrixProps {
  skills: Skill[];
}

// Group skills by categories
const groupSkillsByCategory = (skills: Skill[]) => {
  const groups: { [key: string]: Skill[] } = {};
  
  skills.forEach(skill => {
    const category = skill.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
  });
  
  return groups;
};

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skills }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [skillGroups, setSkillGroups] = useState<{ [key: string]: Skill[] }>({});
  
  // Initialize skill groups
  useEffect(() => {
    setSkillGroups(groupSkillsByCategory(skills));
  }, [skills]);
  
  // Handle search and category filtering
  useEffect(() => {
    let result = skills;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(skill => skill.category === selectedCategory);
    }
    
    setFilteredSkills(result);
  }, [searchTerm, selectedCategory, skills]);
  
  // Get all categories
  const categories = Object.keys(skillGroups).sort();
  
  // Calculate skill level color
  const getSkillLevelColor = (proficiency: number) => {
    if (proficiency >= 90) return 'var(--neon-green)';
    if (proficiency >= 75) return 'var(--cyber-blue)';
    if (proficiency >= 60) return 'var(--neon-purple)';
    if (proficiency >= 40) return 'var(--neon-orange)';
    return 'var(--neon-red)';
  };

  return (
    <div>
      {/* Search and filter controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-tertiary border border-dark-tertiary focus:border-cyber-blue rounded-md py-2 pl-10 pr-4 text-white focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`cyber-button ${!selectedCategory ? '' : 'opacity-70'}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`cyber-button ${selectedCategory === category ? '' : 'opacity-70'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Innovative Hexagonal Skills Grid */}
      <div className="relative mb-16">
        {/* Animated radar background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full animate-scan opacity-20"></div>
        </div>
        
        <div className="flex justify-center">
          <div className="honeycomb-grid max-w-4xl">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="honeycomb-cell"
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  '--skill-color': getSkillLevelColor(skill.proficiency)
                } as React.CSSProperties}
              >
                <div className="honeycomb-content cyber-radial-bg">
                  <div 
                    className="skill-progress-ring" 
                    style={{
                      background: `conic-gradient(${getSkillLevelColor(skill.proficiency)} ${skill.proficiency}%, transparent 0)`
                    }}
                  >
                    <div className="skill-icon">{skill.icon || skill.name.charAt(0)}</div>
                  </div>
                  <div className="skill-name">{skill.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Skills detail popup */}
      {hoveredSkill && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-dark-base neon-border p-4 rounded-md z-40 max-w-md"
          style={{
            boxShadow: `0 0 10px ${getSkillLevelColor(hoveredSkill.proficiency)}`,
            borderColor: getSkillLevelColor(hoveredSkill.proficiency)
          }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: `${getSkillLevelColor(hoveredSkill.proficiency)}20`, color: getSkillLevelColor(hoveredSkill.proficiency) }}
            >
              {hoveredSkill.icon || hoveredSkill.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-cyber mb-1" style={{ color: getSkillLevelColor(hoveredSkill.proficiency) }}>
                {hoveredSkill.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 bg-dark-tertiary rounded-full w-full">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${hoveredSkill.proficiency}%`,
                      backgroundColor: getSkillLevelColor(hoveredSkill.proficiency)
                    }}
                  />
                </div>
                <span className="text-sm whitespace-nowrap">{hoveredSkill.proficiency}%</span>
              </div>
              {hoveredSkill.description && (
                <p className="text-sm text-cyber-gray">{hoveredSkill.description}</p>
              )}
              {hoveredSkill.yearsOfExperience && (
                <p className="text-sm mt-1">
                  <span className="text-neon-green">{hoveredSkill.yearsOfExperience}</span> years of experience
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Add custom CSS for hexagonal grid */}
      <style jsx>{`
        .honeycomb-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0 auto;
          padding: 20px;
          max-width: 1200px;
        }
        
        .honeycomb-cell {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 5px;
          cursor: pointer;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1));
          border: 2px solid;
          border-color: var(--skill-color, var(--neon-green));
          transition: all 0.3s ease;
        }
        
        .honeycomb-cell:hover {
          transform: scale(1.1);
          z-index: 2;
          box-shadow: 0 0 15px var(--skill-color, var(--neon-green));
        }
        
        .honeycomb-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background-color: rgba(26, 26, 26, 0.9);
          text-align: center;
        }
        
        .skill-progress-ring {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        
        .skill-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: var(--dark-base);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: var(--skill-color, var(--neon-green));
        }
        
        .skill-name {
          font-size: 12px;
          font-weight: 500;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }
        
        @media (max-width: 768px) {
          .honeycomb-cell {
            width: 90px;
            height: 90px;
          }
          
          .skill-progress-ring {
            width: 45px;
            height: 45px;
          }
          
          .skill-icon {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }
          
          .skill-name {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillsMatrix;

++++=== [54] ./src/components/resources/CyberCareerPaths.tsx ===+++
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CyberRole } from '@/types';
import { FiChevronDown, FiChevronUp, FiAward, FiDollarSign, FiTrendingUp, FiBook, FiTarget } from 'react-icons/fi';

interface CyberCareerPathsProps {
  roles: CyberRole[];
}

const CyberCareerPaths: React.FC<CyberCareerPathsProps> = ({ roles }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract all unique categories
  const categories = [...new Set(roles.map(role => role.category))];
  
  // Filter roles based on selected category
  const filteredRoles = selectedCategory 
    ? roles.filter(role => role.category === selectedCategory)
    : roles;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  
  return (
    <section className="my-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-cyber font-bold mb-2 text-gradient-neon">
            Cybersecurity Career Paths
          </h2>
          <p className="text-cyber-gray max-w-2xl mx-auto">
            Explore various career paths in cybersecurity, from entry-level positions to specialized roles and leadership opportunities
          </p>
        </motion.div>
        
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <motion.button
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCategory === null 
                ? 'bg-neon-green text-dark-base font-bold' 
                : 'bg-dark-secondary text-white hover:bg-dark-tertiary'
            }`}
            onClick={() => setSelectedCategory(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Paths
          </motion.button>
          
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-md text-sm ${
                selectedCategory === category 
                  ? 'bg-neon-green text-dark-base font-bold' 
                  : 'bg-dark-secondary text-white hover:bg-dark-tertiary'
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRoles.map((role) => (
            <motion.div 
              key={role._id}
              className="cyber-card relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase font-mono text-cyber-blue">{role.category}</span>
                  <span className={`text-xs font-mono ${
                    role.careerLevel === 'Entry' 
                      ? 'text-neon-green' 
                      : role.careerLevel === 'Mid' 
                        ? 'text-cyber-blue' 
                        : 'text-neon-purple'
                  }`}>
                    {role.careerLevel} Level
                  </span>
                </div>
                
                <h3 className="text-xl font-cyber font-bold mb-2 text-white">{role.title}</h3>
                
                <p className="text-sm text-cyber-gray mb-4">
                  {role.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {role.keySkills.slice(0, 4).map((skill, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-neon-green"
                    >
                      {skill}
                    </span>
                  ))}
                  {role.keySkills.length > 4 && (
                    <span className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-cyber-gray">
                      +{role.keySkills.length - 4} more
                    </span>
                  )}
                </div>
                
                <button 
                  onClick={() => setSelectedRole(selectedRole === role._id ? null : role._id)}
                  className="text-neon-green text-sm flex items-center hover:underline"
                >
                  {selectedRole === role._id ? (
                    <>Show less <FiChevronUp className="ml-1" /></>
                  ) : (
                    <>Learn more <FiChevronDown className="ml-1" /></>
                  )}
                </button>
                
                {selectedRole === role._id && (
                  <motion.div 
                    className="mt-4 pt-4 border-t border-dark-tertiary"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold flex items-center mb-2">
                          <FiBook className="mr-2 text-cyber-blue" /> Responsibilities
                        </h4>
                        <ul className="list-disc list-inside text-sm text-cyber-gray space-y-1">
                          {role.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold flex items-center mb-2">
                          <FiAward className="mr-2 text-neon-orange" /> Recommended Certifications
                        </h4>
                        <ul className="list-disc list-inside text-sm text-cyber-gray space-y-1">
                          {role.recommendedCertifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold flex items-center mb-2">
                            <FiDollarSign className="mr-2 text-neon-green" /> Salary Range
                          </h4>
                          <p className="text-sm text-cyber-gray">{role.salaryRange}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold flex items-center mb-2">
                            <FiTrendingUp className="mr-2 text-neon-purple" /> Growth Outlook
                          </h4>
                          <p className="text-sm text-cyber-gray">{role.growthOutlook}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold flex items-center mb-2">
                          <FiTarget className="mr-2 text-cyber-blue" /> Career Progression
                        </h4>
                        <p className="text-sm text-cyber-gray">{role.careerProgression}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className={`absolute transform rotate-45 translate-x-8 -translate-y-8 w-16 h-16 ${
                  role.careerLevel === 'Entry' 
                    ? 'bg-neon-green' 
                    : role.careerLevel === 'Mid' 
                      ? 'bg-cyber-blue' 
                      : 'bg-neon-purple'
                } opacity-20`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <motion.a 
            href="#" 
            className="cyber-button px-6 py-3 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Career Roadmap
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CyberCareerPaths;

++++=== [55] ./src/components/resources/CyberResourceHub.tsx ===+++
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CyberResource } from '@/types';
import { FiBook, FiCode, FiFileText, FiLink, FiSearch, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface CyberResourceHubProps {
  resources: CyberResource[];
}

const CyberResourceHub: React.FC<CyberResourceHubProps> = ({ resources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  
  // Extract all unique categories and levels from resources
  const categories = [...new Set(resources.map(resource => resource.category))];
  const levels = [...new Set(resources.map(resource => resource.level))];
  
  // Filter resources based on search term, category, and level
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === null || resource.category === selectedCategory;
    const matchesLevel = selectedLevel === null || resource.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  const toggleResourceExpansion = (id: string) => {
    if (expandedResource === id) {
      setExpandedResource(null);
    } else {
      setExpandedResource(id);
    }
  };
  
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'article':
        return <FiFileText className="text-neon-green" />;
      case 'tutorial':
        return <FiBook className="text-cyber-blue" />;
      case 'tool':
        return <FiCode className="text-neon-purple" />;
      case 'book':
        return <FiBook className="text-neon-orange" />;
      case 'course':
        return <FiBook className="text-neon-green" />;
      case 'cheatsheet':
        return <FiFileText className="text-cyber-blue" />;
      case 'guide':
        return <FiFileText className="text-neon-purple" />;
      default:
        return <FiLink className="text-neon-orange" />;
    }
  };
  
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-neon-green';
      case 'intermediate':
        return 'text-cyber-blue';
      case 'advanced':
        return 'text-neon-purple';
      default:
        return 'text-neon-green';
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
  
  return (
    <section className="my-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-cyber font-bold mb-2 text-gradient-neon">
            Cyber Resource Hub
          </h2>
          <p className="text-cyber-gray max-w-2xl mx-auto">
            A curated collection of high-quality cybersecurity resources, tools, and learning materials for professionals and students
          </p>
        </motion.div>
        
        <div className="mb-8 bg-dark-secondary p-4 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-gray" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-tertiary border border-dark-tertiary focus:border-neon-green text-white pl-10 pr-4 py-2 rounded-md focus:outline-none"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="flex items-center">
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-gray" />
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="appearance-none bg-dark-tertiary border border-dark-tertiary focus:border-neon-green text-white pl-10 pr-8 py-2 rounded-md focus:outline-none"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gray pointer-events-none" />
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center">
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-gray" />
                  <select
                    value={selectedLevel || ''}
                    onChange={(e) => setSelectedLevel(e.target.value || null)}
                    className="appearance-none bg-dark-tertiary border border-dark-tertiary focus:border-neon-green text-white pl-10 pr-8 py-2 rounded-md focus:outline-none"
                  >
                    <option value="">All Levels</option>
                    {levels.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gray pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-cyber-gray">
            <span>Showing {filteredResources.length} of {resources.length} resources</span>
            {(selectedCategory || selectedLevel || searchTerm) && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setSelectedLevel(null);
                }}
                className="ml-4 text-neon-green hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <motion.div 
                key={resource._id}
                className="cyber-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {getResourceIcon(resource.type)}
                      <span className="ml-2 text-xs uppercase font-mono">{resource.type}</span>
                    </div>
                    <span className={`text-xs font-mono ${getLevelColor(resource.level)}`}>
                      {resource.level}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-cyber font-bold mb-2 text-white">{resource.title}</h3>
                  
                  <p className="text-sm text-cyber-gray mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-neon-green"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-cyber-gray">
                          +{resource.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-green text-sm hover:underline flex items-center"
                    >
                      Visit Resource <FiLink className="ml-1" />
                    </a>
                    
                    <button 
                      onClick={() => toggleResourceExpansion(resource._id)}
                      className="text-cyber-gray text-sm flex items-center hover:text-neon-green"
                    >
                      {expandedResource === resource._id ? (
                        <>Less <FiChevronUp className="ml-1" /></>
                      ) : (
                        <>More <FiChevronDown className="ml-1" /></>
                      )}
                    </button>
                  </div>
                  
                  {expandedResource === resource._id && (
                    <motion.div 
                      className="mt-4 pt-4 border-t border-dark-tertiary"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-1">Description</h4>
                          <p className="text-sm text-cyber-gray">
                            {resource.description}
                          </p>
                        </div>
                        
                        {resource.tags && resource.tags.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-1">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              {resource.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="text-xs bg-dark-tertiary px-2 py-1 rounded-md text-neon-green"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-1">Category</h4>
                            <p className="text-sm text-cyber-gray">{resource.category}</p>
                          </div>
                          
                          {resource.author && (
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-1">Author</h4>
                              <p className="text-sm text-cyber-gray">{resource.author}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-cyber-gray">No resources found matching your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CyberResourceHub;

++++=== [56] ./src/components/sections/ FeaturedProjects.tsx ===+++
import { motion } from 'framer-motion';
import { Project } from '../../types';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-neon-green mb-6">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            className="bg-dark-base p-6 rounded-lg shadow-lg border border-neon-green/30"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-neon-green mb-2">{project.title}</h3>
            <p className="text-white">{project.description?.[0]?.children?.[0]?.text || 'No description available'}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
++++=== [57] ./src/components/sections/Certifications.tsx ===+++
import { motion } from 'framer-motion';
import { Certification } from '../../types';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  // Format date for better display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-neon-green mb-6">Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <motion.div
            key={cert._id}
            className="bg-dark-base p-6 rounded-lg shadow-lg border border-neon-green/30"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-neon-green mb-2">{cert.title}</h3>
            {cert.issuingOrganization && typeof cert.issuingOrganization === 'object' && (
              <p className="text-white">{cert.issuingOrganization.name || 'Unknown Organization'}</p>
            )}
            <p className="text-gray-400 text-sm">{formatDate(cert.dateIssued)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
++++=== [58] ./src/components/sections/ContentGrid.tsx ===+++
import { motion } from 'framer-motion';
import { Category } from '../../types';

interface ContentGridProps {
  categories: Category[];
}

export default function ContentGrid({ categories }: ContentGridProps) {
  return (
    <section className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <motion.div
          key={category._id}
          className="bg-dark-base p-6 rounded-lg shadow-lg border border-neon-green/30 hover:border-neon-green transition-colors"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-neon-green mb-2">{category.name}</h2>
          <p className="text-white">{category.description}</p>
        </motion.div>
      ))}
    </section>
  );
}
++++=== [59] ./src/components/sections/FeaturedProjects.tsx ===+++
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  // Fixed: Use the correct metadata structure
  const featuredProjects = projects.filter(project => project.metadata?.isFeatured);

  return (
    <section className="py-16 custom-bg-dark-base">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-cyber text-gradient-neon mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <motion.div
              key={project._id}
              className="cyber-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative overflow-hidden rounded-t-lg h-48">
                {project.thumbnail ? (
                  <img 
                    src={project.thumbnail.asset.url} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full custom-bg-dark-tertiary flex items-center justify-center">
                    <span className="custom-text-cyber-blue font-cyber">No Preview</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 py-1 px-3 rounded-full custom-bg-dark-base border custom-border-neon-green">
                  <span className="text-xs font-cyber custom-text-neon-green">
                    {project.metadata?.difficulty || 'intermediate'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-cyber custom-text-cyber-blue mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">
                  {project.description?.[0]?.children?.[0]?.text || 'No description available'}
                </p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs py-1 px-2 rounded custom-bg-dark-tertiary custom-text-neon-green"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs py-1 px-2 rounded custom-bg-dark-tertiary text-gray-300">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex space-x-3 mt-4">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button-blue text-sm py-1 px-3"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button text-sm py-1 px-3"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a href="/projects" className="cyber-button">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

++++=== [60] ./src/components/sections/Hero.tsx ===+++
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
++++=== [61] ./src/components/sections/SkillsOverview.tsx ===+++
import { motion } from 'framer-motion';
import { Skill } from '../../types';

interface SkillsOverviewProps {
  skills: Skill[];
}

export default function SkillsOverview({ skills }: SkillsOverviewProps) {
  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-neon-green mb-6">Skills Overview</h2>
      <div className="space-y-4">
        {skills.slice(0, 5).map((skill) => ( // Limit to top 5 skills
          <motion.div
            key={skill._id}
            className="bg-dark-base p-4 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-neon-green">{skill.name}</span>
              <span className="text-white">{skill.proficiency}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-neon-green h-2.5 rounded-full"
                style={{ width: `${skill.proficiency}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
++++=== [62] ./src/components/ui/ClientPowerSaveWrapper.tsx ===+++
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import PowerSaveToggle with no SSR to avoid hydration issues
const PowerSaveToggle = dynamic(
  () => import("@/components/ui/PowerSaveToggle"),
  { ssr: false }
);

const ClientPowerSaveWrapper: React.FC = () => {
  return <PowerSaveToggle />;
};

export default ClientPowerSaveWrapper;

++++=== [63] ./src/components/ui/CyberButton.tsx ===+++
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

++++=== [64] ./src/components/ui/CyberCard.tsx ===+++
'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CyberCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

const CyberCard: React.FC<CyberCardProps> = ({
  title,
  children,
  className = '',
  glowColor = 'rgba(80, 250, 123, 0.6)', // Default to neon green glow
  onClick,
}) => {
  return (
    <motion.div 
      className={`relative bg-dark-tertiary border border-neon-green/20 rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: `0 0 15px ${glowColor}`,
        scale: 1.02
      }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-5 h-5 overflow-hidden">
        <div className="absolute transform rotate-45 bg-neon-green w-10 h-2 -right-2 top-2"></div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        {title && (
          <h3 className="text-xl font-cyber text-cyber-blue mb-4">{title}</h3>
        )}
        
        <div className="text-gray-300">
          {children}
        </div>
      </div>
      
      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-40"></div>
    </motion.div>
  );
};

export default CyberCard;

++++=== [65] ./src/components/ui/ExpandableCard.tsx ===+++
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CyberButton from './CyberButton';

export interface ExpandableCardProps {
  title: string;
  children?: React.ReactNode;
  expandedContent?: React.ReactNode;
  className?: string;
  glowColor?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  links?: {
    github?: string;
    live?: string;
  };
  tags?: string[];
  technologies?: string[];
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  children,
  expandedContent,
  className = '',
  glowColor = 'rgba(80, 250, 123, 0.3)',
  description,
  imageUrl,
  category,
  links,
  tags,
  technologies,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      className={`bg-dark-tertiary rounded-lg overflow-hidden border border-neon-green/20 hover:border-neon-green/40 transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: `0 0 15px ${glowColor}`,
        scale: 1.01
      }}
    >
      {/* Card Header */}
      <div className="relative">
        {imageUrl && (
          <div className="w-full h-48 relative overflow-hidden">
            <Image 
              src={imageUrl} 
              alt={title} 
              fill 
              className="object-cover transition-all duration-500 filter hover:brightness-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {category && (
              <span className="absolute top-3 right-3 bg-dark-base/80 px-3 py-1 rounded-full text-xs text-neon-green border border-neon-green/30">
                {category}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-xl font-cyber text-cyber-blue mb-2">{title}</h3>
        
        {description && (
          <p className="text-gray-300 mb-3">{description}</p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-dark-base px-2 py-1 rounded-full text-cyber-blue"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Display children content if provided */}
        {children && (
          <div className="mb-4">
            {children}
          </div>
        )}
        
        {/* Links and expand button */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            {links?.github && (
              <CyberButton
                href={links.github}
                type="outline"
                size="sm"
                icon="github"
              >
                Code
              </CyberButton>
            )}
            
            {links?.live && (
              <CyberButton
                href={links.live}
                type="primary"
                size="sm"
                icon="terminal"
              >
                Demo
              </CyberButton>
            )}
          </div>
          
          {expandedContent || (technologies && technologies.length > 0) ? (
            <button 
              onClick={toggleExpanded} 
              className="flex items-center text-neon-green hover:text-cyber-blue transition-colors"
            >
              {isExpanded ? (
                <>
                  <span className="mr-1 text-sm">Less</span>
                  <FaChevronUp size={14} />
                </>
              ) : (
                <>
                  <span className="mr-1 text-sm">More</span>
                  <FaChevronDown size={14} />
                </>
              )}
            </button>
          ) : null}
        </div>
        
        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-neon-green/20">
                {technologies && technologies.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm text-cyber-blue mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-dark-base/80 px-2 py-1 rounded-full text-neon-green border border-neon-green/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {expandedContent && (
                  <div className="text-gray-300">
                    {expandedContent}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ExpandableCard;

++++=== [66] ./src/components/ui/GlitchText.tsx ===+++
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high' | number;
  speed?: number;
  color?: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  children, 
  intensity = 'medium', 
  speed = 1,
  color, 
  className = '' 
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const text = children?.toString() || '';
  
  // Glitch intensity configuration
  const intensityConfig = {
    low: { interval: 10000, duration: 1000, chance: 0.02 },
    medium: { interval: 5000, duration: 2000, chance: 0.05 },
    high: { interval: 2000, duration: 3000, chance: 0.1 },
  };
  
  const getConfig = () => {
    if (typeof intensity === 'number') {
      // Map number (1-10) to configuration
      const numericIntensity = Math.max(1, Math.min(10, intensity));
      return {
        interval: 10000 - (numericIntensity * 800),
        duration: 1000 + (numericIntensity * 200),
        chance: 0.01 + (numericIntensity * 0.01)
      };
    }
    return intensityConfig[intensity];
  };
  
  const config = getConfig();
  
  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < config.chance) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), config.duration);
      }
    }, config.interval);
    
    return () => clearInterval(interval);
  }, [config.chance, config.duration, config.interval]);
  
  // Generate glitch layers with random offsets
  const generateGlitchLayers = () => {
    return [
      { x: -3, y: 2, color: 'rgba(255, 0, 0, 0.5)' },
      { x: 3, y: -2, color: 'rgba(0, 255, 255, 0.5)' },
      { x: 0, y: 0, color: color || 'inherit' }
    ];
  };
  
  return (
    <span className={`relative inline-block ${className}`}>
      {isGlitching ? (
        <span className="glitch-container relative inline-block">
          {generateGlitchLayers().map((layer, index) => (
            <motion.span
              key={index}
              className="absolute top-0 left-0 whitespace-nowrap"
              initial={{ x: 0, y: 0 }}
              animate={{ 
                x: [0, layer.x, -layer.x/2, layer.x*1.5, 0],
                y: [0, layer.y, -layer.y/2, layer.y*1.5, 0],
              }}
              transition={{ 
                duration: 0.5, 
                repeat: 1, 
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              style={{ 
                color: layer.color, 
                mixBlendMode: index === 2 ? 'normal' : 'screen',
                zIndex: 10 - index,
                clipPath: index !== 2 ? 'inset(10% 0% 85% 0%)' : undefined 
              }}
            >
              {text}
            </motion.span>
          ))}
        </span>
      ) : (
        <span className="relative">
          {text}
          <motion.span
            className="absolute top-0 left-0 h-full w-full opacity-0"
            animate={{ opacity: [0, 0.05, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: 'loop', 
              duration: 3, 
              ease: 'easeInOut'
            }}
            style={{ 
              backgroundImage: 'linear-gradient(0deg, transparent 0%, var(--neon-green) 50%, transparent 100%)', 
              mixBlendMode: 'overlay' 
            }}
          />
        </span>
      )}
    </span>
  );
};

export default GlitchText;

++++=== [67] ./src/components/ui/index.ts ===+++
// Export UI components
export { default as CyberCard } from './CyberCard';
export { default as CyberButton } from './CyberButton';
export { default as GlitchText } from './GlitchText';
export { default as ExpandableCard } from './ExpandableCard';
export { default as SectionHeading } from './SectionHeading';
export { default as ProjectCard } from './ProjectCard';

++++=== [68] ./src/components/ui/PowerSaveToggle.tsx ===+++
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PowerSaveToggleProps {
  className?: string;
}

const PowerSaveToggle: React.FC<PowerSaveToggleProps> = ({ className = '' }) => {
  const [isPowerSaveMode, setIsPowerSaveMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if user has previously set power save mode
    const savedPreference = localStorage.getItem('powerSaveMode');
    if (savedPreference) {
      setIsPowerSaveMode(savedPreference === 'true');
    } else {
      // Automatically enable power save for mobile devices
      const isMobile = window.innerWidth < 768 || 
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsPowerSaveMode(isMobile);
    }
  }, []);

  useEffect(() => {
    // Apply power save mode to the body
    if (isPowerSaveMode) {
      document.body.classList.add('power-save-mode');
    } else {
      document.body.classList.remove('power-save-mode');
    }
    
    // Save preference
    localStorage.setItem('powerSaveMode', isPowerSaveMode.toString());
    
    // Also log for debugging
    console.log(`Power save mode: ${isPowerSaveMode ? 'ON' : 'OFF'}`);
  }, [isPowerSaveMode]);

  const togglePowerSave = () => {
    setIsPowerSaveMode(!isPowerSaveMode);
  };

  return (
    <motion.div 
      className={`fixed bottom-4 right-4 z-50 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <button
        onClick={togglePowerSave}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative flex items-center justify-center py-1.5 px-4 rounded-md
          border transition-all duration-300
          ${isPowerSaveMode 
            ? 'bg-dark-tertiary text-green-400 border-green-400' 
            : 'bg-dark-base text-cyber-blue border-cyber-blue'}
          hover:shadow-lg font-cyber text-xs
        `}
        style={{
          boxShadow: isHovered 
            ? `0 0 10px 2px ${isPowerSaveMode ? '#50fa7b' : '#8be9fd'}` 
            : 'none',
        }}
      >
        <div className="mr-2">
          {isPowerSaveMode ? (
            // Battery saving icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 14.5V9.5m-9-4h7a2 2 0 012 2v10a2 2 0 01-2 2h-7m-9-4h7a2 2 0 002-2v-10a2 2 0 00-2-2H3" />
            </svg>
          ) : (
            // Performance icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>
        {isPowerSaveMode ? 'POWER SAVE: ON' : 'PERFORMANCE: ON'}
        
        {/* Animated dots */}
        <span className="ml-1 flex justify-center items-center w-8">
          {!isPowerSaveMode && Array(3).fill(0).map((_, i) => (
            <span 
              key={i} 
              className="h-1.5 w-1.5 rounded-full bg-cyber-blue mx-0.5"
              style={{
                animation: `pulse 1s infinite ${i * 0.2}s`,
                opacity: 0.7 + (i * 0.1)
              }}
            />
          ))}
        </span>
      </button>
    </motion.div>
  );
};

export default PowerSaveToggle;

++++=== [69] ./src/components/ui/ProjectCard.tsx ===+++
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { extractPortableText } from '../../lib/portableTextUtils';
import { PortableText } from '../../types/schema';
import CyberCard from './CyberCard';

interface ProjectCardProps {
  title: string;
  description: PortableText | string;
  imageUrl: string;
  category?: string;
  links?: {
    github?: string;
    live?: string;
  };
  technologies?: Array<string | { name: string; icon?: string }>;
  tags?: string[];
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  category = '',
  links,
  technologies = [],
  tags = [],
  className = '',
}) => {
  // Extract plain text from the Portable Text format
  const descriptionText = typeof description === 'string' ? description : extractPortableText(description, '');

  return (
    <CyberCard title={title} className={`cyber-interactive ${className}`}>
      <div className="space-y-4">
        {imageUrl && (
          <div className="relative w-full h-48 overflow-hidden rounded-md mb-4 border border-dark-tertiary">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-dark-base/80 py-1 px-3 rounded-full text-xs text-neon-green border border-neon-green/30">
              {category}
            </div>
          </div>
        )}
        
        <p className="text-gray-300 line-clamp-3 font-terminal text-sm">{descriptionText}</p>
        
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs py-1 px-2 bg-dark-base rounded-md text-cyber-blue border border-cyber-blue/30 font-terminal"
              >
                {typeof tech === 'string' ? tech : tech.name}
              </span>
            ))}
          </div>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs py-1 px-2 bg-dark-tertiary rounded-md text-neon-purple border border-neon-purple/30 font-terminal"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {(links?.github || links?.live) && (
          <div className="flex space-x-3 mt-4">
            {links.github && (
              <motion.a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-gray hover:text-neon-green transition-colors cyber-glow-green"
                whileHover={{ scale: 1.1 }}
                aria-label="View GitHub Repository"
              >
                <FaGithub size={20} />
              </motion.a>
            )}
            {links.live && (
              <motion.a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-gray hover:text-neon-purple transition-colors cyber-glow-purple"
                whileHover={{ scale: 1.1 }}
                aria-label="View Live Project"
              >
                <FaExternalLinkAlt size={18} />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </CyberCard>
  );
};

export default ProjectCard;

++++=== [70] ./src/components/ui/SectionHeading.tsx ===+++
'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

export interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className = '',
  children,
}) => {
  // Use title prop first, but fall back to children if title is not provided
  const headingContent = title || children;

  return (
    <motion.div 
      className={`mb-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl sm:text-4xl font-cyber text-neon-green mb-2 relative inline-block">
        <GlitchText intensity="low">{headingContent}</GlitchText>
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-neon-green to-transparent"></span>
      </h2>
      {subtitle && (
        <p className="text-gray-400 mt-2 max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

++++=== [71] ./src/data/careerData.ts ===+++
import { CyberRole } from '@/types';

export const careerData: CyberRole[] = [
  {
    _id: 'role001',
    title: 'Security Analyst',
    description: 'Security Analysts are responsible for protecting an organization\'s computer systems and networks from cyber threats and attacks.',
    category: 'Defensive Operations',
    careerLevel: 'Entry',
    shortDescription: 'Monitor and analyze security systems, identify vulnerabilities, and respond to security incidents to protect organizational assets.',
    responsibilities: [
      'Monitor security systems and networks for suspicious activities',
      'Analyze security alerts and determine their severity',
      'Investigate security breaches and incidents',
      'Document security incidents and response procedures',
      'Implement security measures and controls'
    ],
    keySkills: [
      'Network Security', 
      'SIEM Tools', 
      'Incident Response', 
      'Log Analysis', 
      'Vulnerability Assessment'
    ],
    tools: [
      'Splunk',
      'Wireshark',
      'Nessus',
      'Snort',
      'Metasploit'
    ],
    recommendedCertifications: [
      'CompTIA Security+',
      'GIAC Security Essentials (GSEC)',
      'Certified Information Systems Security Professional (CISSP)',
      'Certified Information Security Manager (CISM)'
    ],
    salaryRange: '$60,000 - $95,000',
    growthOutlook: 'Strong (31% growth projected)',
    careerProgression: 'Can advance to Senior Security Analyst, SOC Manager, or specialize in areas like Threat Intelligence or Incident Response.',
    careerPath: ['Junior Security Analyst', 'Security Analyst', 'Senior Security Analyst', 'Security Team Lead', 'Security Manager']
  },
  {
    _id: 'role002',
    title: 'Penetration Tester',
    description: 'Penetration Testers simulate cyber attacks to identify and fix security vulnerabilities before malicious hackers can exploit them.',
    category: 'Offensive Operations',
    careerLevel: 'Mid',
    shortDescription: 'Simulate cyber attacks to identify security vulnerabilities in systems, networks, and applications before malicious hackers can exploit them.',
    responsibilities: [
      'Plan and execute controlled cyber attacks on systems',
      'Identify security weaknesses and vulnerabilities',
      'Develop exploit code and tools for testing',
      'Document findings and provide remediation recommendations',
      'Present technical findings to both technical and non-technical stakeholders'
    ],
    keySkills: [
      'Ethical Hacking', 
      'Network Penetration', 
      'Web Application Testing', 
      'Exploit Development', 
      'Social Engineering',
      'Scripting (Python, Bash)'
    ],
    tools: [
      'Kali Linux',
      'Metasploit',
      'Burp Suite',
      'Nmap',
      'Wireshark',
      'OWASP ZAP'
    ],
    recommendedCertifications: [
      'Offensive Security Certified Professional (OSCP)',
      'GIAC Penetration Tester (GPEN)',
      'Certified Ethical Hacker (CEH)',
      'eLearnSecurity Certified Professional Penetration Tester (eCPPT)'
    ],
    salaryRange: '$85,000 - $130,000',
    growthOutlook: 'Very Strong (35% growth projected)',
    careerProgression: 'Can advance to Senior Penetration Tester, Red Team Lead, or move into specialized areas like Advanced Persistent Threat (APT) Simulation.',
    careerPath: ['Junior Penetration Tester', 'Penetration Tester', 'Senior Penetration Tester', 'Red Team Lead', 'Offensive Security Director']
  },
  {
    _id: 'role003',
    title: 'Security Architect',
    description: 'Security Architects design and implement secure computer systems and networks to protect an organization\'s assets.',
    category: 'Security Design',
    careerLevel: 'Senior',
    shortDescription: 'Design, build, and oversee the implementation of secure network and computer systems to meet an organization\'s security requirements and objectives.',
    responsibilities: [
      'Design secure architecture for IT systems and networks',
      'Develop security standards, policies, and procedures',
      'Evaluate new technologies and security solutions',
      'Perform security risk assessments',
      'Ensure compliance with regulatory requirements',
      'Provide guidance to development and operations teams'
    ],
    keySkills: [
      'Security Architecture', 
      'Risk Assessment', 
      'Cloud Security', 
      'Identity and Access Management', 
      'Network Design',
      'Secure SDLC'
    ],
    tools: [
      'AWS CloudFormation',
      'Azure Resource Manager',
      'Google Cloud Deployment Manager',
      'Ansible',
      'Terraform'
    ],
    recommendedCertifications: [
      'Certified Information Systems Security Professional (CISSP)',
      'SABSA Chartered Security Architect',
      'Certified Information Security Manager (CISM)',
      'AWS Certified Security - Specialty'
    ],
    salaryRange: '$120,000 - $180,000',
    growthOutlook: 'Strong (25% growth projected)',
    careerProgression: 'Can advance to Chief Information Security Officer (CISO), Security Director, or specialize in Enterprise Architecture.',
    careerPath: ['Junior Security Architect', 'Security Architect', 'Senior Security Architect', 'Security Director', 'Chief Information Security Officer (CISO)']
  },
  {
    _id: 'role004',
    title: 'Malware Analyst',
    description: 'Malware Analysts analyze malicious software to understand its functionality, origin, and impact.',
    category: 'Threat Intelligence',
    careerLevel: 'Mid',
    shortDescription: 'Analyze malicious software to understand its functionality, origin, and impact in order to develop effective defenses and remediation strategies.',
    responsibilities: [
      'Perform static and dynamic analysis of malicious code',
      'Reverse engineer malware samples',
      'Develop signatures and indicators of compromise (IOCs)',
      'Document malware behaviors and characteristics',
      'Provide actionable intelligence to security teams'
    ],
    keySkills: [
      'Reverse Engineering', 
      'Assembly Language', 
      'Debugging', 
      'Sandbox Analysis', 
      'Programming (C/C++, Python)',
      'Disassemblers (IDA Pro, Ghidra)'
    ],
    tools: [
      'IDA Pro',
      'Ghidra',
      'OllyDbg',
      'x64dbg',
      'Cuckoo Sandbox'
    ],
    recommendedCertifications: [
      'GIAC Reverse Engineering Malware (GREM)',
      'Certified Reverse Engineering Analyst (CREA)',
      'SANS FOR610: Reverse-Engineering Malware',
      'eLearnSecurity Certified Reverse Engineer (eCRE)'
    ],
    salaryRange: '$90,000 - $140,000',
    growthOutlook: 'Strong (28% growth projected)',
    careerProgression: 'Can advance to Senior Malware Analyst, Threat Intelligence Lead, or move into specialized areas like Advanced Persistent Threat (APT) Analysis.',
    careerPath: ['Junior Malware Analyst', 'Malware Analyst', 'Senior Malware Analyst', 'Threat Intelligence Lead', 'Incident Response Manager']
  },
  {
    _id: 'role005',
    title: 'Security Operations Center (SOC) Analyst',
    description: 'SOC Analysts monitor and analyze security alerts in real-time to detect and respond to security incidents.',
    category: 'Defensive Operations',
    careerLevel: 'Entry',
    shortDescription: 'Monitor and analyze security alerts in real-time, detect and respond to security incidents, and implement security measures to protect organizational assets.',
    responsibilities: [
      'Monitor security events and alerts from various security tools',
      'Triage and investigate security incidents',
      'Perform initial incident response activities',
      'Document security incidents and response actions',
      'Maintain and tune security monitoring tools'
    ],
    keySkills: [
      'SIEM Tools', 
      'Log Analysis', 
      'Incident Response', 
      'Network Security', 
      'Endpoint Security'
    ],
    tools: [
      'Splunk',
      'ELK Stack',
      'QRadar',
      'ArcSight',
      'McAfee ESM'
    ],
    recommendedCertifications: [
      'CompTIA Security+',
      'GIAC Certified Incident Handler (GCIH)',
      'Splunk Certified User',
      'IBM QRadar Certified Associate'
    ],
    salaryRange: '$55,000 - $85,000',
    growthOutlook: 'Strong (33% growth projected)',
    careerProgression: 'Can advance to SOC Tier 2/3 Analyst, SOC Team Lead, or specialize in areas like Threat Hunting or Digital Forensics.',
    careerPath: ['Junior SOC Analyst', 'SOC Analyst', 'SOC Tier 2/3 Analyst', 'SOC Team Lead', 'Incident Response Manager']
  },
  {
    _id: 'role006',
    title: 'Cloud Security Engineer',
    description: 'Cloud Security Engineers design and implement secure cloud-based systems and services.',
    category: 'Security Design',
    careerLevel: 'Mid',
    shortDescription: 'Design, implement, and maintain security controls and measures for cloud-based systems and services to ensure data protection and compliance.',
    responsibilities: [
      'Implement security controls in cloud environments (AWS, Azure, GCP)',
      'Develop and maintain cloud security architecture',
      'Perform cloud security assessments and audits',
      'Automate security processes and controls',
      'Monitor cloud environments for security threats',
      'Ensure compliance with regulatory requirements'
    ],
    keySkills: [
      'Cloud Platforms (AWS, Azure, GCP)', 
      'Infrastructure as Code', 
      'Container Security', 
      'Identity and Access Management', 
      'DevSecOps',
      'Scripting and Automation'
    ],
    tools: [
      'AWS CloudFormation',
      'Azure Resource Manager',
      'Google Cloud Deployment Manager',
      'Terraform',
      'Ansible'
    ],
    recommendedCertifications: [
      'AWS Certified Security - Specialty',
      'Microsoft Certified: Azure Security Engineer Associate',
      'Google Professional Cloud Security Engineer',
      'Certified Cloud Security Professional (CCSP)'
    ],
    salaryRange: '$100,000 - $160,000',
    growthOutlook: 'Very Strong (38% growth projected)',
    careerProgression: 'Can advance to Senior Cloud Security Engineer, Cloud Security Architect, or move into specialized areas like Cloud Security Posture Management.',
    careerPath: ['Junior Cloud Security Engineer', 'Cloud Security Engineer', 'Senior Cloud Security Engineer', 'Cloud Security Architect', 'Cloud Security Director']
  },
  {
    _id: 'role007',
    title: 'Digital Forensics Investigator',
    description: 'Digital Forensics Investigators collect and analyze digital evidence to investigate security incidents and cybercrimes.',
    category: 'Incident Response',
    careerLevel: 'Mid',
    shortDescription: 'Collect, analyze, and preserve digital evidence to investigate security incidents, cybercrimes, and potential legal violations.',
    responsibilities: [
      'Collect and preserve digital evidence',
      'Perform forensic analysis of systems, networks, and devices',
      'Recover deleted or damaged data',
      'Document findings and maintain chain of custody',
      'Prepare reports for legal proceedings',
      'Testify as an expert witness when required'
    ],
    keySkills: [
      'Digital Forensics Tools', 
      'Disk and Memory Forensics', 
      'Network Forensics', 
      'Mobile Device Forensics', 
      'Evidence Handling',
      'Legal Procedures'
    ],
    tools: [
      'EnCase',
      'FTK Imager',
      'Volatility',
      'Plaso',
      'Autopsy'
    ],
    recommendedCertifications: [
      'GIAC Certified Forensic Analyst (GCFA)',
      'EnCase Certified Examiner (EnCE)',
      'Certified Computer Forensics Examiner (CCFE)',
      'AccessData Certified Examiner (ACE)'
    ],
    salaryRange: '$85,000 - $135,000',
    growthOutlook: 'Strong (26% growth projected)',
    careerProgression: 'Can advance to Senior Forensic Investigator, Forensics Team Lead, or specialize in areas like Memory Forensics or Mobile Forensics.',
    careerPath: ['Junior Digital Forensics Investigator', 'Digital Forensics Investigator', 'Senior Digital Forensics Investigator', 'Forensics Team Lead', 'Incident Response Manager']
  },
  {
    _id: 'role008',
    title: 'Application Security Engineer',
    description: 'Application Security Engineers integrate security into the software development lifecycle to identify and remediate security vulnerabilities.',
    category: 'Security Design',
    careerLevel: 'Mid',
    shortDescription: 'Integrate security into the software development lifecycle to identify and remediate security vulnerabilities in applications before deployment.',
    responsibilities: [
      'Perform security code reviews and assessments',
      'Conduct application security testing (SAST, DAST, IAST)',
      'Develop secure coding guidelines and standards',
      'Train developers on secure coding practices',
      'Integrate security into CI/CD pipelines',
      'Respond to application security incidents'
    ],
    keySkills: [
      'Secure Coding', 
      'Web Application Security', 
      'API Security', 
      'Security Testing Tools', 
      'DevSecOps',
      'Programming Languages'
    ],
    tools: [
      'SonarQube',
      'Veracode',
      'Checkmarx',
      'Burp Suite',
      'OWASP ZAP'
    ],
    recommendedCertifications: [
      'Certified Secure Software Lifecycle Professional (CSSLP)',
      'GIAC Web Application Penetration Tester (GWAPT)',
      'Certified Application Security Engineer (CASE)',
      'OWASP Application Security Verification Standard'
    ],
    salaryRange: '$95,000 - $150,000',
    growthOutlook: 'Strong (30% growth projected)',
    careerProgression: 'Can advance to Senior Application Security Engineer, Application Security Architect, or move into specialized areas like API Security or Mobile Application Security.',
    careerPath: ['Junior Application Security Engineer', 'Application Security Engineer', 'Senior Application Security Engineer', 'Application Security Architect', 'Security Director']
  },
  {
    _id: 'role009',
    title: 'Chief Information Security Officer (CISO)',
    description: 'CISOs lead and oversee an organization\'s information security program, including strategy, governance, compliance, and risk management.',
    category: 'Leadership',
    careerLevel: 'Senior',
    shortDescription: 'Lead and oversee an organization\'s information security program, including strategy, governance, compliance, and risk management.',
    responsibilities: [
      'Develop and implement security strategy and roadmap',
      'Manage information security budget and resources',
      'Oversee security operations and incident response',
      'Ensure compliance with regulatory requirements',
      'Report security status to executive leadership',
      'Manage security risk at the enterprise level'
    ],
    keySkills: [
      'Security Leadership', 
      'Risk Management', 
      'Compliance', 
      'Security Governance', 
      'Strategic Planning',
      'Executive Communication',
      'Budget Management'
    ],
    tools: [
      'GRC platforms',
      'Risk management tools',
      'Compliance management tools',
      'Security information and event management (SIEM) systems',
      'Cloud security platforms'
    ],
    recommendedCertifications: [
      'Certified Information Security Manager (CISM)',
      'Certified Information Systems Security Professional (CISSP)',
      'Certified in Risk and Information Systems Control (CRISC)',
      'GIAC Security Leadership Certification (GSLC)'
    ],
    salaryRange: '$150,000 - $300,000+',
    growthOutlook: 'Strong (20% growth projected)',
    careerProgression: 'Can advance to roles like Chief Security Officer (CSO), Chief Risk Officer (CRO), or transition to consulting and advisory roles.',
    careerPath: ['Security Manager', 'Assistant CISO', 'CISO', 'Chief Security Officer (CSO)', 'Chief Risk Officer (CRO)']
  }
];

++++=== [72] ./src/data/contactData.ts ===+++
import { FloatingContact } from '@/types';

export const contactData: FloatingContact = {
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/yourusername',
      fetchLive: true
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      fetchLive: false
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/yourusername',
      fetchLive: true
    }
  ],
  email: 'your.email@example.com',
  phone: '+1234567890',
  message: 'Available for cybersecurity consulting, penetration testing, and security training. Feel free to reach out!'
};

++++=== [73] ./src/data/dashboardData.ts ===+++
import { CyberPulseDashboard } from '@/types';

export const dashboardData: CyberPulseDashboard = {
  currentTime: new Date().toLocaleTimeString(),
  securityScore: 85,
  vulnerabilities: [
    {
      id: 'vuln-001',
      name: 'Critical Zero-Day in VPN Service',
      severity: 'critical',
      category: 'Network Security',
      affectedSystem: 'VPN Infrastructure',
      status: 'open',
      discoveredDate: '2025-03-11',
      description: 'Zero-day vulnerability affecting VPN service allowing remote code execution'
    },
    {
      id: 'vuln-002',
      name: 'Unpatched Windows Server',
      severity: 'high',
      category: 'System Security',
      affectedSystem: 'Windows Server 2022',
      status: 'in_progress',
      discoveredDate: '2025-03-10',
      description: 'Critical security patches pending deployment on production servers'
    }
  ],
  recentAttacks: [
    {
      id: 'atk-001',
      type: 'Ransomware',
      source: 'Unknown APT Group',
      target: 'Healthcare Sector',
      timestamp: '2025-03-11T08:30:00',
      severity: 'critical',
      status: 'blocked',
      description: 'Attempted ransomware deployment targeting healthcare organizations'
    }
  ],
  systemStatus: [
    {
      id: 'sys-001',
      name: 'Firewall',
      status: 'online',
      lastChecked: '2025-03-11T14:30:00',
      metrics: {
        uptime: '99.9%',
        load: '45%',
        cpu: 45,
        memory: 60,
        network: 75
      }
    }
  ],
  securityTips: [
    'Enable Multi-Factor Authentication on all accounts',
    'Regularly update and patch systems',
    'Monitor network traffic for unusual patterns'
  ],
  threatLevel: 'high',
  threatLevelDescription: 'Elevated threat level due to recent ransomware campaigns',
  activeIncidents: [
    {
      id: 'inc-001',
      title: 'Phishing Campaign',
      description: 'Targeted phishing attacks detected',
      type: 'Phishing',
      severity: 'high',
      timestamp: '2025-03-11T12:00:00',
      status: 'investigating',
      affectedSystems: ['Email Systems', 'User Workstations']
    }
  ],
  globalThreatMap: [
    {
      id: 'threat-001',
      latitude: 55.7558,
      longitude: 37.6173,
      country: 'Russian Federation',
      severity: 'high',
      type: 'APT',
      count: 1500,
      isAttacking: true
    }
  ],
  vulnerabilityTrends: [
    {
      month: '2025-03',
      critical: 3,
      high: 8,
      medium: 12,
      low: 4
    }
  ],
  securityNewsFeed: [
    {
      id: 'news-001',
      title: 'Critical Zero-Day Vulnerability in Popular VPN Service',
      summary: 'Security researchers have discovered a critical zero-day vulnerability',
      date: '2025-03-11',
      source: 'CyberSecurityNews',
      url: 'https://example.com/news/1',
      tags: ['zero-day', 'vpn', 'critical']
    }
  ],
  securityTools: [
    {
      id: 'tool-001',
      name: 'Nmap',
      category: 'Network Scanner',
      description: 'Network discovery and security auditing',
      status: 'active',
      lastUpdated: '2025-03-11',
      icon: 'nmap-icon'
    }
  ],
  patches: {
    applied: 245,
    available: 12,
    critical: 3,
    pending: 9
  },
  networkTraffic: '1.2 TB/day'
};

++++=== [74] ./src/data/resourcesData.ts ===+++
import { CyberResource } from '@/types';

export const resourcesData: CyberResource[] = [
  {
    _id: 'res001',
    title: 'OWASP Top 10 Web Application Security Risks',
    description: 'The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.',
    url: 'https://owasp.org/www-project-top-ten/',
    type: 'article',
    category: 'Web Security',
    level: 'beginner',
    tags: ['OWASP', 'Web Security', 'Vulnerabilities', 'Best Practices'],
    author: 'OWASP Foundation',
    dateAdded: '2023-01-15',
    featured: true
  },
  {
    _id: 'res002',
    title: 'Practical Malware Analysis & Triage',
    description: 'This comprehensive guide walks through the process of analyzing suspicious files and determining if they are malicious. Learn how to set up a safe analysis environment, use basic static and dynamic analysis techniques, and document your findings.',
    url: 'https://zeltser.com/malware-analysis-cheat-sheet/',
    type: 'tutorial',
    category: 'Malware Analysis',
    level: 'intermediate',
    tags: ['Malware', 'Reverse Engineering', 'Analysis', 'Forensics'],
    author: 'Lenny Zeltser',
    dateAdded: '2023-02-10',
    featured: true
  },
  {
    _id: 'res003',
    title: 'Metasploit Framework',
    description: 'The Metasploit Framework is a powerful open-source platform for developing, testing, and executing exploits. It contains a suite of tools that can be used to test security vulnerabilities, enumerate networks, execute attacks, and evade detection.',
    url: 'https://www.metasploit.com/',
    type: 'tool',
    category: 'Penetration Testing',
    level: 'intermediate',
    tags: ['Exploitation', 'Penetration Testing', 'Red Team', 'Vulnerability Assessment'],
    author: 'Rapid7',
    dateAdded: '2023-01-05',
    featured: false
  },
  {
    _id: 'res004',
    title: 'Practical Cryptography for Developers',
    description: 'A modern practical book about cryptography for developers with code examples, covering core concepts like hashing, encryption, digital signatures, and key exchange algorithms.',
    url: 'https://cryptobook.nakov.com/',
    type: 'book',
    category: 'Cryptography',
    level: 'intermediate',
    tags: ['Cryptography', 'Encryption', 'Hashing', 'Security'],
    author: 'Svetlin Nakov',
    dateAdded: '2023-03-20',
    featured: true
  },
  {
    _id: 'res005',
    title: 'TryHackMe - Complete Beginner Path',
    description: 'Learn the core fundamentals of cybersecurity through guided learning paths and hands-on virtual labs. This beginner-friendly path covers networking basics, web security, Linux, and basic penetration testing methodologies.',
    url: 'https://tryhackme.com/path/outline/beginner',
    type: 'course',
    category: 'Learning Path',
    level: 'beginner',
    tags: ['Hands-on', 'CTF', 'Learning', 'Labs'],
    author: 'TryHackMe',
    dateAdded: '2023-02-28',
    featured: true
  },
  {
    _id: 'res006',
    title: 'Wireshark Network Protocol Analyzer',
    description: 'Wireshark is the world\'s foremost and widely-used network protocol analyzer. It lets you see what\'s happening on your network at a microscopic level and is the de facto standard across many commercial and non-profit enterprises, government agencies, and educational institutions.',
    url: 'https://www.wireshark.org/',
    type: 'tool',
    category: 'Network Security',
    level: 'intermediate',
    tags: ['Network Analysis', 'Packet Capture', 'Troubleshooting', 'Forensics'],
    author: 'The Wireshark Foundation',
    dateAdded: '2023-01-10',
    featured: false
  },
  {
    _id: 'res007',
    title: 'Advanced Threat Hunting Techniques',
    description: 'This resource covers sophisticated threat hunting methodologies used by security operations centers (SOCs) to proactively search for malicious actors that have evaded traditional security controls. Learn about creating hypotheses, leveraging the MITRE ATT&CK framework, and using advanced analytics to detect anomalies.',
    url: 'https://www.sans.org/white-papers/threat-hunting/',
    type: 'article',
    category: 'Threat Hunting',
    level: 'advanced',
    tags: ['SOC', 'MITRE ATT&CK', 'Detection', 'Blue Team'],
    author: 'SANS Institute',
    dateAdded: '2023-04-05',
    featured: false
  },
  {
    _id: 'res008',
    title: 'HackTheBox Academy - Windows Privilege Escalation',
    description: 'Master the techniques used to escalate privileges on Windows systems. This module covers common misconfigurations, vulnerable services, credential harvesting, and kernel exploits that can be leveraged to gain higher privileges during penetration tests.',
    url: 'https://academy.hackthebox.com/',
    type: 'course',
    category: 'Privilege Escalation',
    level: 'intermediate',
    tags: ['Windows', 'Privilege Escalation', 'Post-Exploitation', 'Red Team'],
    author: 'HackTheBox',
    dateAdded: '2023-03-15',
    featured: false
  },
  {
    _id: 'res009',
    title: 'Burp Suite Web Vulnerability Scanner',
    description: 'Burp Suite is an integrated platform for performing security testing of web applications. Its various tools work seamlessly together to support the entire testing process, from initial mapping and analysis of an application\'s attack surface, through to finding and exploiting security vulnerabilities.',
    url: 'https://portswigger.net/burp',
    type: 'tool',
    category: 'Web Security',
    level: 'intermediate',
    tags: ['Web Application', 'Proxy', 'Scanner', 'Penetration Testing'],
    author: 'PortSwigger',
    dateAdded: '2023-02-05',
    featured: true
  },
  {
    _id: 'res010',
    title: 'Cloud Security Best Practices',
    description: 'A comprehensive guide to securing cloud environments across major providers (AWS, Azure, GCP). Covers identity and access management, network security, data protection, monitoring, and compliance considerations specific to cloud computing.',
    url: 'https://cloudsecurityalliance.org/research/guidance/',
    type: 'guide',
    category: 'Cloud Security',
    level: 'intermediate',
    tags: ['Cloud', 'AWS', 'Azure', 'GCP', 'IaC'],
    author: 'Cloud Security Alliance',
    dateAdded: '2023-04-10',
    featured: false
  },
  {
    _id: 'res011',
    title: 'Mobile Application Penetration Testing Cheat Sheet',
    description: 'This cheat sheet provides a methodology for testing the security of mobile applications on both Android and iOS platforms. It covers environment setup, static analysis, dynamic analysis, network testing, and platform-specific vulnerabilities.',
    url: 'https://github.com/OWASP/owasp-mstg',
    type: 'cheatsheet',
    category: 'Mobile Security',
    level: 'advanced',
    tags: ['Mobile', 'Android', 'iOS', 'Penetration Testing'],
    author: 'OWASP Foundation',
    dateAdded: '2023-03-25',
    featured: false
  },
  {
    _id: 'res012',
    title: 'Practical Binary Analysis',
    description: 'Learn the foundational techniques for analyzing binary code in this hands-on guide. Covers disassembly, debugging, reverse engineering, and vulnerability discovery in compiled applications without source code access.',
    url: 'https://practicalbinaryanalysis.com/',
    type: 'book',
    category: 'Reverse Engineering',
    level: 'advanced',
    tags: ['Binary Analysis', 'Disassembly', 'Debugging', 'Exploitation'],
    author: 'Dennis Andriesse',
    dateAdded: '2023-02-20',
    featured: false
  }
];

++++=== [75] ./src/lib/portableTextUtils.tsx ===+++
import React from 'react';

/**
 * Utility to safely extract text from Portable Text format or return a string
 * This handles Sanity.io's rich text format and prevents "Objects are not valid as React child" errors
 */
export const extractPortableText = (portableText: any, fallback: string = ''): string => {
  // If it's already a string, just return it
  if (typeof portableText === 'string') {
    return portableText;
  }
  
  // If it's an array (standard Portable Text format), extract text from blocks
  if (Array.isArray(portableText)) {
    return portableText
      .map(block => {
        // Extract text from paragraph blocks
        if (block._type === 'block' && Array.isArray(block.children)) {
          return block.children
            .map((child: any) => child.text || '')
            .join('');
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');
  }
  
  // If it's an object with children (sometimes the case), extract from that
  if (portableText && typeof portableText === 'object' && 'children' in portableText) {
    if (Array.isArray(portableText.children)) {
      return portableText.children
        .map((child: any) => child.text || '')
        .filter(Boolean)
        .join('');
    }
  }
  
  // If we can't extract text, return the fallback
  return fallback;
};

/**
 * Component to render Portable Text with proper formatting
 * For more complex rendering, consider using @portabletext/react package
 */
interface PortableTextProps {
  value: any;
  className?: string;
}

export const SimplePortableText: React.FC<PortableTextProps> = ({ value, className = '' }) => {
  if (!value) return null;
  
  // If it's already a string, just render it
  if (typeof value === 'string') {
    return <p className={className}>{value}</p>;
  }
  
  // If it's an array (standard Portable Text format), render blocks
  if (Array.isArray(value)) {
    return (
      <div className={className}>
        {value.map((block, index) => {
          // Handle paragraph blocks
          if (block._type === 'block' && Array.isArray(block.children)) {
            const text = block.children
              .map((child: any) => child.text || '')
              .join('');
              
            if (block.style === 'h1') return <h1 key={block._key || index}>{text}</h1>;
            if (block.style === 'h2') return <h2 key={block._key || index}>{text}</h2>;
            if (block.style === 'h3') return <h3 key={block._key || index}>{text}</h3>;
            if (block.style === 'h4') return <h4 key={block._key || index}>{text}</h4>;
            
            return <p key={block._key || index}>{text}</p>;
          }
          
          // Fallback for unknown blocks
          return null;
        })}
      </div>
    );
  }
  
  // Fallback for unknown format
  return <p className={className}>{extractPortableText(value)}</p>;
};

++++=== [76] ./src/lib/sanity.ts ===+++

import {createClient} from "@sanity/client";

export const client = createClient({
  projectId: "grt0al70", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2021-06-07",
  useCdn: true,
});


++++=== [77] ./src/lib/sanityMiddleware.ts ===+++
import { client } from './sanity';
import { Category, Profile, Project, Certification, Skill, CyberResource, CyberRole, Experience, Education } from '@/types';

// Cache mechanism to prevent redundant API calls
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Generic fetch function with caching
 */
async function fetchWithCache<T>(query: string, cacheKey: string): Promise<T> {
  const now = Date.now();
  const cachedData = cache.get(cacheKey);
  
  if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data as T;
  }
  
  try {
    const data = await client.fetch<T>(query);
    cache.set(cacheKey, { data, timestamp: now });
    return data;
  } catch (error) {
    console.error(`Error fetching ${cacheKey}:`, error);
    throw error;
  }
}

/**
 * Fetch profile data
 */
export async function fetchProfile(): Promise<Profile> {
  const query = `*[_type == "profile"][0]{
    name,
    title,
    shortBio,
    longBio,
    profileImage {
      asset->{
        url
      }
    },
    socialLinks,
    email,
    phone,
    location
  }`;
  
  return fetchWithCache<Profile>(query, 'profile');
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<Category[]> {
  const query = `*[_type == "category"]{
    _id,
    name,
    slug,
    description
  }`;
  
  return fetchWithCache<Category[]>(query, 'categories');
}

/**
 * Fetch featured projects
 */
export async function fetchFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && metadata.isFeatured == true]{
    _id,
    title,
    slug,
    description,
    thumbnail {
      asset->{
        url
      }
    },
    liveUrl,
    repoUrl,
    technologies,
    categories[]->{
      _id,
      name
    },
    metadata
  }`;
  
  return fetchWithCache<Project[]>(query, 'featuredProjects');
}

/**
 * Fetch all projects
 */
export async function fetchAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"]{
    _id,
    title,
    slug,
    description,
    thumbnail {
      asset->{
        url
      }
    },
    liveUrl,
    repoUrl,
    technologies,
    categories[]->{
      _id,
      name
    },
    metadata
  } | order(metadata.order asc)`;
  
  return fetchWithCache<Project[]>(query, 'allProjects');
}

/**
 * Fetch certifications
 */
export async function fetchCertifications(): Promise<Certification[]> {
  const query = `*[_type == "certification"]{
    _id,
    title,
    slug,
    issuingOrganization,
    certificateImage {
      asset->{
        url
      }
    },
    dateIssued,
    expirationDate,
    verificationLink,
    description,
    categories[]->{
      _id,
      name
    },
    status
  } | order(dateIssued desc)`;
  
  return fetchWithCache<Certification[]>(query, 'certifications');
}

/**
 * Fetch skills
 */
export async function fetchSkills(): Promise<Skill[]> {
  const query = `*[_type == "skill"]{
    _id,
    name,
    category,
    proficiency,
    icon,
    yearsOfExperience,
    isHighlighted
  } | order(proficiency desc)`;
  
  return fetchWithCache<Skill[]>(query, 'skills');
}

/**
 * Fetch cyber resources
 */
export async function fetchCyberResources(): Promise<CyberResource[]> {
  const query = `*[_type == "resource"]{
    _id,
    title,
    description,
    url,
    type,
    category,
    level,
    tags,
    author,
    dateAdded,
    featured
  } | order(dateAdded desc)`;
  
  return fetchWithCache<CyberResource[]>(query, 'cyberResources');
}

/**
 * Fetch cyber career roles
 */
export async function fetchCyberRoles(): Promise<CyberRole[]> {
  const query = `*[_type == "role"]{
    _id,
    title,
    description,
    icon,
    salary,
    tools,
    responsibilities,
    requirements,
    careerPath,
    isPopular
  } | order(isPopular desc)`;
  
  return fetchWithCache<CyberRole[]>(query, 'cyberRoles');
}

/**
 * Fetch experience
 */
export async function fetchExperience(): Promise<Experience[]> {
  const query = `*[_type == "experience"]{
    _id,
    position,
    company,
    location,
    startDate,
    endDate,
    description,
    technologies,
    achievements,
    isHighlighted
  } | order(startDate desc)`;
  
  return fetchWithCache<Experience[]>(query, 'experience');
}

/**
 * Fetch education
 */
export async function fetchEducation(): Promise<Education[]> {
  const query = `*[_type == "education"]{
    _id,
    degree,
    institution,
    startDate,
    endDate,
    description,
    achievements,
    isHighlighted
  } | order(startDate desc)`;
  
  return fetchWithCache<Education[]>(query, 'education');
}

/**
 * Fetch all data for the homepage
 */
export async function fetchHomePageData() {
  try {
    const [profile, categories, featuredProjects, certifications, skills] = await Promise.all([
      fetchProfile(),
      fetchCategories(),
      fetchFeaturedProjects(),
      fetchCertifications(),
      fetchSkills()
    ]);
    
    return {
      profile,
      categories,
      featuredProjects,
      certifications,
      skills
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    throw error;
  }
}

/**
 * Fetch all data for the portfolio page
 */
export async function fetchPortfolioPageData() {
  try {
    const [profile, allProjects, experience, education, skills] = await Promise.all([
      fetchProfile(),
      fetchAllProjects(),
      fetchExperience(),
      fetchEducation(),
      fetchSkills()
    ]);
    
    return {
      profile,
      allProjects,
      experience,
      education,
      skills
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
}

/**
 * Fetch all data for the resources hub
 */
export async function fetchResourcesData() {
  try {
    const [cyberResources, cyberRoles] = await Promise.all([
      fetchCyberResources(),
      fetchCyberRoles()
    ]);
    
    return {
      cyberResources,
      cyberRoles
    };
  } catch (error) {
    console.error('Error fetching resources data:', error);
    throw error;
  }
}

++++=== [78] ./src/styles/animations.css ===+++
/* General animations for portfolio website */

/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

/* Slide in animations */
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.animate-slide-in-right {
  animation: slideInRight 0.5s ease-out;
}

@keyframes slideInLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.animate-slide-in-left {
  animation: slideInLeft 0.5s ease-out;
}

@keyframes slideInUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-in-up {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInDown {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-in-down {
  animation: slideInDown 0.5s ease-out;
}

/* Pulse animation */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.animate-pulse-slow {
  animation: pulse 3s infinite ease-in-out;
}

/* Floating animation */
@keyframes floating {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-floating {
  animation: floating 3s infinite ease-in-out;
}

/* Bounce animation */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

.animate-bounce-custom {
  animation: bounce 2s infinite;
}

/* Rotation animation */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-rotate {
  animation: rotate 8s linear infinite;
}

.animate-rotate-slow {
  animation: rotate 15s linear infinite;
}

/* Scale animation */
@keyframes scale {
  0% { transform: scale(0); opacity: 0; }
  80% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-scale {
  animation: scale 0.5s ease-out;
}

/* Shake animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Fade animations with directions */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.7s ease-out;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-down {
  animation: fadeInDown 0.7s ease-out;
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in-left {
  animation: fadeInLeft 0.7s ease-out;
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in-right {
  animation: fadeInRight 0.7s ease-out;
}

/* Delayed animations */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-700 { animation-delay: 700ms; }
.delay-1000 { animation-delay: 1s; }
.delay-1500 { animation-delay: 1.5s; }
.delay-2000 { animation-delay: 2s; }

/* Animation durations */
.duration-300 { animation-duration: 300ms; }
.duration-500 { animation-duration: 500ms; }
.duration-700 { animation-duration: 700ms; }
.duration-1000 { animation-duration: 1s; }
.duration-1500 { animation-duration: 1.5s; }
.duration-2000 { animation-duration: 2s; }
.duration-3000 { animation-duration: 3s; }

/* Animation fill modes */
.fill-forwards { animation-fill-mode: forwards; }
.fill-backwards { animation-fill-mode: backwards; }
.fill-both { animation-fill-mode: both; }

/* Animation iteration counts */
.iteration-infinite { animation-iteration-count: infinite; }
.iteration-1 { animation-iteration-count: 1; }
.iteration-2 { animation-iteration-count: 2; }
.iteration-3 { animation-iteration-count: 3; }

/* Animation timing functions */
.ease-linear { animation-timing-function: linear; }
.ease-in { animation-timing-function: ease-in; }
.ease-out { animation-timing-function: ease-out; }
.ease-in-out { animation-timing-function: ease-in-out; }

++++=== [79] ./src/styles/cyber-animations.css ===+++
/* Cyber-themed animations for portfolio website
 * Implements various cybersecurity visual effects based on the design system
 */

/* ====== Base Colors from Design System ====== */
:root {
  --neon-green: #50fa7b;
  --cyber-blue: #8be9fd;
  --neon-purple: #bd93f9;
  --dark-base: #282a36;
  --dark-secondary: #1a1b26;
  --dark-tertiary: #44475a;
  --cyber-gray: #6272a4;
  --cyber-red: #ff5555;
  --cyber-yellow: #f1fa8c;
}

/* ====== Glitch Text Effect ====== */
.glitch {
  position: relative;
  color: var(--neon-green);
  text-shadow: 0 0 5px rgba(80, 250, 123, 0.5);
}

.glitch::after,
.glitch::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.glitch::before {
  color: var(--cyber-blue);
  z-index: -2;
  animation: glitch-effect 2s infinite alternate-reverse;
}

.glitch::after {
  color: var(--neon-purple);
  z-index: -1;
  animation: glitch-effect 3s infinite alternate;
}

@keyframes glitch-effect {
  0% {
    transform: none;
    opacity: 0.8;
  }
  7% {
    transform: translate(2px, 3px);
    opacity: 0.6;
  }
  10% {
    transform: none;
    opacity: 0.8;
  }
  27% {
    transform: none;
    opacity: 0.8;
  }
  30% {
    transform: translate(-5px, -2px);
    opacity: 0.6;
  }
  35% {
    transform: none;
    opacity: 0.8;
  }
  52% {
    transform: none;
    opacity: 0.8;
  }
  55% {
    transform: translate(5px, -1px);
    opacity: 0.6;
  }
  50% {
    transform: none;
    opacity: 0.8;
  }
  72% {
    transform: none;
    opacity: 0.8;
  }
  75% {
    transform: translate(-2px, -6px);
    opacity: 0.6;
  }
  80% {
    transform: none;
    opacity: 0.8;
  }
  100% {
    transform: none;
    opacity: 0.8;
  }
}

/* ====== Typing Effect ====== */
.typing-effect {
  position: relative;
  border-right: 2px solid var(--neon-green);
  white-space: nowrap;
  overflow: hidden;
  animation: typing 4s steps(40) 1s 1 normal both,
             blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: var(--neon-green) }
}

/* ====== Neon Borders ====== */
.neon-border {
  box-shadow: 0 0 5px var(--neon-green),
              0 0 10px var(--neon-green),
              0 0 15px var(--neon-green);
  animation: neon-pulse 2s infinite alternate;
}

.neon-border-cyber-blue {
  box-shadow: 0 0 5px var(--cyber-blue),
              0 0 10px var(--cyber-blue),
              0 0 15px var(--cyber-blue);
  animation: neon-pulse-blue 2s infinite alternate;
}

.neon-border-purple {
  box-shadow: 0 0 5px var(--neon-purple),
              0 0 10px var(--neon-purple),
              0 0 15px var(--neon-purple);
  animation: neon-pulse-purple 2s infinite alternate;
}

@keyframes neon-pulse {
  from { box-shadow: 0 0 5px var(--neon-green),
                    0 0 10px var(--neon-green),
                    0 0 15px var(--neon-green); }
  to { box-shadow: 0 0 10px var(--neon-green),
                  0 0 20px var(--neon-green),
                  0 0 30px var(--neon-green); }
}

@keyframes neon-pulse-blue {
  from { box-shadow: 0 0 5px var(--cyber-blue),
                    0 0 10px var(--cyber-blue),
                    0 0 15px var(--cyber-blue); }
  to { box-shadow: 0 0 10px var(--cyber-blue),
                  0 0 20px var(--cyber-blue),
                  0 0 30px var(--cyber-blue); }
}

@keyframes neon-pulse-purple {
  from { box-shadow: 0 0 5px var(--neon-purple),
                    0 0 10px var(--neon-purple),
                    0 0 15px var(--neon-purple); }
  to { box-shadow: 0 0 10px var(--neon-purple),
                  0 0 20px var(--neon-purple),
                  0 0 30px var(--neon-purple); }
}

/* ====== Cyber Grid Background ====== */
.cyber-grid-bg {
  background-color: var(--dark-secondary);
  background-image:
    linear-gradient(rgba(139, 233, 253, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 233, 253, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  position: relative;
  overflow: hidden;
}

.cyber-grid-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(26, 27, 38, 0.3),
    rgba(26, 27, 38, 0.1) 40%,
    rgba(26, 27, 38, 0.2) 80%,
    rgba(26, 27, 38, 0.8)
  );
  pointer-events: none;
  z-index: 1;
}

/* ====== Scan Line Effect ====== */
.scan-lines {
  position: relative;
  overflow: hidden;
}

.scan-lines::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.05) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 2;
}

.scan-lines::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    transparent 0%,
    rgba(80, 250, 123, 0.1) 50%,
    transparent 100%
  );
  animation: scan-line 8s linear infinite;
  z-index: 3;
}

@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* ====== Cyber Buttons ====== */
.cyber-button {
  position: relative;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: rgba(26, 27, 38, 0.8);
  color: white;
  border: 1px solid var(--neon-green);
  text-transform: uppercase;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
}

.cyber-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(80, 250, 123, 0.2),
    transparent
  );
  transition: all 0.6s ease;
  z-index: -1;
}

.cyber-button:hover {
  box-shadow: 0 0 10px var(--neon-green);
  text-shadow: 0 0 5px var(--neon-green);
}

.cyber-button:hover::before {
  left: 100%;
}

.cyber-button-green {
  border-color: var(--neon-green);
}

.cyber-button-green:hover {
  box-shadow: 0 0 10px var(--neon-green);
  text-shadow: 0 0 5px var(--neon-green);
}

.cyber-button-blue {
  border-color: var(--cyber-blue);
}

.cyber-button-blue:hover {
  box-shadow: 0 0 10px var(--cyber-blue);
  text-shadow: 0 0 5px var(--cyber-blue);
}

.cyber-button-purple {
  border-color: var(--neon-purple);
}

.cyber-button-purple:hover {
  box-shadow: 0 0 10px var(--neon-purple);
  text-shadow: 0 0 5px var(--neon-purple);
}

/* ====== Text gradients ====== */
.text-gradient-neon {
  background: linear-gradient(90deg, var(--neon-green), var(--cyber-blue));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 10px rgba(80, 250, 123, 0.5);
}

/* ====== Holographic effect ====== */
.holographic {
  position: relative;
  overflow: hidden;
}

.holographic::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background: linear-gradient(
    120deg,
    transparent 10%,
    rgba(80, 250, 123, 0.2) 30%,
    rgba(139, 233, 253, 0.2) 50%,
    rgba(189, 147, 249, 0.2) 70%,
    transparent 90%
  );
  transform: translateY(-100%);
  animation: holographic-shift 3s linear infinite;
  pointer-events: none;
}

@keyframes holographic-shift {
  100% { transform: translateY(50%); }
}

++++=== [80] ./src/styles/index.css ===+++
/* Main CSS entry point for cybersecurity portfolio - consolidates all styles */

/* Import all stylesheets in the correct order to prevent cascading issues */
@import '../app/globals.css';
@import './animations.css';
@import './cyber-animations.css';

/* Additional global styles and overrides */
:root {
  /* Ensure consistent usage of font variables */
  --font-cyber: 'Share Tech Mono', monospace;
  --font-terminal: 'Fira Code', monospace;
  --font-sans: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: var(--font-geist-mono), 'Fira Code', monospace;
}

/* Force consistent font usage */
.font-cyber {
  font-family: var(--font-cyber) !important;
}

.font-terminal {
  font-family: var(--font-terminal) !important;
}

/* Enhance cyber theme across all components */
.cyber-card, 
.cyber-button, 
.cyber-terminal {
  border-radius: 4px;
  border: 1px solid var(--dark-tertiary);
  background-color: var(--dark-secondary);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.cyber-card:hover,
.cyber-button:hover {
  border-color: var(--neon-green);
  box-shadow: 0 0 15px rgba(80, 250, 123, 0.2);
}

/* Ensure consistent cyber glow effects */
.cyber-glow-green {
  box-shadow: 0 0 15px rgba(80, 250, 123, 0.5);
  transition: box-shadow 0.3s ease;
}

.cyber-glow-blue {
  box-shadow: 0 0 15px rgba(139, 233, 253, 0.5);
  transition: box-shadow 0.3s ease;
}

.cyber-glow-purple {
  box-shadow: 0 0 15px rgba(189, 147, 249, 0.5);
  transition: box-shadow 0.3s ease;
}

/* Improve accessibility for neon text */
.text-neon-green, 
.text-cyber-blue, 
.text-neon-purple {
  text-shadow: 0 0 5px currentColor;
}

/* Add consistent styling for interactive elements */
.cyber-interactive {
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.cyber-interactive:hover {
  transform: translateY(-2px);
  filter: brightness(1.2);
}

/* Consistent styling for sections */
.cyber-section {
  position: relative;
  overflow: hidden;
  padding: 4rem 0;
}

.cyber-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    var(--neon-green), 
    transparent
  );
}

++++=== [81] ./src/styles/modern-components.css ===+++
/* Modern Component Styles */

/* --- Modern Card Styles --- */
.modern-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modern-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.modern-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transition: 0.5s;
}

.modern-card:hover::before {
  left: 100%;
}

/* --- Modern Button Styles --- */
.modern-button {
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 1;
  cursor: pointer;
}

.modern-button-primary {
  background: rgba(80, 250, 123, 0.1);
  color: #50fa7b;
  border: 1px solid rgba(80, 250, 123, 0.3);
}

.modern-button-secondary {
  background: rgba(139, 233, 253, 0.1);
  color: #8be9fd;
  border: 1px solid rgba(139, 233, 253, 0.3);
}

.modern-button-accent {
  background: rgba(189, 147, 249, 0.1);
  color: #bd93f9;
  border: 1px solid rgba(189, 147, 249, 0.3);
}

.modern-button::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: 0.5s;
  z-index: -1;
}

.modern-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.modern-button:hover::after {
  left: 100%;
}

.modern-button:active {
  transform: translateY(1px);
}

/* --- Skill Bar --- */
.skill-bar-container {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin: 10px 0;
  overflow: hidden;
  position: relative;
  height: 8px;
}

.skill-bar {
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(90deg, #50fa7b, #8be9fd);
  position: relative;
  transition: width 1.5s cubic-bezier(0.1, 0.5, 0.2, 1);
}

.skill-percentage {
  position: absolute;
  right: 0;
  top: -25px;
  font-size: 14px;
  color: #fff;
}

/* --- Timeline Component --- */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
}

.timeline-item {
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  right: -8px;
  background-color: #50fa7b;
  border: 2px solid #50fa7b;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 0 10px rgba(80, 250, 123, 0.7);
}

.timeline-item-left {
  left: 0;
}

.timeline-item-right {
  left: 50%;
}

.timeline-item-right::after {
  left: -8px;
}

.timeline-content {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.03);
  position: relative;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-color: rgba(80, 250, 123, 0.3);
}

/* --- Modern Project Card --- */
.project-card {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  background: rgba(20, 20, 30, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(80, 250, 123, 0.3);
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
  transition: all 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #50fa7b, #8be9fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.project-description {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.project-tag {
  background: rgba(255, 255, 255, 0.05);
  color: #8be9fd;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.project-tag:hover {
  background: rgba(139, 233, 253, 0.2);
  transform: translateY(-2px);
}

.project-links {
  display: flex;
  gap: 12px;
  margin-top: 1rem;
}

/* --- Animated Section Title --- */
.section-title {
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  width: 50%;
  height: 3px;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, #50fa7b, transparent);
  transition: width 0.4s ease;
}

.section-title:hover::after {
  width: 100%;
}

/* --- Modern Avatar --- */
.modern-avatar {
  position: relative;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(45deg, #50fa7b, #8be9fd, #bd93f9);
  transition: all 0.3s ease;
  cursor: pointer;
}

.modern-avatar img {
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modern-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(80, 250, 123, 0.5);
}

.modern-avatar::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1;
  background: linear-gradient(315deg, #50fa7b, #8be9fd);
  border-radius: 50%;
  animation: spin 5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* --- Contact Form --- */
.modern-form-control {
  position: relative;
  margin-bottom: 1.5rem;
}

.modern-input {
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.modern-input:focus {
  outline: none;
  border-color: #50fa7b;
  box-shadow: 0 0 10px rgba(80, 250, 123, 0.3);
}

.modern-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.modern-input:focus::placeholder {
  opacity: 0;
  transform: translateX(10px);
}

.modern-form-label {
  position: absolute;
  left: 15px;
  top: -10px;
  background: rgba(20, 20, 30, 0.8);
  padding: 0 5px;
  font-size: 0.8rem;
  color: #8be9fd;
  transition: all 0.3s ease;
}

/* --- Floating Social Icons --- */
.social-float {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 20, 30, 0.7);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.social-icon.github:hover {
  background: rgba(80, 250, 123, 0.2);
  border-color: #50fa7b;
  color: #50fa7b;
}

.social-icon.linkedin:hover {
  background: rgba(139, 233, 253, 0.2);
  border-color: #8be9fd;
  color: #8be9fd;
}

.social-icon.twitter:hover {
  background: rgba(189, 147, 249, 0.2);
  border-color: #bd93f9;
  color: #bd93f9;
}

/* --- Loading Animation --- */
.modern-loader {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-top-color: #50fa7b;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

/* --- Scroll Indicator --- */
.scroll-indicator {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #50fa7b, #8be9fd);
  z-index: 1000;
  transition: width 0.1s ease;
}

/* --- Scroll to Top Button --- */
.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  background: rgba(20, 20, 30, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
}

.scroll-top.visible {
  opacity: 1;
  visibility: visible;
}

.scroll-top:hover {
  background: rgba(80, 250, 123, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* --- Tooltip --- */
.modern-tooltip {
  position: relative;
  display: inline-block;
}

.modern-tooltip .tooltip-text {
  visibility: hidden;
  width: auto;
  min-width: 120px;
  background: rgba(20, 20, 30, 0.9);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  white-space: nowrap;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modern-tooltip .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(20, 20, 30, 0.9) transparent transparent transparent;
}

.modern-tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* --- Modern Badge --- */
.modern-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.modern-badge-success {
  background: rgba(80, 250, 123, 0.1);
  color: #50fa7b;
  border: 1px solid rgba(80, 250, 123, 0.3);
}

.modern-badge-info {
  background: rgba(139, 233, 253, 0.1);
  color: #8be9fd;
  border: 1px solid rgba(139, 233, 253, 0.3);
}

.modern-badge-warning {
  background: rgba(255, 184, 108, 0.1);
  color: #ffb86c;
  border: 1px solid rgba(255, 184, 108, 0.3);
}

.modern-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* ===== Timeline Styles ===== */
.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  width: 2px;
  background: linear-gradient(to bottom, rgba(80, 250, 123, 0.2), rgba(189, 147, 249, 0.2));
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 40px;
  box-sizing: border-box;
  margin-bottom: 40px;
}

.timeline-item-left {
  left: 0;
}

.timeline-item-right {
  left: 50%;
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 30px;
  border-radius: 50%;
  background: #50fa7b;
  box-shadow: 0 0 10px rgba(80, 250, 123, 0.6);
  z-index: 1;
}

.timeline-item-left::after {
  right: -8px;
}

.timeline-item-right::after {
  left: -8px;
}

.timeline-content {
  padding: 20px;
  background: rgba(40, 42, 54, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  border: 1px solid rgba(80, 250, 123, 0.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  border-color: rgba(80, 250, 123, 0.4);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(80, 250, 123, 0.15);
}

/* ===== Skill Bar Styles ===== */
.skill-bar-container {
  width: 100%;
  height: 8px;
  background: rgba(40, 42, 54, 0.4);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.skill-bar {
  height: 100%;
  border-radius: 4px;
  width: 0%;
  transition: width 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
}

.skill-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* ===== Social Float Styles ===== */
.social-float {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 90;
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(40, 42, 54, 0.7);
  border: 1px solid rgba(80, 250, 123, 0.2);
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.social-icon:hover {
  transform: translateY(-5px);
}

.social-icon.github:hover {
  color: #50fa7b;
  border-color: #50fa7b;
}

.social-icon.linkedin:hover {
  color: #8be9fd;
  border-color: #8be9fd;
}

.social-icon.twitter:hover {
  color: #bd93f9;
  border-color: #bd93f9;
}

/* ===== Form Styles ===== */
.modern-form-control {
  margin-bottom: 20px;
}

.modern-form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.modern-input {
  width: 100%;
  padding: 10px 14px;
  background: rgba(40, 42, 54, 0.5);
  border: 1px solid rgba(80, 250, 123, 0.15);
  border-radius: 6px;
  color: white;
  font-family: 'Fira Code', monospace;
  transition: all 0.3s ease;
}

.modern-input:focus {
  outline: none;
  border-color: #50fa7b;
  box-shadow: 0 0 10px rgba(80, 250, 123, 0.2);
}

/* ===== Hero Styles ===== */
.modern-avatar {
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(45deg, #50fa7b, #8be9fd, #bd93f9, #50fa7b);
  background-size: 300% 300%;
  animation: gradient-shift 8s ease infinite;
  position: relative;
  overflow: hidden;
}

.modern-avatar::after {
  content: '';
  position: absolute;
  inset: 3px;
  background: rgba(26, 27, 38, 0.8);
  border-radius: 50%;
  z-index: 1;
}

.modern-avatar img {
  border-radius: 50%;
  position: relative;
  z-index: 2;
}

/* Scroll indicator */
.scroll-indicator {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #50fa7b, #8be9fd);
  z-index: 100;
  transition: width 0.1s;
}

/* ===== Media queries for responsive design ===== */
@media (max-width: 768px) {
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 50px;
    padding-right: 15px;
  }
  
  .timeline-item-left,
  .timeline-item-right {
    left: 0;
  }
  
  .timeline-item-left::after,
  .timeline-item-right::after {
    left: 11px;
  }
  
  .social-float {
    flex-direction: row;
    bottom: 20px;
    top: auto;
    right: 50%;
    transform: translateX(50%);
  }
}

++++=== [82] ./src/styles/performance.css ===+++
/* Performance optimization styles for CyberVerse Portfolio */

/* Only pause animations when tab is hidden, don't remove them */
.tab-hidden .animate-matrix,
.tab-hidden .animate-pulse,
.tab-hidden .animate-glow,
.tab-hidden .animate-glitch,
.tab-hidden canvas {
  animation-play-state: paused !important;
}

/* Optimize GPU rendering for animations without affecting visual appearance */
.animate-matrix,
.animate-pulse,
.animate-glow,
.animate-glitch,
canvas {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Reduce motion for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.5s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.5s !important;
    scroll-behavior: auto !important;
  }
  
  /* Still show canvas elements but reduce animation complexity */
  canvas {
    opacity: 0.8 !important;
  }
  
  .particle-container {
    opacity: 0.6 !important;
  }
}

/* Lower-power mode class that can be toggled by the user - less aggressive settings */
.power-save-mode {
  --animation-speed: 0.7;
}

.power-save-mode canvas {
  opacity: 0.7 !important;
}

.power-save-mode .particle-container {
  opacity: 0.6 !important;
}

/* Optimize images while maintaining visibility */
img {
  content-visibility: auto;
}

/* Optimize paint and compositing */
.cyber-card, 
.cyber-button,
.neon-text,
.cyber-terminal {
  contain: content;
}

++++=== [83] ./src/types/components.d.ts ===+++
import { ReactNode } from 'react';

// UI Components
export interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
}

export interface CyberButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: string;
  icon?: string;
  href?: string;
  download?: boolean;
}

export interface CyberCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export interface ExpandableCardProps {
  title: string;
  children?: ReactNode;
  expandedContent?: ReactNode;
  className?: string;
  glowColor?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  links?: {
    github?: string;
    live?: string;
  };
  tags?: string[];
  technologies?: string[];
}

export interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

// Effects Components
export interface ParticleBackgroundProps {
  color?: string;
  density?: number;
  speed?: number;
  className?: string;
}

export interface ScanLineProps {
  color?: string;
  speed?: number;
  opacity?: number;
  className?: string;
}

export interface MatrixRainBackgroundProps {
  intensity?: number;
  speed?: number;
  color?: string;
  fontSize?: number;
  className?: string;
}

// Interactive Components
export interface CyberGlobeProps {
  rotationSpeed?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    label: string;
    size?: number;
    color?: string;
    type?: string;
  }>;
  arcs?: Array<{
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color?: string;
  }>;
  glowIntensity?: number;
  autoRotate?: boolean;
  theme?: 'dark' | 'light';
}

export interface NetworkGraphProps {
  skills: Array<{
    id: string;
    name: string;
    category: string;
    proficiency: number;
    description: string;
    color: string;
  }>;
  enableFiltering?: boolean;
  showLabels?: boolean;
  pulseAnimation?: boolean;
}

export interface CyberTerminalProps {
  initialClearanceLevel?: number;
  welcomeMessage?: string | ReactNode;
  prompt?: string;
  commands?: Record<string, (args: string[]) => string>;
  history?: string[];
  className?: string;
  height?: string;
}

++++=== [84] ./src/types/contact.ts ===+++
export interface ContactData {
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  phone?: string;
  message?: string;
}

++++=== [85] ./src/types/index.ts ===+++
// Define PortableText type for Sanity content
export type PortableText = Array<{
  _key: string;
  _type: string;
  children?: Array<{
    _key: string;
    _type: string;
    marks?: string[];
    text?: string;
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style?: string;
}> | any[];

export interface Profile {
  _id: string;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  longBio: PortableText;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  imageUrl?: string;
  location: { lat: number; lng: number };
  avatar: string;
  resume: { asset: { url: string } };
  resumeUrl?: string;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  socialLinks: {
    platform: string;
    url: string;
    fetchLive?: boolean;
  }[];
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  level?: number;
  description?: string;
  yearsOfExperience?: number;
  projects?: Project[];
  logo?: string;
  color?: string;
  secondaryColor?: string;
}

export interface Project {
  _id: string;
  id?: string;
  title: string;
  description: PortableText | string;
  technologies?: string[];
  technologiesUsed?: Array<{
    name: string;
    icon?: string;
  }>;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  imageUrl?: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  category?: string | { name: string; _id: string };
  categories?: string[];
  tags?: string[];
}

export interface Achievement {
  title: string;
  description: string;
  metric?: string;
}

export interface Experience {
  _id: string;
  company: string;
  jobTitle: string;
  position?: string;
  title?: string;
  logo?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: PortableText | string;
  technologies: string[];
  achievements?: Achievement[];
  responsibilities?: string[];
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  logo?: string;
  startDate: string;
  endDate?: string;
  description?: PortableText | string;
  achievements?: string[];
}

export interface Certification {
  _id: string;
  title: string;
  description?: PortableText;
  dateIssued: string;
  expirationDate?: string;
  credentialId?: string;
  verificationLink?: string;
  certificateImage?: {
    asset: {
      url: string;
    };
  };
  categories?: string[];
  status?: string;
  issuingOrganization: {
    name: string;
    website?: string;
    logo?: {
      asset: {
        url: string;
      };
    };
  };
}

++++=== [86] ./src/types/module-declarations.d.ts ===+++
// Module declarations for component imports

// UI Components
declare module '@/components/ui/GlitchText' {
  import { GlitchTextProps } from '@/types/components';
  const GlitchText: React.FC<GlitchTextProps>;
  export default GlitchText;
}

declare module '@/components/ui/CyberButton' {
  import { CyberButtonProps } from '@/types/components';
  const CyberButton: React.FC<CyberButtonProps>;
  export default CyberButton;
}

declare module '@/components/ui/CyberCard' {
  import { CyberCardProps } from '@/types/components';
  const CyberCard: React.FC<CyberCardProps>;
  export default CyberCard;
}

declare module '@/components/ui/ExpandableCard' {
  import { ExpandableCardProps } from '@/types/components';
  const ExpandableCard: React.FC<ExpandableCardProps>;
  export default ExpandableCard;
}

declare module '@/components/ui/SectionHeading' {
  import { SectionHeadingProps } from '@/types/components';
  const SectionHeading: React.FC<SectionHeadingProps>;
  export default SectionHeading;
}

// Effects Components
declare module '@/components/effects/ParticleBackground' {
  import { ParticleBackgroundProps } from '@/types/components';
  const ParticleBackground: React.FC<ParticleBackgroundProps>;
  export default ParticleBackground;
}

declare module '@/components/effects/ScanLine' {
  import { ScanLineProps } from '@/types/components';
  const ScanLine: React.FC<ScanLineProps>;
  export default ScanLine;
}

declare module '@/components/effects/MatrixRainBackground' {
  import { MatrixRainBackgroundProps } from '@/types/components';
  const MatrixRainBackground: React.FC<MatrixRainBackgroundProps>;
  export default MatrixRainBackground;
}

// Interactive Components
declare module '@/components/interactive/CyberGlobe' {
  import { CyberGlobeProps } from '@/types/components';
  const CyberGlobe: React.FC<CyberGlobeProps>;
  export default CyberGlobe;
}

declare module '@/components/interactive/NetworkGraph' {
  import { NetworkGraphProps } from '@/types/components';
  const NetworkGraph: React.FC<NetworkGraphProps>;
  export default NetworkGraph;
}

declare module '@/components/interactive/CyberTerminal' {
  import { CyberTerminalProps } from '@/types/components';
  const CyberTerminal: React.FC<CyberTerminalProps>;
  export default CyberTerminal;
}

// External Libraries
declare module 'd3-force';

declare module 'react-force-graph-2d' {
  import { Component } from 'react';

  export interface NodeObject {
    id?: string | number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number;
    fy?: number;
    [key: string]: any;
  }

  export interface LinkObject {
    source: string | number | NodeObject;
    target: string | number | NodeObject;
    [key: string]: any;
  }

  export interface GraphData {
    nodes: NodeObject[];
    links: LinkObject[];
  }

  export type NodeCanvasObjectCallback = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) => void;

  export interface ForceGraph2DProps {
    graphData: GraphData;
    width?: number;
    height?: number;
    backgroundColor?: string;
    nodeRelSize?: number;
    nodeId?: string;
    nodeLabel?: string | ((node: NodeObject) => string);
    nodeVal?: string | number | ((node: NodeObject) => number);
    nodeColor?: string | ((node: NodeObject) => string);
    nodeAutoColorBy?: string | ((node: NodeObject) => string);
    nodeCanvasObject?: NodeCanvasObjectCallback;
    linkLabel?: string | ((link: LinkObject) => string);
    linkWidth?: string | number | ((link: LinkObject) => number);
    linkColor?: string | ((link: LinkObject) => string);
    linkAutoColorBy?: string | ((link: LinkObject) => string);
    linkDirectionalArrowLength?: number | ((link: LinkObject) => number);
    linkDirectionalArrowColor?: string | ((link: LinkObject) => string);
    linkDirectionalParticles?: number | ((link: LinkObject) => number);
    linkDirectionalParticleWidth?: number | ((link: LinkObject) => number);
    d3Force?: (key: string, force: any) => void;
    cooldownTicks?: number;
    onNodeClick?: (node: NodeObject, event: MouseEvent) => void;
    onNodeHover?: (node: NodeObject | null, prevNode: NodeObject | null) => void;
    onNodeDrag?: (node: NodeObject, translate: { x: number, y: number }) => void;
    onNodeDragEnd?: (node: NodeObject, translate: { x: number, y: number }) => void;
    onLinkClick?: (link: LinkObject, event: MouseEvent) => void;
    onLinkHover?: (link: LinkObject | null, prevLink: LinkObject | null) => void;
    onEngineStop?: () => void;
    nodeCanvasObjectMode?: string | ((node: NodeObject) => string);
    ref?: any;
  }

  export default class ForceGraph2D extends Component<ForceGraph2DProps> {
    // Add commonly used methods
    d3Force(forceName: string, forceFn?: any): any;
    d3ReheatSimulation(): void;
    centerAt(x?: number, y?: number, ms?: number): void;
    zoom(k?: number, ms?: number): void;
    zoomToFit(ms?: number, padding?: number): void;
    pauseAnimation(): void;
    resumeAnimation(): void;
    refresh(): void;
  }
}

declare module 'd3' {
  // Basic selections
  export function select(selector: string | Element): Selection;
  export function selectAll(selector: string): Selection;
  
  // Scales
  export function scaleOrdinal(): ScaleOrdinal;
  export function scaleLinear(): ScaleLinear;
  
  // Forces
  export function forceSimulation<NodeDatum = any>(nodes?: NodeDatum[]): Simulation<NodeDatum>;
  export function forceLink<NodeDatum = any, LinkDatum = any>(links?: LinkDatum[]): ForceLink<NodeDatum, LinkDatum>;
  export function forceManyBody(): ForceManyBody;
  export function forceCenter(x?: number, y?: number): ForceCenter;
  export function forceCollide(radius?: number): ForceCollide;
  
  // Drag behavior
  export function drag<DragDatum = any, ReferenceDatum = any>(): Drag<DragDatum, ReferenceDatum>;
  
  // Zoom behavior
  export function zoom<ElementDatum = any, ReferenceDatum = any>(): Zoom<ElementDatum, ReferenceDatum>;
  
  // Data join
  export interface Selection {
    data<Datum>(data: Datum[]): Selection;
    data<Datum>(): Datum[];
    join(elementName: string): Selection;
    attr(name: string, value: string | number | ((d: any, i: number) => string | number)): Selection;
    style(name: string, value: string | number | ((d: any, i: number) => string | number)): Selection;
    text(value: string | ((d: any, i: number) => string)): Selection;
    append(elementName: string): Selection;
    on(eventName: string, callback: (event: any, d: any) => void): Selection;
    call(behavior: any, ...args: any[]): Selection;
    select(selector: string): Selection;
    selectAll(selector: string): Selection;
    classed(className: string, add: boolean | ((d: any, i: number) => boolean)): Selection;
    transition(): Selection;
    duration(milliseconds: number): Selection;
    delay(milliseconds: number | ((d: any, i: number) => number)): Selection;
    remove(): Selection;
    html(value: string | ((d: any, i: number) => string)): Selection;
    raise(): Selection;
    lower(): Selection;
    node(): Element;
  }
  
  // Interfaces for forces
  export interface Simulation<NodeDatum> {
    nodes(nodes: NodeDatum[]): Simulation<NodeDatum>;
    force(name: string, force: any): Simulation<NodeDatum>;
    on(eventName: string, callback: (e: any) => void): Simulation<NodeDatum>;
    alpha(value: number): Simulation<NodeDatum>;
    alphaTarget(value: number): Simulation<NodeDatum>;
    restart(): Simulation<NodeDatum>;
    stop(): Simulation<NodeDatum>;
    tick(): Simulation<NodeDatum>;
  }
  
  export interface ForceLink<NodeDatum, LinkDatum> {
    id(callback: (d: NodeDatum, i: number) => string): ForceLink<NodeDatum, LinkDatum>;
    links(links: LinkDatum[]): ForceLink<NodeDatum, LinkDatum>;
    distance(distance: number | ((d: LinkDatum, i: number) => number)): ForceLink<NodeDatum, LinkDatum>;
    strength(strength: number | ((d: LinkDatum, i: number) => number)): ForceLink<NodeDatum, LinkDatum>;
  }
  
  export interface ForceManyBody {
    strength(strength: number | ((d: any, i: number) => number)): ForceManyBody;
  }
  
  export interface ForceCenter {
    x(x: number): ForceCenter;
    y(y: number): ForceCenter;
  }
  
  export interface ForceCollide {
    radius(radius: number | ((d: any, i: number) => number)): ForceCollide;
  }
  
  // Drag behavior
  export interface Drag<DragDatum, ReferenceDatum> {
    on(typenames: string, listener: (event: any, d: any) => void): Drag<DragDatum, ReferenceDatum>;
    subject(subject: (this: any, event: any) => DragDatum): Drag<DragDatum, ReferenceDatum>;
  }
  
  // Zoom behavior
  export interface Zoom<ElementDatum, ReferenceDatum> {
    on(typenames: string, listener: (event: any) => void): Zoom<ElementDatum, ReferenceDatum>;
    scaleExtent(extent: [number, number]): Zoom<ElementDatum, ReferenceDatum>;
    translateExtent(extent: [[number, number], [number, number]]): Zoom<ElementDatum, ReferenceDatum>;
  }
  
  // Scales
  export interface ScaleOrdinal {
    domain(domain: string[]): ScaleOrdinal;
    range(range: any[]): ScaleOrdinal;
    (key: string): any;
  }
  
  export interface ScaleLinear {
    domain(domain: [number, number]): ScaleLinear;
    range(range: [number, number]): ScaleLinear;
    (value: number): number;
  }
}

declare module 'three' {
  export class WebGLRenderer {
    constructor(params: { antialias?: boolean; alpha?: boolean });
    setSize(width: number, height: number): void;
    setPixelRatio(ratio: number): void;
    render(scene: Scene, camera: Camera): void;
    domElement: HTMLCanvasElement;
    setClearColor(color: number | string | Color, alpha?: number): void;
    dispose(): void;
  }

  export class Scene {
    add(object: Object3D): this;
    background: Color | null;
    children: Object3D[];
  }

  export class PerspectiveCamera extends Camera {
    constructor(fov: number, aspect: number, near: number, far: number);
    position: Vector3;
    aspect: number;
    updateProjectionMatrix(): void;
  }

  export class Camera extends Object3D {
    matrixWorldInverse: Matrix4;
    projectionMatrix: Matrix4;
    projectionMatrixInverse: Matrix4;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    add(v: Vector3): this;
    multiplyScalar(scalar: number): this;
    normalize(): this;
    set(x: number, y: number, z: number): this;
    copy(v: Vector3): this;
    clone(): Vector3;
    addVectors(a: Vector3, b: Vector3): this;
  }

  export class Color {
    constructor(color: string | number);
    r: number;
    g: number;
    b: number;
  }

  export class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    children: Object3D[];
    parent: Object3D | null;
    visible: boolean;
    userData: any;
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    rotateX(angle: number): this;
    rotateY(angle: number): this;
    rotateZ(angle: number): this;
  }

  export class Group extends Object3D {
    constructor();
  }

  export class Mesh extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material | Material[]);
    geometry: BufferGeometry;
    material: Material | Material[];
    userData: any;
  }

  export class Line extends Object3D {
    constructor(geometry?: BufferGeometry, material?: Material);
    geometry: BufferGeometry;
    material: Material;
  }

  export class BoxGeometry extends BufferGeometry {
    constructor(width?: number, height?: number, depth?: number);
  }

  export class SphereGeometry extends BufferGeometry {
    constructor(radius?: number, widthSegments?: number, heightSegments?: number);
  }

  export class BufferGeometry {
    constructor();
    setAttribute(name: string, attribute: BufferAttribute): this;
    setFromPoints(points: Vector3[]): this;
  }

  export class BufferAttribute {
    constructor(array: Float32Array | Uint16Array | Uint32Array, itemSize: number, normalized?: boolean);
  }

  export class Material {
    transparent: boolean;
    opacity: number;
    side: Side;
    visible: boolean;
  }

  export class MeshBasicMaterial extends Material {
    constructor(parameters?: { color?: number | string | Color; wireframe?: boolean; map?: Texture; transparent?: boolean; opacity?: number });
    color: Color;
  }

  export class LineBasicMaterial extends Material {
    constructor(parameters?: { color?: number | string | Color; linewidth?: number; transparent?: boolean; opacity?: number });
    color: Color;
  }

  export class MeshStandardMaterial extends Material {
    constructor(parameters?: { color?: number | string | Color; emissive?: number | string | Color; roughness?: number; metalness?: number });
  }

  export class ShaderMaterial extends Material {
    constructor(parameters?: { 
      uniforms?: { [uniform: string]: { value: any } }; 
      vertexShader?: string; 
      fragmentShader?: string; 
      transparent?: boolean; 
      blending?: number;
    });
    uniforms: { [uniform: string]: { value: any } };
  }

  export class AmbientLight extends Light {
    constructor(color?: Color | string | number, intensity?: number);
  }

  export class DirectionalLight extends Light {
    constructor(color?: Color | string | number, intensity?: number);
    position: Vector3;
  }

  export class Light extends Object3D {
    color: Color;
    intensity: number;
  }

  export class Euler {
    constructor(x?: number, y?: number, z?: number, order?: string);
    x: number;
    y: number;
    z: number;
  }

  export class Matrix4 {
    elements: number[];
  }

  export class Texture {
    constructor();
  }

  export enum Side { FrontSide, BackSide, DoubleSide }
  export const AdditiveBlending: number;
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, Vector3 } from 'three';

  export class OrbitControls {
    constructor(camera: Camera, domElement: HTMLElement);
    update(): boolean;
    addEventListener(type: string, listener: (event: any) => void): void;
    removeEventListener(type: string, listener: (event: any) => void): void;
    enabled: boolean;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    autoRotate: boolean;
    autoRotateSpeed: number;
    target: Vector3;
    dispose(): void;
  }
}

declare module 'qrcode.react';

// Additional global type declarations
interface Window {
  // Add any window extensions here if needed
}

++++=== [87] ./src/types/schema.d.ts ===+++
// Sanity Schema Types

export interface SanityAsset {
  _id: string;
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
    };
  };
}

export interface SanityImage {
  asset: {
    url: string;
  };
}

// Generic Portable Text type to handle rich text from Sanity
export interface PortableTextBlock {
  _key?: string;
  _type: string;
  children?: Array<{
    _key?: string;
    _type?: string;
    marks?: string[];
    text?: string;
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    [key: string]: any;
  }>;
  style?: string;
}

export type PortableText = PortableTextBlock[];

export interface Profile {
  _id: string;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  longBio: PortableText;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  location: { lat: number; lng: number };
  avatar?: SanityImage;
  resume?: {
    asset: {
      url: string;
    };
  };
  phone?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: PortableText;
  imageUrl: SanityImage;
  category: string;
  technologies: string[];
  technologiesUsed: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  tags: string[];
  publishedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  proficiency: number;
  iconUrl: SanityImage;
  yearsOfExperience?: number;
}

export interface Certification {
  _id: string;
  title: string;
  issuingOrganization: string;
  organization: {
    name: string;
    website?: string;
    logo?: SanityImage;
  };
  issueDate: string;
  dateIssued: string;
  expiryDate?: string;
  credentialID?: string;
  badgeUrl: SanityImage | string;
  certificateURL?: string;
  skills?: string[];
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: PortableText;
  technologies?: string[];
  achievements?: string[];
  logo?: SanityImage;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  activities?: string[];
  logo?: SanityImage;
}

export interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  text: string;
  avatar?: SanityImage;
  rating?: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // This would be Portable Text
  mainImage: SanityImage;
  categories: string[];
  tags: string[];
  publishedAt: string;
  readTime?: number;
}

++++=== [88] ./src/types/schema.ts ===+++
// TypeScript schema definitions for Sanity
import type { PortableText } from './index';

// Define the Sanity Image type to handle image assets
export interface SanityImage {
  asset: {
    _id?: string;
    url?: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Schema specific types that aren't exported in the main index
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface SanityReference {
  _ref: string;
  _type: 'reference';
}

export interface SanitySlug {
  current: string;
  _type: 'slug';
}

export interface SanityBlock {
  _key: string;
  _type: 'block';
  children: {
    _key: string;
    _type: 'span';
    text: string;
    marks: string[];
  }[];
  markDefs: {
    _key: string;
    _type: string;
    href?: string;
  }[];
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
}

export interface SanityAsset {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Additional schema types that might be needed based on your page.tsx
export interface CyberDefenseConnection {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

export interface CyberThreatLocation {
  lat: number;
  lng: number;
  label: string;
  size: number;
  color: string;
  type: string;
}

++++=== [89] ./src/types.ts ===+++
export interface Category {
  _id: string;
  name: string;
  description: string;
  slug?: { current: string };
}

export interface Profile {
  name: string;
  shortBio: string;
  longBio?: any[];
  location?: { lat: number; lng: number };
  profileImage?: { asset: { url: string } };
  socialLinks?: { platform: string; url: string; fetchLive?: boolean }[];
  email?: string;
  phone?: string;
  contactInstructions?: string;
  resume?: { asset: { url: string } };
  videoIntro?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface Project {
  _id: string;
  title: string;
  description?: { children: { text: string }[] }[];
  thumbnail?: { asset: { url: string } };
  technologies?: string[];
  categories?: { _id: string; name: string }[];
  githubLink?: string;
  demoLink?: string;
  docsLink?: string;
  additionalLinks?: string[];
  startDate?: string;
  endDate?: string;
  hoverMedia?: {
    type: 'image' | 'video' | 'gif';
    url: string;
  };
  metadata?: {
    isFeatured: boolean;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    status: 'completed' | 'in-progress' | 'planned';
  };
}

export interface Certification {
  _id: string;
  title: string;
  issuingOrganization: { 
    name: string;
    website?: string;
    logo?: { asset: { url: string } };
  };
  dateIssued: string;
  expirationDate?: string;
  verificationLink?: string;
  certificateImage?: { asset: { url: string }; alt: string };
  description?: any[];
  categories?: { _id: string; name: string }[];
  status?: 'active' | 'expired' | 'pending';
}

export interface Skill {
  _id: string;
  name: string;
  proficiency: number;
  category?: string;
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  relatedProjects?: { _id: string; title: string }[];
}

export interface Experience {
  _id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: any[];
  achievements?: Achievement[];
  isCurrent?: boolean;
  technologies?: string[];
}

export interface Achievement {
  _id?: string;
  title: string;
  description?: string;
  date?: string;
  metrics?: { name: string; value: string }[];
  evidence?: { type: string; url: string }[];
}

export interface Education {
  _id: string;
  degree: string;
  institution: {
    name: string;
    location?: string;
    logo?: { asset: { url: string } };
  };
  startDate: string;
  endDate?: string;
  fieldOfStudy?: string;
  description?: any[];
  achievements?: Achievement[];
  gpa?: number;
}

export interface CyberResource {
  _id: string;
  title: string;
  type: 'article' | 'tutorial' | 'tool' | 'course' | 'cheatsheet' | 'book' | 'guide';
  description: string;
  url?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  author?: string;
  dateAdded?: string;
  featured?: boolean;
}

export interface CyberRole {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  careerLevel: string;
  keySkills: string[];
  responsibilities: string[];
  recommendedCertifications: string[];
  salaryRange: string;
  growthOutlook: string;
  careerProgression: string;
  tools: string[];
  careerPath: string[];
  salaryRangeObj?: { min: number; max: number; currency: string };
}

export interface ThemeMode {
  name: 'dark' | 'light' | 'recruiter';
  isActive: boolean;
}

export interface FloatingContact {
  isVisible: boolean;
  isExpanded: boolean;
  socialLinks: { platform: string; url: string }[];
  email?: string;
  phone?: string;
  message?: string;
}

export interface CyberPulseDashboard {
  currentTime: string;
  securityScore: number;
  vulnerabilities: Vulnerability[];
  recentAttacks: Attack[];
  systemStatus: SystemStatus[];
  securityTips: string[];
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  threatLevelDescription?: string;
  activeIncidents: SecurityIncident[];
  globalThreatMap: ThreatData[];
  vulnerabilityTrends: VulnerabilityTrend[];
  securityNewsFeed: SecurityNewsItem[];
  securityTools: SecurityTool[];
  patches: {
    applied: number;
    available: number;
    critical?: number;
    pending?: number;
  };
  networkTraffic?: string;
}

// Missing base interfaces
export interface Vulnerability {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  affectedSystem: string;
  status: 'open' | 'in_progress' | 'resolved';
  discoveredDate: string;
  description: string;
}

export interface Attack {
  id: string;
  type: string;
  source: string;
  target: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'ongoing' | 'blocked' | 'investigating';
  description: string;
}

export interface SystemStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning' | 'critical';
  lastChecked: string;
  metrics: {
    cpu?: number;
    memory?: number;
    disk?: number;
    network?: number;
    uptime?: string;
    load?: string;
  };
}

// New interfaces for the cybersecurity dashboard

export interface ThreatData {
  id: string;
  latitude: number;
  longitude: number;
  country: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  count: number;
  isAttacking: boolean;
}

export interface SecurityNewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  url?: string;
  tags?: string[];
}

export interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: string;
  assignedTo?: string;
  affectedSystems?: string[];
}

export interface VulnerabilityTrend {
  month: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface SecurityTool {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'inactive' | 'warning' | 'error';
  lastUpdated: string;
  icon?: string;
}
++++=== [90] ./tailwind.config.js ===+++
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,css}',
  ],
  safelist: [
    'bg-dark-base',
    'bg-dark-secondary',
    'bg-dark-tertiary',
    'bg-neon-green',
    'bg-cyber-blue',
    'bg-neon-purple',
    'bg-neon-red',
    'bg-neon-orange',
    'bg-neon-yellow',
    'bg-neon-pink',
    'bg-cyber-gray',
    'bg-cyber-black',
    'bg-black',
    'bg-gray-900',
    'bg-gray-800',
    'text-neon-green',
    'text-cyber-blue',
    'text-neon-purple',
    'text-neon-red',
    'text-neon-orange',
    'text-neon-yellow',
    'text-cyber-gray',
    'text-white',
    'border-neon-green',
    'border-cyber-blue',
    'border-neon-purple',
    'border-neon-red',
    'hover:bg-neon-green/10',
    'hover:border-neon-green',
    'hover:text-neon-green',
    'hover:shadow-glow-green',
    'shadow-glow-green',
    'shadow-glow-blue',
    'shadow-glow-purple',
    'animate-matrix-rain',
    'animate-glow-pulse',
    'animate-glitch',
    'animate-scan-line',
    'animate-terminal-cursor',
    'animate-float',
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-12',
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-6',
    'col-span-8',
    'col-span-12',
    'cyber-interactive',
    'cyber-glow-green',
    'cyber-glow-blue',
    'cyber-glow-purple',
    'cyber-card',
    'cyber-button',
    'cyber-terminal',
    'cyber-section',
    'font-cyber',
    'font-terminal',
  ],
  theme: {
    extend: {
      colors: {
        'dark-base': '#1a1b26',
        'dark-secondary': '#282a36',
        'dark-tertiary': '#44475a',
        'neon-green': '#50fa7b',
        'cyber-blue': '#8be9fd',
        'neon-purple': '#bd93f9',
        'neon-pink': '#FF00FF',
        'neon-yellow': '#f1fa8c',
        'neon-orange': '#ffb86c',
        'neon-red': '#ff5555',
        'terminal-green': '#0F0',
        'matrix-green': '#00FF41',
        'cyber-black': '#0D0D0D',
        'cyber-white': '#F0F0F0',
        'cyber-gray': '#6272a4',
        'error-red': '#ff5555',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'cyber': ['Share Tech Mono', 'monospace'],
        'terminal': ['Fira Code', 'monospace'],
      },
      animation: {
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'scan-line': 'scan-line 2s linear infinite',
        'terminal-cursor': 'terminal-cursor 1s step-end infinite',
        'float': 'float 3s ease-in-out infinite',
        'security-scan': 'security-scan 4s linear infinite',
        'node-pulse': 'node-pulse 2s infinite',
        'holographic': 'holographic-shift 6s linear infinite',
        'neon-border': 'neon-border 2s infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'matrix': 'matrix 20s linear infinite',
        'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
        'scan': 'scan 4s linear infinite',
        'glitch': 'glitch 3s infinite',
        'rotate-slow': 'rotate 10s linear infinite',
        'pulse-lite': 'pulse-lite 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-lite': 'glow-lite 3s ease-in-out infinite alternate',
        'matrix-lite': 'matrix-lite 30s linear infinite',
        'glitch-lite': 'glitch-lite 5s infinite',
      },
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.8, boxShadow: '0 0 5px rgba(80, 250, 123, 0.5)' },
          '50%': { opacity: 1, boxShadow: '0 0 15px rgba(80, 250, 123, 0.8)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'terminal-cursor': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'security-scan': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 0 },
          '10%': { opacity: 0.8 },
          '90%': { opacity: 0.8 },
          '100%': { transform: 'translateY(100%) scale(0.8)', opacity: 0 },
        },
        'node-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.8 },
        },
        'holographic-shift': {
          '0%': { filter: 'hue-rotate(0deg) brightness(1)' },
          '25%': { filter: 'hue-rotate(45deg) brightness(1.1)' },
          '50%': { filter: 'hue-rotate(90deg) brightness(1)' },
          '75%': { filter: 'hue-rotate(135deg) brightness(1.1)' },
          '100%': { filter: 'hue-rotate(180deg) brightness(1)' },
        },
        'neon-border': {
          '0%': { boxShadow: '0 0 5px #50fa7b, 0 0 10px #50fa7b, 0 0 15px #50fa7b, 0 0 20px #50fa7b' },
          '100%': { boxShadow: '0 0 10px #8be9fd, 0 0 20px #8be9fd, 0 0 30px #8be9fd, 0 0 40px #8be9fd' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px #50fa7b, 0 0 20px #50fa7b' },
          '100%': { textShadow: '0 0 5px #50fa7b, 0 0 10px #50fa7b, 0 0 15px #50fa7b' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#50fa7b' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-5px)' },
          '40%': { transform: 'translateX(5px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        'pulse-lite': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '0.4' },
        },
        'glow-lite': {
          '0%': { textShadow: '0 0 5px #50fa7b' },
          '100%': { textShadow: '0 0 8px #50fa7b' },
        },
        'matrix-lite': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'glitch-lite': {
          '0%, 100%': { transform: 'translateX(0)' },
          '33%': { transform: 'translateX(-3px)' },
          '66%': { transform: 'translateX(3px)' },
        },
      },
      boxShadow: {
        'glow-green': '0 0 5px rgba(80, 250, 123, 0.7), 0 0 10px rgba(80, 250, 123, 0.4)',
        'glow-blue': '0 0 5px rgba(139, 233, 253, 0.7), 0 0 10px rgba(139, 233, 253, 0.4)',
        'glow-purple': '0 0 5px rgba(189, 147, 249, 0.7), 0 0 10px rgba(189, 147, 249, 0.4)',
        'glow-red': '0 0 5px rgba(255, 85, 85, 0.7), 0 0 10px rgba(255, 85, 85, 0.4)',
        'cyber-card': '0 4px 6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(80, 250, 123, 0.1)',
        'cyber-terminal': '0 0 0 1px rgba(139, 233, 253, 0.2), inset 0 0 10px rgba(139, 233, 253, 0.1)',
        'neon-green': '0 0 5px #50fa7b, 0 0 10px #50fa7b',
        'neon-blue': '0 0 5px #8be9fd, 0 0 10px #8be9fd',
        'neon-purple': '0 0 5px #bd93f9, 0 0 10px #bd93f9',
      },
      textShadow: {
        'neon-green': '0 0 5px #50fa7b, 0 0 10px #50fa7b',
        'neon-blue': '0 0 5px #8be9fd, 0 0 10px #8be9fd',
        'neon-purple': '0 0 5px #bd93f9, 0 0 10px #bd93f9',
        'neon-green-lite': '0 0 5px #50fa7b',
        'neon-blue-lite': '0 0 5px #8be9fd',
        'neon-purple-lite': '0 0 5px #bd93f9',
      },
      backgroundImage: {
        'cyber-grid': "url('/images/cyber-grid.svg')",
        'matrix-rain': "url('/images/matrix-rain.png')",
        'cyber-pattern': "linear-gradient(to right, rgba(40, 42, 54, 0.8), rgba(40, 42, 54, 0.8)), url('/images/cyber-pattern.svg')",
        'gradient-neon': 'linear-gradient(45deg, #50fa7b, #8be9fd)',
        'cyber-grid': 'linear-gradient(rgba(80, 250, 123, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(80, 250, 123, 0.1) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(circle at center, rgba(80, 250, 123, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
      },
      backgroundSize: {
        'cyber-grid-sm': '20px 20px',
        'cyber-grid-md': '40px 40px',
        'cyber-grid-lg': '60px 60px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-neon-green': {
          textShadow: '0 0 5px #50fa7b, 0 0 10px #50fa7b',
        },
        '.text-shadow-neon-blue': {
          textShadow: '0 0 5px #8be9fd, 0 0 10px #8be9fd',
        },
        '.text-shadow-neon-purple': {
          textShadow: '0 0 5px #bd93f9, 0 0 10px #bd93f9',
        },
        '.text-shadow-neon-green-lite': {
          textShadow: '0 0 5px #50fa7b',
        },
        '.text-shadow-neon-blue-lite': {
          textShadow: '0 0 5px #8be9fd',
        },
        '.text-shadow-neon-purple-lite': {
          textShadow: '0 0 5px #bd93f9',
        },
        '.text-gradient-neon': {
          background: 'linear-gradient(45deg, #50fa7b, #8be9fd)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.cyber-grid-bg': {
          backgroundImage: 'linear-gradient(to right, #282a36 1px, transparent 1px), linear-gradient(to bottom, #282a36 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundPosition: 'center center',
        },
        '.gpu-accelerated': {
          'will-change': 'transform',
          'transform': 'translateZ(0)',
          'backface-visibility': 'hidden',
        },
        '.content-optimized': {
          'content-visibility': 'auto',
          'contain': 'content',
        },
      };
      
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
