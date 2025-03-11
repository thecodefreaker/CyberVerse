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
