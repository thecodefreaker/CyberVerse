import { CyberPulseDashboard } from '@/types';

export const dashboardData: CyberPulseDashboard = {
  currentTime: new Date().toLocaleTimeString(),
  securityScore: 85,
  vulnerabilities: [
    {
      id: 'vuln-001',
      name: 'Critical Zero-Day in VPN Service',
      severity: 'critical',
      category: 'Network Security',
      affectedSystem: 'VPN Infrastructure',
      status: 'open',
      discoveredDate: '2025-03-11',
      description: 'Zero-day vulnerability affecting VPN service allowing remote code execution'
    },
    {
      id: 'vuln-002',
      name: 'Unpatched Windows Server',
      severity: 'high',
      category: 'System Security',
      affectedSystem: 'Windows Server 2022',
      status: 'in_progress',
      discoveredDate: '2025-03-10',
      description: 'Critical security patches pending deployment on production servers'
    }
  ],
  recentAttacks: [
    {
      id: 'atk-001',
      type: 'Ransomware',
      source: 'Unknown APT Group',
      target: 'Healthcare Sector',
      timestamp: '2025-03-11T08:30:00',
      severity: 'critical',
      status: 'blocked',
      description: 'Attempted ransomware deployment targeting healthcare organizations'
    }
  ],
  systemStatus: [
    {
      id: 'sys-001',
      name: 'Firewall',
      status: 'online',
      lastChecked: '2025-03-11T14:30:00',
      metrics: {
        uptime: '99.9%',
        load: '45%',
        cpu: 45,
        memory: 60,
        network: 75
      }
    }
  ],
  securityTips: [
    'Enable Multi-Factor Authentication on all accounts',
    'Regularly update and patch systems',
    'Monitor network traffic for unusual patterns'
  ],
  threatLevel: 'high',
  threatLevelDescription: 'Elevated threat level due to recent ransomware campaigns',
  activeIncidents: [
    {
      id: 'inc-001',
      title: 'Phishing Campaign',
      description: 'Targeted phishing attacks detected',
      type: 'Phishing',
      severity: 'high',
      timestamp: '2025-03-11T12:00:00',
      status: 'investigating',
      affectedSystems: ['Email Systems', 'User Workstations']
    }
  ],
  globalThreatMap: [
    {
      id: 'threat-001',
      latitude: 55.7558,
      longitude: 37.6173,
      country: 'Russian Federation',
      severity: 'high',
      type: 'APT',
      count: 1500,
      isAttacking: true
    }
  ],
  vulnerabilityTrends: [
    {
      month: '2025-03',
      critical: 3,
      high: 8,
      medium: 12,
      low: 4
    }
  ],
  securityNewsFeed: [
    {
      id: 'news-001',
      title: 'Critical Zero-Day Vulnerability in Popular VPN Service',
      summary: 'Security researchers have discovered a critical zero-day vulnerability',
      date: '2025-03-11',
      source: 'CyberSecurityNews',
      url: 'https://example.com/news/1',
      tags: ['zero-day', 'vpn', 'critical']
    }
  ],
  securityTools: [
    {
      id: 'tool-001',
      name: 'Nmap',
      category: 'Network Scanner',
      description: 'Network discovery and security auditing',
      status: 'active',
      lastUpdated: '2025-03-11',
      icon: 'nmap-icon'
    }
  ],
  patches: {
    applied: 245,
    available: 12,
    critical: 3,
    pending: 9
  },
  networkTraffic: '1.2 TB/day'
};
