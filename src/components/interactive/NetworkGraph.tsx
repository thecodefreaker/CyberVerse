'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import GlitchText from '../ui/GlitchText';

interface Skill {
  id: string;
  name: string;
  proficiency: number; // 0-100
  category: string;
  relatedTo?: string[]; // IDs of related skills
  description?: string;
}

interface NetworkGraphProps {
  skills: Skill[];
  height?: number;
  width?: number;
  className?: string;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({
  skills,
  height = 500,
  width = 800,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Skill | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    skills.forEach(skill => uniqueCategories.add(skill.category));
    return Array.from(uniqueCategories);
  }, [skills]);

  // Calculate the filtered skills
  const filteredSkills = useMemo(() => {
    let result = skills;
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(skill => 
        skill.name.toLowerCase().includes(lowerSearchTerm) || 
        skill.category.toLowerCase().includes(lowerSearchTerm) ||
        (skill.description && skill.description.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    // Filter by category
    if (filteredCategory) {
      result = result.filter(skill => skill.category === filteredCategory);
    }
    
    return result;
  }, [skills, searchTerm, filteredCategory]);

  // Setup and update the network graph
  useEffect(() => {
    if (!svgRef.current || filteredSkills.length === 0) return;

    // Clear existing graph
    d3.select(svgRef.current).selectAll('*').remove();

    // Create a map for easy skill lookup
    const skillMap = new Map(skills.map(skill => [skill.id, skill]));

    // Define the nodes and links for the graph
    const nodes = filteredSkills.map(skill => ({
      id: skill.id,
      name: skill.name,
      proficiency: skill.proficiency,
      category: skill.category,
      radius: 10 + (skill.proficiency / 10), // Size based on proficiency
    }));

    // Create links between related skills
    const links = [] as Array<{ source: string; target: string; strength: number; }>;
    filteredSkills.forEach(skill => {
      if (skill.relatedTo) {
        skill.relatedTo.forEach(relatedId => {
          if (skillMap.has(relatedId) && filteredSkills.some(s => s.id === relatedId)) {
            links.push({
              source: skill.id,
              target: relatedId,
              // Strength based on average proficiency of connected nodes
              strength: (skill.proficiency + (skillMap.get(relatedId)?.proficiency || 0)) / 200
            });
          }
        });
      }
    });

    // Set up the SVG with a force-directed graph
    const svg = d3.select(svgRef.current);
    const container = svg.append('g');

    // Create a responsive viewBox
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    // Set up the simulation
    const simulation = d3.forceSimulation<any>(nodes)
      .force('charge', d3.forceManyBody().strength(-150))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.radius + 5))
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100).strength((d: any) => d.strength));

    // Color scale for categories
    const colorScale = d3.scaleOrdinal()
      .domain(categories)
      .range([
        'var(--neon-green, #50fa7b)', 
        'var(--cyber-blue, #8be9fd)', 
        'var(--neon-purple, #bd93f9)',
        'var(--cyber-orange, #ffb86c)', 
        'var(--cyber-red, #ff5555)'
      ]);

