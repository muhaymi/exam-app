import Card from "./Card";

interface GameBoardProps {
  cards: FruitCard[];
  handleChoice: (card: FruitCard) => void;
  firstChoice: FruitCard | null;
  secondChoice: FruitCard | null;
  matched: string[];
}

function GameBoard({ cards, handleChoice, firstChoice, secondChoice, matched }: GameBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {cards.map((card) => (
        <Card
          key={card.uniqueId}
          card={card}
          handleChoice={handleChoice}
          flipped={
            card === firstChoice ||
            card === secondChoice ||
            matched.includes(card.name)
          }
        />
      ))}
    </div>
  );
}

export default GameBoard;
