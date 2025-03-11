import { client } from './sanity';
import { Category, Profile, Project, Certification, Skill, CyberResource, CyberRole, Experience, Education } from '@/types';

// Cache mechanism to prevent redundant API calls
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Generic fetch function with caching
 */
async function fetchWithCache<T>(query: string, cacheKey: string): Promise<T> {
  const now = Date.now();
  const cachedData = cache.get(cacheKey);
  
  if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data as T;
  }
  
  try {
    const data = await client.fetch<T>(query);
    cache.set(cacheKey, { data, timestamp: now });
    return data;
  } catch (error) {
    console.error(`Error fetching ${cacheKey}:`, error);
    throw error;
  }
}

/**
 * Fetch profile data
 */
export async function fetchProfile(): Promise<Profile> {
  const query = `*[_type == "profile"][0]{
    name,
    title,
    shortBio,
    longBio,
    profileImage {
      asset->{
        url
      }
    },
    socialLinks,
    email,
    phone,
    location
  }`;
  
  return fetchWithCache<Profile>(query, 'profile');
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<Category[]> {
  const query = `*[_type == "category"]{
    _id,
    name,
    slug,
    description
  }`;
  
  return fetchWithCache<Category[]>(query, 'categories');
}

/**
 * Fetch featured projects
 */
export async function fetchFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && metadata.isFeatured == true]{
    _id,
    title,
    slug,
    description,
    thumbnail {
      asset->{
        url
      }
    },
    liveUrl,
    repoUrl,
    technologies,
    categories[]->{
      _id,
      name
    },
    metadata
  }`;
  
  return fetchWithCache<Project[]>(query, 'featuredProjects');
}

/**
 * Fetch all projects
 */
export async function fetchAllProjects(): Promise<Project[]> {
  const query = `*[_type == "project"]{
    _id,
    title,
    slug,
    description,
    thumbnail {
      asset->{
        url
      }
    },
    liveUrl,
    repoUrl,
    technologies,
    categories[]->{
      _id,
      name
    },
    metadata
  } | order(metadata.order asc)`;
  
  return fetchWithCache<Project[]>(query, 'allProjects');
}

/**
 * Fetch certifications
 */
export async function fetchCertifications(): Promise<Certification[]> {
  const query = `*[_type == "certification"]{
    _id,
    title,
    slug,
    issuingOrganization,
    certificateImage {
      asset->{
        url
      }
    },
    dateIssued,
    expirationDate,
    verificationLink,
    description,
    categories[]->{
      _id,
      name
    },
    status
  } | order(dateIssued desc)`;
  
  return fetchWithCache<Certification[]>(query, 'certifications');
}

/**
 * Fetch skills
 */
export async function fetchSkills(): Promise<Skill[]> {
  const query = `*[_type == "skill"]{
    _id,
    name,
    category,
    proficiency,
    icon,
    yearsOfExperience,
    isHighlighted
  } | order(proficiency desc)`;
  
  return fetchWithCache<Skill[]>(query, 'skills');
}

/**
 * Fetch cyber resources
 */
export async function fetchCyberResources(): Promise<CyberResource[]> {
  const query = `*[_type == "resource"]{
    _id,
    title,
    description,
    url,
    type,
    category,
    level,
    tags,
    author,
    dateAdded,
    featured
  } | order(dateAdded desc)`;
  
  return fetchWithCache<CyberResource[]>(query, 'cyberResources');
}

/**
 * Fetch cyber career roles
 */
export async function fetchCyberRoles(): Promise<CyberRole[]> {
  const query = `*[_type == "role"]{
    _id,
    title,
    description,
    icon,
    salary,
    tools,
    responsibilities,
    requirements,
    careerPath,
    isPopular
  } | order(isPopular desc)`;
  
  return fetchWithCache<CyberRole[]>(query, 'cyberRoles');
}

/**
 * Fetch experience
 */
export async function fetchExperience(): Promise<Experience[]> {
  const query = `*[_type == "experience"]{
    _id,
    position,
    company,
    location,
    startDate,
    endDate,
    description,
    technologies,
    achievements,
    isHighlighted
  } | order(startDate desc)`;
  
  return fetchWithCache<Experience[]>(query, 'experience');
}

/**
 * Fetch education
 */
export async function fetchEducation(): Promise<Education[]> {
  const query = `*[_type == "education"]{
    _id,
    degree,
    institution,
    startDate,
    endDate,
    description,
    achievements,
    isHighlighted
  } | order(startDate desc)`;
  
  return fetchWithCache<Education[]>(query, 'education');
}

/**
 * Fetch all data for the homepage
 */
export async function fetchHomePageData() {
  try {
    const [profile, categories, featuredProjects, certifications, skills] = await Promise.all([
      fetchProfile(),
      fetchCategories(),
      fetchFeaturedProjects(),
      fetchCertifications(),
      fetchSkills()
    ]);
    
    return {
      profile,
      categories,
      featuredProjects,
      certifications,
      skills
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    throw error;
  }
}

/**
 * Fetch all data for the portfolio page
 */
export async function fetchPortfolioPageData() {
  try {
    const [profile, allProjects, experience, education, skills] = await Promise.all([
      fetchProfile(),
      fetchAllProjects(),
      fetchExperience(),
      fetchEducation(),
      fetchSkills()
    ]);
    
    return {
      profile,
      allProjects,
      experience,
      education,
      skills
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
}

/**
 * Fetch all data for the resources hub
 */
export async function fetchResourcesData() {
  try {
    const [cyberResources, cyberRoles] = await Promise.all([
      fetchCyberResources(),
      fetchCyberRoles()
    ]);
    
    return {
      cyberResources,
      cyberRoles
    };
  } catch (error) {
    console.error('Error fetching resources data:', error);
    throw error;
  }
}
