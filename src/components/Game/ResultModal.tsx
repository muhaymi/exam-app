import MatchList from "./MatchList";

interface ResultModalProps {
    status: "win" | "lose" | "nextLevel";
    onRestart: () => void;
    onReset: () => void;
    onNextLevel?: () => void;
    level?: number;
    discoveredItems: MatchItem[];
    score: number;
    highScore: number;
}

export default function ResultModal({
    status,
    // onRestart,
    onReset,
    onNextLevel,
    level,
    discoveredItems,
    score,
    highScore,
}: ResultModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-h-[85vh] flex flex-col">
                {/* Judul */}
                <h2 className="text-xl font-bold mb-2 text-center">
                    {status === "win" && "🎉 Kamu Menang!"}
                    {status === "lose" && "⏳ Waktu Habis!"}
                    {status === "nextLevel" && `🎉 Level ${level} Selesai!`}
                </h2>

                {/* Skor */}
                <div className="text-center mb-4">
                    <p className="font-semibold">⭐ Skor: {score}</p>
                    <p className="text-gray-600">🏆 High Score: {highScore}</p>
                </div>

                {/* Info Buah */}
                <p className="mb-2">📘 Info Buah yang Kamu Temukan:</p>
                <div className="overflow-y-auto flex-1">
                    <MatchList items={discoveredItems} />
                </div>

                {/* Tombol Aksi */}
                {status === "win" && (
                    <button
                        onClick={onReset}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Main Lagi
                    </button>
                )}

                {status === "lose" && (
                    <button
                        onClick={onReset}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Coba Lagi
                    </button>
                )}

                {status === "nextLevel" && (
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={onReset}
                            className="flex-1 px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Selesai
                        </button>
                        {/* <button
                            onClick={onRestart}
                            className="flex-1 px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Ulang Level
                        </button> */}
                        <button
                            onClick={onNextLevel}
                            className="flex-1 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Lanjut Level {level! + 1}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
