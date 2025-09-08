import axios from "axios"; //digunakan untuk melakukan request HTTP

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; //mengambil API key dari ENV agar aman
const BASE_URL =import.meta.env.VITE_GEMINI_BASE_URL; //mengambil base URL dari ENV

export interface Question {  //deklarasi tipe data untuk soal
  soal: string;
  opsi: string[];
  jawaban: string;
  pembahasan?: string;
}


export const generateQuestions = async (   //mengirim request ke Gemini untuk generate soal
  banyak: number,
  kategori: string,
  tingkat: string
): Promise<Question[]> => {  //promise mengembalikan array of Question diperlukan typescript karena typescript harus detail tentang tipe data "janji nantinya diisi datanya []"
  const prompt = `
  Buatkan ${banyak} soal ujian dengan ketentuan:
  - Kategori: ${kategori}
  - Tingkat kesulitan: ${tingkat}
  - Jenis soal pilihan ganda, benar/salah
  - Sertakan opsi jawaban pilihan ganda
  - Sertakan kunci jawaban untuk setiap soal
  - Berikan pembahasan singkat untuk setiap soal

  Format output JSON VALID tanpa penjelasan tambahan:
  [
    {
      "soal": "Teks soal di sini",
      "opsi": ["opsi A", "opsi B", "opsi C", "opsi D"],
      "jawaban": "Jawaban benar",
      "pembahasan": "Penjelasan singkat tentang jawaban"
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

    // console.log("Raw response text:", text);

    // 🔹 Ambil hanya isi JSON antara [ ... ]
    const match = text.match(/\[.*\]/s);
    if (!match) {
      throw new Error("Gagal menemukan JSON di respons Gemini");
    }

    const cleanJson = match[0]; 
    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("Error generateQuestions:", err);
    throw err;
  }
};

/* 🎯 Ringkasannya:

Request → axios.post ke Gemini.

Response → ambil teks dari res.data.candidates[0].content.parts[0].text.

Regex → ekstrak hanya bagian [ ... ].

JSON.parse → konversi string jadi array objek.

Return → hasil dikirim kembali ke pemanggil function.*/
