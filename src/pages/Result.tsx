import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state as { score: number; total: number };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 p-4">
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">🎉 Hasil Ujian</h1>
        <p className="text-lg text-gray-700 mb-6">
          Skor kamu:{" "}
          <span className="font-semibold text-2xl text-emerald-600">
            {score}
          </span>{" "}
          / {total}
        </p>

        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md"
          onClick={() => navigate("/")}
        >
          Ulangi Ujian
        </button>
      </div>
    </div>
  );
};

export default Result;
