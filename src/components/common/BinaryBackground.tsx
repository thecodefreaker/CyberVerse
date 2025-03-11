'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface BinaryBackgroundProps {
  speed?: 'slow' | 'medium' | 'fast';
  density?: 'low' | 'medium' | 'high';
  color?: string;
  opacity?: number;
  animate?: boolean;
  children?: React.ReactNode;
}

interface BinaryStream {
  id: number;
  x: number;
  y: number;
  length: number;
  speed: number;
  chars: string[];
  opacity: number;
}

const BinaryBackground: React.FC<BinaryBackgroundProps> = ({
  speed = 'medium',
  density = 'medium',
  color = 'var(--neon-green)',
  opacity = 0.15,
  animate = true,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [streams, setStreams] = useState<BinaryStream[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number | null>(null);
  
  // Speed configuration
  const speedConfig = {
    slow: { min: 0.5, max: 1.5 },
    medium: { min: 1, max: 3 },
    fast: { min: 2, max: 5 }
  };
  
  // Density configuration
  const densityConfig = {
    low: 20,
    medium: 40,
    high: 80
  };

  // Initialize binary streams
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Create streams based on dimensions and density
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const streamCount = Math.floor((dimensions.width / 1200) * densityConfig[density]);
    const newStreams: BinaryStream[] = [];
    
    for (let i = 0; i < streamCount; i++) {
      const x = Math.random() * dimensions.width;
      const length = Math.floor(Math.random() * 15) + 8; // 8-22 characters in length
      const chars = [];
      
      // Generate binary + occasional special chars
      for (let j = 0; j < length; j++) {
        // 90% chance of binary, 10% special characters
        if (Math.random() > 0.1) {
          chars.push(Math.random() > 0.5 ? '1' : '0');
        } else {
          // Special characters occasionally for visual interest
          const options = ['$', '#', '%', '&', '+', '*', '!', '?', '<', '>'];
          chars.push(options[Math.floor(Math.random() * options.length)]);
        }
      }
      
      newStreams.push({
        id: i,
        x,
        y: Math.random() * -300, // Start above the viewport
        length,
        speed: Math.random() * (speedConfig[speed].max - speedConfig[speed].min) + speedConfig[speed].min,
        chars,
        opacity: (Math.random() * 0.5) + 0.3 // Varying opacity
      });
    }
    
    setStreams(newStreams);
  }, [dimensions, density, speed]);
  
  // Animate the streams
  useEffect(() => {
    if (!animate || streams.length === 0) return;
    
    let lastTime = 0;
    
    const animateStreams = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;
      
      setStreams(prevStreams => {
        return prevStreams.map(stream => {
          // Move the stream down
          let y = stream.y + stream.speed * (deltaTime / 16);
          
          // Reset if it's gone off screen
          if (y > dimensions.height + 200) {
            y = Math.random() * -300;
            
            // Occasionally change the characters
            if (Math.random() > 0.7) {
              const newChars = [...stream.chars];
              const changeIndex = Math.floor(Math.random() * stream.length);
              if (Math.random() > 0.1) {
                newChars[changeIndex] = Math.random() > 0.5 ? '1' : '0';
              } else {
                const options = ['$', '#', '%', '&', '+', '*', '!', '?', '<', '>'];
                newChars[changeIndex] = options[Math.floor(Math.random() * options.length)];
              }
              return { ...stream, y, chars: newChars };
            }
          }
          
          return { ...stream, y };
        });
      });
      
      animationRef.current = requestAnimationFrame(animateStreams);
    };
    
    animationRef.current = requestAnimationFrame(animateStreams);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, streams, dimensions.height]);
  
  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {animate ? (
        // Canvas for binary streams
        <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
          {streams.map(stream => (
            <div
              key={stream.id}
              className="absolute font-terminal text-xs leading-none tracking-widest"
              style={{
                left: `${stream.x}px`,
                top: `${stream.y}px`,
                color,
                opacity: stream.opacity
              }}
            >
              {stream.chars.map((char, i) => (
                <div 
                  key={i}
                  style={{
                    opacity: 1 - (i / stream.length)
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Static version with motion div
        <motion.div 
          className="absolute inset-0 pointer-events-none font-terminal text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          transition={{ duration: 1 }}
        >
          {[...Array(densityConfig[density])].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color,
                opacity: (Math.random() * 0.5) + 0.3
              }}
            >
              {[...Array(Math.floor(Math.random() * 10) + 5)].map((_, j) => (
                <div key={j}>
                  {Math.random() > 0.1 
                    ? (Math.random() > 0.5 ? '1' : '0')
                    : ['$', '#', '%', '&', '+', '*'][Math.floor(Math.random() * 6)]
                  }
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      )}
      
      {/* Content layered on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BinaryBackground;
