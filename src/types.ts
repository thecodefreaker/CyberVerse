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