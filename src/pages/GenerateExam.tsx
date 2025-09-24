import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuestions, type Question } from "../services/gemini";
import DashboardLayout from "../layouts/DashboardLayout";

const GenerateExam = () => {
  const [banyak, setBanyak] = useState<string>("");
  const [kategori, setKategori] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const startExam = async () => {
    const jumlahSoal = Number(banyak);

    if (!jumlahSoal || !kategori || !tingkat) {
      alert("Inputkan semua data dengan benar!");
      return;
    }

    if (jumlahSoal > 30) {
      alert("Maksimal soal adalah 30");
      setBanyak("30");
      return;
    }

    setLoading(true);
    try {
      const questions: Question[] = await generateQuestions(jumlahSoal, kategori, tingkat);

      if (!questions || questions.length === 0) {
        alert("Soal gagal dibuat, coba lagi!");
        return;
      }

      navigate("/exam", { state: { questions } });
    } catch (err) {
      console.error(err);
      alert("Gagal generate soal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Buat Soal Ujian</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg">
        <label className="block mb-4">
          <span className="font-medium text-gray-700">Banyak Soal</span>
          <input
            type="number"
            min={1}
            max={30}
            className="w-full border border-gray-300 rounded-xl p-2 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="1-30"
            value={banyak}
            onChange={(e) => setBanyak(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <span className="font-medium text-gray-700">Kategori</span>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-xl p-2 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="Contoh: Matematika, IPA, Sejarah"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <span className="font-medium text-gray-700">Tingkat Kesulitan</span>
          <select
            className="w-full border border-gray-300 rounded-xl p-2 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            value={tingkat}
            onChange={(e) => setTingkat(e.target.value)}
          >
            <option value="">-- pilih --</option>
            <option value="Sekolah Dasar">SD</option>
            <option value="Sekolah Menengah Pertama">SMP</option>
            <option value="Sekolah Menengah Atas">SMA</option>
            <option value="Umum">Umum</option>
          </select>
        </label>

        <button
          onClick={startExam}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md disabled:bg-gray-400"
        >
          {loading ? "Membuat soal..." : "Mulai Ujian"}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default GenerateExam;
