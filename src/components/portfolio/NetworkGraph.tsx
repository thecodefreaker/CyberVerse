'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/types';
import dynamic from 'next/dynamic';
import * as d3 from 'd3-force';
import { FaSearch, FaNetworkWired } from 'react-icons/fa';
import { NodeObject, LinkObject } from 'react-force-graph-2d';

// Add resizeTimer to Window interface
declare global {
  interface Window {
    resizeTimer: ReturnType<typeof setTimeout>;
  }
}

interface NetworkGraphProps {
  skills: Skill[];
}

// Define node and link types for the graph
interface Node extends NodeObject {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  color?: string;
  highlight?: boolean;
  val?: number;
}

interface Link extends LinkObject {
  source: string;
  target: string;
  value: number;
  connection?: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

const CATEGORY_COLORS = {
  'Offensive Security': '#ff5555',
  'Defensive Security': '#50fa7b',
  'Cloud Security': '#8be9fd',
  'Network Security': '#bd93f9',
  'Application Security': '#ffb86c', 
  'Governance': '#f1fa8c',
  'Identity & Access': '#ff79c6',
  'Other': '#6272a4'
};

const DEFAULT_COLOR = '#bd93f9';

// Dynamically import ForceGraph2D with no SSR to avoid window is not defined error
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center bg-dark-tertiary rounded-lg border border-cyber-blue">
      <div className="text-neon-green animate-pulse">
        <span className="text-xl font-cyber">Loading Network Graph...</span>
      </div>
    </div>
  )
});

