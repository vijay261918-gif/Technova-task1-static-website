import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Code, Database, Server, GitBranch, Shield } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GlassCard } from './ui/GlassCard';
import { useIntersectionObserver } from '../hooks/useScrollSpy';

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  React: Code,
  'Node.js': Server,
  MySQL: Database,
  HTML: Code,
  CSS: Code,
  JavaScript: Code,
  Bootstrap: Code,
  'REST APIs': Server,
  RBAC: Shield,
  Git: GitBranch,
  TypeScript: Code,
  Python: Code,
  Docker: Server,
  'GitHub Actions': GitBranch,
};

export const Experience: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="experience" className="section-wrapper" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-accent-purple border border-accent-purple/30 bg-accent-purple/10">
            Experience
          </span>
          <h2 className="section-title">Professional Journey</h2>
          <p className="section-subtitle mt-4">
            Hands-on frontend development experience from internships at tech companies, building real-world applications with modern tech stacks.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-purple/30 via-accent-cyan/30 to-transparent hidden md:block" />
          
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative mb-10"
            >
              <div className="absolute left-6 top-2 w-4 h-4 rounded-full border-2 bg-bg-primary z-10"
                style={{ borderColor: index % 2 === 0 ? '#8b5cf6' : '#06b6d4' }}
              />
              
              <div className="ml-14 md:ml-20">
                <GlassCard hover className="p-6 relative">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-accent-cyan mb-2">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary">{exp.role}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-muted whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                        {exp.period}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-accent-teal/10 text-accent-teal border border-accent-teal/20">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <motion.li
                        key={bulletIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * bulletIndex, duration: 0.3 }}
                        className="flex items-start gap-3 text-text-secondary leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => {
                      const Icon = techIcons[tech];
                      return (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.05 * techIndex, duration: 0.2 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            color: '#8b5cf6',
                          }}
                        >
                          {Icon && <Icon className="w-3 h-3" />}
                          {tech}
                        </motion.span>
                      );
                    })}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute left-6 bottom-0 w-4 h-4 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan"
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;