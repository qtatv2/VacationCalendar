import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home' 
import Calendar from './Calendar' 
import Requests from './Requests'
import Register from './Register'
import Login from './Login'
import { AuthProvider, useAuth } from '../context/AuthContext'
export default function Navbar()
{

 const {user, logout} = useAuth();
    return (
    <div className="min-h-screen w-full bg-slate-900 text-white">

      <nav className="p-4 bg-slate-800 border-b border-slate-700 flex gap-4 shadow-lg mb-4">
        <Link to="/" className="text-blue-400 font-bold hover:underline">Home</Link>
        <Link to="/calendar" className="text-blue-400 font-bold hover:underline">Kalendarz</Link>
        <Link to="/requests" className="text-blue-400 font-bold hover:underline">Urlopy</Link>
        <Link to="/register" className="text-blue-400 font-bold hover:underline ml-auto">Register</Link>
        <Link to="/login" className="text-blue-400 font-bold hover:underline ml-auto">Login</Link>
      </nav>

      <h1>Welcome {user?.firstName}</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}