import { Route,  Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import Calendar from './components/Calendar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Requests from './components/Requests'

function App() {
  return (
      <AuthProvider>
        <div className="min-h-screen w-full bg-slate-900 text-white">
            <Navbar />
            <div className="w-full mx-auto px-4 mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </div>
      </AuthProvider>
  )
}

export default App