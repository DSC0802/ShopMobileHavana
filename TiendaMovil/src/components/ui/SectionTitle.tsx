import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        {title}
      </h2>
      <p className="text-lg text-slate-700 dark:text-slate-300">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;