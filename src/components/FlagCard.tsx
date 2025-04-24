import React from 'react';
import { motion } from 'framer-motion';

interface FlagCardProps {
  country: string;
  flagUrl: string;
  isFlipped?: boolean;
  onClick?: () => void;
  className?: string;
}

const FlagCard: React.FC<FlagCardProps> = ({
  country,
  flagUrl,
  isFlipped = false,
  onClick,
  className = '',
}) => {
  return (
    <motion.div
      className={`relative w-32 h-48 cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden"
        style={{
          backfaceVisibility: 'hidden',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full bg-white flex items-center justify-center">
          <img
            src={flagUrl}
            alt={`Flag of ${country}`}
            className="w-full h-full object-contain p-2"
          />
        </div>
      </motion.div>
      {!isFlipped && (
        <motion.div
          className="absolute w-full h-full rounded-xl bg-blue-500 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white text-xl font-bold">?</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FlagCard; 