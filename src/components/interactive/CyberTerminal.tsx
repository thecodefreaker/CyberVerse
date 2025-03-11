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
