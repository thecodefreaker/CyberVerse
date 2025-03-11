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
