import axios from "axios";

// Ambil dari .env (harus diawali VITE_)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const BASE_URL = import.meta.env.VITE_GEMINI_BASE_URL;

export interface Question {
  kategori: string;
  soal: string;
  opsi: string[];
  jawaban: string;
  pembahasan?: string;
}

export const generateQuestions = async (
  banyak: number,
  kategori: string,
  tingkat: string,
  kelas: string,
): Promise<Question[]> => {
  const prompt = `
    Buatkan ${banyak} soal ujian dalam bahasa Indonesia dengan ketentuan berikut:
    - Materi: ${kategori}
    - Tingkat pengetahuan: kelas ${kelas} ${tingkat} 
    - Sesuai dengan kurikulum sekolah di Indonesia diatas 2023
    - Jenis soal: Pilihan ganda
    - Setiap soal harus memiliki 4 opsi jawaban (A, B, C, D)
    - Sertakan kunci jawaban yang benar
    - Sertakan pembahasan singkat untuk setiap soal
    - Format output **JSON VALID** tanpa teks tambahan, contoh format:

    [
      {
        "soal": "Teks soal di sini",
        "opsi": ["Jawaban A", "Jawaban B", "Jawaban C", "Jawaban D"],
        "jawaban": "Jawaban yang benar",
        "pembahasan": "Penjelasan singkat mengenai jawaban"
      }
    ]

    Pastikan:
    1. JSON yang dihasilkan benar-benar valid (bisa langsung di-parse).
    2. Tidak ada teks, catatan, atau komentar lain di luar array JSON.
    3. Semua soal relevan dengan materi dan tingkat yang ditentukan.
  `;

  try {
    const res = await axios.post(
      `${BASE_URL}?key=${API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    let text = res.data.candidates[0].content.parts[0].text.trim();

    // Hapus block ```json ... ``` kalau ada
    text = text.replace(/```json|```/g, "").trim();

    // Ambil JSON array saja
    const match = text.match(/\[.*\]/s);
    if (!match) throw new Error("JSON tidak ditemukan di respons Gemini");

    const cleanJson = match[0];
    let parsed: Question[] = JSON.parse(cleanJson);

    // Validasi & isi kategori default
    return parsed.map((q, i) => ({
      soal: q.soal ?? `Soal ${i + 1}`,
      opsi: Array.isArray(q.opsi) ? q.opsi : [],
      jawaban: q.jawaban ?? "",
      pembahasan: q.pembahasan ?? "Tidak ada pembahasan",
      kategori,
    }));
  } catch (err) {
    console.error("Error generateQuestions:", err);
    throw err;
  }
};
