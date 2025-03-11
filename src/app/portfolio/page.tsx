import React from 'react';
import { Metadata } from 'next';
import { fetchAllProjects, fetchCertifications, fetchSkills, fetchExperience, fetchEducation, fetchProfile } from '../../lib/sanityMiddleware';
import { PortfolioClient } from '../../components/portfolio';

export const metadata: Metadata = {
  title: 'Cybersecurity Portfolio | Projects & Experience',
  description: 'Explore my cybersecurity projects, skills, certifications, and professional experience in this interactive portfolio.',
};

export const revalidate = 3600; // Revalidate the page every hour

export default async function PortfolioPage() {
  // Fetch data from Sanity
  const projects = await fetchAllProjects();
  const certifications = await fetchCertifications();
  const skills = await fetchSkills();
  const experience = await fetchExperience();
  const education = await fetchEducation();
  const profile = await fetchProfile();

  return (
    <div className="min-h-screen bg-dark-base text-white overflow-hidden">
      <PortfolioClient
        projects={projects}
        certifications={certifications}
        skills={skills}
        experience={experience}
        education={education}
        profile={profile}
      />
    </div>
  );
}
