// src/components/ui/Section.tsx
import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ title, description, children, className }: SectionProps) => (
  <div className={`mb-8 ${className}`}>
    <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
    {description && <p className="text-gray-600 mb-4">{description}</p>}
    {children}
  </div>
);