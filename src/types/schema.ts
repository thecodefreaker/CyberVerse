// TypeScript schema definitions for Sanity
import type { PortableText } from './index';

// Define the Sanity Image type to handle image assets
export interface SanityImage {
  asset: {
    _id?: string;
    url?: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Schema specific types that aren't exported in the main index
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface SanityReference {
  _ref: string;
  _type: 'reference';
}

export interface SanitySlug {
  current: string;
  _type: 'slug';
}

export interface SanityBlock {
  _key: string;
  _type: 'block';
  children: {
    _key: string;
    _type: 'span';
    text: string;
    marks: string[];
  }[];
  markDefs: {
    _key: string;
    _type: string;
    href?: string;
  }[];
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
}

export interface SanityAsset {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Additional schema types that might be needed based on your page.tsx
export interface CyberDefenseConnection {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

export interface CyberThreatLocation {
  lat: number;
  lng: number;
  label: string;
  size: number;
  color: string;
  type: string;
}
