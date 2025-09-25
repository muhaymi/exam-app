import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Question } from "../services/gemini";

const Exam: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { questions?: Question[] } | null;
  const questions = state?.questions ?? [];

  // ✅ Redirect aman dalam useEffect
  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/");
    }
  }, [questions, navigate]);

  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [feedback, setFeedback] = useState<(null | "benar" | "salah")[]>(
    Array(questions.length).fill(null)
  );

  const handleAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    const newFeedback = [...feedback];
    newFeedback[index] =
      value.trim().toLowerCase() === questions[index].jawaban.trim().toLowerCase()
        ? "benar"
        : "salah";
    setFeedback(newFeedback);
  };

  const finishExam = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i].trim().toLowerCase() === q.jawaban.trim().toLowerCase()) {
        score++;
      }
    });
    navigate("/result", { state: { score, total: questions.length } });
  };

  // Kalau lagi redirect, jangan render UI
  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">📝 Latihan Dimulai</h1>

        {questions.map((q, idx) => (
          <div key={idx} className="bg-white shadow-lg rounded-2xl p-6 mb-6 transition">
            {/* Progress per soal */}
            <p className="text-sm text-gray-500 mb-2">
              Soal {idx + 1} dari {questions.length}
            </p>

            <h2 className="text-lg font-semibold mb-4">
              {idx + 1}. {q.soal}
            </h2>

            <div className="space-y-3">
              {q.opsi.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center p-3 border rounded-xl cursor-pointer transition
                    ${
                      answers[idx] === opt
                        ? "bg-indigo-100 border-indigo-500"
                        : "hover:bg-indigo-50"
                    }`}
                >
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt}
                    checked={answers[idx] === opt}
                    onChange={(e) => handleAnswer(idx, e.target.value)}
                    className="mr-3 accent-indigo-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {feedback[idx] && (
              <div
                className={`mt-3 p-3 rounded-xl font-semibold transition-all duration-300 ${
                  feedback[idx] === "benar"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {feedback[idx] === "benar" ? "✅ Jawaban Benar!" : "❌ Jawaban Salah!"}
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
          disabled={answers.some((a) => a === "")}
          className={`mt-6 w-full py-3 rounded-xl font-semibold shadow-md transition-all duration-200
            ${
              answers.some((a) => a === "")
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            }`}
        >
          Selesai Tes
        </button>
      </div>
    </div>
  );
};

export default Exam;
