import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
  variant?: 'default' | 'subtle' | 'panel';
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = false,
  interactive = false,
  variant = 'default',
  onClick,
  style,
}) => {
  const variantClasses = {
    default: 'glass-card',
    subtle: 'glass-card-subtle',
    panel: 'glass-panel',
  };

  const baseClasses = `${variantClasses[variant]} relative overflow-hidden`;
  const hoverClasses = hover ? 'glass-card-hover' : '';
  const interactiveClasses = interactive ? 'cursor-pointer' : '';
  const clickHandler = onClick ? { onClick } : {};

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${interactiveClasses} ${className}`}
      style={style}
      {...clickHandler}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface GlassCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCardHeader: React.FC<GlassCardHeaderProps> = ({
  children,
  className = '',
}) => (
  <div className={`flex items-center justify-between mb-4 ${className}`}>{children}</div>
);

interface GlassCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCardTitle: React.FC<GlassCardTitleProps> = ({
  children,
  className = '',
}) => (
  <h3 className={`text-xl font-semibold text-text-primary ${className}`}>{children}</h3>
);

interface GlassCardSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCardSubtitle: React.FC<GlassCardSubtitleProps> = ({
  children,
  className = '',
}) => (
  <p className={`text-text-secondary text-sm ${className}`}>{children}</p>
);

interface GlassCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCardContent: React.FC<GlassCardContentProps> = ({
  children,
  className = '',
}) => <div className={className}>{children}</div>;

interface GlassCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCardFooter: React.FC<GlassCardFooterProps> = ({
  children,
  className = '',
}) => (
  <div className={`flex items-center gap-3 mt-4 pt-4 border-t border-bg-border ${className}`}>
    {children}
  </div>
);

/* Glow card variant for special highlights */
export const GlowCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  ...props
}) => (
  <div className={`glass-card relative overflow-hidden ${hover ? 'glass-card-hover' : ''} ${className}`} {...props}>
    <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-cyan/10 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 via-transparent to-accent-pink/5 pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
);

/* Interactive card with ripple effect */
export const InteractiveCard: React.FC<GlassCardProps & { accentColor?: string }> = ({
  children,
  className = '',
  accentColor = '#8b5cf6',
  ...props
}) => {
  const [ripple, setRipple] = React.useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    props.onClick?.(e);
  };

  return (
    <GlassCard
      variant="default"
      hover
      interactive
      onClick={handleClick}
      className={`${className} overflow-hidden`}
      {...props}
    >
      {ripple && (
        <motion.div
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            marginLeft: '-10px',
            marginTop: '-10px',
            background: `radial-gradient(circle, ${accentColor}40, transparent)`,
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-cyan/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </GlassCard>
  );
};