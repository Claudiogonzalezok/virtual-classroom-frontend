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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssignCourseForm from './components/AssignCourseForm';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

//import './App.css'

function App() {
  useEffect(() => {
  AOS.init({ duration: 800, once: true });
  }, []);
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="flex-grow-1">
      <Routes>
        
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/courses' element={<CoursesPage/>}/>
        <Route path="/courses/:id/classes" element={<CourseClassesPage />} />

        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path='/admin/courses' element={<CoursesPage />}/>
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/assign-courses" element={<AssignCourseForm />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
