import "./card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: object;
}

export const Card: React.FC<CardProps> = ({ children, className = "", style = {} }) => {
  return <div className={`card ${className}`} style={style}>{children}</div>;
};
