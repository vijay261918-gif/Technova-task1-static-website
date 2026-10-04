import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, ExternalLink, Trophy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GlassCard } from './ui/GlassCard';
import { useIntersectionObserver } from '../hooks/useScrollSpy';

export const Certifications: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="certifications" className="section-wrapper" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-accent-purple border border-accent-purple/30 bg-accent-purple/10">
            Certifications
          </span>
          <h2 className="section-title">Certifications & Achievements</h2>
          <p className="section-subtitle mt-4">
            Recognized credentials from premier institutions and platforms validating technical expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <GlassCard hover className="p-6 h-full relative overflow-hidden group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30 flex-shrink-0">
                      <Award className="w-6 h-6 text-accent-purple" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary mb-1">{cert.name}</h3>
                      <p className="text-text-secondary text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {cert.date}
                    </span>
                    {cert.credentialId && (
                      <span className="flex items-center gap-1.5 font-mono">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-bg-border">
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-accent-cyan hover:text-accent-blue transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Verify Credential
                      </a>
                    )}
                    <div className="flex-1" />
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent-teal/10 text-accent-teal border border-accent-teal/20">
                      Verified
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-text-primary flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent-yellow" />
              Hackathon Participation
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20">
              {portfolioData.hackathons.length} Event{portfolioData.hackathons.length > 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="space-y-6">
            {portfolioData.hackathons.map((hackathon, index) => (
              <motion.div
                key={hackathon.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-2xl bg-gradient-to-br from-bg-secondary/50 to-bg-card/50 border border-accent-purple/10"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">{hackathon.name}</h4>
                    <p className="text-accent-cyan text-sm font-medium">{hackathon.project}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20 whitespace-nowrap">
                    {hackathon.date}
                  </span>
                </div>
                
                <div className="mb-4 p-4 rounded-xl bg-bg-primary/50 border border-bg-border">
                  <p className="text-text-secondary text-sm mb-2"><strong>Problem Statement:</strong> {hackathon.problemStatement}</p>
                  <p className="text-text-secondary text-sm"><strong>Role:</strong> {hackathon.role}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.tech.slice(0, 6).map((tech, techIndex) => (
                    <span key={techIndex} className="px-2.5 py-1 rounded text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                      {tech}
                    </span>
                  ))}
                  {hackathon.tech.length > 6 && (
                    <span className="px-2.5 py-1 rounded text-xs font-medium text-text-muted bg-bg-secondary border border-bg-border">
                      +{hackathon.tech.length - 6} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-6 text-sm text-text-muted pt-4 border-t border-bg-border">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    Team of {hackathon.teamSize}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    {hackathon.tech.length} technologies
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;