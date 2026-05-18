import { Routes, Route } from 'react-router-dom'
import '../resources/App.css'
import Navbar from './components/Navbar'
import Home from './pages/home'
import About from './pages/about'
import Modules from './pages/modules'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
