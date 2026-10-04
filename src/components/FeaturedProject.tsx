import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Database, Server, Cpu, Cloud, MapPin, Star, Award, ArrowUpRight } from 'lucide-react';
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

export const FeaturedProject: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const featuredProject = portfolioData.projects.find(p => p.featured);

  if (!featuredProject) return null;

  return (
    <div className="dashboard-card h-full" ref={ref}>
      <GlassCard className="dashboard-card-content flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Featured Project</span>
          
          <div className="relative overflow-hidden rounded-2xl h-full flex flex-col">
            <GlassCard className="p-5 md:p-6 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-accent-purple/10 to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="px-2 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-medium text-accent-purple">
                    <Star className="w-3 h-3" />
                    Featured Project
                  </span>
                  <span className="px-2 py-1 rounded-full bg-accent-teal/10 border border-accent-teal/20 text-xs font-medium text-accent-teal">
                    <Award className="w-3 h-3" />
                    SIH 2026 Nominee
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4">{featuredProject.name}</h3>
                <p className="text-text-secondary leading-relaxed mb-5 flex-1">{featuredProject.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {featuredProject.tech.map((tech, index) => {
                    const Icon = techIcons[tech];
                    const color = getTechColor(tech);
                    return (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.03 * index, duration: 0.3 }}
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

                <div className="mt-auto pt-4 border-t border-bg-border">
                  <div className="text-sm text-text-muted mb-3">
                    <span className="font-medium text-text-primary">{featuredProject.role}</span>
                    <span className="mx-2">·</span>
                    <span>{featuredProject.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {featuredProject.github && (
                      <a
                        href={featuredProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-text-primary bg-gradient-to-r from-accent-purple/10 to-accent-cyan/10 border border-accent-purple/20 hover:from-accent-purple/20 hover:to-accent-cyan/20 hover:border-accent-cyan/40 transition-all duration-300"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-4 h-4 text-accent-cyan" />
                        <span>Code</span>
                      </a>
                    )}
                    {featuredProject.live && (
                      <a
                        href={featuredProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-accent-purple to-accent-cyan hover:from-accent-cyan hover:to-accent-purple transition-all duration-300 shadow-glow-purple"
                        aria-label="View Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {(!featuredProject.github && !featuredProject.live) && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-text-muted bg-bg-secondary/50 border border-bg-border">
                        <span>Links coming soon</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
};

export default FeaturedProject;