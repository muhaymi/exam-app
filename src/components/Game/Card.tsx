interface CardProps {
  card: FruitCard;
  handleChoice: (card: FruitCard) => void;
  flipped: boolean;
}

function Card({ card, handleChoice, flipped }: CardProps) {
  const clickHandler = () => {
    handleChoice(card);
  };

  return (
    <div
      onClick={clickHandler}
      className="w-15 h-15 flex items-center justify-center border rounded cursor-pointer"
    >
      {flipped ? (
        <span className="text-2xl">{card.emoji}</span>
      ) : (
        <span className="text-gray-380">❓</span>
      )}
    </div>
  );
}

export default Card;
