import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Cloud, Wrench, Sparkles, BarChart2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GlassCard } from './ui/GlassCard';
import { SkillGroup } from './ui/SkillChip';
import { useIntersectionObserver } from '../hooks/useScrollSpy';
import { useReducedMotion } from '../hooks/useScrollSpy';

const skillCategories = [
  {
    key: 'languages',
    label: 'Programming Languages',
    icon: Code,
    color: { from: '#8b5cf6', to: '#3b82f6' },
    skills: portfolioData.skills.languages,
  },
  {
    key: 'frontend',
    label: 'Frontend',
    icon: Code,
    color: { from: '#3b82f6', to: '#06b6d4' },
    skills: portfolioData.skills.frontend,
  },
  {
    key: 'backend',
    label: 'Backend',
    icon: Server,
    color: { from: '#06b6d4', to: '#14b8a6' },
    skills: portfolioData.skills.backend,
  },
  {
    key: 'databases',
    label: 'Databases',
    icon: Database,
    color: { from: '#14b8a6', to: '#10b981' },
    skills: portfolioData.skills.databases,
  },
  {
    key: 'cloud',
    label: 'Cloud & DevOps',
    icon: Cloud,
    color: { from: '#f97316', to: '#ec4899' },
    skills: portfolioData.skills.cloud,
  },
  {
    key: 'tools',
    label: 'Tools & Technologies',
    icon: Wrench,
    color: { from: '#ec4899', to: '#8b5cf6' },
    skills: portfolioData.skills.tools,
  },
  {
    key: 'interests',
    label: 'Areas of Interest',
    icon: Sparkles,
    color: { from: '#8b5cf6', via: '#ec4899', to: '#06b6d4' },
    skills: portfolioData.skills.interests,
  },
];

const languages = [
  { name: 'JavaScript', percentage: 35, color: '#f1e05a' },
  { name: 'TypeScript', percentage: 25, color: '#2b7489' },
  { name: 'Python', percentage: 20, color: '#3572A5' },
  { name: 'HTML/CSS', percentage: 15, color: '#e34c26' },
  { name: 'Other', percentage: 5, color: '#8b5cf6' },
];

export const Skills: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; opacity: number }>>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initParticles = () => {
      const newParticles: Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; opacity: number }> = [];
      const count = Math.min(reducedMotion ? 0 : 50, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 1,
          color: ['#8b5cf6', '#06b6d4', '#14b8a6', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 5)],
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      particlesRef.current = newParticles;
    };

    initParticles();

    const animate = () => {
      if (reducedMotion) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = 0.05 * (1 - distance / 120);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (!reducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [reducedMotion]);

  return (
    <section id="skills" className="section-wrapper" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 text-accent-purple border border-accent-purple/30 bg-accent-purple/10">
            Skills
          </span>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle mt-4">
            Technologies and tools I work with to build modern, scalable applications.
          </p>
        </motion.div>

        <div className="relative mb-10">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
              >
                <GlassCard hover className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${category.color.from}20, ${category.color.to}20)`,
                        border: `1px solid ${category.color.from}40`,
                      }}
                    >
                      <category.icon className="w-5 h-5" style={{ color: category.color.from }} />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">{category.label}</h3>
                  </div>
                  
                  <SkillGroup
                    title=""
                    skills={category.skills}
                    className="space-y-2"
                  />
                  
                  {category.key === 'interests' && (
                    <p className="mt-4 text-xs text-text-muted">
                      Actively exploring and building projects in these domains
                    </p>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <GlassCard className="p-6 md:p-8">
            <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-accent-teal" />
              Language Distribution
            </h3>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: lang.color }} />
                      <span className="font-medium text-text-primary">{lang.name}</span>
                    </div>
                    <span className="text-text-muted">{lang.percentage}%</span>
                  </div>
                  <div className="h-2.5 bg-bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ delay: 0.1 * index, duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full relative"
                      style={{ background: `linear-gradient(90deg, ${lang.color}, ${lang.color}dd)` }}
                    >
                      <div 
                        className="absolute right-0 top-0 h-full w-4 bg-gradient-to-r from-transparent to-white/20"
                        style={{ opacity: lang.percentage > 15 ? 1 : 0 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-pink" />
              Currently Learning
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Cloud Computing',
                'Artificial Intelligence and Machine Learning',
                'Docker',
                'Kubernetes',
                'Terraform',
                'CI/CD Pipeline',
              ].map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15))',
                    border: '1px solid rgba(236, 72, 153, 0.2)',
                    color: '#ec4899',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;