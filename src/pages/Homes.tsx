import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";
import { Eye, Play } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";


const DashboardPage = () => {
    const navigate = useNavigate();

    // daftar card yang akan ditampilkan
    const cards = [
        {
            title: "Latihan Soal",
            cimg: "/latihanSoal.jpg",
            content: (
                <>
                    <div className="flex flex-row items-center justify-center gap-4">
                        {/* Tombol utama */}
                        <button
                            title="Mulai"
                            onClick={() => navigate("/generate")}>
                            <Play className="w-8 h-8 p-1 rounded-full hover:bg-purple-200 transition flex items-center justify-center shadow-md" />

                        </button>

                        {/* Tombol ikon mata */}
                        <div className="flex flex-row items-center justify-center gap-4">
                            <button
                                title="Detail"
                                onClick={() =>
                                    toast.success(
                                        "Aplikasi ini membantu siswa dari berbagai jenjang – SD, SMP, SMA, hingga umum – untuk berlatih soal dengan cara yang praktis dan menyenangkan. Soal dan jawaban dihasilkan secara otomatis sesuai tingkat kesulitan, sehingga pengguna dapat meningkatkan pemahaman materi, melatih logika, serta mempersiapkan diri menghadapi ujian."
                                    )
                                }

                            >
                                <Eye className="w-8 h-8 p-1 rounded-full hover:bg-purple-200 transition flex items-center justify-center shadow-md" />
                            </button>
                        </div>

                        <Toaster position="top-right" />
                    </div>
                </>
            )
        },
        {
            title: "Game Memori",
            cimg: "/gbuah.jpg",
            content: (
                <>
                    <div className="flex flex-row items-center justify-center gap-4">
                        {/* Tombol utama */}
                        <button
                            title="Mulai"
                            onClick={() => navigate("/game1")}>
                            <Play className="w-8 h-8 p-1 rounded-full hover:bg-purple-200 transition flex items-center justify-center shadow-md" />

                        </button>

                        {/* Tombol ikon mata */}
                        <div className="flex flex-row items-center justify-center gap-4">
                            <button
                                title="Detail"
                                onClick={() =>
                                    toast.success(
                                        "Aplikasi ini akan melatih daya ingat anda dengan bermain game flip card buah dan sayur."
                                    )
                                }

                            >
                                <Eye className="w-8 h-8 p-1 rounded-full hover:bg-purple-200 transition flex items-center justify-center shadow-md" />
                            </button>
                        </div>

                        {/* Toaster sebaiknya di luar tombol */}
                        <Toaster position="top-right" />
                    </div>
                </>
            )

        },
        {
            title: "Fitur Lain",
            cimg: "",
            content: (
                <p className="text-gray-700">
                    Segera hadir:  lainnya 🚀
                </p>
            ),

        },
    ];

    return (
        <DashboardLayout>
            {/* Header Halaman */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Selamat datang kembali! Pilih aktivitas untuk memulai belajar 📚
                </p>

            </div>

            {/* Grid Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, idx) => (
                    <Card key={idx} title={card.title} cimg={card.cimg}>
                        {card.content}
                        {/* <button onClick={() => alert(card.text)} ><Eye className="w-5 h-5 text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors duration-200" /></button> */}


                    </Card>
                ))}
            </div>
        </DashboardLayout>


    );
};

export default DashboardPage;
