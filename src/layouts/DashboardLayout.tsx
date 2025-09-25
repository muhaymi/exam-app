import { useState, useEffect, type ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface Props {
  children: ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile default sidebar tertutup
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-orange-700 text-white flex items-center justify-between px-4 py-3 shadow-md">
        <div className="flex items-center space-x-4">
          {/* Burger Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <h1 className="text-black bg-orange-200 px-2 py-2 inline-block font-bold tracking-wide shadow-sm transform -skew-x-12 rounded-lg underline">
            🕷 Belajar
          </h1>

        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Hi, User</span>
          <img
            src="/ic.png"
            alt="avatar"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Overlay (mobile only) */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`bg-orange-800 text-white transition-all duration-300 flex flex-col z-40
            ${isMobile ? "fixed top-0 left-0 h-full w-64 transform" : ""}
            ${sidebarOpen ? "translate-x-0 w-64" : isMobile ? "-translate-x-full w-64" : "w-0"}
          `}
        >
          {/* Sidebar header (opsional) */}
          <div
            className={`${sidebarOpen ? "p-6 border-b border-orange-600 font-semibold text-xl" : "hidden"
              }`}
          >
            Menu
          </div>
          <div className="flex-1 overflow-y-auto">
            {sidebarOpen && <Sidebar />}
          </div>
          {sidebarOpen && (
            <div className="p-4 border-t border-orange-600 text-sm">© 2025 EduApp</div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
