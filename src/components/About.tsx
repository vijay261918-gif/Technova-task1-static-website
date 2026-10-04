import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Briefcase, Target, CheckCircle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { useIntersectionObserver } from '../hooks/useScrollSpy';

const metadata = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.Tech CSE (2023–2027)',
    subValue: 'CGPA: 8.65',
  },
  {
    icon: Target,
    label: 'Focus',
    value: 'Frontend Development',
    subValue: 'React · Node.js · AI/ML',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    subValue: 'Remote friendly',
  },
  {
    icon: Briefcase,
    label: 'Availability',
    value: 'Open to opportunities',
    subValue: 'Internships · Full-time',
  },
];

export const About: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="about" className="section-wrapper" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-accent-purple border border-accent-purple/30 bg-accent-purple/10">
            About Me
          </span>
          <h2 className="section-title">Introduction</h2>
          <p className="section-subtitle mt-4">
            Passionate Computer Science Engineering student with a strong foundation in programming, data structures, and web development. Proficient in web development with hands-on experience from internships and academic projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metadata.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <GlassCard hover className="h-full p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider">{item.label}</p>
                    <p className="text-text-primary font-medium">{item.value}</p>
                    <p className="text-text-muted text-sm">{item.subValue}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent-teal" />
              Key Strengths
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Strong problem-solving skills with DSA foundation',
                'Hands-on experience with React, Node.js, and REST APIs',
                'Experience with RBAC, authentication & authorization',
                'Familiar with cloud concepts (AWS Technical Essentials certified)',
                'AI/ML interest with practical hackathon experience',
                'Collaborative team player with hackathon leadership',
                'Continuous learner — NPTEL Elite certifications',
                'Clean code practices with Git/GitHub workflow',
              ].map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent-teal flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{strength}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;