import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { ThreatData } from '@/types';

interface GlobalThreatMapProps {
  threatData: ThreatData[];
}

const GlobalThreatMap: React.FC<GlobalThreatMapProps> = ({ threatData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match its display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(26, 27, 38, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw world map outline (simplified)
    drawWorldMap(ctx, canvas.width, canvas.height);
    
    // Draw threat points
    drawThreats(ctx, threatData, canvas.width, canvas.height);
    
    // Animate connections
    animateConnections(ctx, threatData, canvas.width, canvas.height);
    
    return () => {
      // Cleanup animation frames if needed
    };
  }, [threatData]);
  
  const drawWorldMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // This is a very simplified representation - in a real app, you'd use GeoJSON data
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(68, 71, 90, 0.5)';
    ctx.lineWidth = 1;
    
    // Draw a simplified world outline - just for demonstration
    // In a real implementation, you would use proper map coordinates
    // North America
    ctx.moveTo(width * 0.1, height * 0.3);
    ctx.lineTo(width * 0.3, height * 0.3);
    ctx.lineTo(width * 0.3, height * 0.5);
    ctx.lineTo(width * 0.1, height * 0.5);
    ctx.lineTo(width * 0.1, height * 0.3);
    
    // South America
    ctx.moveTo(width * 0.2, height * 0.5);
    ctx.lineTo(width * 0.3, height * 0.5);
    ctx.lineTo(width * 0.25, height * 0.8);
    ctx.lineTo(width * 0.2, height * 0.5);
    
    // Europe
    ctx.moveTo(width * 0.4, height * 0.2);
    ctx.lineTo(width * 0.5, height * 0.2);
    ctx.lineTo(width * 0.5, height * 0.4);
    ctx.lineTo(width * 0.4, height * 0.4);
    ctx.lineTo(width * 0.4, height * 0.2);
    
    // Africa
    ctx.moveTo(width * 0.4, height * 0.4);
    ctx.lineTo(width * 0.5, height * 0.4);
    ctx.lineTo(width * 0.5, height * 0.7);
    ctx.lineTo(width * 0.4, height * 0.7);
    ctx.lineTo(width * 0.4, height * 0.4);
    
    // Asia
    ctx.moveTo(width * 0.5, height * 0.2);
    ctx.lineTo(width * 0.8, height * 0.2);
    ctx.lineTo(width * 0.8, height * 0.5);
    ctx.lineTo(width * 0.5, height * 0.5);
    ctx.lineTo(width * 0.5, height * 0.2);
    
    // Australia
    ctx.moveTo(width * 0.7, height * 0.6);
    ctx.lineTo(width * 0.8, height * 0.6);
    ctx.lineTo(width * 0.8, height * 0.7);
    ctx.lineTo(width * 0.7, height * 0.7);
    ctx.lineTo(width * 0.7, height * 0.6);
    
    ctx.stroke();
  };
  
  const drawThreats = (
    ctx: CanvasRenderingContext2D, 
    threats: ThreatData[], 
    width: number, 
    height: number
  ) => {
    threats.forEach(threat => {
      // Convert lat/long to x,y coordinates
      // This is a simplified conversion for demonstration
      const x = width * (threat.longitude + 180) / 360;
      const y = height * (90 - threat.latitude) / 180;
      
      // Draw threat point
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      
      // Color based on threat severity
      let color;
      switch (threat.severity) {
        case 'high':
          color = 'rgba(255, 85, 85, 0.8)'; // Neon red
          break;
        case 'medium':
          color = 'rgba(255, 184, 108, 0.8)'; // Neon orange
          break;
        case 'low':
          color = 'rgba(241, 250, 140, 0.8)'; // Neon yellow
          break;
        default:
          color = 'rgba(80, 250, 123, 0.8)'; // Neon green
      }
      
      ctx.fillStyle = color;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  };
  
  const animateConnections = (
    ctx: CanvasRenderingContext2D, 
    threats: ThreatData[], 
    width: number, 
    height: number
  ) => {
    // For demonstration - let's connect some threats to show attack paths
    if (threats.length < 2) return;
    
    // Destination point - let's say it's in the USA
    const destX = width * 0.2;
    const destY = height * 0.35;
    
    threats.forEach((threat, i) => {
      // Convert lat/long to x,y coordinates - simplified conversion
      const x = width * (threat.longitude + 180) / 360;
      const y = height * (90 - threat.latitude) / 180;
      
      // Only draw connections for attacking threats
      if (threat.isAttacking) {
        // Create a gradient line
        const gradient = ctx.createLinearGradient(x, y, destX, destY);
        
        let startColor;
        switch (threat.severity) {
          case 'high':
            startColor = 'rgba(255, 85, 85, 0.8)'; // Neon red
            break;
          case 'medium':
            startColor = 'rgba(255, 184, 108, 0.8)'; // Neon orange
            break;
          case 'low':
            startColor = 'rgba(241, 250, 140, 0.8)'; // Neon yellow
            break;
          default:
            startColor = 'rgba(80, 250, 123, 0.8)'; // Neon green
        }
        
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, 'rgba(139, 233, 253, 0.5)'); // Target point color
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(destX, destY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Animate pulse along the line
        const pulsePos = (Date.now() % 2000) / 2000;
        const pulseX = x + (destX - x) * pulsePos;
        const pulseY = y + (destY - y) * pulsePos;
        
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 233, 253, 0.8)';
        ctx.fill();
      }
    });
    
    // Set up animation loop
    requestAnimationFrame(() => {
      // Redraw only the connections (not the entire map)
      // Clear line areas to avoid complete redraw
      ctx.fillStyle = 'rgba(26, 27, 38, 0.3)';
      ctx.fillRect(0, 0, width, height);
      drawWorldMap(ctx, width, height);
      drawThreats(ctx, threats, width, height);
      animateConnections(ctx, threats, width, height);
    });
  };
  
  return (
    <motion.div 
      className="cyber-card h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-cyber custom-text-neon-green">Global Threat Map</h3>
      </div>
      <div className="relative w-full h-[300px]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full bg-transparent" 
        />
        <div className="absolute bottom-2 right-2 bg-gray-800/80 p-2 rounded text-xs">
          <div className="flex items-center mb-1">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            <span className="text-gray-300">High Severity</span>
          </div>
          <div className="flex items-center mb-1">
            <span className="inline-block w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            <span className="text-gray-300">Medium Severity</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full mr-2"></span>
            <span className="text-gray-300">Low Severity</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GlobalThreatMap;
