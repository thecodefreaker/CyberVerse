import React from 'react';

/**
 * Utility to safely extract text from Portable Text format or return a string
 * This handles Sanity.io's rich text format and prevents "Objects are not valid as React child" errors
 */
export const extractPortableText = (portableText: any, fallback: string = ''): string => {
  // If it's already a string, just return it
  if (typeof portableText === 'string') {
    return portableText;
  }
  
  // If it's an array (standard Portable Text format), extract text from blocks
  if (Array.isArray(portableText)) {
    return portableText
      .map(block => {
        // Extract text from paragraph blocks
        if (block._type === 'block' && Array.isArray(block.children)) {
          return block.children
            .map((child: any) => child.text || '')
            .join('');
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');
  }
  
  // If it's an object with children (sometimes the case), extract from that
  if (portableText && typeof portableText === 'object' && 'children' in portableText) {
    if (Array.isArray(portableText.children)) {
      return portableText.children
        .map((child: any) => child.text || '')
        .filter(Boolean)
        .join('');
    }
  }
  
  // If we can't extract text, return the fallback
  return fallback;
};

/**
 * Component to render Portable Text with proper formatting
 * For more complex rendering, consider using @portabletext/react package
 */
interface PortableTextProps {
  value: any;
  className?: string;
}

export const SimplePortableText: React.FC<PortableTextProps> = ({ value, className = '' }) => {
  if (!value) return null;
  
  // If it's already a string, just render it
  if (typeof value === 'string') {
    return <p className={className}>{value}</p>;
  }
  
  // If it's an array (standard Portable Text format), render blocks
  if (Array.isArray(value)) {
    return (
      <div className={className}>
        {value.map((block, index) => {
          // Handle paragraph blocks
          if (block._type === 'block' && Array.isArray(block.children)) {
            const text = block.children
              .map((child: any) => child.text || '')
              .join('');
              
            if (block.style === 'h1') return <h1 key={block._key || index}>{text}</h1>;
            if (block.style === 'h2') return <h2 key={block._key || index}>{text}</h2>;
            if (block.style === 'h3') return <h3 key={block._key || index}>{text}</h3>;
            if (block.style === 'h4') return <h4 key={block._key || index}>{text}</h4>;
            
            return <p key={block._key || index}>{text}</p>;
          }
          
          // Fallback for unknown blocks
          return null;
        })}
      </div>
    );
  }
  
  // Fallback for unknown format
  return <p className={className}>{extractPortableText(value)}</p>;
};
