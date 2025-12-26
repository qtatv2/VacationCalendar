import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home' 
import Calendar from './pages/Calendar' 
import Requests from './pages/Requests'
import Register from './pages/Register'

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">

      <nav className="p-4 bg-slate-800 border-b border-slate-700 flex gap-4 shadow-lg mb-4">
        <Link to="/" className="text-blue-400 font-bold hover:underline">Home</Link>
        <Link to="/calendar" className="text-blue-400 font-bold hover:underline">Kalendarz</Link>
        <Link to="/requests" className="text-blue-400 font-bold hover:underline">Urlopy</Link>
        <Link to="/register" className="text-blue-400 font-bold hover:underline ml-auto">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>
  )
}

export default App