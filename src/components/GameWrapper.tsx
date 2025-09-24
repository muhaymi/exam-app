import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const GameWrapper: React.FC = () => {
    // const [isLandscape, setIsLandscape] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // const checkOrientation = () => {
    //     setIsLandscape(window.innerWidth > window.innerHeight);
    // };

    // useEffect(() => {
    //     checkOrientation();
    //     window.addEventListener("resize", checkOrientation);
    //     return () => window.removeEventListener("resize", checkOrientation);
    // }, []);

    const enterFullscreen = () => {
        if (iframeRef.current) {
            const iframe = iframeRef.current;
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if ((iframe as any).webkitRequestFullscreen) {
                (iframe as any).webkitRequestFullscreen();
            } else if ((iframe as any).msRequestFullscreen) {
                (iframe as any).msRequestFullscreen();
            }
        }
    };

    // if (!isLandscape) {
    //     return (
    //         <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-center p-6">
    //             🔄 Mohon putar perangkat ke <span className="font-bold ml-2">LANDSCAPE</span> untuk memainkan game ini.
    //         </div>
    //     );
    // }

    return (
        <DashboardLayout>
            <div className="w-full h-[calc(100vh-80px)] flex flex-col">
                {/* Header game */}
                <div className="flex flex-col sm:flex-row items-center mx-2 mb-2 gap-2">
                    <h2 className="text-lg font-bold">🎮 Flip Card</h2>
                    <button
                        onClick={enterFullscreen}
                        className="px-4 py-1 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                    >
                        ⛶ Fullscreen
                    </button>
                    
                </div>

                {/* iframe game */}
                <iframe
                    ref={iframeRef}
                    src="/game/game.html"
                    title="Flip Card Game"
                    className="w-full flex-1 border-0 rounded-xl shadow-lg"
                />
            </div>
        </DashboardLayout>
    );
};

export default GameWrapper;
