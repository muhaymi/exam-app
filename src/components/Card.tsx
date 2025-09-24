import { type ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode;
    cimg?: string;
}

const Card: React.FC<Props> = ({ title, children, cimg = '' }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg flex">
            {cimg && (
                <div className="px-6 py-4">
                    <img className="w-20 h-20 object-cover" src={cimg} alt="Gambar" />
                </div>
            )}

            {/* Konten di kanan */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <div className="pt-2">
                    {children}
                </div>
            </div>
        </div>

    );
};

export default Card;
