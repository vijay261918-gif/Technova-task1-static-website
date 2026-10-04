import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CurrentlyExploring } from './components/CurrentlyExploring';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { GitHubActivity } from './components/GitHubActivity';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Background } from './components/Background';
import { ErrorBoundary } from './components/ErrorBoundary';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none"
      style={{ background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #14b8a6)' }}
    >
      <motion.div
        style={{ width: `${progress * 100}%`, transformOrigin: 'left center' }}
        className="h-full"
        animate={{ scaleX: progress }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </motion.div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <>
        <Background />
        <ScrollProgress />
        <Navigation />
        <main className="relative z-10">
          <Hero />
          <About />
          <CurrentlyExploring />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <GitHubActivity />
          <Contact />
        </main>
        <Footer />
      </>
    </ErrorBoundary>
  );
}

export default App;