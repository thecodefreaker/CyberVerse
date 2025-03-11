import { motion } from 'framer-motion';
import { Project } from '../../types';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-neon-green mb-6">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            className="bg-dark-base p-6 rounded-lg shadow-lg border border-neon-green/30"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-neon-green mb-2">{project.title}</h3>
            <p className="text-white">{project.description?.[0]?.children?.[0]?.text || 'No description available'}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}