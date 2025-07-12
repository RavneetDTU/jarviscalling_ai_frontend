// src/components/ui/Tag.tsx
import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success';
  className?: string;
}

export const Tag = ({ children, variant = 'primary', className = '' }: TagProps) => {
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};