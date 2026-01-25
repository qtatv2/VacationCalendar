import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className="p-4 bg-slate-800 border-b border-slate-700 flex gap-4 shadow-lg mb-4 items-center">
            <Link to="/" className="text-blue-400 font-bold hover:underline">Home</Link>
            <Link to="/calendar" className="text-blue-400 font-bold hover:underline">Kalendarz</Link>
            <Link to="/requests" className="text-blue-400 font-bold hover:underline">Urlopy</Link>

            {user ? (
                <div className="ml-auto flex gap-4 items-center">
                    <span className="text-slate-300">
                        Witaj, <span className="text-white font-bold">{user.firstName}</span>
                    </span>
                    <button onClick={handleLogout} className="text-red-400 font-bold hover:underline border border-red-400 px-3 py-1 rounded hover:bg-red-400/10 transition">Wyloguj
                    </button>
                </div>
            ) : (
                <div className="ml-auto flex gap-4">
                    <Link to="/register" className="text-blue-400 font-bold hover:underline">Register</Link>
                    <Link to="/login" className="text-blue-400 font-bold hover:underline">Login</Link>
                </div>
            )}
        </nav>
    )
}