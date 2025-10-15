import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  href, 
  onClick, 
  primary = false,
  className = ''
}) => {
  const baseClasses = "inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out";
  
  const styleClasses = primary
    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
    : "bg-transparent hover:bg-slate-100 text-slate-900 border border-slate-300 hover:border-slate-400 dark:text-white dark:border-slate-700 dark:hover:bg-slate-800";

  const classes = `${baseClasses} ${styleClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;