import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode.react';
import { Profile } from '@/types';

interface DynamicQRCodeProps {
  profile: Profile;
  size?: number;
  includeVCard?: boolean;
}

const DynamicQRCode: React.FC<DynamicQRCodeProps> = ({ 
  profile, 
  size = 150,
  includeVCard = true 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [qrType, setQrType] = useState<'portfolio' | 'linkedin' | 'github' | 'email'>('portfolio');
  
  // Generate portfolio URL (default QR code value)
  const portfolioUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  // Find social links
  const linkedinUrl = profile.socialLinks?.find(link => 
    link.platform.toLowerCase() === 'linkedin'
  )?.url || '';
  
  const githubUrl = profile.socialLinks?.find(link => 
    link.platform.toLowerCase() === 'github'
  )?.url || '';
  
  // Generate vCard data
  const generateVCardData = () => {
    let vCardData = 'BEGIN:VCARD\nVERSION:3.0\n';
    vCardData += `FN:${profile.name}\n`;
    
    if (profile.email) {
      vCardData += `EMAIL:${profile.email}\n`;
    }
    
    if (profile.phone) {
      vCardData += `TEL:${profile.phone}\n`;
    }
    
    profile.socialLinks?.forEach(link => {
      if (link.platform.toLowerCase() === 'linkedin') {
        vCardData += `URL;type=LINKEDIN:${link.url}\n`;
      } else if (link.platform.toLowerCase() === 'github') {
        vCardData += `URL;type=GITHUB:${link.url}\n`;
      } else if (link.platform.toLowerCase() === 'twitter') {
        vCardData += `URL;type=TWITTER:${link.url}\n`;
      }
    });
    
    vCardData += `URL;type=PORTFOLIO:${portfolioUrl}\n`;
    vCardData += 'END:VCARD';
    
    return vCardData;
  };
  
  // Update QR code value based on selected type
  useEffect(() => {
    switch (qrType) {
      case 'portfolio':
        setQrValue(portfolioUrl);
        break;
      case 'linkedin':
        setQrValue(linkedinUrl);
        break;
      case 'github':
        setQrValue(githubUrl);
        break;
      case 'email':
        setQrValue(`mailto:${profile.email}`);
        break;
      default:
        setQrValue(portfolioUrl);
    }
  }, [qrType, portfolioUrl, linkedinUrl, githubUrl, profile.email]);
  
  // Handle QR code flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Handle QR type change
  const changeQrType = (type: 'portfolio' | 'linkedin' | 'github' | 'email') => {
    setQrType(type);
  };
  
  // Generate vCard file download
  const downloadVCard = () => {
    const vCardData = generateVCardData();
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="qr-code-container" style={{ width: size, height: size }}>
        <div 
          className="qr-code" 
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          onClick={handleFlip}
        >
          <div className="qr-code-front bg-white p-2">
            <QRCode 
              value={qrValue}
              size={size - 20}
              level="H"
              imageSettings={{
                src: '/logo.png',
                excavate: true,
                width: 30,
                height: 30
              }}
            />
          </div>
          <div className="qr-code-back">
            <div className="flex flex-col items-center justify-center h-full p-2">
              <h4 className="text-xs font-cyber mb-3 text-center text-neon-green">Select QR Type</h4>
              <div className="grid grid-cols-2 gap-2 w-full">
                <button 
                  onClick={() => changeQrType('portfolio')}
                  className={`text-xs px-2 py-1 rounded ${
                    qrType === 'portfolio' 
                      ? 'bg-neon-green text-dark-base' 
                      : 'bg-dark-tertiary text-white'
                  }`}
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => changeQrType('linkedin')}
                  className={`text-xs px-2 py-1 rounded ${
                    qrType === 'linkedin' 
                      ? 'bg-neon-green text-dark-base' 
                      : 'bg-dark-tertiary text-white'
                  }`}
                  disabled={!linkedinUrl}
                >
                  LinkedIn
                </button>
                <button 
                  onClick={() => changeQrType('github')}
                  className={`text-xs px-2 py-1 rounded ${
                    qrType === 'github' 
                      ? 'bg-neon-green text-dark-base' 
                      : 'bg-dark-tertiary text-white'
                  }`}
                  disabled={!githubUrl}
                >
                  GitHub
                </button>
                <button 
                  onClick={() => changeQrType('email')}
                  className={`text-xs px-2 py-1 rounded ${
                    qrType === 'email' 
                      ? 'bg-neon-green text-dark-base' 
                      : 'bg-dark-tertiary text-white'
                  }`}
                  disabled={!profile.email}
                >
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-cyber-gray mt-2">
        {isFlipped ? 'Select QR type' : `Scan for ${qrType}`}
      </div>
      
      <div className="text-xs text-cyber-gray mt-1 mb-3">
        (Click to {isFlipped ? 'show QR' : 'change'})
      </div>
      
      {includeVCard && (
        <motion.button
          onClick={downloadVCard}
          className="vcard-download"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download vCard</span>
        </motion.button>
      )}
    </div>
  );
};

export default DynamicQRCode;
