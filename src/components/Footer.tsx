import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Code } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-bg-border bg-bg-secondary/30">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="font-semibold text-xl text-text-primary">
              VIJAYARAJ <span className="text-accent-purple">V</span>
            </span>
            <span className="text-text-muted text-sm">Portfolio</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-bg-card/50 border border-bg-border hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-text-secondary hover:text-accent-cyan transition-colors" />
            </a>
            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-bg-card/50 border border-bg-border hover:border-accent-blue/50 hover:bg-accent-blue/10 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-text-secondary hover:text-accent-blue transition-colors" />
            </a>
            <a
              href={`mailto:${portfolioData.email}`}
              className="p-2 rounded-lg bg-bg-card/50 border border-bg-border hover:border-accent-pink/50 hover:bg-accent-pink/10 transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-text-secondary hover:text-accent-pink transition-colors" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-text-muted text-sm">
              © {currentYear} VIJAYARAJ V. Built with
              {' '}
              <span className="flex inline-flex items-center gap-1">
                <Heart className="w-3 h-3 text-accent-pink" />
                <Code className="w-3 h-3 text-accent-cyan" />
              </span>
              {' '}
              React + TypeScript + Tailwind
            </p>
            <p className="text-text-muted text-xs mt-1">
              Designed for performance, accessibility & developer experience
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-8 border-t border-bg-border text-center"
        >
          <p className="text-text-muted text-sm">
            <strong className="text-text-primary">Open to opportunities</strong> —
            Frontend Development · React · Node.js · AI/ML · Cloud
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;