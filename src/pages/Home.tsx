import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuestions, type Question } from "../services/gemini";


const Home: React.FC = () => {
  const [banyak, setBanyak] = useState(0);
  const [kategori, setKategori] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const startExam = async () => {
    if (!banyak || !kategori || !tingkat) {
      alert("inputkan semua data");
      return;
    }

    if (banyak > 30) {
      alert("Maksimal soal adalah 30");
      setBanyak(30);
      return;
    }

    
    setLoading(true);
    try {
      const questions: Question[] = await generateQuestions(banyak, kategori, tingkat);
      navigate("/exam", { state: { questions } });
    } catch {
      alert("Gagal generate soal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          🚀 Kumpulan Soal
        </h1>

        <label className="block mb-4">
          <span className="font-medium text-gray-700">Banyak Soal</span>
          <input
            type="number"
            min={1}
            max={30}
            className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder={banyak.toString()}
            value={banyak > 30 ? 30 : banyak}
            onChange={(e) => setBanyak(Number(e.target.value))}
          />
          <p className="text-sm text-gray-500 mt-1">Maksimal 30 soal</p>
        </label>

        <label className="block mb-4">
          <span className="font-medium text-gray-700">Kategori</span>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="contoh: Matematika, IPA, Sejarah"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          />
        </label>

        <label className="block mb-6">
          <span className="font-medium text-gray-700">Tingkat Kesulitan</span>
          <select
            className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={tingkat}
            onChange={(e) => setTingkat(e.target.value)}
          >
            <option value="">-- pilih --</option>
            <option value="mudah">Mudah</option>
            <option value="sedang">Sedang</option>
            <option value="sulit">Sulit</option>
          </select>
        </label>

        <button
          onClick={startExam}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md disabled:bg-gray-400"
        >
          {loading ? "Membuat soal..." : "Mulai Ujian"}
        </button>
      </div>
    </div>
  );
};

export default Home;
