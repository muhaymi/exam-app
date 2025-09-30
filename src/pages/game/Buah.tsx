import { useState, useEffect } from "react";
import GameBoard from "../../components/Game/GameBoard";
import { shuffleArray } from "../../utils/shuffle";
import ResultModal from "../../components/Game/ResultModal";

// 🔊 helper hook untuk play sound
const useSound = (url: string) => {
  const audio = new Audio(url);
  return () => {
    audio.currentTime = 0; // reset biar bisa diputar berulang
    audio.play();
  };
};

const fruitCards: FruitCard[] = [
  { id: 1, name: "Apel", emoji: "🍎", info: "Kaya vitamin C untuk daya tahan tubuh." },
  { id: 2, name: "Pisang", emoji: "🍌", info: "Sumber energi cepat dari karbohidrat." },
  { id: 3, name: "Anggur", emoji: "🍇", info: "Mengandung antioksidan tinggi." },
  { id: 4, name: "Jeruk", emoji: "🍊", info: "Baik untuk kulit dan imunitas." },
  { id: 5, name: "Mangga", emoji: "🥭", info: "Rasanya manis dan kaya vitamin A." },
  { id: 6, name: "Semangka", emoji: "🍉", info: "Segar dengan kandungan air tinggi." },
];

function Buah() {
  const [cards, setCards] = useState<FruitCard[]>([]);
  const [firstChoice, setFirstChoice] = useState<FruitCard | null>(null);
  const [secondChoice, setSecondChoice] = useState<FruitCard | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [gameStatus, setGameStatus] = useState<
    "idle" | "playing" | "win" | "lose" | "nextLevel"
  >("idle");

  const [discoveredItems, setDiscoveredItems] = useState<MatchItem[]>([]);
  const [level, setLevel] = useState<number>(1);

  // ⭐ NEW - skor
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem("flipcard_highscore");
    return saved ? parseInt(saved, 10) : 0;
  });

  // 🔊 sound hooks
  const playFlip = useSound("/sounds/flip.mp3");
  const playMatch = useSound("/sounds/match.mp3");
  const playWin = useSound("/sounds/win.mp3");
  const playLose = useSound("/sounds/lose.mp3");

  // hitung jumlah pasangan (max level 5 → 6 pasang = 12 kartu)
  const getPairCount = () => Math.min(level + 1, 6);

  const startGame = () => {
    const pairCount = getPairCount();
    const selected = fruitCards.slice(0, pairCount);
    const duplicated = [...selected, ...selected].map((card, idx) => ({
      ...card,
      uniqueId: idx,
    }));
    const shuffled = shuffleArray(duplicated);

    setCards(shuffled);
    setMatched([]);
    setDiscoveredItems([]);
    setFirstChoice(null);
    setSecondChoice(null);

    const baseTime = 20;
    const extraTime = (Math.min(level, 5) - 1) * 5;
    setTimeLeft(baseTime + extraTime);

    setGameStatus("playing");
  };

  // handle choice
  const handleChoice = (card: FruitCard) => {
    if (disabled || gameStatus !== "playing") return;
    playFlip(); // 🔊 bunyi flip
    if (!firstChoice) {
      setFirstChoice(card);
    } else if (card.uniqueId !== firstChoice.uniqueId) {
      setSecondChoice(card);
    }
  };

  // restart full
  const restartFromBeginning = () => {
    setLevel(1);
    setScore(0); // ⭐ reset skor
    setGameStatus("idle");
  };

  // compare 2 selected cards
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.name === secondChoice.name) {
        setMatched((prev) => [...prev, firstChoice.name]);

        // ⭐ tambah skor
        setScore((prev) => prev + 10);

        // 🔊 bunyi match
        playMatch();

        // simpan info buah
        setDiscoveredItems((prev) => {
          if (prev.find((item) => item.name === firstChoice.name)) {
            return prev;
          }
          return [
            ...prev,
            {
              name: firstChoice.name,
              emoji: firstChoice.emoji,
              info: firstChoice.info,
            },
          ];
        });
      }

      setTimeout(() => {
        setFirstChoice(null);
        setSecondChoice(null);
        setDisabled(false);
      }, 1000);
    }
  }, [firstChoice, secondChoice]);

  // check win
  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length / 2) {
      setGameStatus("nextLevel");
      playWin(); // 🔊 bunyi win
    }
  }, [matched, cards]);

  // timer
  useEffect(() => {
    if (gameStatus === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && gameStatus === "playing") {
      setGameStatus("lose");
      playLose(); // 🔊 bunyi lose
    }
  }, [timeLeft, gameStatus]);

  // ⭐ update highscore tiap kali skor naik
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("flipcard_highscore", score.toString());
    }
  }, [score, highScore]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">🎮 Flip Card Buah</h1>
      <p className="mb-2">Level: {level}</p>
      <p className="mb-2">⭐ Skor: {score} | 🏆 High Score: {highScore}</p>

      {/* ⭐ MOD: Tampilan saat idle */}
      {gameStatus === "idle" && (
        <div className="space-y-4 mb-4">
          <details className="bg-gray-100 rounded p-3">
            <summary className="cursor-pointer font-semibold">
              📘 Tentang Game
            </summary>
            <div className="mt-2 text-sm text-gray-700 space-y-2">
              <p>
                🎮 <b>Flip Card Buah</b> adalah game mencocokkan pasangan kartu buah.
              </p>
              <ul className="list-disc list-inside">
                <li>Setiap level jumlah kartu bertambah (maksimal 12 kartu).</li>
                <li>Waktu juga bertambah hingga level 5.</li>
                <li>
                  Setelah level 5, jumlah kartu & waktu tetap, tapi skor terus bertambah.
                </li>
                <li>Skor tertinggi akan tersimpan otomatis.</li>
              </ul>
              <p>🏆 Tantang dirimu untuk mengalahkan skor tertinggi!</p>
            </div>
          </details>

          <button
            onClick={startGame}
            className="px-4 py-2 bg-blue-500 text-white rounded w-full"
          >
            Mulai Game
          </button>
        </div>
      )}

      {/* Timer saat playing */}
      {gameStatus === "playing" && (
        <div className="mb-4 font-semibold">⏱️ Time Left: {timeLeft}s</div>
      )}

      {/* Board */}
      {cards.length > 0 && (
        <GameBoard
          cards={cards}
          handleChoice={handleChoice}
          firstChoice={firstChoice}
          secondChoice={secondChoice}
          matched={matched}
        />
      )}

      {/* Modal hasil */}
      {gameStatus !== "idle" && gameStatus !== "playing" && (
        <ResultModal
          status={gameStatus}
          onRestart={startGame}
          onReset={restartFromBeginning}
          discoveredItems={discoveredItems}
          onNextLevel={() => {
            setLevel((prev) => prev + 1);
            startGame();
          }}
          level={level}
          score={score}        // ⭐
          highScore={highScore} // ⭐
        />
      )}
    </div>
  );
}

export default Buah;
