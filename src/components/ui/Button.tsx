
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    fullWidth = false, 
    icon, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const baseClasses = variant === 'primary' 
      ? 'button-primary'
      : variant === 'secondary'
      ? 'button-secondary'
      : variant === 'danger'
      ? 'button-danger'
      : 'button-outline';
    
    const sizeClasses = size === 'sm' 
      ? 'h-8 px-3 text-sm'
      : size === 'lg'
      ? 'h-12 px-6 text-base'
      : 'h-10 px-4 text-sm';
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          sizeClasses,
          fullWidth ? 'w-full' : '',
          (disabled || isLoading) ? 'opacity-70 cursor-not-allowed' : '',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block animate-spin">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
