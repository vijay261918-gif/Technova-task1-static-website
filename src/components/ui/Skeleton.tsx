import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '1rem',
  borderRadius = '0.5rem',
  animation = 'pulse',
}) => {
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-[shimmer_1.5s_infinite]',
    none: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${animationClasses[animation]} ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.1) 25%, rgba(6, 182, 212, 0.1) 50%, rgba(139, 92, 246, 0.1) 75%)',
        backgroundSize: '200% 100%',
      }}
    />
  );
};

interface SkeletonCardProps {
  className?: string;
  lines?: number;
  showImage?: boolean;
  showHeader?: boolean;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  className = '',
  lines = 3,
  showImage = false,
  showHeader = true,
}) => (
  <div className={`glass-card p-6 ${className}`}>
    {showImage && (
      <Skeleton width="100%" height="200px" borderRadius="12px" className="mb-4" animation="wave" />
    )}
    {showHeader && (
      <div className="mb-4 space-y-3">
        <Skeleton width="40%" height="1.5rem" borderRadius="4px" animation="wave" />
        <Skeleton width="60%" height="1rem" borderRadius="4px" animation="pulse" />
      </div>
    )}
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '70%' : '100%'}
          height="1rem"
          borderRadius="4px"
          animation={i % 2 === 0 ? 'wave' : 'pulse'}
        />
      ))}
    </div>
  </div>
);

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        width={i === lines - 1 ? '60%' : '100%'}
        height="1rem"
        borderRadius="4px"
        animation={i % 2 === 0 ? 'wave' : 'pulse'}
      />
    ))}
  </div>
);

interface SkeletonGridProps {
  columns?: 1 | 2 | 3 | 4;
  count?: number;
  className?: string;
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  columns = 3,
  count = 6,
  className = '',
}) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} lines={3} showImage showHeader />
    ))}
  </div>
);

export default Skeleton;