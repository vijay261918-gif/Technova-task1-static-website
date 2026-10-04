import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Code, Terminal, Zap, Database, Cloud } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';
import { useReducedMotion } from '../hooks/useScrollSpy';

interface TerminalCommand {
  prompt: string;
  output: string;
  type: 'instant' | 'type' | 'list';
  speed?: number;
  items?: { name: string; color: string }[];
}

const terminalCommands: TerminalCommand[] = [
  { prompt: 'whoami', output: portfolioData.name, type: 'instant' },
  { prompt: 'current_stack', output: 'React | Node.js | TypeScript | Python | MySQL | AWS | Docker | Git', type: 'type', speed: 15 },
  { prompt: 'status', output: 'Building scalable systems...', type: 'type', speed: 20 },
];

export const Hero: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [commandIndex, setCommandIndex] = useState(0);
  const [currentOutput, setCurrentOutput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [completedCommands, setCompletedCommands] = useState<TerminalCommand[]>([]);
  const cursorIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const typeIntervalRef = useRef<ReturnType<typeof setTimeout>>();
  const charIndexRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorIntervalRef.current);
  }, []);

  const executeNextCommand = useCallback(() => {
    setCommandIndex(prevIndex => {
      if (prevIndex >= terminalCommands.length) return prevIndex;

      const cmd = terminalCommands[prevIndex];
      
      if (reducedMotion || cmd.type === 'instant') {
        setCompletedCommands(prev => [...prev, { ...cmd, output: cmd.output }]);
        return prevIndex + 1;
      }

      if (cmd.type === 'type') {
        const fullOutput = cmd.output;
        charIndexRef.current = 0;
        setCurrentOutput('');
        
        const typeChar = () => {
          if (charIndexRef.current < fullOutput.length) {
            setCurrentOutput(fullOutput.slice(0, charIndexRef.current + 1));
            charIndexRef.current++;
            typeIntervalRef.current = setTimeout(typeChar, cmd.speed || 15);
          } else {
            setCompletedCommands(prev => [...prev, { ...cmd, output: fullOutput }]);
            setCommandIndex(prev => prev + 1);
            setCurrentOutput('');
            charIndexRef.current = 0;
          }
        };
        typeIntervalRef.current = setTimeout(typeChar, cmd.speed || 15);
        return prevIndex;
      } else if (cmd.type === 'list') {
        setCompletedCommands(prev => [...prev, { ...cmd, output: '', items: cmd.items }]);
        return prevIndex + 1;
      }
      return prevIndex;
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setCompletedCommands(terminalCommands);
      setCommandIndex(terminalCommands.length);
      return;
    }
    if (startedRef.current) return;
    startedRef.current = true;
    
    const timer = setTimeout(() => {
      executeNextCommand();
    }, 800);
    return () => clearTimeout(timer);
  }, [reducedMotion, executeNextCommand]);

  useEffect(() => {
    if (commandIndex < terminalCommands.length && !reducedMotion) {
      const cmd = terminalCommands[commandIndex];
      const delay = cmd.type === 'instant' ? 300 : cmd.type === 'type' ? 600 : 1000;
      const timer = setTimeout(() => executeNextCommand(), delay);
      return () => clearTimeout(timer);
    }
  }, [commandIndex, reducedMotion, executeNextCommand]);

  const handleDownloadResume = () => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const link = document.createElement('a');
    link.href = `${baseUrl}resume_vijay.pdf`;
    link.download = 'VIJAYARAJ_V_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden section-wrapper">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent-purple/10 blur-3xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-accent-cyan/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 rounded-full bg-accent-pink/10 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15))',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#8b5cf6',
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              Computer Science Engineering Student
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Hello, I'm{' '}
              <span className="text-gradient-name">VIJAYARAJ V</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg sm:text-xl text-text-secondary max-w-xl mb-8 leading-relaxed"
            >
              {portfolioData.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button
                size="lg"
                leftIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
                onClick={handleDownloadResume}
              >
                Download Resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-6 text-sm text-text-muted"
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-accent-cyan" />
                <span>Frontend Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent-purple" />
                <span>React · Node.js · Python</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent-pink" />
                <span>AI/ML Enthusiast</span>
              </div>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {[
                { label: 'React', icon: Code, color: '#61dafb' },
                { label: 'Node.js', icon: Database, color: '#68a063' },
                { label: 'TypeScript', icon: Code, color: '#3178c6' },
                { label: 'Python', icon: Terminal, color: '#3776ab' },
                { label: 'AWS', icon: Cloud, color: '#ff9900' },
                { label: 'Docker', icon: Database, color: '#2496ed' },
              ].map((tech, i) => (
                <motion.span
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3, type: 'spring', stiffness: 300 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${tech.color}15, ${tech.color}25)`,
                    border: `1px solid ${tech.color}40`,
                    color: tech.color,
                  }}
                >
                  <tech.icon className="w-3 h-3" />
                  {tech.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <GlassCard hover className="relative overflow-hidden" style={{ minHeight: '480px' }}>
              {/* Terminal header bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-bg-border bg-bg-secondary/50 relative z-10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-bg-primary/50 border border-bg-border">
                    <Terminal className="w-4 h-4 text-accent-cyan" />
                    <span className="font-mono text-xs text-text-secondary">terminal.tsx</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                  <kbd className="px-1.5 py-0.5 rounded bg-bg-primary border border-bg-border">Ctrl</kbd>
                  <span className="text-accent-purple/50">+</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-bg-primary border border-bg-border">`</kbd>
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-4 font-mono text-sm leading-relaxed min-h-[380px] relative z-10">
                <AnimatePresence mode="wait">
                  {completedCommands.map((cmd, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="mb-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="terminal-prompt flex-shrink-0">$ </span>
                        <span className="terminal-output whitespace-pre-wrap">{cmd.prompt}</span>
                      </div>
                      {cmd.type === 'list' && cmd.items ? (
                        <div className="ml-4 mt-1 flex flex-wrap gap-2">
                          {cmd.items?.map((item, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9, y: 5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.05 * i, duration: 0.2 }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
                              style={{
                                background: `${item.color}15`,
                                border: `1px solid ${item.color}40`,
                                color: item.color,
                              }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                              {item.name}
                            </motion.span>
                          ))}
                        </div>
                      ) : (
                        <div className="ml-4 text-text-primary whitespace-pre-wrap">
                          {currentOutput && index === commandIndex - 1 ? currentOutput : cmd.output}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Current typing line */}
                <motion.div
                  initial={false}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <span className="terminal-prompt">$ </span>
                  <span className="terminal-output">{currentOutput}</span>
                  {showCursor && <span className="terminal-cursor animate-pulse">█</span>}
                </motion.div>

                {/* Status bar */}
                <div className="absolute bottom-0 left-0 right-0 pt-4 border-t border-bg-border flex items-center justify-between px-4 pb-4 text-xs text-text-muted">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        className="w-2 h-2 rounded-full bg-accent-purple"
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span>Active</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                      <span>Connected</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-accent-teal" />
                      <span>Ready</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-accent-purple/50">
                    <span className="font-mono">~/portfolio</span>
                    <span>$</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Stats cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 grid grid-cols-3 gap-4 text-center"
            >
              <GlassCard hover className="p-4 glass-card-hover group">
                <div className="text-2xl font-bold text-accent-cyan group-hover:scale-110 transition-transform duration-300">2+</div>
                <div className="text-xs text-text-muted">Internships</div>
              </GlassCard>
              <GlassCard hover className="p-4 glass-card-hover group">
                <div className="text-2xl font-bold text-accent-purple group-hover:scale-110 transition-transform duration-300">4</div>
                <div className="text-xs text-text-muted">Projects</div>
              </GlassCard>
              <GlassCard hover className="p-4 glass-card-hover group">
                <div className="text-2xl font-bold text-accent-teal group-hover:scale-110 transition-transform duration-300">4</div>
                <div className="text-xs text-text-muted">Certifications</div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;