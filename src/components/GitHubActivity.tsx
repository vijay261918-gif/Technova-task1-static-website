import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, Code, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GlassCard } from './ui/GlassCard';
import { useIntersectionObserver } from '../hooks/useScrollSpy';

const topRepos = [
  { name: 'innovexaa-sih2026', description: 'AI-powered agricultural marketplace for SIH 2026', stars: 12, language: 'TypeScript', private: false },
  { name: 'password-manager', description: 'Secure password manager with RBAC', stars: 8, language: 'JavaScript', private: false },
  { name: 'women-safety-app', description: 'Location-based safety app with risk zones', stars: 5, language: 'JavaScript', private: false },
  { name: 'gst-portal', description: 'GST portal with govt API integration', stars: 3, language: 'TypeScript', private: false },
];

const repoLanguages = [
  { name: 'JavaScript', color: '#f1e05a' },
  { name: 'TypeScript', color: '#2b7489' },
  { name: 'Python', color: '#3572A5' },
  { name: 'HTML/CSS', color: '#e34c26' },
  { name: 'Other', color: '#8b5cf6' },
];

export const GitHubActivity: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="github" className="section-wrapper" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-accent-purple border border-accent-purple/30 bg-accent-purple/10">
            GitHub
          </span>
          <h2 className="section-title">GitHub Profile</h2>
          <p className="section-subtitle mt-4">
            Open source contributions, personal projects, and development statistics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary flex items-center gap-2">
                <Code className="w-5 h-5 text-accent-teal" />
                Pinned Repositories
              </h3>
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent-cyan hover:text-accent-blue transition-colors font-medium flex items-center gap-1"
              >
                View All <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {topRepos.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 rounded-xl bg-bg-secondary/50 border border-bg-border hover:border-accent-purple/30 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center">
                        <Github className="w-5 h-5 text-accent-cyan" />
                      </div>
                      <span className="font-mono font-medium text-text-primary">{repo.name}</span>
                      {!repo.private && (
                        <span className="px-1.5 py-0.5 rounded text-xs text-accent-teal bg-accent-teal/10 border border-accent-teal/20">
                          Public
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-sm group-hover:text-accent-cyan transition-colors">
                      <Star className="w-3.5 h-3.5" />
                      <span>{repo.stars}</span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm mb-3 line-clamp-2">{repo.description}</p>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repoLanguages.find(l => l.name === repo.language)?.color || '#8b5cf6' }} />
                      {repo.language}
                    </span>
                    <a
                      href={`${portfolioData.github}/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-accent-cyan transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-bg-border text-center">
              <p className="text-text-secondary mb-4">Want to see more projects and contributions?</p>
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-accent-purple to-accent-cyan hover:from-accent-cyan hover:to-accent-purple transition-all duration-300 shadow-glow-purple"
              >
                <Github className="w-5 h-5" />
                Visit GitHub Profile
              </a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;