import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
        <Navbar></Navbar>
    </AuthProvider>

  )
}

export default App