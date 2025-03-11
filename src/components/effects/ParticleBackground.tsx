'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  className?: string;
  color?: string;
  density?: number;
  speed?: number; // Added speed prop to be compatible with PortfolioClient
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  color = '#50fa7b',
  density = 0.8, // Increased from 0.3 to 0.8 for better visual appearance
  speed = 1.0,    // Added default value for speed
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  // Use a generic Object3D ref and cast as needed
  const particlesRef = useRef<THREE.Object3D | null>(null);
  const frameCountRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up THREE.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    sceneRef.current = scene;
    cameraRef.current = camera;

    // Create WebGL renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      // @ts-ignore - powerPreference exists in WebGLRendererParameters
      powerPreference: 'high-performance',
    });
    
    // Limit pixel ratio to 2 for performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Position camera
    camera.position.z = 30;

    // Create particles
    const createParticles = () => {
      // Remove old particles
      if (particlesRef.current) {
        // @ts-ignore - remove exists on Scene
        scene.remove(particlesRef.current);
        
        // Cast to any to dispose of geometry and material
        const points = particlesRef.current as any;
        if (points.geometry) points.geometry.dispose();
        if (points.material) {
          if (Array.isArray(points.material)) {
            points.material.forEach((m: any) => m.dispose && m.dispose());
          } else if (points.material.dispose) {
            points.material.dispose();
          }
        }
      }

      // Calculate the number of particles based on screen size and density
      const screenArea = window.innerWidth * window.innerHeight;
      // This formula gives a good balance between visual appeal and performance
      const baseCount = Math.min(screenArea / 5000, 300);
      // Scale by density but keep a reasonable cap
      const particleCount = Math.min(Math.floor(baseCount * density), 500);
      
      // Create particle geometry
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleSizes = new Float32Array(particleCount);
      const particleColors = new Float32Array(particleCount * 3);
      
      // Generate random positions, sizes and colors
      for (let i = 0; i < particleCount; i++) {
        // For x and y coordinates, keep them within the visible area with some spacing from edges
        const i3 = i * 3;
        particlePositions[i3] = (Math.random() - 0.5) * window.innerWidth * 0.8;
        particlePositions[i3 + 1] = (Math.random() - 0.5) * window.innerHeight * 0.8;
        particlePositions[i3 + 2] = (Math.random() - 0.5) * 30;
        
        // Vary particle sizes for more visual interest
        particleSizes[i] = Math.random() * 3 + 1;
        
        // Add color variation - mix between primary and secondary colors
        // Use colors from the cybersecurity portfolio color scheme
        const mainColor = new THREE.Color(color); // Primary neon green
        const secondaryColors = [
          new THREE.Color('#8be9fd'), // Cyber blue
          new THREE.Color('#bd93f9'), // Neon purple
          new THREE.Color('#ff79c6')  // Add pink accent for variety
        ];
        
        // Pick a random secondary color and mix with primary
        const secondColor = secondaryColors[Math.floor(Math.random() * secondaryColors.length)];
        const mixFactor = Math.random();
        
        // Manual color lerp that works with TypeScript
        const r = mainColor.r * (1 - mixFactor) + secondColor.r * mixFactor;
        const g = mainColor.g * (1 - mixFactor) + secondColor.g * mixFactor;
        const b = mainColor.b * (1 - mixFactor) + secondColor.b * mixFactor;
        
        particleColors[i3] = r;
        particleColors[i3 + 1] = g;
        particleColors[i3 + 2] = b;
      }
      
      // Set the attributes
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      
      // Create material with glowing effect
      const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          uniform float time;
          uniform float pixelRatio;
          
          varying vec3 vColor;
          
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Add subtle movement to particles
            float yMovement = sin(position.x * 0.01 + time) * 2.0 * ${speed.toFixed(1)};
            float xMovement = cos(position.y * 0.01 + time) * 2.0 * ${speed.toFixed(1)};
            
            mvPosition.x += xMovement;
            mvPosition.y += yMovement;
            
            gl_Position = projectionMatrix * mvPosition;
            
            // Size attenuation based on distance
            gl_PointSize = size * (300.0 / -mvPosition.z) * pixelRatio;
            
            // Pass color to fragment shader with slight variation
            float brightness = 0.7 + 0.3 * sin(time + position.x * 0.01);
            vColor = color * brightness;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            // Calculate distance from center of point
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            
            // Discard pixels outside circle and create soft edge
            if (dist > 0.5) discard;
            
            // Create glowing particle with soft edge
            float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        // @ts-ignore - depthWrite exists in ShaderMaterialParameters
        depthWrite: false,
        vertexColors: true,
      });
      
      // Create particle system using Object3D constructor
      // @ts-ignore - THREE.Points exists at runtime
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particlesRef.current = particles;
      scene.add(particles);
    };
    
    createParticles();
    
    // Animation loop
    const animate = () => {
      if (!isTabVisible) {
        // Skip frames when tab is not visible, but check occasionally
        if (frameCountRef.current % 30 === 0) {
          frameCountRef.current = 0;
          animationRef.current = requestAnimationFrame(animate);
        } else {
          frameCountRef.current++;
          animationRef.current = requestAnimationFrame(animate);
        }
        return;
      }
      
      if (particlesRef.current && sceneRef.current && cameraRef.current && rendererRef.current) {
        // Update particle animation - cast to any for the material.uniforms access
        const material = (particlesRef.current as any).material;
        if (material && material.uniforms) {
          material.uniforms.time.value += 0.01 * speed;
        }
        
        // Rotate particles slightly for more dynamic effect
        particlesRef.current.rotation.x += 0.0005 * speed;
        particlesRef.current.rotation.y += 0.0003 * speed;
        
        // Render scene
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Handle window resize with debouncing
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        if (cameraRef.current && rendererRef.current) {
          // Update camera
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
          
          // Update renderer
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
          
          // Recreate particles for new dimensions
          createParticles();
        }
      }, 200); // Debounce resize for 200ms
    };
    
    // Handle visibility change
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    
    // Set up event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup function
    return () => {
      // Cancel animation frame
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clear timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Dispose of THREE.js objects to prevent memory leaks
      if (rendererRef.current) {
        const rendererDom = rendererRef.current.domElement;
        if (rendererDom.parentNode) {
          rendererDom.parentNode.removeChild(rendererDom);
        }
        rendererRef.current.dispose();
      }
      
      if (particlesRef.current) {
        // Cast to any to dispose of geometry and material
        const points = particlesRef.current as any;
        if (points.geometry) points.geometry.dispose();
        if (points.material) {
          if (Array.isArray(points.material)) {
            points.material.forEach((m: any) => m.dispose && m.dispose());
          } else if (points.material.dispose) {
            points.material.dispose();
          }
        }
      }
    };
  }, [color, density, isTabVisible, speed]);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className} particle-container`}
    />
  );
};

export default ParticleBackground;
