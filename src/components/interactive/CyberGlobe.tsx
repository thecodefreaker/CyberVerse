'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CyberButton from '../ui/CyberButton';

interface Coordinate {
  lat: number;
  lng: number;
  intensity?: number; // 0-1 value for threat intensity
  type?: 'attack' | 'defense' | 'alert';
  name?: string;
}

interface CyberGlobeProps {
  coordinates?: Coordinate[];
  height?: number;
  width?: number;
  autoRotate?: boolean;
  showControls?: boolean;
  className?: string;
  backgroundColor?: string;
  globeColor?: string;
  highlightColor?: string;
}

const CyberGlobe: React.FC<CyberGlobeProps> = ({
  coordinates = [],
  height = 400,
  width = 400,
  autoRotate = true,
  showControls = true,
  className = '',
  backgroundColor = '#171923',
  globeColor = '#44475a',
  highlightColor = '#50fa7b',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const markerGroupRef = useRef<THREE.Group | null>(null);
  const arcsGroupRef = useRef<THREE.Group | null>(null);
  const [activeCoordinate, setActiveCoordinate] = useState<Coordinate | null>(null);
  const [viewMode, setViewMode] = useState<'globe' | 'connections'>('globe');
  const animationFrameRef = useRef<number | null>(null);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const visibleRef = useRef<boolean>(true);
  const frameCountRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  // Helper to convert lat/lng to 3D position
  const latLngToVector3 = (lat: number, lng: number, radius: number = 1): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  };

  // Observer to lazy load the globe when it's visible
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Initialize THREE.js scene only when visible
  useEffect(() => {
    if (!containerRef.current || !isVisible) return;

    // Setup renderer with precision adjustment for performance
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      // @ts-ignore - precision is a valid parameter but not in the type definitions
      precision: 'mediump' // Use medium precision instead of highp
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio)); // Limit pixel ratio
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3;
    cameraRef.current = camera;

    // Setup controls with reduced performance impact
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = showControls;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.3; // Slower rotation
    // @ts-ignore - enablePan exists on OrbitControls but is missing from type definitions
    controls.enablePan = false; // Disable panning for performance
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Add directional light (only one light for performance)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create the globe with reduced geometry complexity
    const globeRadius = 1;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 32, 32); // Reduced from 64,64
    
    // Create simplified shader material
    const globeMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform vec3 glowColor;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        float grid(vec2 uv, float res) {
          vec2 grid = fract(uv * res);
          return (step(0.98, grid.x) + step(0.98, grid.y)) * 0.5;
        }
        
        void main() {
          // Base grid pattern - simplified
          float baseGrid = grid(vUv, 8.0);
          
          // Edge highlight - simplified calculation
          float edgeHighlight = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.5);
          
          // Combine effects with fewer calculations
          vec3 finalColor = mix(color, glowColor, edgeHighlight * 0.3);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(globeColor) },
        glowColor: { value: new THREE.Color(highlightColor) }
      },
      transparent: true
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    globeRef.current = globe;

    // Create a group for markers
    const markerGroup = new THREE.Group();
    scene.add(markerGroup);
    markerGroupRef.current = markerGroup;

    // Create a group for connection arcs
    const arcsGroup = new THREE.Group();
    scene.add(arcsGroup);
    arcsGroupRef.current = arcsGroup;

    // Set the globe as ready
    setIsGlobeReady(true);

    // Visibility detection to pause animation when not visible
    const handleVisibilityChange = () => {
      visibleRef.current = document.visibilityState === 'visible';
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation loop with frame skipping
    const animate = () => {
      // Skip frames when tab is not visible
      if (!visibleRef.current || frameCountRef.current++ % 2 !== 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      if (globeRef.current && globeRef.current.material instanceof THREE.ShaderMaterial) {
        globeRef.current.material.uniforms.time.value += 0.01;
      }
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && containerRef.current.contains(rendererRef.current.domElement)) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Dispose of all THREE objects
      if (globeRef.current) {
        if (globeRef.current.geometry) {
          // @ts-ignore - dispose exists on BufferGeometry but TypeScript doesn't recognize it
          globeRef.current.geometry.dispose();
        }
        if (globeRef.current.material) {
          if (Array.isArray(globeRef.current.material)) {
            // @ts-ignore - dispose exists on Material but TypeScript doesn't recognize it
            globeRef.current.material.forEach(material => material.dispose());
          } else {
            // @ts-ignore - dispose exists on Material but TypeScript doesn't recognize it
            globeRef.current.material.dispose();
          }
        }
      }
    };
  }, [isVisible, backgroundColor, width, height, autoRotate, showControls, globeColor, highlightColor]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const parentWidth = containerRef.current.clientWidth;
        const parentHeight = containerRef.current.clientHeight || height;
        
        rendererRef.current.setSize(parentWidth, parentHeight);
        
        if (cameraRef.current) {
          cameraRef.current.aspect = parentWidth / parentHeight;
          cameraRef.current.updateProjectionMatrix();
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [height]);

  // Update markers and connections when coordinates change
  useEffect(() => {
    if (!isGlobeReady || !markerGroupRef.current || !arcsGroupRef.current) return;
    
    // Clear existing markers and arcs
    while (markerGroupRef.current.children.length > 0) {
      markerGroupRef.current.remove(markerGroupRef.current.children[0]);
    }
    
    while (arcsGroupRef.current.children.length > 0) {
      arcsGroupRef.current.remove(arcsGroupRef.current.children[0]);
    }
    
    // Add markers for each coordinate
    coordinates.forEach((coord, index) => {
      const { lat, lng, type = 'attack', intensity = 0.7 } = coord;
      const position = latLngToVector3(lat, lng);
      
      // Get marker color based on type
      let markerColor;
      switch (type) {
        case 'defense': markerColor = new THREE.Color('#8be9fd'); break;
        case 'alert': markerColor = new THREE.Color('#ff5555'); break;
        default: markerColor = new THREE.Color('#ffb86c'); break;
      }
      
      // Create marker geometry
      const markerSize = 0.02 + (intensity * 0.03);
      const markerGeometry = new THREE.SphereGeometry(markerSize, 16, 16);
      
      // Create marker material with glow effect
      const markerMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float intensity;
          uniform float time;
          varying vec3 vNormal;
          
          void main() {
            float pulse = 0.5 + 0.5 * sin(time * 3.0 + ${index} * 0.7);
            vec3 glow = color * (intensity * 1.5) * pulse;
            gl_FragColor = vec4(glow, 1.0);
          }
        `,
        uniforms: {
          color: { value: markerColor },
          intensity: { value: intensity },
          time: { value: 0 }
        },
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      
      // Create marker mesh
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position.multiplyScalar(1.01)); // Slightly above globe surface
      marker.userData = { coordinate: coord, index };
      
      // Add to marker group
      if (markerGroupRef.current) {
        markerGroupRef.current.add(marker);
      }
      
      // Draw connection arcs if in connections mode
      if (viewMode === 'connections' && index < coordinates.length - 1) {
        // Create a random connection to another point
        const targetIndex = (index + 1 + Math.floor(Math.random() * (coordinates.length - 2))) % coordinates.length;
        const targetCoord = coordinates[targetIndex];
        const targetPosition = latLngToVector3(targetCoord.lat, targetCoord.lng);
        
        // Create curved line between points
        const arcPoints = [];
        const start = position.clone().multiplyScalar(1.01);
        const end = targetPosition.clone().multiplyScalar(1.01);
        const altitude = 0.2 + Math.random() * 0.1;
        
        // Calculate middle control point for the curve
        const midPoint = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(1 + altitude);
        
        // Create smooth curve
        for (let i = 0; i <= 20; i++) {
          const t = i / 20;
          
          // Quadratic Bezier curve
          const point = new THREE.Vector3()
            .copy(start)
            .multiplyScalar(Math.pow(1 - t, 2))
            .add(midPoint.clone().multiplyScalar(2 * (1 - t) * t))
            .add(end.clone().multiplyScalar(t * t));
          
          arcPoints.push(point);
        }
        
        // Create curve geometry
        const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
        
        // Create curve material
        const arcMaterial = new THREE.LineBasicMaterial({
          color: markerColor,
          transparent: true,
          opacity: 0.6,
          linewidth: 1
        });
        
        // Create curve mesh
        const arc = new THREE.Line(arcGeometry, arcMaterial);
        if (arcsGroupRef.current) {
          arcsGroupRef.current.add(arc);
        }
      }
    });
    
    // Animation update function for markers
    const updateMarkers = () => {
      markerGroupRef.current?.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.ShaderMaterial) {
          child.material.uniforms.time.value += 0.01;
        }
      });
    };
    
    // Add update to animation loop
    const animate = () => {
      updateMarkers();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [coordinates, viewMode, isGlobeReady]);

  // Toggle view mode between globe and connections
  const toggleViewMode = () => {
    setViewMode(viewMode === 'globe' ? 'connections' : 'globe');
  };

  return (
    <div className={`cyber-globe-container relative ${className}`} style={{ height, width }}>
      <div 
        ref={containerRef} 
        className="w-full h-full relative rounded-lg overflow-hidden border border-neon-green"
        style={{ boxShadow: `0 0 15px rgba(80, 250, 123, 0.3)` }}
      />
      
      {/* View mode toggle */}
      {showControls && (
        <div className="absolute bottom-4 right-4 z-10">
          <CyberButton
            onClick={toggleViewMode}
            size="sm"
            type="secondary"
            icon="grid"
          >
            {viewMode === 'globe' ? 'Show Connections' : 'Hide Connections'}
          </CyberButton>
        </div>
      )}
      
      {/* Info panel for active coordinate */}
      {activeCoordinate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-4 left-4 p-3 bg-dark-tertiary border border-neon-green rounded z-10 text-xs max-w-[200px]"
        >
          <h4 className="text-neon-green font-bold mb-1">
            {activeCoordinate.name || `Point ${activeCoordinate.lat.toFixed(2)}, ${activeCoordinate.lng.toFixed(2)}`}
          </h4>
          <div className="text-gray-300">
            Type: <span className="text-cyber-blue">{activeCoordinate.type || 'Unknown'}</span>
          </div>
          {activeCoordinate.intensity !== undefined && (
            <div className="text-gray-300">
              Intensity: <span className="text-cyber-blue">{Math.round(activeCoordinate.intensity * 100)}%</span>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Loading overlay */}
      {!isGlobeReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-base bg-opacity-70 z-20">
          <div className="text-neon-green">Initializing Cyber Globe...</div>
        </div>
      )}
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-neon-green opacity-30"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default CyberGlobe;
