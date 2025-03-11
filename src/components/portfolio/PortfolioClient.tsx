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
