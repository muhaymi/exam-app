// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { generateQuestions, type Question } from "../services/gemini";

// const Home: React.FC = () => {
//   const [banyak, setBanyak] = useState<string>(""); // awal kosong
//   const [kategori, setKategori] = useState("");
//   const [tingkat, setTingkat] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const startExam = async () => {
//     const jumlahSoal = Number(banyak);

//     if (!jumlahSoal || !kategori || !tingkat) {
//       alert("Inputkan semua data dengan benar!");
//       return;
//     }

//     if (jumlahSoal > 30) {
//       alert("Maksimal soal adalah 30");
//       setBanyak("30");
//       return;
//     }

//     setLoading(true);
//     try {
//       const questions: Question[] = await generateQuestions(jumlahSoal, kategori, tingkat,kelas);
//       navigate("/exam", { state: { questions } });
//     } catch {
//       alert("Gagal generate soal.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
//       <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-lg">
//         <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
//           🚀 Kumpulan Soal
//         </h1>

//         <label className="block mb-4">
//           <span className="font-medium text-gray-700">Banyak Soal</span>
//           <input
//             type="number"
//             min={1}
//             max={30}
//             className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//             placeholder="Masukkan jumlah soal (1-30)"
//             value={banyak}
//             onChange={(e) => setBanyak(e.target.value)}
//           />
//           <p className="text-sm text-gray-500 mt-1">Maksimal 30 soal</p>
//         </label>

//         <label className="block mb-4">
//           <span className="font-medium text-gray-700">Kategori</span>
//           <input
//             type="text"
//             className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//             placeholder="Contoh: Matematika, IPA, Sejarah"
//             value={kategori}
//             onChange={(e) => setKategori(e.target.value)}
//           />
//         </label>

//         <label className="block mb-6">
//           <span className="font-medium text-gray-700">Tingkat Kesulitan</span>
//           <select
//             className="w-full border border-gray-300 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//             value={tingkat}
//             onChange={(e) => setTingkat(e.target.value)}
//           >
//             <option value="">-- pilih --</option>
//             <option value="mudah">Mudah</option>
//             <option value="sedang">Sedang</option>
//             <option value="sulit">Sulit</option>
//           </select>
//         </label>

//         <button
//           onClick={startExam}
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md disabled:bg-gray-400"
//         >
//           {loading ? "Membuat soal..." : "Mulai Ujian"}
//         </button>

//         {/* Instagram Banner */}
//         <div className="mt-6 text-center">
//           <a
//             href="https://instagram.com/muhaymi_13"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.976 1.246 2.243 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.976.975-2.243 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.976-1.246-2.243-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608C4.516 2.495 5.783 2.224 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.13 4.632.388 3.678 1.342 2.724 2.296 2.466 3.435 2.408 4.716.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.281.316 2.42 1.27 3.374.954.954 2.093 1.212 3.374 1.27C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.058 2.42-.316 3.374-1.27.954-.954 1.212-2.093 1.27-3.374C23.987 15.668 24 15.259 24 12s-.013-3.668-.072-4.948c-.058-1.281-.316-2.42-1.27-3.374-.954-.954-2.093-1.212-3.374-1.27C15.668.013 15.259 0 12 0z"/>
//               <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z"/>
//               <circle cx="18.406" cy="5.594" r="1.44"/>
//             </svg>
//             Ig: muhaymi_13 | Follow me to support
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
