import { ReactNode } from 'react';

// UI Components
export interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
}

export interface CyberButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: string;
  icon?: string;
  href?: string;
  download?: boolean;
}

export interface CyberCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}

export interface ExpandableCardProps {
  title: string;
  children?: ReactNode;
  expandedContent?: ReactNode;
  className?: string;
  glowColor?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  links?: {
    github?: string;
    live?: string;
  };
  tags?: string[];
  technologies?: string[];
}

export interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

// Effects Components
export interface ParticleBackgroundProps {
  color?: string;
  density?: number;
  speed?: number;
  className?: string;
}

export interface ScanLineProps {
  color?: string;
  speed?: number;
  opacity?: number;
  className?: string;
}

export interface MatrixRainBackgroundProps {
  intensity?: number;
  speed?: number;
  color?: string;
  fontSize?: number;
  className?: string;
}

// Interactive Components
export interface CyberGlobeProps {
  rotationSpeed?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    label: string;
    size?: number;
    color?: string;
    type?: string;
  }>;
  arcs?: Array<{
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color?: string;
  }>;
  glowIntensity?: number;
  autoRotate?: boolean;
  theme?: 'dark' | 'light';
}

export interface NetworkGraphProps {
  skills: Array<{
    id: string;
    name: string;
    category: string;
    proficiency: number;
    description: string;
    color: string;
  }>;
  enableFiltering?: boolean;
  showLabels?: boolean;
  pulseAnimation?: boolean;
}

export interface CyberTerminalProps {
  initialClearanceLevel?: number;
  welcomeMessage?: string | ReactNode;
  prompt?: string;
  commands?: Record<string, (args: string[]) => string>;
  history?: string[];
  className?: string;
  height?: string;
}
