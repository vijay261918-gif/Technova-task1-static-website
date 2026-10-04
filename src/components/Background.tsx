import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useScrollSpy';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'star' | 'orb' | 'node';
  pulse: number;
  pulseSpeed: number;
}

interface CircuitLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  color: string;
  progress: number;
  speed: number;
}

interface MousePos {
  x: number;
  y: number;
}

interface LightningBolt {
  segments: Array<{ x: number; y: number }>;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
  width: number;
  branchChance: number;
}

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const particlesRef = useRef<Particle[]>([]);
  const circuitLinesRef = useRef<CircuitLine[]>([]);
  const lightningBoltsRef = useRef<LightningBolt[]>([]);
  const mousePosRef = useRef<MousePos>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const initParticles = () => {
      const newParticles: Particle[] = [];
      const baseCount = Math.floor((window.innerWidth * window.innerHeight) / 12000);
      const particleCount = Math.min(isMobileRef.current ? 50 : 100, baseCount);
      
      for (let i = 0; i < particleCount; i++) {
        const rand = Math.random();
        let type: Particle['type'] = 'star';
        let size = Math.random() * 1.5 + 0.3;
        let speed = (Math.random() - 0.5) * 0.4;
        
        if (rand > 0.9) {
          type = 'orb';
          size = Math.random() * 4 + 2;
          speed = (Math.random() - 0.5) * 0.15;
        } else if (rand > 0.75) {
          type = 'node';
          size = Math.random() * 2.5 + 1;
          speed = (Math.random() - 0.5) * 0.25;
        }

        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX: speed,
          speedY: speed,
          opacity: Math.random() * 0.4 + 0.1,
          color: Math.random() > 0.6 ? '#8b5cf6' : Math.random() > 0.35 ? '#06b6d4' : '#14b8a6',
          type,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }
      particlesRef.current = newParticles;
    };

    const initCircuitLines = () => {
      const newLines: CircuitLine[] = [];
      const lineCount = Math.min(isMobileRef.current ? 10 : 20, Math.floor(window.innerWidth / 80));
      
      for (let i = 0; i < lineCount; i++) {
        const x1 = Math.random() * canvas.width;
        const y1 = Math.random() * canvas.height;
        const length = Math.random() * 300 + 100;
        const angle = Math.random() * Math.PI * 2;
        
        newLines.push({
          x1,
          y1,
          x2: x1 + Math.cos(angle) * length,
          y2: y1 + Math.sin(angle) * length,
          opacity: Math.random() * 0.1 + 0.03,
          color: Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4',
          progress: Math.random(),
          speed: Math.random() * 0.002 + 0.0005,
        });
      }
      circuitLinesRef.current = newLines;
    };

    const spawnLightning = () => {
      if (reducedMotion) return;
      if (Math.random() < 0.008 && lightningBoltsRef.current.length < (isMobileRef.current ? 2 : 4)) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height * 0.3);
        const segments: Array<{ x: number; y: number }> = [{ x: startX, y: startY }];
        
        let currentX = startX;
        let currentY = startY;
        const segmentCount = Math.floor(Math.random() * 8) + 5;
        
        for (let i = 0; i < segmentCount; i++) {
          currentX += (Math.random() - 0.5) * 80;
          currentY += Math.random() * 60 + 30;
          
          if (Math.random() < 0.3 && i > 1) {
            // Branch
            const branchSegments = [...segments];
            let bx = currentX;
            let by = currentY;
            for (let b = 0; b < Math.floor(Math.random() * 3) + 2; b++) {
              bx += (Math.random() - 0.5) * 40;
              by += Math.random() * 30 + 15;
              branchSegments.push({ x: bx, y: by });
            }
            lightningBoltsRef.current.push({
              segments: branchSegments,
              opacity: 1,
              life: 0,
              maxLife: 0.15,
              color: Math.random() > 0.5 ? '#a855f7' : '#06b6d4',
              width: 1.5,
              branchChance: 0,
            });
          }
          
          segments.push({ x: currentX, y: currentY });
          
          if (currentY > canvas.height) break;
        }
        
        lightningBoltsRef.current.push({
          segments,
          opacity: 1,
          life: 0,
          maxLife: 0.15,
          color: Math.random() > 0.5 ? '#a855f7' : '#06b6d4',
          width: 2.5,
          branchChance: 0.3,
        });
      }
    };

    initParticles();
    initCircuitLines();

    const animate = () => {
      if (reducedMotion) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      timeRef.current += 0.016;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Multi-layer gradient background with purple lightning glow
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.2,
        0,
        canvas.width * 0.2,
        canvas.height * 0.2,
        Math.max(canvas.width, canvas.height) * 0.8
      );
      gradient1.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
      gradient1.addColorStop(0.5, 'rgba(168, 85, 247, 0.04)');
      gradient1.addColorStop(1, 'transparent');

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.7,
        0,
        canvas.width * 0.8,
        canvas.height * 0.7,
        Math.max(canvas.width, canvas.height) * 0.8
      );
      gradient2.addColorStop(0, 'rgba(168, 85, 247, 0.06)');
      gradient2.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      gradient2.addColorStop(1, 'transparent');

      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.6
      );
      gradient3.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
      gradient3.addColorStop(1, 'rgba(5, 5, 16, 1)');

      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn lightning occasionally
      spawnLightning();

      // Draw and update lightning bolts
      lightningBoltsRef.current = lightningBoltsRef.current.filter(bolt => {
        bolt.life += 0.016;
        const progress = bolt.life / bolt.maxLife;
        
        if (progress >= 1) return false;
        
        bolt.opacity = 1 - progress;
        
        ctx.beginPath();
        ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);
        
        for (let i = 1; i < bolt.segments.length; i++) {
          ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
        }
        
        // Main bolt glow
        const glowGradient = ctx.createLinearGradient(
          bolt.segments[0].x, bolt.segments[0].y,
          bolt.segments[bolt.segments.length - 1].x, bolt.segments[bolt.segments.length - 1].y
        );
        glowGradient.addColorStop(0, `${bolt.color}00`);
        glowGradient.addColorStop(0.5, `${bolt.color}${Math.round(bolt.opacity * 200).toString(16).padStart(2, '0')}`);
        glowGradient.addColorStop(1, `${bolt.color}00`);
        
        ctx.strokeStyle = glowGradient;
        ctx.globalAlpha = bolt.opacity;
        ctx.lineWidth = bolt.width + 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = bolt.color;
        ctx.shadowBlur = 20;
        ctx.stroke();
        
        // Core bolt
        ctx.strokeStyle = bolt.color;
        ctx.globalAlpha = bolt.opacity * 0.9;
        ctx.lineWidth = bolt.width;
        ctx.shadowBlur = 10;
        ctx.stroke();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        return true;
      });

      // Draw circuit lines with animation
      circuitLinesRef.current.forEach(line => {
        line.progress += line.speed;
        if (line.progress > 1) line.progress = 0;

        const currX = line.x1 + (line.x2 - line.x1) * line.progress;
        const currY = line.y1 + (line.y2 - line.y1) * line.progress;

        // Draw full line faintly
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = line.color;
        ctx.globalAlpha = line.opacity * 0.3;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw animated segment
        const segLength = 80;
        const startProgress = Math.max(0, line.progress - segLength / Math.hypot(line.x2 - line.x1, line.y2 - line.y1));
        const startX = line.x1 + (line.x2 - line.x1) * startProgress;
        const startY = line.y1 + (line.y2 - line.y1) * startProgress;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = line.color;
        ctx.globalAlpha = line.opacity * 2;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      ctx.globalAlpha = 1;

      // Draw connections between nearby particles
      const particles = particlesRef.current;
      const shouldDrawConnections = !isMobileRef.current && particles.length <= 80;
      
      if (shouldDrawConnections) {
        const gridSize = 150;
        const grid = new Map<string, Particle[]>();
        
        particles.forEach(particle => {
          const gridX = Math.floor(particle.x / gridSize);
          const gridY = Math.floor(particle.y / gridSize);
          const key = `${gridX},${gridY}`;
          if (!grid.has(key)) grid.set(key, []);
          grid.get(key)!.push(particle);
        });
        
        particles.forEach((particle) => {
          const gridX = Math.floor(particle.x / gridSize);
          const gridY = Math.floor(particle.y / gridSize);
          
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const key = `${gridX + dx},${gridY + dy}`;
              const neighbors = grid.get(key);
              if (!neighbors) continue;
              
              neighbors.forEach(otherParticle => {
                if (otherParticle === particle) return;
                
                const dx2 = particle.x - otherParticle.x;
                const dy2 = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (distance < 150) {
                  const opacity = 0.08 * (1 - distance / 150);
                  ctx.beginPath();
                  ctx.moveTo(particle.x, particle.y);
                  ctx.lineTo(otherParticle.x, otherParticle.y);
                  ctx.strokeStyle = particle.color;
                  ctx.globalAlpha = opacity;
                  ctx.lineWidth = 0.5;
                  ctx.stroke();
                }
              });
            }
          }
        });
      }

      // Draw particles with mouse interaction
      particles.forEach((particle) => {
        // Mouse attraction/repulsion
        const dx = mousePosRef.current.x - particle.x;
        const dy = mousePosRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 0.5;
          particle.x += (dx / dist) * force * (particle.type === 'orb' ? 0.3 : 1);
          particle.y += (dy / dist) * force * (particle.type === 'orb' ? 0.3 : 1);
        }

        // Normal movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Pulse animation
        particle.pulse += particle.pulseSpeed;

        // Draw based on type
        if (particle.type === 'star') {
          const pulseSize = particle.size + Math.sin(particle.pulse) * 0.3;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity * (0.7 + Math.sin(particle.pulse) * 0.3);
          ctx.fill();

          // Glow effect
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (particle.type === 'orb') {
          const pulseSize = particle.size + Math.sin(particle.pulse) * 1;
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, pulseSize
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = particle.opacity * 0.15;
          ctx.fill();
        } else if (particle.type === 'node') {
          const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
          
          // Outer ring
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize + 2, 0, Math.PI * 2);
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = particle.opacity * 0.3;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Inner dot
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.opacity * 0.8;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (!reducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      particlesRef.current = [];
      circuitLinesRef.current = [];
      lightningBoltsRef.current = [];
    };
  }, [reducedMotion]);

  const noiseSvg = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E";

  const lightningSvg = (color: string, opacity: number) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 400'%3E%3Cpath d='M100,0 L130,80 L110,80 L140,160 L90,160 L120,240 L70,240 L100,320 L60,320 L90,400 L100,400 L100,0' fill='${color}' opacity='${opacity}'/%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='3' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/svg%3E`;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary opacity-70" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url(${noiseSvg})` }} />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: 'inset 0 0 200px rgba(0,0,0,0.5)',
        borderRadius: 'inherit',
      }} />
      
      {/* Purple lightning ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-accent-purple/10 via-transparent to-transparent rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-gradient-to-t from-accent-purple/10 via-transparent to-transparent rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />

      {/* Fixed position thunder strikes - purple */}
      <div className="absolute top-1/4 left-10 w-[120px] h-[240px] opacity-20 pointer-events-none animate-float" style={{ 
        animationDuration: '6s', 
        backgroundImage: `url(${lightningSvg('#8b5cf6', 0.6)})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} />
      <div className="absolute top-1/3 right-20 w-[100px] h-[200px] opacity-15 pointer-events-none animate-float" style={{ 
        animationDuration: '7s', 
        animationDelay: '1s',
        backgroundImage: `url(${lightningSvg('#a855f7', 0.5)})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} />
      
      {/* Fixed position thunder strikes - yellow/gold */}
      <div className="absolute bottom-1/3 left-20 w-[140px] h-[280px] opacity-15 pointer-events-none animate-float" style={{ 
        animationDuration: '8s', 
        animationDelay: '2s',
        backgroundImage: `url(${lightningSvg('#eab308', 0.5)})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} />
      <div className="absolute bottom-1/4 right-10 w-[80px] h-[160px] opacity-20 pointer-events-none animate-float" style={{ 
        animationDuration: '5s', 
        animationDelay: '0.5s',
        backgroundImage: `url(${lightningSvg('#fde047', 0.6)})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} />
      
      {/* Cross diagonal lightning accents */}
      <div className="absolute top-20 right-1/3 w-[60px] h-[120px] opacity-10 pointer-events-none" style={{ 
        transform: 'rotate(-15deg)',
        backgroundImage: `url(${lightningSvg('#8b5cf6', 0.4)})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} />
      <div className="absolute bottom-20 left-1/3 w-[60px] h-[120px] opacity-10 pointer-events-none" style={{ 
        transform: 'rotate(15deg)',
        backgroundImage: `url(${lightningSvg('#eab308', 0.4)})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} />
      
      {/* Center subtle lightning burst */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] opacity-5 pointer-events-none animate-pulse" style={{ 
        animationDuration: '4s',
        backgroundImage: `url(${lightningSvg('#8b5cf6', 0.3)})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} />
    </div>
  );
};

export default Background;