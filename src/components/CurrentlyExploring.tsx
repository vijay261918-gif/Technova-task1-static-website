import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Brain, Code, ArrowRight } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { useIntersectionObserver } from '../hooks/useScrollSpy';

const exploringItems = [
  {
    title: 'Cloud Computing',
    icon: Cloud,
    color: '#3b82f6',
    description: [
      'AWS Solutions Architecture',
      'Serverless & Container Orchestration',
      'Infrastructure as Code (Terraform)',
    ],
    tag: 'AWS Certified',
    cta: 'Explore Cloud',
  },
  {
    title: 'AI / Machine Learning',
    icon: Brain,
    color: '#ec4899',
    description: [
      'LLM Fine-tuning & RAG Systems',
      'Computer Vision Applications',
      'MLOps & Model Deployment',
    ],
    tag: 'Learning',
    cta: 'View Projects',
  },
  {
    title: 'Full Stack Development',
    icon: Code,
    color: '#22c55e',
    description: [
      'React/Next.js Advanced Patterns',
      'TypeScript & System Design',
      'Real-time Applications',
    ],
    tag: 'Building',
    cta: 'See Code',
  },
];

export const CurrentlyExploring: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="exploring" className="section-wrapper" ref={ref}>
      <div className="section-container">
        <div className="dashboard-card h-full">
          <GlassCard className="dashboard-card-content flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Currently Exploring</span>
          
          <div className="grid gap-4">
            {exploringItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="p-4 rounded-xl bg-bg-secondary/50 border border-bg-border hover:border-accent-purple/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl flex-shrink-0" style={{
                    background: `${item.color}20`,
                    border: `1px solid ${item.color}40`,
                  }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                    <ul className="text-sm text-text-secondary space-y-1 mb-3">
                      {item.description.map((desc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                          {desc}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-3">
                      <span className="tag" style={{
                        background: `${item.color}20`,
                        borderColor: `${item.color}40`,
                        color: item.color,
                      }}>
                        {item.tag}
                      </span>
                      <button className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent-cyan transition-colors">
                        {item.cta}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </GlassCard>
    </div>
      </div>
    </section>
  );
};

export default CurrentlyExploring;