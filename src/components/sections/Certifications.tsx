import { motion } from 'framer-motion';
import { Certification } from '../../types';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  // Format date for better display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-neon-green mb-6">Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <motion.div
            key={cert._id}
            className="bg-dark-base p-6 rounded-lg shadow-lg border border-neon-green/30"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-neon-green mb-2">{cert.title}</h3>
            {cert.issuingOrganization && typeof cert.issuingOrganization === 'object' && (
              <p className="text-white">{cert.issuingOrganization.name || 'Unknown Organization'}</p>
            )}
            <p className="text-gray-400 text-sm">{formatDate(cert.dateIssued)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}