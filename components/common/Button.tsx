// components/common/Button.tsx
import React from 'react';

// Define the props for the Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  // Base styles applicable to all variants
  const baseStyles = 'px-6 py-2.5 rounded-lg font-semibold text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg';

  // Variant-specific styles
  const variantStyles = {
    primary: 'bg-brand-accent text-white hover:bg-opacity-90 focus:ring-brand-accent',
    secondary: 'bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
