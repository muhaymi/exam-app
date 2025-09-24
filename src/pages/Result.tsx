import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state as { score: number; total: number };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">📊 Hasil Latihan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Skor */}
        <Card title="Skor Kamu">
          <p className="text-lg text-gray-700">
            Skor akhir:{" "}
            <span className="font-semibold text-2xl text-emerald-600">
              {score}
            </span>{" "}
            / {total}
          </p>
        </Card>

        {/* Card Aksi */}
        <Card title="Aksi Selanjutnya">
          <button
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md"
            onClick={() => navigate("/generate")}
          >
            🔁 Latihan Lagi
          </button>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Result;
