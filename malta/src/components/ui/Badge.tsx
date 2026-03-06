import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors';
  
  const variantClasses = {
    default: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    primary: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    secondary: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
