import { Routes, Route } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './page/Home'
import About from './page/About'
import Contact from './page/Contact'
import Login from './page/Login'
import ProtectedRoute from './component/ProtectedRoute'
import Experience from './page/Experience'
import Technology from './page/Technology'
import Data from './page/Data'
import AddData from './page/Data/page/Add/AddData'
import EditData from './page/Data/page/Edit/EditData'
import Cvs from './page/Cvs'
import AddExperience from './page/Experience/pages/add'
import EditExperience from './page/Experience/pages/edit'
import MessageLink from './page/messageLink'
import ChartDaigrams from './page/Chart'


function App() {
 const pages= [
  { title: "Home", path: "/home"  ,component:<Home/>},
  { title: "About", path: "/about",component:<About/> },
  { title: "Contact", path: "/contact", component:<Contact/> },
  { title: "Experience", path: "/experience", component:<Experience/> },
  { title: "Technology", path: "/technology", component:<Technology/> },
  { title: "Add Data", path: "/data/add", component:<AddData/> },
  { title: "Edit Data", path: "/data/edit/:id", component:<EditData/> },
  { title: "Add Experience", path: "/experience/add", component:<AddExperience/> },
  { title: "Edit Experience", path: "/experience/edit/:id", component:<EditExperience/> },
  { title: "Data", path: "/data", component:<Data/> },
  { title: "Cvs", path: "/cvs" ,component:<Cvs/> },
  { title: "Message", path: "/message",component:<MessageLink/> },
  { title: "Chart", path: "/chart",component:<ChartDaigrams/> },
]
  return (
    
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Login />} />
        {pages.map((page) => (
          <Route
            key={page.title}
            path={page.path}
            element={
              <ProtectedRoute>
                {page.component}
              </ProtectedRoute>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
