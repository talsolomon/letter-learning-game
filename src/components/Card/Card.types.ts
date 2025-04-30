export interface CardProps {
  children: React.ReactNode;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
} 