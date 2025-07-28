import { Routes, Route } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './page/Home'
import About from './page/About'
import Contact from './page/Contact'
import Login from './page/Login'
import ProtectedRoute from './component/ProtectedRoute'
import Location from './page/Location'
import Customer from './page/Customer'
import Files from './page/Files'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Login />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="location"
          element={
            <ProtectedRoute>
              <Location   />
            </ProtectedRoute>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
          <Route
          path="customer"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
           <Route
          path="files"
          element={
            <ProtectedRoute>
              <Files />
            </ProtectedRoute>
          }
        />
      </Route>
      
    </Routes>
  );
}

export default App;
