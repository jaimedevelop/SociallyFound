import React from 'react';
import { Input } from '../ui/Input';
import { TouchFriendlyButton } from './TouchFriendlyButton';

interface MobileFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export const MobileForm: React.FC<MobileFormProps> = ({
  children,
  onSubmit,
  className = ''
}) => {
  return (
    <form 
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
    >
      {children}
    </form>
  );
};

interface MobileInputProps {
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export const MobileInput: React.FC<MobileInputProps> = ({
  className = '',
  ...props
}) => {
  return (
    <Input
      {...props}
      className={`min-h-[48px] text-base px-4 py-3 ${className}`}
    />
  );
};