const NetworkGraph: React.FC<NetworkGraphProps> = ({ skills }) => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  
  // Prepare graph data from skills
  useEffect(() => {
    if (!skills.length) return;
    
    const nodes: Node[] = skills.map(skill => ({
      id: skill._id,
      name: skill.name,
      category: skill.category || 'Other',
      proficiency: skill.proficiency || 50,
      color: CATEGORY_COLORS[skill.category as keyof typeof CATEGORY_COLORS] || DEFAULT_COLOR,
      val: (skill.proficiency || 50) / 10, // Node size based on proficiency
    }));
    
    // Create related links based on category relationships and other factors
    const links: Link[] = [];
    
    // Group skills by category
    const categorizedSkills: Record<string, Skill[]> = {};
    skills.forEach(skill => {
      const category = skill.category || 'Other';
      if (!categorizedSkills[category]) {
        categorizedSkills[category] = [];
      }
      categorizedSkills[category].push(skill);
    });
    
    // Connect skills within the same category
    Object.entries(categorizedSkills).forEach(([category, categorySkills]) => {
      for (let i = 0; i < categorySkills.length; i++) {
        for (let j = i + 1; j < categorySkills.length; j++) {
          // Only connect if both skills have high enough proficiency
          if ((categorySkills[i].proficiency || 0) >= 40 && (categorySkills[j].proficiency || 0) >= 40) {
            links.push({
              source: categorySkills[i]._id,
              target: categorySkills[j]._id,
              value: 2,
              connection: 'category'
            });
          }
        }
      }
    });
    
    // Connect complementary skills across categories (simplified example)
    const complementaryPairs = [
      ['Penetration Testing', 'Network Security'],
      ['Vulnerability Management', 'SIEM'],
      ['Threat Hunting', 'Malware Analysis'],
      ['AWS', 'Cloud Security'],
      ['Incident Response', 'Digital Forensics'],
      ['Risk Assessment', 'Compliance'],
      ['Python', 'Automation'],
      ['Kubernetes', 'Docker']
    ];
    
    complementaryPairs.forEach(pair => {
      const skill1 = nodes.find(node => node.name.includes(pair[0]));
      const skill2 = nodes.find(node => node.name.includes(pair[1]));
      
      if (skill1 && skill2) {
        links.push({
          source: skill1.id,
          target: skill2.id,
          value: 4, // Stronger connection
          connection: 'complementary'
        });
      }
    });
    
    // Add some random connections between high-proficiency skills to make the graph more interesting
    const highProficiencySkills = nodes.filter(node => node.proficiency >= 70);
    if (highProficiencySkills.length > 5) {
      for (let i = 0; i < Math.min(10, highProficiencySkills.length); i++) {
        const sourceIndex = Math.floor(Math.random() * highProficiencySkills.length);
        let targetIndex = Math.floor(Math.random() * highProficiencySkills.length);
        
        // Ensure we don't connect a node to itself
        while (targetIndex === sourceIndex) {
          targetIndex = Math.floor(Math.random() * highProficiencySkills.length);
        }
        
        links.push({
          source: highProficiencySkills[sourceIndex].id,
          target: highProficiencySkills[targetIndex].id,
          value: 1,
          connection: 'expertise'
        });
      }
    }
    
    setGraphData({ nodes, links });
  }, [skills]);
  
  // Handle searching/filtering
  useEffect(() => {
    if (!searchTerm.trim() || !graphData.nodes.length) {
      // Reset all highlighting
      setGraphData(prev => ({
        ...prev,
        nodes: prev.nodes.map(node => ({ ...node, highlight: false }))
      }));
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const matchingNodeIds = new Set<string>();
    
    // Find nodes that match the search term
    graphData.nodes.forEach(node => {
      if (
        node.name.toLowerCase().includes(term) || 
        node.category.toLowerCase().includes(term)
      ) {
        matchingNodeIds.add(node.id);
      }
    });
    
    // Update nodes with highlight status
    setGraphData(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => ({
        ...node,
        highlight: matchingNodeIds.has(node.id)
      }))
    }));
    
    // If we have a graph instance, we can center on the first matching node
    if (graphRef.current && matchingNodeIds.size > 0) {
      const matchingNode = graphData.nodes.find(node => matchingNodeIds.has(node.id));
      if (matchingNode && matchingNode.x !== undefined && matchingNode.y !== undefined) {
        graphRef.current.centerAt(
          matchingNode.x,
          matchingNode.y,
          1000
        );
        graphRef.current.zoom(2, 1000);
      }
    }
  }, [searchTerm, graphData.nodes.length]);
  
  // Handle resizing
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height: Math.max(500, height) });
    };
    
    // Initial dimension calculation
    updateDimensions();
    
    // Set up resize handler
    const handleResize = () => {
      setIsResizing(true);
      updateDimensions();
      
      // Debounce resizing state to avoid excessive re-renders
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => setIsResizing(false), 500);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Paint the graph canvas
  const paintNode = (node: Node, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const { x, y, val, color, highlight } = node;
    
    // Handle possibly undefined x and y coordinates
    if (x === undefined || y === undefined) return;
    
    const size = (val || 3) * 3;
    const fontSize = 12 / globalScale;
    
    // Outer glow effect
    ctx.beginPath();
    ctx.arc(x, y, size * 1.4, 0, 2 * Math.PI);
    ctx.fillStyle = highlight ? `${color}50` : 'transparent';
    ctx.fill();
    
    // Main node circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color || DEFAULT_COLOR;
    ctx.fill();
    
    // Inner glow
    ctx.beginPath();
    ctx.arc(x, y, size * 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = `${color}40` || `${DEFAULT_COLOR}40`;
    ctx.fill();
    
    // Text label for highlighted nodes
    if (highlight) {
      ctx.font = `${fontSize}px Share Tech Mono`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.lineWidth = globalScale * 2;
      ctx.strokeText(node.name, x, y + size * 2);
      ctx.fillText(node.name, x, y + size * 2);
    }
  };
  
  // Handle node hover
  const handleNodeHover = (node: any) => {
    setHoveredNode(node);
    
    if (graphRef.current) {
      graphRef.current.refresh();
    }
  };
  
  // Handle node click
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };
  
  // Handle link render
  const getLinkWidth = (link: Link) => {
    return link.value || 1;
  };
  
  // Handle link color
  const getLinkColor = (link: Link) => {
    return link.connection === 'strong' ? DEFAULT_COLOR : 'rgba(255,255,255,0.2)';
  };

  return (
    <div className="relative mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FaNetworkWired className="text-cyber-blue" />
          <h3 className="text-xl font-cyber text-glow-blue">Skills Network</h3>
        </div>
        
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-tertiary border border-dark-tertiary focus:border-cyber-blue rounded-md py-2 pl-10 pr-4 text-white focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
          <div key={category} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-sm text-cyber-gray">{category}</span>
          </div>
        ))}
      </div>
      
      {/* Graph container */}
      <div 
        ref={containerRef} 
        className="w-full h-[70vh] bg-dark-tertiary rounded-lg border border-cyber-blue overflow-hidden"
      >
        {dimensions.width > 0 && !isResizing && (
          <ForceGraph2D
            graphData={graphData as any}
            width={dimensions.width}
            height={dimensions.height}
            nodeAutoColorBy="category"
            nodeVal="val"
            nodeLabel="name"
            linkWidth={getLinkWidth as any}
            linkColor={getLinkColor as any}
            nodeCanvasObject={paintNode as any}
            onNodeHover={handleNodeHover as any}
            onNodeClick={handleNodeClick as any}
            cooldownTicks={100}
            onEngineStop={() => graphRef.current && graphRef.current.zoomToFit(400)}
            nodeRelSize={3}
            nodeColor={(node) => {
              const category = (node as Node).category;
              // Check if category exists in CATEGORY_COLORS
              return (category in CATEGORY_COLORS) 
                ? CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] 
                : DEFAULT_COLOR;
            }}
            d3Force={(key, force) => {
              if (key === 'charge') {
                force.strength(-150);
              }
              if (key === 'collision') {
                force.strength(1).radius((node: any) => (node.val || 3) * 4);
              }
            }}
            ref={el => { graphRef.current = el; }}
          />
        )}
        
        {graphData.nodes.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <FaNetworkWired className="mx-auto text-4xl text-cyber-gray mb-4" />
              <p className="text-cyber-gray">No skills data available</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Skill details panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 top-20 w-80 cyber-card neon-border z-10"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-cyber" style={{ color: selectedNode.color }}>
                {selectedNode.name}
              </h4>
              <button 
                className="text-neon-red hover:text-glow-red"
                onClick={() => setSelectedNode(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-cyber-gray mb-1">Category</div>
                <div className="text-white">{selectedNode.category}</div>
              </div>
              
              <div>
                <div className="text-sm text-cyber-gray mb-1">Proficiency</div>
                <div className="h-2 bg-dark-tertiary rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${selectedNode.proficiency}%`,
                      backgroundColor: selectedNode.color 
                    }}
                  ></div>
                </div>
                <div className="text-right text-xs mt-1 text-cyber-gray">
                  {selectedNode.proficiency}%
                </div>
              </div>
              
              {/* Connected skills */}
              <div>
                <div className="text-sm text-cyber-gray mb-2">Connected Skills</div>
                <div className="space-y-1">
                  {graphData.links
                    .filter(link => 
                      link.source === selectedNode.id || 
                      link.target === selectedNode.id
                    )
                    .map((link, i) => {
                      const connectedNodeId = link.source === selectedNode.id ? link.target : link.source;
                      const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
                      
                      if (!connectedNode) return null;
                      
                      return (
                        <div 
                          key={i}
                          className="flex items-center justify-between text-sm p-1 rounded hover:bg-dark-tertiary cursor-pointer"
                          onClick={() => {
                            const node = graphData.nodes.find(n => n.id === connectedNodeId);
                            if (node) setSelectedNode(node);
                          }}
                        >
                          <span>{connectedNode.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-dark-tertiary" style={{ color: connectedNode.color }}>
                            {link.connection}
                          </span>
                        </div>
                      );
                    })
                  }
                  
                  {graphData.links.filter(link => 
                    link.source === selectedNode.id || 
                    link.target === selectedNode.id
                  ).length === 0 && (
                    <div className="text-cyber-gray text-sm">No connections found</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-4 text-center text-sm text-cyber-gray">
        <p>Hover over nodes to see skill names. Click on a node to view detailed information.</p>
      </div>
    </div>
  );
};

export default NetworkGraph;
