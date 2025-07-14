import React from 'react';
import { Button } from '../ui/Button';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface TouchFriendlyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const TouchFriendlyButton: React.FC<TouchFriendlyButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <Button
      {...props}
      className={`min-h-[44px] px-6 py-3 text-base font-medium ${className}`}
    >
      {children}
    </Button>
  );
};