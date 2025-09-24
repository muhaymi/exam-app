import { type FC } from "react";
import * as Icons from "lucide-react";

type CardProps = {
  card: { name: string; icon: string; id: number };
  flipped: boolean;
  onFlip: () => void;
};

const Card: FC<CardProps> = ({ card, flipped, onFlip }) => {
  const IconComponent = (Icons as any)[card.icon] || Icons.HelpCircle;

  return (
    <div
      onClick={onFlip}
      className={`w-14 h-14 rounded-lg cursor-pointer shadow-lg flex items-center justify-center transition 
        ${flipped ? "bg-yellow-100" : "bg-green-500 hover:scale-110"}
      `}
    >
      {flipped ? <IconComponent size={28} className="text-green-800" /> : ""}
    </div>
  );
};

export default Card;
