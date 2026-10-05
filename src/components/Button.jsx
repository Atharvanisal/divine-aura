import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2";
  
  const sizeClasses = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-2.5 gap-2",
    lg: "text-base px-8 py-3.5 gap-2.5",
  };

  const variantClasses = {
    primary: "bg-[#9E7A38] hover:bg-[#856529] text-white shadow-sm hover:shadow-md active:scale-95",
    secondary: "bg-transparent border border-[#9E7A38] text-[#856529] hover:bg-[#FAF3E8] active:scale-95",
    light: "bg-white text-espresso border border-[#E8DEC9] hover:bg-[#FAF6F0] shadow-sm hover:shadow active:scale-95",
    dark: "bg-espresso hover:bg-black text-white shadow-sm hover:shadow active:scale-95",
    outlineWhite: "bg-transparent border border-white/60 text-white hover:bg-white/10 active:scale-95"
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
