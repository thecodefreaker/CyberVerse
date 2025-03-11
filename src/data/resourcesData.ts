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
