import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import ProtectedRoute from './components/ProtectedRoute';
import CourseClassesPage from './pages/ClassesPage';
import Navbar from './components/Navbar';
import AdminPanelPage from './pages/AdminPanelPage';
import UsersPage from './pages/UsersPage';
//import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/courses' element={<CoursesPage/>}/>
        <Route path="/courses/:id/classes" element={<CourseClassesPage />} />

        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path='/admin/courses' element={<CoursesPage />}/>
        <Route path="/admin/users" element={<UsersPage />} />
        {/*<Route path="/admin/courses" element={<CourseManagementPage />} />*/}


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
