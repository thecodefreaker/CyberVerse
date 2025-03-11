'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaShieldAlt, FaLaptopCode, FaNetworkWired, FaLock, FaServer, FaBug } from 'react-icons/fa';
import { GiCircuitry } from 'react-icons/gi';
import { MdSecurity } from 'react-icons/md';
import { CyberCard, CyberButton, GlitchText, ExpandableCard, SectionHeading, ProjectCard } from '../components/ui';
import ScanLine from '../components/effects/ScanLine';
import MatrixRainBackground from '../components/effects/MatrixRainBackground';
import ParticleBackground from '../components/effects/ParticleBackground';
import { extractPortableText, SimplePortableText } from '../lib/portableTextUtils';
import Layout from '../components/layout/Layout';
import CyberTerminal from '../components/interactive/CyberTerminal';
import NetworkGraph from '../components/interactive/NetworkGraph';
import CyberPulseDashboard from '../components/dashboard/CyberPulseDashboard';
import FloatingContact from '../components/common/FloatingContact';
import { client } from '../lib/sanity';
import { Profile, Project, Certification, Skill, SanityImage } from '../types/schema';
import { dashboardData } from '../data/dashboardData';

// Dynamic imports for performance optimization
const CyberGlobe = dynamic(() => import('../components/interactive/CyberGlobe'), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] bg-dark-secondary rounded-lg animate-pulse"></div>
});

// Mock contact data - replace with real data later
const contactData = {
  githubUrl: 'https://github.com/hardikethicalhacker',
  linkedinUrl: 'https://linkedin.com/in/hardikethicalhacker',
  email: 'contact@hardiketh.com'
};

