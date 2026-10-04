import React from 'react';

interface SkillChipProps {
  children: React.ReactNode;
  category?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SkillChip: React.FC<SkillChipProps> = ({
  children,
  category = false,
  className = '',
  onClick,
}) => {
  const baseClasses = category ? 'skill-chip-category' : 'skill-chip';
  const clickHandler = onClick ? { onClick, role: 'button', tabIndex: 0 } : {};

  return (
    <span className={`${baseClasses} ${className}`} {...clickHandler}>
      {children}
    </span>
  );
};

interface SkillGroupProps {
  title: string;
  skills: string[];
  category?: boolean;
  className?: string;
}

export const SkillGroup: React.FC<SkillGroupProps> = ({
  title,
  skills,
  category = false,
  className = '',
}) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    <span className="skill-chip-category text-xs font-semibold uppercase tracking-wider mb-2 block w-full">
      {title}
    </span>
    {skills.map((skill, index) => (
      <SkillChip key={`${title}-${index}`} category={category}>
        {skill}
      </SkillChip>
    ))}
  </div>
);