import React from 'react';
import { motion } from 'framer-motion';

interface BigButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: string;
  className?: string;
  disabled?: boolean;
}

const BigButton: React.FC<BigButtonProps> = ({ 
  children, 
  onClick, 
  icon, 
  className = '', 
  disabled = false 
}) => {
  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={`
        flex items-center justify-center gap-2
        px-4 py-2
        rounded-xl
        text-white font-bold
        shadow-lg
        transition-all duration-200
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
    >
      {icon && (
        <span className="text-xl">
          {icon}
        </span>
      )}
      <span className="text-base whitespace-nowrap">
        {children}
      </span>
    </motion.button>
  );
};

export default BigButton; 