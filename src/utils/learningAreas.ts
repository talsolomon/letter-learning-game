import { LearningArea } from './types';

export const learningAreas: LearningArea[] = [
  {
    id: 'flags',
    title: 'Flags',
    description: 'Learn flags from around the world!',
    icon: '🌎',
    path: '/flags',
    type: 'flags',
    color: 'from-pink-500 via-purple-500 to-indigo-500',
  },
  {
    id: 'letters',
    title: 'Letters',
    description: 'Master the alphabet!',
    icon: '📝',
    path: '/letters',
    type: 'letters',
    color: 'from-pink-500 via-purple-500 to-indigo-500',
  },
  {
    id: 'numbers',
    title: 'Numbers',
    description: 'Learn to count and recognize numbers!',
    icon: '🔢',
    path: '/numbers',
    type: 'numbers',
    color: 'from-pink-500 via-purple-500 to-indigo-500',
  },
]; 