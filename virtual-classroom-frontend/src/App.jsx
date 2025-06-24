import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
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
import UploadMaterialPage from "./pages/UploadMaterialPage";
import ViewMaterialsPage from "./pages/ViewMaterialsPage";



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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route path='/courses' element={<CoursesPage/>}/>
        <Route path="/courses/:id/classes" element={<CourseClassesPage />} />
        //admin routes
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path='/admin/courses' element={<CoursesPage />}/>
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/assign-courses" element={<AssignCourseForm />} />

        // Teacher
        <Route path="/teacher/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/teacher/classes/create" element={<ProtectedRoute><CourseClassesPage /></ProtectedRoute>} />
        <Route path="/teacher/materials" element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <UploadMaterialPage />
          </ProtectedRoute>
         } />

        // Student
        <Route path="/student/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/student/classes" element={<ProtectedRoute><CourseClassesPage /></ProtectedRoute>} />
        <Route path="/student/materials" element={
          <ProtectedRoute allowedRoles={["student"]}>
            <ViewMaterialsPage />
          </ProtectedRoute>
        } />


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
