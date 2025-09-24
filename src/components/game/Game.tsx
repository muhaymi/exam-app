import { useEffect, useState } from "react";
import Card from "./Card";

type Item = {
  name: string;
  icon: string;
  info: string;
};

const allItems: Item[] = [
  { name: "Apel", icon: "Apple", info: "Apel kaya akan serat dan vitamin C." },
  { name: "Pepper", icon: "Pepper", info: "Cabai mengandung capsaicin." },
  { name: "Carrot", icon: "Carrot", info: "Wortel baik untuk mata." },
  { name: "Leaf", icon: "Leaf", info: "Sayuran hijau kaya akan vitamin." },
  { name: "Grape", icon: "Grape", info: "Anggur mengandung antioksidan." },
  { name: "Cherry", icon: "Cherry", info: "Ceri kaya akan vitamin A." },
  { name: "Lemon", icon: "Lemon", info: "Lemon menyegarkan dan kaya vitamin C." },
  { name: "Sprout", icon: "Sprout", info: "Kecambah kaya protein nabati." },
  { name: "Wheat", icon: "Wheat", info: "Gandum sumber energi yang baik." },
  { name: "Eggplant", icon: "Eggplant", info: "Terong kaya serat." },
  { name: "Orange", icon: "Orange", info: "Jeruk sumber vitamin C." },
  { name: "Mushroom", icon: "Mushroom", info: "Jamur rendah kalori dan tinggi protein." },
];

type GameProps = {
  maxLevel: number;
  backToMenu: () => void;
};

type CardType = Item & { id: number };

export default function Game({ maxLevel, backToMenu }: GameProps) {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [popup, setPopup] = useState<Item | null>(null);

  const flipSound = new Audio("/flip.mp3");
  const matchSound = new Audio("/match.mp3");
  const winSound = new Audio("/win.mp3");

  useEffect(() => {
    startLevel();
  }, [level]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const startLevel = () => {
    const gridSize = Math.min(level + 1, 6); // naik otomatis, max grid 6
    const numPairs = (gridSize * gridSize) / 2;
    const chosen = [...allItems].sort(() => 0.5 - Math.random()).slice(0, numPairs);
    const newCards = [...chosen, ...chosen]
      .map((item, index) => ({ ...item, id: index }))
      .sort(() => 0.5 - Math.random());

    setCards(newCards);
    setMatched([]);
    setFlipped([]);
    setScore(0);
    setTimeLeft(level * 30);
  };

  const handleFlip = (id: number) => {
    if (flipped.length === 2 || matched.includes(id)) return;
    flipSound.currentTime = 0;
    flipSound.play();

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped.map((fid) => cards.find((c) => c.id === fid)!);
      if (first.name === second.name) {
        setMatched([...matched, first.id, second.id]);
        setScore((s) => s + 1);
        matchSound.currentTime = 0;
        matchSound.play();
        setPopup(first);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  const nextLevel = () => {
    setPopup(null);
    if (level < maxLevel) {
      setLevel(level + 1);
    } else {
      winSound.currentTime = 0;
      winSound.play();
      alert("🎉 Selamat! Kamu telah menyelesaikan semua level!");
      backToMenu();
    }
  };

  if (timeLeft <= 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl mb-4">⏰ Waktu Habis!</h2>
        <button onClick={backToMenu} className="bg-red-500 px-4 py-2 rounded text-white">
          Kembali ke Menu
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex justify-between items-center w-full max-w-md mx-auto mb-4">
        <button onClick={backToMenu} className="text-green-700 font-bold">⬅ Menu</button>
        <h4>Skor: {score} | Level: {level}/{maxLevel}</h4>
        <h4>⏱ {timeLeft}s</h4>
      </div>

      <div
        className="grid gap-2 justify-center"
        style={{ gridTemplateColumns: `repeat(${Math.min(level + 1, 6)}, 60px)` }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={flipped.includes(card.id) || matched.includes(card.id)}
            onFlip={() => handleFlip(card.id)}
          />
        ))}
      </div>

      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-left max-w-sm">
            <h2 className="text-2xl mb-2">{popup.name}</h2>
            <p className="mb-4">{popup.info}</p>
            <button onClick={nextLevel} className="bg-green-600 text-white px-4 py-2 rounded-lg">
              Lanjut ke Level Berikutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
