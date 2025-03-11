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