// Data for cyber globe interactions
const cyberThreatLocations = [
  { lat: 37.7749, lng: -122.4194, label: "San Francisco", size: 0.5, color: "#8be9fd", type: "Data Breach" },
  { lat: 40.7128, lng: -74.0060, label: "New York", size: 0.7, color: "#bd93f9", type: "Ransomware" },
  { lat: 51.5074, lng: -0.1278, label: "London", size: 0.6, color: "#ff5555", type: "DDoS Attack" },
  { lat: 28.7041, lng: 77.1025, label: "Delhi", size: 0.8, color: "#50fa7b", type: "Phishing Campaign" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", size: 0.5, color: "#ffb86c", type: "Social Engineering" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo", size: 0.6, color: "#ff79c6", type: "APT Attack" },
  { lat: 55.7558, lng: 37.6173, label: "Moscow", size: 0.7, color: "#ff5555", type: "Zero-day Exploit" },
];

const cyberDefenseConnections = [
  { startLat: 37.7749, startLng: -122.4194, endLat: 28.7041, endLng: 77.1025, color: "#50fa7b" },
  { startLat: 28.7041, startLng: 77.1025, endLat: 51.5074, endLng: -0.1278, color: "#8be9fd" },
  { startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.0060, color: "#bd93f9" },
  { startLat: 40.7128, startLng: -74.0060, endLat: -33.8688, endLng: 151.2093, color: "#ff79c6" },
  { startLat: -33.8688, startLng: 151.2093, endLat: 35.6762, endLng: 139.6503, color: "#ffb86c" },
];

// Helper function to get image URL from Sanity image object
const getSanityImageUrl = (image: SanityImage | string): string => {
  if (typeof image === 'string') return image;
  return image?.asset?.url || '';
};

export default function Home() {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  // States for various schema data
  const [profile, setProfile] = useState<Profile | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showRecentVulnerabilities, setShowRecentVulnerabilities] = useState(false);
  const [latestCVEs, setLatestCVEs] = useState<any[]>([]);

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      // Fetch profile
      const profileQuery = '*[_type == "profile"][0]{ name, title, shortBio, longBio, avatar, socialLinks, githubUrl, linkedinUrl, email }';
      const profileData = await client.fetch<Profile>(profileQuery);
      setProfile(profileData);

      // Fetch featured projects with detailed structure
      const projectQuery = `*[_type == "project" && metadata.isFeatured == true]{
        _id, 
        title, 
        description, 
        thumbnail, 
        "imageUrl": thumbnail.asset->url, 
        tags, 
        githubUrl, 
        liveUrl, 
        category,
        technologiesUsed[]->{ name, "icon": icon.asset->url }
      }`;
      const projectData = await client.fetch<Project[]>(projectQuery);
      setFeaturedProjects(projectData);

      // Fetch certifications
      const certQuery = '*[_type == "certification"]{ _id, title, issuingOrganization, dateIssued, certificateURL, "badgeUrl": badge.asset->url }';
      const certData = await client.fetch<Certification[]>(certQuery);
      setCertifications(certData);

      // Fetch top skills
      const skillQuery = '*[_type == "skill"]{ _id, name, proficiency, category, "iconUrl": icon.asset->url } | order(proficiency desc)[0...12]';
      const skillData = await client.fetch<Skill[]>(skillQuery);
      setSkills(skillData);
    };

    fetchData().catch(console.error);
  }, []);

  // Fetch latest CVE data
  useEffect(() => {
    if (showRecentVulnerabilities) {
      const fetchCVEs = async () => {
        try {
          // This would typically be an API call to a CVE database or use a CORS proxy
          // For demo purposes, we'll use a simulated response
          const response = await fetch('/api/latest-cves');
          const data = await response.json();
          setLatestCVEs(data.slice(0, 5)); // Show top 5 vulnerabilities
        } catch (error) {
          console.error("Failed to fetch CVE data:", error);
          // Fallback to mock data
          setLatestCVEs([
            { id: "CVE-2025-1234", severity: "high", description: "Remote code execution in popular web framework" },
            { id: "CVE-2025-5678", severity: "critical", description: "Authentication bypass in cloud service" },
            { id: "CVE-2025-9012", severity: "medium", description: "SQL injection vulnerability in database driver" }
          ]);
        }
      };
      fetchCVEs();
    }
  }, [showRecentVulnerabilities]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <Layout>
      <main className="min-h-screen bg-dark-base overflow-hidden relative">
        {/* Global effects */}
        <ParticleBackground />
        <ScanLine />
        
        {/* Hero section */}
        <motion.div 
          className="h-screen relative overflow-hidden flex items-center"
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ 
            opacity: heroOpacity,
            scale: heroScale 
          }}
        >
          {/* Matrix Rain Background Effect */}
          <div className="absolute inset-0 z-0">
            <MatrixRainBackground 
              density={0.8}
              speed={1.2}
              color="#50fa7b"
              glowIntensity={0.8}
              className="opacity-20"
            />
          </div>
          
          {/* Scan Line Effect */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <ScanLine 
              color="rgba(80, 250, 123, 0.3)" 
              speed="fast"
              glow={true}
              flicker={true}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div 
                className="w-full md:w-7/12"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="mb-4">
                  <div className="inline-flex items-center bg-dark-secondary/60 backdrop-blur-sm py-1 px-3 rounded-md border border-neon-green/30">
                    <span className="text-lg text-cyber-blue font-terminal mb-0 inline-block">
                      <span className="inline-block mr-2 text-neon-green">~$</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        sys.out.introduce()
                      </motion.span>
                    </span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-cyber mb-4 text-white drop-shadow-[0_0_5px_rgba(80,250,123,0.5)]">
                  <GlitchText intensity={0.3} speed={1.5}>HARDIK SRIVASTAVA</GlitchText>
                </h1>
                
                <div className="bg-dark-secondary/40 backdrop-blur-sm border-l-4 border-neon-green p-2 mb-6">
                  <h2 className="text-xl md:text-2xl font-terminal text-neon-green">
                    <span className="text-cyber-blue">{"{"}</span> Ethical Hacker <span className="text-cyber-blue">|</span> Cybersecurity Innovator <span className="text-cyber-blue">{"}"}</span>
                  </h2>
                </div>
                
                <div className="bg-dark-base/70 backdrop-blur-sm p-4 border border-dark-tertiary rounded-md shadow-[0_0_15px_rgba(80,250,123,0.1)] mb-8">
                  <p className="text-lg text-gray-300 font-terminal leading-relaxed max-w-2xl">
                    {profile?.shortBio || "Exposing vulnerabilities so they can be fixed before they're exploited. Cybersecurity professional specializing in penetration testing, secure coding practices, and vulnerability assessments."}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <CyberButton 
                    onClick={() => setIsTerminalOpen(true)}
                    type="primary"
                    icon="terminal"
                  >
                    Access Terminal
                  </CyberButton>
                  
                  <CyberButton 
                    href="/portfolio"
                    type="secondary"
                    icon="shield"
                  >
                    View Portfolio
                  </CyberButton>
                  
                  <CyberButton 
                    href="/files/hardik-srivastava.vcf"
                    download
                    type="outline"
                    icon="download"
                  >
                    Download vCard
                  </CyberButton>
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full md:w-5/12 flex justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -inset-4 border border-neon-green/30 rounded-lg"></div>
                  <div className="absolute -inset-6 border border-neon-blue/20 rounded-lg"></div>
                  
                  {/* Interactive dashboard or terminal */}
                  <div className="w-full max-w-md bg-dark-secondary/80 backdrop-blur-md p-4 border border-neon-green/30 rounded-md shadow-[0_0_30px_rgba(80,250,123,0.15)]">
                    <div className="flex items-center justify-between mb-4 border-b border-dark-tertiary pb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-neon-red mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-cyber-orange mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-neon-green"></div>
                      </div>
                      <div className="font-terminal text-sm text-cyber-blue">cybersecurity@matrix:~</div>
                    </div>
                    <div className="font-terminal text-sm space-y-2">
                      <div className="flex items-start">
                        <span className="text-neon-green mr-2">$</span>
                        <span className="text-gray-300">scanning_perimeter --target=global --mode=defensive</span>
                      </div>
                      <div className="text-gray-400 pl-4">
                        <div className="animate-pulse">Analyzing network traffic patterns...</div>
                        <div className="mt-1">Potential threats identified: <span className="text-neon-red">12</span></div>
                        <div className="mt-1">Active monitoring engaged</div>
                      </div>
                      <div className="flex items-start mt-2">
                        <span className="text-neon-green mr-2">$</span>
                        <span className="text-gray-300">deploy_countermeasures --auto</span>
                      </div>
                      <div className="text-gray-400 pl-4">
                        <div>Firewall rules updated</div>
                        <div>IDS signatures refreshed</div>
                        <div className="text-neon-green">System secured</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
            
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-cyber-blue font-terminal text-sm mb-2">SCROLL DOWN</span>
            <motion.div 
              className="w-6 h-10 border-2 border-cyber-blue rounded-full flex justify-center p-1"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-1 h-2 bg-neon-green rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* About section with profile */}
        <section className="py-24 bg-dark-secondary relative">
          <div className="container mx-auto px-4">
            <SectionHeading>About Me</SectionHeading>
            
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <motion.div 
                className="w-full lg:w-1/3 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {profile?.avatar ? (
                    <div className="cyber-frame w-full h-full">
                      <Image 
                        src={getSanityImageUrl(profile.avatar)} 
                        alt={profile.name || "Hardik Srivastava"}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="cyber-frame w-full h-full bg-dark-tertiary flex items-center justify-center">
                      <span className="text-neon-green text-6xl">HS</span>
                    </div>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-2/3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-cyber text-neon-green mb-4">
                  <span className="text-cyber-blue">[</span> Background <span className="text-cyber-blue">]</span>
                </h3>
                
                <div className="font-terminal text-gray-300 space-y-4">
                  <SimplePortableText value={extractPortableText(profile?.longBio, "I'm a cybersecurity professional with expertise in ethical hacking, penetration testing, and security research. My journey in cybersecurity began with a fascination for understanding how systems can be secured against increasingly sophisticated threats.")} />
                  
                  <p>With specialized training in identifying vulnerabilities and implementing robust security measures, I help organizations fortify their digital infrastructure against potential cyber attacks.</p>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CyberCard title="Expertise">
                    <ul className="list-disc pl-5 font-terminal text-gray-300 space-y-1">
                      <li>Network Penetration Testing</li>
                      <li>Web Application Security</li>
                      <li>Vulnerability Assessment</li>
                      <li>Security Awareness Training</li>
                    </ul>
                  </CyberCard>
                  
                  <CyberCard title="Approach">
                    <ul className="list-disc pl-5 font-terminal text-gray-300 space-y-1">
                      <li>Proactive Security Mindset</li>
                      <li>Continuous Learning</li>
                      <li>Ethical Practice</li>
                      <li>Clear Communication</li>
                    </ul>
                  </CyberCard>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured projects section */}
        <section className="py-24 cyber-grid-bg relative">
          <div className="container mx-auto px-4">
            <SectionHeading>Featured Projects</SectionHeading>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {featuredProjects.map(project => (
                <motion.div key={project._id} variants={itemVariants}>
                  <ProjectCard 
                    title={project.title}
                    description={project.description}
                    imageUrl={getSanityImageUrl(project.imageUrl)}
                    category={project.category}
                    links={{
                      github: project.githubUrl,
                      live: project.liveUrl
                    }}
                    technologies={project.technologiesUsed || []}
                  />
                </motion.div>
              ))}
              
              {featuredProjects.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <motion.div 
                    className="inline-block"
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="text-lg font-terminal text-cyber-blue">Loading projects...</span>
                  </motion.div>
                </div>
              )}
            </motion.div>
            
            <div className="mt-12 text-center">
              <CyberButton 
                href="/portfolio#projects"
                type="secondary"
                icon="grid"
              >
                View All Projects
              </CyberButton>
            </div>
          </div>
        </section>
        
        {/* Skills section */}
        <section className="py-24 bg-dark-secondary relative">
          <div className="container mx-auto px-4">
            <SectionHeading>Technical Arsenal</SectionHeading>
            
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="col-span-full mb-8"
                variants={itemVariants}
              >
                <div className="p-6 bg-dark-tertiary border border-cyber-blue rounded-lg h-[400px] overflow-hidden">
                  <h3 className="text-xl font-cyber text-white mb-4 text-center">Skill Network Visualization</h3>
                  {useMemo(() => (
                    <NetworkGraph 
                      skills={skills.map(skill => ({
                        id: skill._id,
                        name: skill.name,
                        category: skill.category || 'General',
                        proficiency: skill.proficiency,
                        description: skill.description || '',
                        color: skill.category === 'Cybersecurity' ? '#50fa7b' :
                               skill.category === 'Programming' ? '#8be9fd' :
                               skill.category === 'Tools' ? '#bd93f9' : 
                               '#ffb86c'
                      }))}
                    />
                  ), [skills])}
                </div>
              </motion.div>
              {skills.map(skill => (
                <motion.div key={skill._id} variants={itemVariants}>
                  <div className="p-4 bg-dark-tertiary border border-cyber-blue rounded-md h-full flex flex-col items-center text-center hover:border-neon-green transition-colors duration-300">
                    {skill.iconUrl ? (
                      <Image 
                        src={getSanityImageUrl(skill.iconUrl)} 
                        alt={skill.name} 
                        width={48} 
                        height={48} 
                        className="mb-3"
                      />
                    ) : (
                      <div className="w-12 h-12 mb-3 bg-dark-base rounded-full flex items-center justify-center">
                        <span className="text-neon-green text-xl">{skill.name.charAt(0)}</span>
                      </div>
                    )}
                    
                    <h3 className="text-sm font-cyber text-white mb-2">{skill.name}</h3>
                    
                    <div className="mt-auto">
                      <div className="w-full bg-dark-base h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-neon-green"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      <span className="text-xs font-terminal text-cyber-blue mt-1">
                        {`${skill.proficiency}%`}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-12 text-center">
              <CyberButton 
                href="/portfolio#skills"
                type="secondary"
                icon="chip"
              >
                View Skill Network
              </CyberButton>
            </div>
          </div>
        </section>
        
        {/* Certifications section */}
        <section className="py-24 cyber-grid-bg relative">
          <div className="container mx-auto px-4">
            <SectionHeading>Certifications</SectionHeading>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {certifications.slice(0, 3).map(cert => (
                <motion.div key={cert._id} variants={itemVariants}>
                  <div className="bg-dark-tertiary border border-cyber-blue rounded-lg overflow-hidden h-full hover:border-neon-green transition-colors duration-300">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        {cert.badgeUrl ? (
                          <div className="mr-4">
                            <Image 
                              src={getSanityImageUrl(cert.badgeUrl)} 
                              alt={`${cert.title} badge`} 
                              width={60} 
                              height={60} 
                              className="rounded"
                            />
                          </div>
                        ) : (
                          <div className="mr-4 w-14 h-14 bg-dark-base rounded-full flex items-center justify-center">
                            <span className="text-neon-green text-2xl">🔒</span>
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-lg font-cyber text-white">{cert.title}</h3>
                          <p className="text-sm font-terminal text-gray-400">
                            {cert.issuingOrganization 
                              ? (typeof cert.issuingOrganization === 'object' && cert.issuingOrganization !== null 
                                ? (cert.issuingOrganization as { name: string }).name 
                                : String(cert.issuingOrganization))
                              : 'Unknown Organization'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="text-sm font-terminal text-gray-400 mb-4">
                          {new Date(cert.dateIssued).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </div>
                        
                        {cert.certificateURL && (
                          <a 
                            href={cert.certificateURL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-terminal text-cyber-blue hover:text-neon-green transition-colors flex items-center"
                          >
                            <span className="mr-1">View Certificate</span>
                            <span>→</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-12 text-center">
              <CyberButton 
                href="/portfolio#certifications"
                type="secondary"
                icon="certificate"
              >
                View All Credentials
              </CyberButton>
            </div>
          </div>
        </section>
        
        {/* Cyber Pulse Dashboard section */}
        <section className="py-24 bg-dark-base relative">
          <div className="container mx-auto px-4">
            <SectionHeading>Cyber Pulse</SectionHeading>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <CyberPulseDashboard data={dashboardData} />
              
              <div className="mt-8">
                <div className="flex justify-center">
                  <CyberButton 
                    onClick={() => setShowRecentVulnerabilities(!showRecentVulnerabilities)}
                    type="warning"
                    icon="alert"
                  >
                    {showRecentVulnerabilities ? "Hide" : "Show"} Recent Vulnerabilities
                  </CyberButton>
                </div>
                
                {showRecentVulnerabilities && (
                  <motion.div 
                    className="mt-6 p-6 border border-cyber-red bg-dark-secondary rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-xl font-cyber text-cyber-red mb-4">Recent Critical CVEs</h3>
                    
                    <div className="space-y-4">
                      {latestCVEs.map((cve, index) => (
                        <div key={cve.id} className="p-4 bg-dark-tertiary rounded border-l-4 border-cyber-red">
                          <div className="flex justify-between">
                            <h4 className="font-terminal text-cyber-blue">{cve.id}</h4>
                            <span className={`text-sm font-terminal px-2 py-0.5 rounded ${
                              cve.severity === 'critical' ? 'bg-red-900 text-red-200' :
                              cve.severity === 'high' ? 'bg-orange-900 text-orange-200' :
                              'bg-yellow-900 text-yellow-200'
                            }`}>
                              {cve.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="mt-2 text-sm font-terminal text-gray-300">{cve.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cyber Terminal (conditionally rendered) */}
        {isTerminalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 sm:p-8">
            <div className="w-full max-w-4xl max-h-[90vh]">
              <div className="flex justify-end mb-2">
                <button 
                  onClick={() => setIsTerminalOpen(false)}
                  className="text-gray-400 hover:text-white text-lg focus:outline-none"
                  aria-label="Close terminal"
                >
                  × Close
                </button>
              </div>
              <CyberTerminal 
                welcomeMessage={
                  <div>
                    <div className="text-neon-green font-mono">Welcome, {profile?.name || 'Guest'}!</div>
                    <div className="text-gray-300 mt-2">Use this terminal to explore my portfolio.</div>
                    <div className="text-cyber-blue mt-1">Try commands like: <span className="text-neon-green">help</span>, <span className="text-neon-green">whoami</span>, <span className="text-neon-green">skills</span>, or <span className="text-neon-green">projects</span></div>
                  </div>
                }
                height="60vh"
                initialClearanceLevel={1}
              />
            </div>
          </div>
        )}
        
        {/* Floating Contact Component */}
        <FloatingContact 
          contactInfo={{
            github: profile?.githubUrl || contactData.githubUrl,
            linkedin: profile?.linkedinUrl || contactData.linkedinUrl,
            email: profile?.email || contactData.email
          }} 
        />
      </main>
    </Layout>
  );
}