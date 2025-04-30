import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import BigButton from '../components/BigButton';

const Game: React.FC = () => {
  const router = useRouter();
  const showCongratulations = true; // This should be controlled by state
  const moves = 10; // This should be controlled by state
  const time = 120; // This should be controlled by state

  const handlePlayAgain = () => {
    // Implement play again logic
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 p-4">
      {showCongratulations && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => router.push('/')}></div>
          
          <div className="w-[90vw] max-w-[420px] relative">
            {/* White container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[32px] w-full h-[400px] flex flex-col items-center justify-center"
            >
              <div className="text-center w-full px-8">
                <div className="flex items-center justify-center mb-16">
                  <span className="text-5xl mr-4">🎉</span>
                  <h2 className="text-5xl font-bold text-[#E91E63]">Congratulations!</h2>
                  <span className="text-5xl ml-4">🎉</span>
                </div>
                <p className="text-3xl font-bold text-[#9C27B0] mb-12">
                  You won in {moves} moves and {formatTime(time)}!
                </p>
                <p className="text-2xl text-[#BA68C8]">
                  Amazing job! <span className="text-2xl">⭐</span>
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between gap-3 px-4">
              <BigButton
                onClick={handlePlayAgain}
                icon="🎮"
                size="medium"
                variant="primary"
                className="w-[48%]"
              >
                Play Again
              </BigButton>
              <BigButton
                onClick={() => router.push('/')}
                icon="🏠"
                size="medium"
                variant="secondary"
                className="w-[48%]"
              >
                Home
              </BigButton>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Game; 