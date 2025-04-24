import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import BigButton from '@/components/BigButton';
import { letters } from '@/utils/data/letters';
import { Letter } from '@/utils/types';

type Card = Letter & {
  id: number;
  isMatched: boolean;
};

const LetterMemoryGame: React.FC = () => {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cardCount, setCardCount] = useState<8 | 16 | 36 | 64>(8);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [uniqueLetters, setUniqueLetters] = useState<string[]>([]);

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
    // Randomly select letters based on card count
    const selectedLetters = [...letters]
      .sort(() => Math.random() - 0.5)
      .slice(0, cardCount / 2);

    // Create pairs of cards
    const gamePairs = selectedLetters.flatMap(letter => [
      { ...letter, id: Math.random(), isMatched: false },
      { ...letter, id: Math.random(), isMatched: false }
    ]);

    // Shuffle the pairs
    const shuffledCards = gamePairs.sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setGameWon(false);
    setMoves(0);
    setTimer(0);
    setIsPlaying(true);
    setUniqueLetters(selectedLetters.map(l => l.character));
  };

  const speakLetter = (letter: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCardClick = (cardIndex: number) => {
    if (
      flippedCards.length === 2 || // Don't allow more than 2 cards flipped
      flippedCards.includes(cardIndex) || // Don't allow same card to be flipped
      cards[cardIndex].isMatched // Don't allow matched cards to be flipped
    ) {
      return;
    }

    // Increment moves counter
    setMoves(moves + 1);
  
    // Speak the letter when card is flipped
    speakLetter(cards[cardIndex].character);

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    // If this is the second card flipped
    if (newFlippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = newFlippedCards;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      // Check if the cards match
      if (firstCard.character === secondCard.character) {
        // Mark cards as matched
        const matchedCards = [...cards];
        matchedCards[firstCardIndex].isMatched = true;
        matchedCards[secondCardIndex].isMatched = true;
        setCards(matchedCards);

        const newMatchedPairs = [...matchedPairs, firstCard.character];
        setMatchedPairs(newMatchedPairs);
        
        // Check if game is won
        if (newMatchedPairs.length === uniqueLetters.length) {
          setGameWon(true);
          setIsPlaying(false);
        }
      }
      
      // Clear flipped cards after delay
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
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
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-6 rounded-full shadow-lg transition-all duration-200 text-7xl font-bold hover:scale-105 transform flex items-center gap-3"
        >
          <span>🏠</span> Home
        </button>
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-pink-600 mb-6 animate-bounce-slow">
          🎮 Letter Memory Game 🎮
        </h1>

        {/* Game Stats */}
        <div className="flex gap-8 items-center mb-6 text-lg sm:text-xl bg-white/80 px-8 py-3 rounded-full shadow-md">
          <div className="font-bold text-purple-600">
            🎯 Moves: {moves}
          </div>
          <div className="font-bold text-purple-600">
            ⏰ Time: {formatTime(timer)}
          </div>
        </div>

        {/* Card Count Selection */}
        <div className="flex justify-center gap-4 mb-8">
          {[8, 16, 36, 64].map((count) => (
            <button
              key={count}
              onClick={() => setCardCount(count as 8 | 16 | 36 | 64)}
              className={`px-10 py-6 rounded-full text-7xl font-bold transition-all duration-200 transform hover:scale-105 ${
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
                animate={{ rotateY: card.isMatched ? 180 : 0 }}
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
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-purple-600">
                        {card.character}
                      </div>
                    </div>
                    {card.isMatched && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-lg">
                        <div className="text-center">
                          <span className="text-5xl mb-2">✨</span>
                          <p className="text-xl font-bold text-purple-600">{card.example}</p>
                        </div>
                      </div>
                    )}
                  </div>
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
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-8xl font-bold shadow-lg hover:scale-105 transform transition-all duration-200 px-14 py-8"
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
                <h2 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-6">
                  🎉 Congratulations! 🎉
                </h2>
                <p className="text-2xl sm:text-3xl text-gray-700 mb-8">
                  You won in {moves} moves and {formatTime(timer)}!
                </p>
                <div className="flex justify-center gap-4">
                  <BigButton
                    icon="🔄"
                    onClick={startNewGame}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-8xl font-bold px-14 py-8"
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

export default LetterMemoryGame; 