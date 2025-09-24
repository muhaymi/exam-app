import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const links = [
        { to: "/", label: "Dashboard" },
        // { to: "/exam", label: "Ujian Baru" },
        // { to: "/history", label: "Riwayat" },
    ];

    return (
        <div className="flex flex-col space-y-4">
            <nav className="space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-lg transition ${isActive
                                ? "bg-green-600 text-white font-semibold"
                                : "text-green-100 hover:bg-green-500"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
