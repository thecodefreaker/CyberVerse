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
