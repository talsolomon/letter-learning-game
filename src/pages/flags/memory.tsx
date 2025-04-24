import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import BigButton from '@/components/BigButton';
import { flags } from '@/utils/flagData';
import { Flag } from '@/utils/types';

interface Card {
  id: number;
  flag: Flag;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cardCount, setCardCount] = useState<8 | 16 | 36 | 64>(8);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, [cardCount]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameWon]);

  const startNewGame = () => {
    // Select random flags based on card count
    const pairCount = cardCount / 2;
    const selectedFlags = [...flags]
      .sort(() => Math.random() - 0.5)
      .slice(0, pairCount);
    
    const cardPairs = selectedFlags.flatMap((flag, index) => [
      { id: index * 2, flag, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, flag, isFlipped: false, isMatched: false }
    ]);

    setCards(cardPairs.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMoves(0);
    setGameWon(false);
    setTimer(0);
    setIsPlaying(true);
  };

  const speakCountryName = (country: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(country);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCardClick = (cardId: number) => {
    const cardIndex = cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1 || flippedCards.length >= 2 || cards[cardIndex].isFlipped || cards[cardIndex].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);
    
    // Speak the country name when card is flipped
    speakCountryName(cards[cardIndex].flag.country);

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCardIndex, secondCardIndex] = newFlippedCards;
      
      if (cards[firstCardIndex].flag.country === cards[secondCardIndex].flag.country) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstCardIndex].isMatched = true;
          matchedCards[secondCardIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);

          // Check if all cards are matched
          if (matchedCards.every(card => card.isMatched)) {
            setGameWon(true);
            setIsPlaying(false);
          }
        }, 500);
      } else {
        // No match - wait 1 second before flipping back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstCardIndex].isFlipped = false;
          resetCards[secondCardIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGridCols = () => {
    switch (cardCount) {
      case 8: return 'grid-cols-2 sm:grid-cols-4';
      case 16: return 'grid-cols-4 sm:grid-cols-4';
      case 36: return 'grid-cols-6 sm:grid-cols-6';
      case 64: return 'grid-cols-8 sm:grid-cols-8';
      default: return 'grid-cols-2 sm:grid-cols-4';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 p-2 sm:p-4 flex flex-col items-center">
      {/* Navigation Buttons */}
      <div className="absolute top-4 left-4 flex gap-3">
        <button
          onClick={() => router.push('/')}
          className="bg-white/90 hover:bg-white text-pink-600 px-4 py-2 rounded-full shadow-lg transition-all duration-200 text-sm font-bold hover:scale-105 transform flex items-center gap-2"
        >
          <span>🏠</span> Home
        </button>
        <button
          onClick={() => router.push('/flags')}
          className="bg-white/90 hover:bg-white text-pink-600 px-4 py-2 rounded-full shadow-lg transition-all duration-200 text-sm font-bold hover:scale-105 transform flex items-center gap-2"
        >
          <span>←</span> Back
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-pink-600 mb-4 animate-bounce-slow">
          🎮 Memory Game 🎮
        </h1>

        {/* Game Stats */}
        <div className="flex gap-8 items-center mb-6 text-base sm:text-lg bg-white/80 px-6 py-2 rounded-full shadow-md">
          <div className="font-bold text-purple-600">
            🎯 Moves: {moves}
          </div>
          <div className="font-bold text-purple-600">
            ⏰ Time: {formatTime(timer)}
          </div>
        </div>

        {/* Card Count Selection */}
        <div className="flex justify-center gap-3 mb-6">
          {[8, 16, 36, 64].map((count) => (
            <button
              key={count}
              onClick={() => setCardCount(count as 8 | 16 | 36 | 64)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 transform hover:scale-105 ${
                cardCount === count
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
              }`}
            >
              {count} Cards
            </button>
          ))}
        </div>

        {/* Game Board */}
        <div className={`grid ${getGridCols()} gap-3 mb-6 w-full max-w-[90vw] place-items-center`}>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`aspect-[3/2] w-full cursor-pointer rounded-xl shadow-lg overflow-hidden ${
                card.isMatched ? 'opacity-90' : ''
              }`}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Card Back */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center backface-hidden"
                  style={{ transform: 'rotateY(0deg)' }}
                >
                  <span className="text-3xl sm:text-4xl">🌟</span>
                </motion.div>
                
                {/* Card Front */}
                <motion.div 
                  className="absolute inset-0 bg-white flex flex-col items-center justify-center backface-hidden p-2"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <img
                    src={card.flag.flagUrl}
                    alt={`Flag of ${card.flag.country}`}
                    className="w-full h-full object-contain"
                  />
                  {card.isMatched && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90">
                      <span className="text-4xl mb-2">😊</span>
                      <p className="text-sm font-bold text-purple-600 text-center px-1">
                        {card.flag.country}
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Game Controls */}
        <div className="flex justify-center">
          <BigButton
            icon="🔄"
            onClick={startNewGame}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-base sm:text-lg font-bold shadow-lg hover:scale-105 transform transition-all duration-200"
          >
            New Game
          </BigButton>
        </div>

        {/* Win Message */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <h2 className="text-3xl font-bold text-purple-600 mb-4">
                  🎉 Congratulations! 🎉
                </h2>
                <p className="text-xl text-gray-700 mb-6">
                  You won in {moves} moves and {formatTime(timer)}!
                </p>
                <div className="flex justify-center gap-4">
                  <BigButton
                    icon="🔄"
                    onClick={startNewGame}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-base sm:text-lg font-bold"
                  >
                    Play Again
                  </BigButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryGame; 