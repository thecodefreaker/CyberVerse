import { motion } from 'framer-motion';
import { Category } from '../../types';

interface ContentGridProps {
  categories: Category[];
}

export default function ContentGrid({ categories }: ContentGridProps) {
  return (
    <section className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <motion.div
          key={category._id}
          className="bg-dark-base p-6 rounded-lg shadow-lg border border-neon-green/30 hover:border-neon-green transition-colors"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-neon-green mb-2">{category.name}</h2>
          <p className="text-white">{category.description}</p>
        </motion.div>
      ))}
    </section>
  );
}