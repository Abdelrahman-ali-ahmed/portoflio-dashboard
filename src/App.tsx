import { Routes, Route } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './page/Home'
import About from './page/About'
import Contact from './page/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
