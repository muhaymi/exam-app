import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Question } from "../services/gemini";

const Exam: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions } = location.state as { questions: Question[] };

  // 🔹 State untuk menyimpan jawaban user
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));

  // 🔹 State baru: untuk menyimpan feedback tiap soal
  // null = belum jawab, "benar" atau "salah"
  const [feedback, setFeedback] = useState<(null | "benar" | "salah")[]>(
    Array(questions.length).fill(null)
  );

  // 🔹 Fungsi dipanggil saat user pilih jawaban
  const handleAnswer = (index: number, value: string) => {
    // Simpan jawaban user
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    // Cek jawaban benar atau salah
    if (value.trim().toLowerCase() === questions[index].jawaban.trim().toLowerCase()) {
      const newFeedback = [...feedback];
      newFeedback[index] = "benar"; // tandai benar
      setFeedback(newFeedback);
    } else {
      const newFeedback = [...feedback];
      newFeedback[index] = "salah"; // tandai salah
      setFeedback(newFeedback);
    }
  };

  // 🔹 Fungsi saat user klik tombol "Selesai Ujian"
  const finishExam = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i].trim().toLowerCase() === q.jawaban.trim().toLowerCase()) {
        score++;
      }
    });
    navigate("/result", { state: { score, total: questions.length } });
  };

  return (
    <div className="card">
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">📝 Latihan Dimulai</h1>

          {questions.map((q, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {idx + 1}. {q.soal}
              </h2>

              {/* 🔹 Kalau soal punya opsi (pilihan ganda) */}
              {/* {q.opsi.length > 0 ? ( */}
                <div className="space-y-3">
                  {q.opsi.map((opt, i) => (
                    <label
                      key={i}
                      className="flex items-center p-3 border rounded-xl cursor-pointer hover:bg-indigo-50 transition"
                    >
                      <input
                        type="radio"
                        name={`q-${idx}`} // radio per soal
                        value={opt}
                        checked={answers[idx] === opt}
                        onChange={(e) => handleAnswer(idx, e.target.value)} // cek jawaban saat dipilih
                        className="mr-3 accent-indigo-600"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              {/* ) : (
                // 🔹 Kalau soal essay
                <textarea
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-400"
                  placeholder="Tulis jawabanmu di sini..."
                  value={answers[idx]}
                  onChange={(e) => handleAnswer(idx, e.target.value)}
                />
              )} */}

              {/* 🔹 Feedback benar/salah langsung tampil */}
              {feedback[idx] && (
                <div
                  className={`mt-3 p-3 rounded-xl font-semibold ${
                    feedback[idx] === "benar"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {feedback[idx] === "benar" ? "✅ Jawaban Benar!" : "❌ Jawaban Salah!"}
                  {/* kalau soal punya pembahasan */}
                  {q.pembahasan && (
                    <p className="mt-2 text-sm text-gray-700">
                      <strong>Pembahasan:</strong> {q.pembahasan}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={finishExam}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 shadow-md"
          >
            Selesai tes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exam;