    // Create links
    const link = container.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'rgba(128, 128, 128, 0.3)')
      .attr('stroke-width', 1)
      .attr('class', (d: any) => `link-${d.source.id} link-${d.target.id}`);

    // Create nodes
    const node = container.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', (d: any) => `node-${d.id}`)
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles to nodes
    node.append('circle')
      .attr('r', (d: any) => d.radius)
      .attr('fill', (d: any) => colorScale(d.category) as string)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .attr('class', 'node-circle')
      .style('filter', 'url(#glow)');

    // Add text to nodes
    node.append('text')
      .text((d: any) => d.name)
      .attr('x', 0)
      .attr('y', (d: any) => -d.radius - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('class', 'node-text')
      .style('font-size', '10px')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 0 3px rgba(0,0,0,0.8)');

    // Create glow filter for nodes
    const defs = svg.append('defs');
    
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
      
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');
      
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Add interactivity
    node.on('click', function(event: any, d: any) {
      event.stopPropagation();
      const skill = skillMap.get(d.id);
      if (skill) {
        setSelectedNode(skill);
      }
    })
    .on('mouseover', function(event: any, d: any) {
      setHoveredNode(d.id);
      
      // Highlight related links
      d3.selectAll(`line.link-${d.id}`)
        .attr('stroke', 'rgba(255, 255, 255, 0.8)')
        .attr('stroke-width', 2);
        
      // Highlight this node
      d3.select(this).select('circle')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3);
    })
    .on('mouseout', function(event: any, d: any) {
      setHoveredNode(null);
      
      // Reset links
      d3.selectAll(`line.link-${d.id}`)
        .attr('stroke', 'rgba(128, 128, 128, 0.3)')
        .attr('stroke-width', 1);
        
      // Reset this node
      d3.select(this).select('circle')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);
    });

    // Add click handler to clear selection when clicking on empty space
    svg.on('click', () => {
      setSelectedNode(null);
    });

    // Update node and link positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform.toString());
      });

    svg.call(zoom);

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup on component unmount
    return () => {
      simulation.stop();
    };
  }, [filteredSkills, width, height, categories, skills]);

  // Focus on node when searching
  useEffect(() => {
    if (!svgRef.current || !searchTerm || filteredSkills.length === 0) return;
    
    const matchingSkill = filteredSkills.find(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (matchingSkill) {
      setSelectedNode(matchingSkill);
      
      // Visually highlight the node
      d3.select(svgRef.current)
        .select(`.node-${matchingSkill.id}`)
        .select('circle')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3);
    }
  }, [searchTerm, filteredSkills]);

  // Add entrance animation on first render
  useEffect(() => {
    if (!isInitialized && svgRef.current) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter
  const handleCategoryFilter = (category: string | null) => {
    setFilteredCategory(category === filteredCategory ? null : category);
  };

  return (
    <div className={`network-graph-container ${className}`}>
      {/* Controls and filters */}
      <div className="mb-4 p-4 bg-dark-tertiary rounded-md border border-neon-green flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 bg-dark-base text-gray-200 border border-neon-green rounded focus:outline-none focus:ring-2 focus:ring-neon-green"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryFilter(null)}
            className={`px-3 py-1 rounded-full text-xs border ${
              !filteredCategory 
                ? 'bg-neon-green text-dark-base border-neon-green' 
                : 'bg-transparent text-gray-300 border-gray-600 hover:border-neon-green'
            }`}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-3 py-1 rounded-full text-xs border ${
                filteredCategory === category 
                  ? 'bg-neon-green text-dark-base border-neon-green' 
                  : 'bg-transparent text-gray-300 border-gray-600 hover:border-neon-green'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main graph visualization */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-grow relative border border-neon-green rounded-md bg-dark-base overflow-hidden">
          <div className="absolute top-2 left-2 text-xs text-gray-400 z-10">
            {filteredSkills.length} of {skills.length} skills | 
            Drag to move nodes, scroll to zoom
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <svg 
              ref={svgRef} 
              width="100%" 
              height={height}
              className="w-full"
            />
          </motion.div>
          
          {/* Help overlay for empty state */}
          {filteredSkills.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-dark-base bg-opacity-80">
              <div className="text-center p-6">
                <GlitchText className="text-xl mb-2">No skills found</GlitchText>
                <p className="text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Skill detail panel */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="lg:w-80 p-4 border border-neon-green rounded-md bg-dark-tertiary"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-cyber text-neon-green">{selectedNode.name}</h3>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-3">
              <span className="text-cyber-blue text-sm">Category:</span>
              <span className="ml-2 px-2 py-1 rounded text-xs bg-dark-base">
                {selectedNode.category}
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-cyber-blue text-sm">Proficiency:</span>
              <div className="mt-1 w-full bg-dark-base h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-neon-green h-full"
                  style={{ width: `${selectedNode.proficiency}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>
            
            {selectedNode.description && (
              <div className="mb-4">
                <span className="text-cyber-blue text-sm">Description:</span>
                <p className="mt-1 text-gray-300 text-sm">
                  {selectedNode.description}
                </p>
              </div>
            )}
            
            {selectedNode.relatedTo && selectedNode.relatedTo.length > 0 && (
              <div>
                <span className="text-cyber-blue text-sm">Related Skills:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedNode.relatedTo.map(relatedId => {
                    const relatedSkill = skills.find(s => s.id === relatedId);
                    return relatedSkill ? (
                      <button
                        key={relatedId}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNode(relatedSkill);
                          setFilteredCategory(null); // Clear filters to ensure the node is visible
                          setSearchTerm('');
                        }}
                        className={`px-2 py-1 text-xs rounded bg-dark-base border 
                          ${hoveredNode === relatedId 
                            ? 'border-white text-white' 
                            : 'border-gray-600 text-gray-300 hover:border-neon-green'
                          }`}
                      >
                        {relatedSkill.name}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NetworkGraph;
