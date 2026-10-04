import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Database, Server, Cpu, Cloud, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GlassCard } from './ui/GlassCard';
import { useIntersectionObserver } from '../hooks/useScrollSpy';

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'React.js': Code,
  TypeScript: Code,
  'Node.js': Server,
  FastAPI: Server,
  Python: Code,
  'AI/ML': Cpu,
  PostgreSQL: Database,
  MongoDB: Database,
  'Maps API': MapPin,
  Docker: Cloud,
  'GitHub Actions': Code,
  'Mobile Development': Code,
  'Google Maps API': MapPin,
  'Location Tracking': MapPin,
  'Risk Classification': Cpu,
  RBAC: Code,
  'UI Design': Code,
  Frontend: Code,
  MySQL: Database,
  'API Integration': Server,
  Testing: Code,
  Documentation: Code,
};

const getTechColor = (tech: string) => {
  const colors: Record<string, string> = {
    'React.js': '#61dafb',
    TypeScript: '#3178c6',
    'Node.js': '#68a063',
    FastAPI: '#009688',
    Python: '#3776ab',
    'AI/ML': '#ff6b6b',
    PostgreSQL: '#336791',
    MongoDB: '#47a248',
    'Maps API': '#4285f4',
    Docker: '#2496ed',
    'GitHub Actions': '#2088ff',
    'Mobile Development': '#3ddc84',
    'Google Maps API': '#4285f4',
    'Location Tracking': '#ff9800',
    'Risk Classification': '#ff6b6b',
    RBAC: '#9c27b0',
    'UI Design': '#e91e63',
    Frontend: '#61dafb',
    MySQL: '#4479a1',
    'API Integration': '#ff5722',
    Testing: '#00bcd4',
    Documentation: '#607d8b',
  };
  return colors[tech] || '#8b5cf6';
};

export const Projects: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const featuredProject = portfolioData.projects.find(p => p.featured);
  const otherProjects = portfolioData.projects.filter(p => !p.featured);

  return (
    <section id="projects" className="section-wrapper" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-accent-purple border border-accent-purple/30 bg-accent-purple/10">
            Projects
          </span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle mt-4">
            Real-world applications built during internships, hackathons, and academic projects.
          </p>
        </motion.div>

        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <GlassCard hover className="p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-purple/10 to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-accent-purple mb-3">
                  <span className="px-2 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-medium">
                    Featured Project
                  </span>
                  <span className="px-2 py-1 rounded-full bg-accent-teal/10 border border-accent-teal/20 text-xs font-medium text-accent-teal">
                    SIH 2026 Nominee
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{featuredProject.name}</h3>
                <p className="text-text-secondary leading-relaxed mb-6 max-w-3xl">{featuredProject.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tech.map((tech, index) => {
                    const Icon = techIcons[tech];
                    const color = getTechColor(tech);
                    return (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.03 * index }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: `linear-gradient(135deg, ${color}15, ${color}25)`,
                          border: `1px solid ${color}40`,
                          color: color,
                        }}
                      >
                        {Icon && <Icon className="w-3 h-3" />}
                        {tech}
                      </motion.span>
                    );
                  })}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-bg-border">
                  <div className="text-sm text-text-muted">
                    <span className="font-medium text-text-primary">{featuredProject.role}</span>
                    <span className="mx-2">·</span>
                    <span>{featuredProject.period}</span>
                  </div>
                  <div className="flex items-center gap-3 ml-auto">
                    {featuredProject.github && (
                      <a
                        href={featuredProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-2 glass-card-hover"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-5 h-5 text-text-secondary" />
                      </a>
                    )}
                    {featuredProject.live && (
                      <a
                        href={featuredProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-2 glass-card-hover"
                        aria-label="View Live Demo"
                      >
                        <ExternalLink className="w-5 h-5 text-text-secondary" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-text-primary mb-6">Other Projects</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <GlassCard hover className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4 className="text-lg font-semibold text-text-primary flex-1">{project.name}</h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-card p-1.5 glass-card-hover"
                          aria-label={`View ${project.name} on GitHub`}
                        >
                          <Github className="w-4 h-4 text-text-muted hover:text-accent-cyan transition-colors" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-card p-1.5 glass-card-hover"
                          aria-label={`View ${project.name} live`}
                        >
                          <ExternalLink className="w-4 h-4 text-text-muted hover:text-accent-cyan transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 6).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.15)',
                          color: '#a5a3c8',
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 6 && (
                      <span className="px-2 py-0.5 rounded text-xs font-medium text-text-muted bg-bg-secondary border border-bg-border">
                        +{project.tech.length - 6} more
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-bg-border text-xs text-text-muted">
                    <span className="font-medium text-text-primary">{project.role}</span>
                    <span className="mx-2">·</span>
                    <span>{project.period}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;