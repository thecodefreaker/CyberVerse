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
