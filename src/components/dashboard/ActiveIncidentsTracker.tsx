import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationCircle, FaSearch, FaShieldAlt, FaLock } from 'react-icons/fa';
import type { SecurityIncident } from '@/types';

interface ActiveIncidentsTrackerProps {
  incidents: SecurityIncident[];
}

const ActiveIncidentsTracker: React.FC<ActiveIncidentsTrackerProps> = ({ incidents }) => {
  // Get icon based on incident type
  const getIncidentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'intrusion':
        return <FaExclamationCircle className="text-red-500" />;
      case 'reconnaissance':
        return <FaSearch className="text-yellow-400" />;
      case 'malware':
        return <FaShieldAlt className="text-orange-400" />;
      case 'data breach':
        return <FaLock className="text-red-600" />;
      default:
        return <FaExclamationCircle className="text-yellow-400" />;
    }
  };

  // Get style based on severity
  const getSeverityStyle = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-900/30 border-red-500 text-red-400';
      case 'high':
        return 'bg-orange-900/30 border-orange-500 text-orange-400';
      case 'medium':
        return 'bg-yellow-900/30 border-yellow-500 text-yellow-400';
      case 'low':
        return 'bg-green-900/30 border-green-500 text-green-400';
      default:
        return 'bg-blue-900/30 border-blue-500 text-blue-400';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="cyber-card h-full overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-cyber custom-text-neon-green">Active Incidents</h3>
        <span className="bg-gray-800 rounded-full px-3 py-1 text-sm font-mono">
          {incidents.length} Active
        </span>
      </div>
      
      <motion.div 
        className="overflow-y-auto max-h-[300px] terminal-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {incidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <FaShieldAlt className="text-3xl mb-2 custom-text-neon-green" />
            <p>No active incidents</p>
          </div>
        ) : (
          incidents.map((incident, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-3 border-l-2 m-3 rounded ${getSeverityStyle(incident.severity)} relative overflow-hidden`}
            >
              {/* Animated scan line effect for critical incidents */}
              {incident.severity.toLowerCase() === 'critical' && (
                <div className="absolute inset-0 security-scan opacity-20"></div>
              )}
              
              {/* Glitch effect for critical text */}
              <div className="flex items-start mb-1">
                <div className="mr-3 mt-1">{getIncidentIcon(incident.type)}</div>
                <div>
                  <h4 className={incident.severity.toLowerCase() === 'critical' ? "font-bold glitch-text" : "font-bold"} data-text={incident.title}>
                    {incident.title}
                  </h4>
                  <div className="flex text-xs mt-1 space-x-3">
                    <span className="text-gray-400">ID: {incident.id}</span>
                    <span className="text-gray-400">{incident.timestamp}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm mt-2 text-gray-300 ml-8">{incident.description}</p>
              
              {/* Status indicator with pulse animation */}
              <div className="flex items-center mt-3 ml-8">
                <div className="relative mr-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75"></div>
                </div>
                <span className="text-xs text-gray-400">
                  {incident.status} • {incident.assignedTo ? `Assigned to ${incident.assignedTo}` : 'Unassigned'}
                </span>
              </div>
              
              {/* Actions row */}
              <div className="flex space-x-2 mt-3 ml-8">
                <button className="text-xs cyber-button-blue py-1 px-2">
                  Investigate
                </button>
                <button className="text-xs cyber-button py-1 px-2">
                  Resolve
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default ActiveIncidentsTracker;
