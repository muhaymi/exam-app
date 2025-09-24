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
  tingkat: string
): Promise<Question[]> => {
  const prompt = `
  Buatkan ${banyak} soal ujian gunakan bahasa indonesia dengan ketentuan:
  - Kategori: ${kategori}
  - diperuntukan untuk pengetahuan: ${tingkat}
  - sesuaikan dengan kurikulum sekolah di Indonesia
  - Jenis soal pilihan ganda
  - Sertakan 4 opsi jawaban
  - Sertakan kunci jawaban
  - Sertakan pembahasan singkat

  Format output JSON VALID tanpa teks tambahan:
  [
    {
      "soal": "Teks soal",
      "opsi": ["A", "B", "C", "D"],
      "jawaban": "Jawaban benar",
      "pembahasan": "Penjelasan singkat"
    }
  ]
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
