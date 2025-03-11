import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaExclamationCircle, FaServer, FaBug, FaLock, FaChartLine, FaTools, FaNetworkWired, FaDatabase } from 'react-icons/fa';
import { CyberPulseDashboard as CyberPulseDashboardType } from '@/types';
import ThreatLevelIndicator from './ThreatLevelIndicator';
import ActiveIncidentsTracker from './ActiveIncidentsTracker';
import GlobalThreatMap from './GlobalThreatMap';
import SecurityNewsFeed from './SecurityNewsFeed';

interface CyberPulseDashboardProps {
  data: CyberPulseDashboardType;
}

const CyberPulseDashboard: React.FC<CyberPulseDashboardProps> = ({ data }) => {
  const [timeString, setTimeString] = useState('--:--:--');
  const [dateString, setDateString] = useState('--- --, ----');

  // Update the time and date every second - client side only
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: false }));
      setDateString(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };

    // Initial update
    updateTime();

    // Set interval for updates
    const interval = setInterval(updateTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 150 }
    }
  };

  // Calculate severity counts for displaying in cards
  const criticalCount = Array.isArray(data.activeIncidents) ? 
    data.activeIncidents.filter(incident => incident.severity === 'critical').length : 0;
  
  const highCount = Array.isArray(data.activeIncidents) ? 
    data.activeIncidents.filter(incident => incident.severity === 'high').length : 0;
  
  const mediumCount = Array.isArray(data.activeIncidents) ? 
    data.activeIncidents.filter(incident => incident.severity === 'medium').length : 0;
  
  const lowCount = Array.isArray(data.activeIncidents) ? 
    data.activeIncidents.filter(incident => incident.severity === 'low').length : 0;

  // Count active attacks from the threat map
  const activeAttacks = Array.isArray(data.globalThreatMap) ? 
    data.globalThreatMap.filter(threat => threat.isAttacking).length : 0;

  // Get latest vulnerability trends data
  const getVulnerabilityTrendTotals = () => {
    if (!Array.isArray(data.vulnerabilityTrends) || data.vulnerabilityTrends.length === 0) {
      return { critical: 0, high: 0, medium: 0, low: 0 };
    }
    const latest = data.vulnerabilityTrends[data.vulnerabilityTrends.length - 1];
    return {
      critical: latest.critical,
      high: latest.high,
      medium: latest.medium,
      low: latest.low
    };
  };

  const vulnerabilityTotals = getVulnerabilityTrendTotals();

  // Color helpers
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'custom-text-cyber-red';
      case 'high': return 'custom-text-cyber-orange';
      case 'medium': return 'custom-text-neon-yellow';
      case 'low': return 'custom-text-neon-green';
      default: return 'custom-text-cyber-blue';
    }
  };

  return (
    <motion.div 
      className="custom-bg-dark-base cyber-container py-8 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background cyber grid */}
      <div className="cyber-grid"></div>
      
      {/* Security scan effect */}
      <div className="cyber-scan-line"></div>
    
      {/* Header section */}
      <motion.div 
        className="responsive-grid mb-8 z-10 relative"
        variants={itemVariants}
      >
        <div className="col-span-8 md-col-span-6">
          <h2 className="text-3xl md:text-4xl font-cyber-heading custom-text-neon-green mb-2">
            CyberPulse Dashboard
          </h2>
          <p className="text-gray-400 mb-2 font-terminal">
            Real-time security monitoring and analytics
          </p>
        </div>
        
        <div className="col-span-4 md-col-span-6 flex flex-col items-end">
          <div className="text-xl font-terminal custom-text-neon-blue">
            {timeString}
          </div>
          <div className="text-gray-400 font-terminal text-sm">
            {dateString}
          </div>
        </div>
      </motion.div>
      
      {/* Main dashboard content */}
      <div className="responsive-grid gap-6 z-10 relative">
        {/* Threat Level */}
        <motion.div variants={itemVariants} className="col-span-12 md-col-span-6 lg-col-span-4">
          <ThreatLevelIndicator 
            level={data.threatLevel} 
            description={data.threatLevelDescription || ''} 
          />
        </motion.div>
        
        {/* Active Incidents */}
        <motion.div variants={itemVariants} className="col-span-12 md-col-span-6 lg-col-span-8">
          <ActiveIncidentsTracker incidents={data.activeIncidents || []} />
        </motion.div>
        
        {/* Security Status Cards */}
        <motion.div variants={itemVariants} className="col-span-12">
          <div className="cyber-card-grid">
            {/* Security Score */}
            <div className="cyber-card p-4 shadow-glow-green flex flex-col items-center justify-center">
              <FaShieldAlt className="text-3xl custom-text-neon-green mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Security Score</h3>
              <p className="text-2xl font-bold font-cyber custom-text-neon-green">
                {data.securityScore}%
              </p>
            </div>
            
            {/* Active Threats */}
            <div className="cyber-card p-4 shadow-glow-red flex flex-col items-center justify-center">
              <FaExclamationCircle className="text-3xl custom-text-cyber-red mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Active Threats</h3>
              <p className="text-2xl font-bold font-cyber custom-text-cyber-red">
                {activeAttacks}
              </p>
            </div>
            
            {/* Vulnerabilities */}
            <div className="cyber-card p-4 cyber-shadow-blue flex flex-col items-center justify-center">
              <FaBug className="text-3xl custom-text-cyber-orange mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Vulnerabilities</h3>
              <p className="text-2xl font-bold font-cyber custom-text-cyber-orange">
                {Array.isArray(data.vulnerabilities) ? data.vulnerabilities.length : 0}
              </p>
            </div>
            
            {/* System Status */}
            <div className="cyber-card p-4 cyber-shadow flex flex-col items-center justify-center">
              <FaServer className="text-3xl custom-text-cyber-blue mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Systems</h3>
              <p className="text-2xl font-bold font-cyber custom-text-cyber-blue">
                {Array.isArray(data.systemStatus) ? 
                  `${data.systemStatus.filter(s => s.status === 'online').length}/${data.systemStatus.length}` : 
                  '0/0'}
              </p>
            </div>
            
            {/* Patch Status */}
            <div className="cyber-card p-4 cyber-shadow-purple flex flex-col items-center justify-center">
              <FaTools className="text-3xl custom-text-neon-purple mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Patches</h3>
              <p className="text-2xl font-bold font-cyber custom-text-neon-purple">
                {data.patches ? `${data.patches.applied}/${data.patches.available}` : '0/0'}
              </p>
            </div>
            
            {/* Network Traffic */}
            <div className="cyber-card p-4 cyber-shadow flex flex-col items-center justify-center">
              <FaNetworkWired className="text-3xl custom-text-neon-blue mb-3" />
              <h3 className="text-center text-sm text-gray-400 mb-1">Network Traffic</h3>
              <p className="text-2xl font-bold font-cyber custom-text-neon-blue">
                {data.networkTraffic || '0 B/s'}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Global Threat Map */}
        <motion.div variants={itemVariants} className="col-span-12 lg-col-span-8">
          <GlobalThreatMap threatData={data.globalThreatMap} />
        </motion.div>
        
        {/* Security News Feed */}
        <motion.div variants={itemVariants} className="col-span-12 lg-col-span-4">
          <SecurityNewsFeed newsItems={data.securityNewsFeed} />
        </motion.div>
        
        {/* Vulnerability Details Section */}
        <motion.div variants={itemVariants} className="col-span-12 mt-4">
          <div className="cyber-card p-6">
            <h3 className="font-cyber-heading text-xl custom-text-neon-green mb-4">
              Vulnerability Assessment
            </h3>
            
            <div className="responsive-grid gap-6">
              {/* Vulnerability Trend Chart */}
              <div className="col-span-12 lg-col-span-7">
                <div className="custom-bg-dark-secondary p-4 rounded-lg min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <FaChartLine className="text-4xl custom-text-neon-blue mb-3 mx-auto" />
                    <p className="font-terminal text-gray-400">Vulnerability Trend Visualization</p>
                  </div>
                </div>
              </div>
              
              {/* Vulnerability Counts */}
              <div className="col-span-12 lg-col-span-5">
                <div className="custom-bg-dark-secondary p-4 rounded-lg h-full">
                  <h4 className="font-terminal text-sm text-gray-400 mb-3">Vulnerability Severity Breakdown</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-terminal text-sm">Critical</span>
                      <div className="flex items-center">
                        <div className="w-[100px] bg-gray-700 h-3 rounded overflow-hidden mr-2">
                          <motion.div 
                            className="h-full custom-bg-cyber-red"
                            initial={{ width: 0 }}
                            animate={{ width: `${(vulnerabilityTotals.critical / (vulnerabilityTotals.critical + vulnerabilityTotals.high + vulnerabilityTotals.medium + vulnerabilityTotals.low)) * 100}%` }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <span className="custom-text-cyber-red font-cyber text-sm">{vulnerabilityTotals.critical}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-terminal text-sm">High</span>
                      <div className="flex items-center">
                        <div className="w-[100px] bg-gray-700 h-3 rounded overflow-hidden mr-2">
                          <motion.div 
                            className="h-full custom-bg-cyber-orange"
                            initial={{ width: 0 }}
                            animate={{ width: `${(vulnerabilityTotals.high / (vulnerabilityTotals.critical + vulnerabilityTotals.high + vulnerabilityTotals.medium + vulnerabilityTotals.low)) * 100}%` }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <span className="custom-text-cyber-orange font-cyber text-sm">{vulnerabilityTotals.high}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-terminal text-sm">Medium</span>
                      <div className="flex items-center">
                        <div className="w-[100px] bg-gray-700 h-3 rounded overflow-hidden mr-2">
                          <motion.div 
                            className="h-full custom-bg-neon-yellow"
                            initial={{ width: 0 }}
                            animate={{ width: `${(vulnerabilityTotals.medium / (vulnerabilityTotals.critical + vulnerabilityTotals.high + vulnerabilityTotals.medium + vulnerabilityTotals.low)) * 100}%` }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <span className="custom-text-neon-yellow font-cyber text-sm">{vulnerabilityTotals.medium}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-terminal text-sm">Low</span>
                      <div className="flex items-center">
                        <div className="w-[100px] bg-gray-700 h-3 rounded overflow-hidden mr-2">
                          <motion.div 
                            className="h-full custom-bg-neon-green"
                            initial={{ width: 0 }}
                            animate={{ width: `${(vulnerabilityTotals.low / (vulnerabilityTotals.critical + vulnerabilityTotals.high + vulnerabilityTotals.medium + vulnerabilityTotals.low)) * 100}%` }}
                            transition={{ duration: 1.5 }}
                          />
                        </div>
                        <span className="custom-text-neon-green font-cyber text-sm">{vulnerabilityTotals.low}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer section */}
      <motion.div
        variants={itemVariants}
        className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500 flex justify-between items-center z-10 relative"
      >
        <div className="font-terminal">
          CyberPulse v1.0 <span className="px-2">|</span> Last updated: {new Date().toLocaleDateString()}
        </div>
        <div className="flex items-center">
          <FaLock className="mr-2" /> 
          <span className="font-cyber custom-text-neon-green">Secured Connection</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CyberPulseDashboard;
