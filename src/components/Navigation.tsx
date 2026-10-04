import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { portfolioData } from '../data/portfolioData';
import { Button } from './ui/Button';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'exploring', label: 'Exploring' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sections.map(s => s.id), 200);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = portfolioData.resumeDownload;
    link.download = 'VIJAYARAJ_V_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 glass-panel"
      >
        <nav className="section-container" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-semibold text-xl text-text-primary"
            >
              VIJAYARAJ <span className="text-accent-purple">V</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-1">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.08 * (index + 1), duration: 0.4, type: 'spring', stiffness: 300 }}
                  onClick={() => scrollTo(section.id)}
                  className={`nav-link relative px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    activeId === section.id 
                      ? 'text-text-primary bg-accent-purple/10 border border-accent-purple/20 shadow-glow-purple/10' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
                  }`}
                  aria-current={activeId === section.id ? 'page' : undefined}
                >
                  {section.label}
                  {activeId === section.id && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-full"
                      style={{ background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }}
                    />
                  )}
                </motion.button>
              ))}
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={handleDownloadResume}
                className="ml-2"
              >
                Download Resume
              </Button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownloadResume}
                className="hidden sm:flex"
              >
                <Download className="w-4 h-4" />
              </Button>
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="glass-card p-2 glass-card-hover"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-6 h-6 text-accent-cyan" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden overflow-hidden glass-panel border-t border-accent-purple/20"
            >
              <div className="section-container py-6 space-y-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, type: 'spring', stiffness: 300 }}
                    onClick={() => scrollTo(section.id)}
                    className={`nav-link w-full text-left justify-start rounded-lg px-4 py-3 ${
                      activeId === section.id 
                        ? 'text-text-primary bg-accent-purple/10 border border-accent-purple/20' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
                    }`}
                    aria-current={activeId === section.id ? 'page' : undefined}
                  >
                    {section.label}
                  </motion.button>
                ))}
                <Button
                  variant="secondary"
                  fullWidth
                  leftIcon={<Download className="w-4 h-4" />}
                  onClick={handleDownloadResume}
                  className="mt-4"
                >
                  Download Resume
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, staggerChildren: 0.1 }}
        className="fixed bottom-8 right-8 z-40 flex flex-col gap-3 md:hidden"
        role="navigation"
        aria-label="Social links"
      >
        <motion.a
          href={portfolioData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-3 glass-card-hover group"
          aria-label="GitHub"
          whileHover={{ scale: 1.1, rotate: 3 }}
        >
          <Github className="w-5 h-5 text-accent-cyan group-hover:scale-110 transition-transform" />
        </motion.a>
        <motion.a
          href={portfolioData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-3 glass-card-hover group"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.1, rotate: -3 }}
        >
          <Linkedin className="w-5 h-5 text-accent-blue group-hover:scale-110 transition-transform" />
        </motion.a>
        <motion.a
          href={`mailto:${portfolioData.email}`}
          className="glass-card p-3 glass-card-hover group"
          aria-label="Email"
          whileHover={{ scale: 1.1 }}
        >
          <Mail className="w-5 h-5 text-accent-pink group-hover:scale-110 transition-transform" />
        </motion.a>
      </motion.div>
    </>
  );
};

export default Navigation;