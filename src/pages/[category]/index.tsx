import React from 'react';
import { useRouter } from 'next/router';
import BigButton from '@/components/BigButton';

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const getTitle = () => {
    switch (category) {
      case 'flags':
        return { text: 'Flags', icon: '🌎' };
      case 'letters':
        return { text: 'Letters', icon: '📝' };
      case 'numbers':
        return { text: 'Numbers', icon: '🔢' };
      default:
        return { text: '', icon: '' };
    }
  };

  const { text, icon } = getTitle();

  if (!text) {
    return null; // or a 404 page
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-purple-100 flex flex-col items-center p-4 sm:p-8">
      {/* Navigation Buttons */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200 text-sm font-bold hover:scale-105 transform flex items-center gap-2"
        >
          <span>🏠</span> Home
        </button>
      </div>

      <div className="text-center mb-8 sm:mb-16 w-full max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-pink-600 mb-4 child-friendly-text flex items-center justify-center gap-4">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl">{icon}</span>
          {text}
        </h1>
      </div>

      <div className="flex flex-col gap-4 sm:gap-8 w-full max-w-md">
        <BigButton
          onClick={() => router.push(`/${category}/learn`)}
          icon="📚"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl child-friendly-button w-full py-8 sm:py-10"
        >
          Learn {text}
        </BigButton>

        <BigButton
          onClick={() => router.push(`/${category}/memory`)}
          icon="🎮"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl child-friendly-button w-full py-8 sm:py-10"
        >
          Memory Game
        </BigButton>
      </div>
    </div>
  );
};

export default CategoryPage; 