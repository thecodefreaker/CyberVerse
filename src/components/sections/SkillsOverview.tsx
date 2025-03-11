import { motion } from 'framer-motion';
import { Skill } from '../../types';

interface SkillsOverviewProps {
  skills: Skill[];
}

export default function SkillsOverview({ skills }: SkillsOverviewProps) {
  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-neon-green mb-6">Skills Overview</h2>
      <div className="space-y-4">
        {skills.slice(0, 5).map((skill) => ( // Limit to top 5 skills
          <motion.div
            key={skill._id}
            className="bg-dark-base p-4 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-neon-green">{skill.name}</span>
              <span className="text-white">{skill.proficiency}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-neon-green h-2.5 rounded-full"
                style={{ width: `${skill.proficiency}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}