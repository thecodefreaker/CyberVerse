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
