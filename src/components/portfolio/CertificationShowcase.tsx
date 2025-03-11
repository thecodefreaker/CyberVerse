'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certification } from '@/types';
import Image from 'next/image';
import { FaAward, FaCalendarAlt, FaExternalLinkAlt, FaCertificate, FaSearch } from 'react-icons/fa';

interface CertificationShowcaseProps {
  certifications: Certification[];
}

const CertificationShowcase: React.FC<CertificationShowcaseProps> = ({ certifications }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCerts, setFilteredCerts] = useState<Certification[]>(certifications);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  
  // Filter certifications based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCerts(certifications);
      return;
    }
    
    const filtered = certifications.filter(cert => 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuingOrganization.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredCerts(filtered);
  }, [searchTerm, certifications]);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Function to get badge color based on status
  const getStatusBadgeColor = (status?: string) => {
    if (!status) return 'var(--neon-green)';
    
    switch (status) {
      case 'active': return 'var(--neon-green)';
      case 'expired': return 'var(--neon-red)';
      case 'pending': return 'var(--neon-orange)';
      default: return 'var(--neon-green)';
    }
  };
  
  // Calculate certifications by category
  const certsByCategory = filteredCerts.reduce((acc, cert) => {
    if (cert.categories && cert.categories.length > 0) {
      cert.categories.forEach(category => {
        if (!acc[category.name]) {
          acc[category.name] = [];
        }
        acc[category.name].push(cert);
      });
    } else {
      if (!acc['Uncategorized']) {
        acc['Uncategorized'] = [];
      }
      acc['Uncategorized'].push(cert);
    }
    return acc;
  }, {} as { [key: string]: Certification[] });
  
  // Handle card flip
  const toggleCardFlip = (certId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [certId]: !prev[certId]
    }));
  };
  
  // Open modal with cert details
  const openCertModal = (cert: Certification) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  // Render certification description from Portable Text
  const renderDescription = (description: any[] | undefined) => {
    if (!description) return '';
    
    return description.map((block, index) => {
      if (block.children) {
        return block.children.map((child: any, childIndex: number) => (
          <span key={`${index}-${childIndex}`}>{child.text}</span>
        ));
      }
      return null;
    });
  };

  return (
    <div>
      {/* Search input */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search certifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-tertiary border border-dark-tertiary focus:border-cyber-blue rounded-md py-2 pl-10 pr-4 text-white focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
        </div>
      </div>
      
      {/* Certificates by category */}
      {Object.keys(certsByCategory).map(category => (
        <div key={category} className="mb-12">
          <h3 className="text-xl font-cyber mb-6 text-glow-blue">
            <FaCertificate className="inline-block mr-2" />
            {category}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certsByCategory[category].map(cert => (
              <motion.div 
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card-3d-container"
                onClick={() => openCertModal(cert)}
              >
                <div className={`card-3d ${flippedCards[cert._id] ? 'flipped' : ''}`}>
                  {/* Front of card */}
                  <div className="card-3d-front cyber-card p-0 cursor-pointer h-full">
                    <div className="relative h-40 overflow-hidden">
                      {cert.certificateImage ? (
                        <Image
                          src={cert.certificateImage.asset.url}
                          alt={cert.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-dark-tertiary to-dark-secondary flex items-center justify-center">
                          <FaAward className="text-5xl text-cyber-blue" />
                        </div>
                      )}
                      
                      {/* Status badge */}
                      {cert.status && (
                        <div 
                          className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold"
                          style={{ 
                            backgroundColor: `${getStatusBadgeColor(cert.status)}20`,
                            color: getStatusBadgeColor(cert.status)
                          }}
                        >
                          {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                        </div>
                      )}
                      
                      {/* Issuing org logo */}
                      {cert.issuingOrganization.logo && (
                        <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <Image
                            src={cert.issuingOrganization.logo.asset.url}
                            alt={cert.issuingOrganization.name}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      )}
                      
                      {/* Flip button */}
                      <button 
                        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-dark-base bg-opacity-80 flex items-center justify-center text-cyber-blue hover:text-glow-blue transition-all"
                        onClick={(e) => toggleCardFlip(cert._id, e)}
                      >
                        ↻
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-cyber text-glow mb-1 line-clamp-1">{cert.title}</h3>
                      <p className="text-sm text-cyber-gray mb-3">{cert.issuingOrganization.name}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-xs text-neon-green">
                          <FaCalendarAlt className="mr-1" />
                          <span>{formatDate(cert.dateIssued)}</span>
                        </div>
                        
                        {cert.verificationLink && (
                          <a 
                            href={cert.verificationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neon-purple hover:text-glow-purple transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaExternalLinkAlt /> 
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="card-3d-back cyber-card p-4 cursor-pointer h-full flex flex-col">
                    <h3 className="text-lg font-cyber text-glow mb-2">{cert.title}</h3>
                    
                    <div className="flex-1">
                      {cert.description ? (
                        <p className="text-sm text-cyber-gray mb-3 line-clamp-4">
                          {renderDescription(cert.description)}
                        </p>
                      ) : (
                        <p className="text-sm text-cyber-gray mb-3">
                          Issued by {cert.issuingOrganization.name} on {formatDate(cert.dateIssued)}
                          {cert.expirationDate && ` (Valid until ${formatDate(cert.expirationDate)})`}
                        </p>
                      )}
                      
                      {cert.categories && cert.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {cert.categories.map(cat => (
                            <span 
                              key={cat._id} 
                              className="text-xs px-2 py-0.5 rounded-full bg-dark-tertiary text-neon-green"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-auto">
                      <p className="text-xs text-center text-neon-purple">Click for details</p>
                      
                      {/* Flip back button */}
                      <button 
                        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-dark-base bg-opacity-80 flex items-center justify-center text-cyber-blue hover:text-glow-blue transition-all"
                        onClick={(e) => toggleCardFlip(cert._id, e)}
                      >
                        ↻
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Empty state */}
      {filteredCerts.length === 0 && (
        <div className="text-center py-12">
          <FaCertificate className="text-5xl text-cyber-blue mx-auto mb-4 opacity-50" />
          <p className="text-cyber-gray">No certifications found matching "{searchTerm}"</p>
          <button 
            className="mt-4 cyber-button"
            onClick={() => setSearchTerm('')}
          >
            Clear search
          </button>
        </div>
      )}
      
      {/* Certificate detail modal */}
      <AnimatePresence>
        {showModal && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-base bg-opacity-90 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="cyber-card max-w-2xl w-full max-h-[90vh] overflow-y-auto holographic"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {selectedCert.certificateImage ? (
                  <div className="h-60 md:h-72 relative">
                    <Image
                      src={selectedCert.certificateImage.asset.url}
                      alt={selectedCert.title}
                      fill
                      className="object-contain bg-dark-tertiary"
                    />
                  </div>
                ) : (
                  <div className="h-60 md:h-72 bg-gradient-to-br from-dark-tertiary to-dark-secondary flex items-center justify-center">
                    <FaAward className="text-8xl text-cyber-blue" />
                  </div>
                )}
                
                <button
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-base bg-opacity-80 flex items-center justify-center text-neon-red hover:text-glow-red transition-all"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  {selectedCert.issuingOrganization.logo ? (
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={selectedCert.issuingOrganization.logo.asset.url}
                        alt={selectedCert.issuingOrganization.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-dark-tertiary flex items-center justify-center flex-shrink-0">
                      <FaCertificate className="text-3xl text-cyber-blue" />
                    </div>
                  )}
                  
                  <div>
                    <h2 className="text-2xl font-cyber text-gradient-neon mb-2">
                      {selectedCert.title}
                    </h2>
                    <p className="text-lg text-cyber-gray">
                      {selectedCert.issuingOrganization.name}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-dark-tertiary rounded-md p-3">
                    <div className="text-sm text-cyber-gray mb-1">Issued</div>
                    <div className="text-neon-green">{formatDate(selectedCert.dateIssued)}</div>
                  </div>
                  
                  {selectedCert.expirationDate && (
                    <div className="bg-dark-tertiary rounded-md p-3">
                      <div className="text-sm text-cyber-gray mb-1">Expires</div>
                      <div 
                        className="font-semibold" 
                        style={{ color: getStatusBadgeColor(selectedCert.status) }}
                      >
                        {formatDate(selectedCert.expirationDate)}
                      </div>
                    </div>
                  )}
                </div>
                
                {selectedCert.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-cyber text-cyber-blue mb-3">Description</h3>
                    <div className="text-cyber-gray space-y-2">
                      {renderDescription(selectedCert.description)}
                    </div>
                  </div>
                )}
                
                {selectedCert.categories && selectedCert.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-cyber text-neon-purple mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.categories.map(cat => (
                        <span 
                          key={cat._id} 
                          className="px-3 py-1 rounded-full neon-border-purple text-neon-purple"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedCert.verificationLink && (
                  <div className="text-center mt-6">
                    <a 
                      href={selectedCert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button-blue inline-flex items-center gap-2"
                    >
                      <FaExternalLinkAlt /> Verify Certificate
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        .flipped {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default CertificationShowcase;
