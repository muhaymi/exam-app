import React from "react";
import { useNavigate } from "react-router-dom";

const History: React.FC = () => {
  const navigate = useNavigate();

  // Contoh data dummy (nanti bisa ambil dari localStorage atau API)
  const historyData = [
    { id: 1, score: 8, total: 10, date: "2025-09-21" },
    { id: 2, score: 6, total: 10, date: "2025-09-20" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Riwayat Ujian</h1>

        {historyData.length === 0 ? (
          <p className="text-gray-500">Belum ada riwayat ujian.</p>
        ) : (
          <ul className="space-y-4">
            {historyData.map((item) => (
              <li
                key={item.id}
                className="p-4 border rounded-xl flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold">
                    Skor: {item.score}/{item.total}
                  </p>
                  <p className="text-sm text-gray-500">Tanggal: {item.date}</p>
                </div>
                <button
                  onClick={() => navigate("/result", { state: { score: item.score, total: item.total } })}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Lihat Detail
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
