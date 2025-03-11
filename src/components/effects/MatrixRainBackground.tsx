'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MatrixRainBackgroundProps {
  className?: string;
  density?: number;
  speed?: number;
  fontSize?: number;
  glowIntensity?: number;
  color?: string;
}

const MatrixRainBackground: React.FC<MatrixRainBackgroundProps> = ({
  className = '',
  density = 0.8, // Increased density for better visual appeal
  speed = 1.5,   // Increased from 1.0 to 1.5 for more dynamic effect
  fontSize = 14, // Default font size for matrix characters
  glowIntensity = 0.7, // Controls how strong the glow effect is
  color = '#50fa7b', // Default neon green color
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isTabVisible, setIsTabVisible] = useState(true);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateDimensions = () => {
      if (!canvasRef.current) return;
      
      const { width, height } = document.body.getBoundingClientRect();
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      setDimensions({ width, height });
      
      // Re-init ctx after resize for better rendering
      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      ctx.textAlign = 'center';
    };
    
    updateDimensions();
    
    // Characters for matrix rain - katakana and some special characters for cybersecurity feel
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ><@{}[]#$%&()=*+-/:;,.?!~^|\\░▒▓█▄▀▐▌■□▪▫';
    
    // Calculate drop count based on window width and density
    const cols = Math.floor(dimensions.width / (fontSize * 0.6));
    const drops: number[] = [];
    
    // Initialize drop positions - vary starting points for a more natural look
    for (let i = 0; i < cols; i++) {
      drops[i] = Math.random() * -dimensions.height;
    }
    
    // Object to track which characters should glow
    const glowingChars: Record<number, Record<number, boolean>> = {};
    
    // Initialize matrix color as THREE.Color to manipulate it
    const mainColor = color; // Use the user-defined color
    const dimColor = adjustColorBrightness(mainColor, 0.5); // Dimmer version of main color
    const brightColor = adjustColorBrightness(mainColor, 1.2); // Brighter version for glowing characters
    
    // Helper function to adjust color brightness
    function adjustColorBrightness(hexColor: string, factor: number): string {
      // Convert hex to RGB
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      
      // Adjust brightness
      const adjustedR = Math.min(255, Math.max(0, Math.floor(r * factor)));
      const adjustedG = Math.min(255, Math.max(0, Math.floor(g * factor)));
      const adjustedB = Math.min(255, Math.max(0, Math.floor(b * factor)));
      
      // Convert back to hex
      return `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
    }
    
    // Drawing function
    const draw = () => {
      if (!isTabVisible) {
        return;
      }
      
      if (!ctx || !canvasRef.current) return;
      
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 10, 20, 0.05)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      
      // For each column
      for (let i = 0; i < drops.length; i++) {
        // Initialize this column in the glowing characters tracker if needed
        if (!glowingChars[i]) {
          glowingChars[i] = {};
        }
        
        // Get random character
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // x position of the character
        const x = i * fontSize * 0.6;
        
        // Random chance for a character to glow
        if (Math.random() < 0.01 * glowIntensity) {
          const y = Math.floor(drops[i] / fontSize) * fontSize;
          glowingChars[i][y] = true;
          
          // Remove glow after a while
          setTimeout(() => {
            if (glowingChars[i]) {
              delete glowingChars[i][y];
            }
          }, Math.random() * 3000 + 1000);
        }
        
        // Check if this character should glow
        const charY = Math.floor(drops[i]);
        const shouldGlow = glowingChars[i][charY];
        
        // Vary character brightness based on position in column and randomness
        const positionFactor = 1 - (drops[i] / dimensions.height) * 0.5; // Characters at top are brighter
        const randomFactor = 0.7 + Math.random() * 0.3;
        
        if (shouldGlow) {
          // Add glow effect
          ctx.shadowBlur = 15;
          ctx.shadowColor = mainColor;
          ctx.fillStyle = brightColor;
        } else {
          // Vary between main color and dimmer color based on position
          ctx.shadowBlur = 0;
          const opacity = Math.min(1, Math.max(0.1, positionFactor * randomFactor));
          ctx.fillStyle = drops[i] < fontSize * 5 ? brightColor : dimColor;
          ctx.globalAlpha = opacity;
        }
        
        // Draw the character
        ctx.fillText(char, x, drops[i]);
        
        // Reset alpha
        ctx.globalAlpha = 1;
        
        // Move drop position down
        drops[i] += fontSize * (0.4 + Math.random() * 0.2) * speed;
        
        // Send drop back to top when it reaches the bottom
        if (drops[i] > dimensions.height * 1.5) {
          drops[i] = Math.random() * -dimensions.height * 0.5;
          
          // Clean up old glowing characters for this column
          glowingChars[i] = {};
        }
      }
    };
    
    // Animation loop using requestAnimationFrame for better performance
    let animationFrameId: number | null = null;
    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      
      // Throttle the animation when tab is not active or for performance
      if (!isTabVisible) {
        // Check occasionally if tab becomes visible
        if (frameCount % 30 === 0) {
          frameCount = 0;
          animationFrameId = requestAnimationFrame(animate);
        } else {
          animationFrameId = requestAnimationFrame(animate);
        }
        return;
      }
      
      // Throttle to a reasonable FPS based on density and speed for performance
      const targetFPS = Math.min(30, Math.max(15, Math.floor(30 * density * speed)));
      
      if (frameCount % Math.ceil(60 / targetFPS) === 0) {
        draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      updateDimensions();
    };
    
    // Handle visibility change
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [density, speed, fontSize, dimensions.width, dimensions.height, glowIntensity, color, isTabVisible]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className} matrix-rain-container`}
    />
  );
};

export default MatrixRainBackground;
