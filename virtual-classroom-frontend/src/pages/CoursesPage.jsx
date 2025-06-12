import React, { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { user, token } = useAuth(); // ✅ Acceder al usuario y token

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
      setCourses([]);
    }
  };

  const saveCourse = async (course) => {
    try {
      if (course._id) {
        await axios.put(
          `http://localhost:5000/api/courses/${course._id}`,
          { title: course.title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/courses/',
          { title: course.title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setSelectedCourse(null);
      fetchCourses();
    } catch (error) {
      console.error('Error al guardar el curso:', error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container mt-4">
      <h2>ADMINISTRADOR DE CURSOS</h2>

      {/* ✅ Solo los admin pueden ver el formulario */}
      {user?.role === 'admin' && (
        <CourseForm onSave={saveCourse} selectedCourse={selectedCourse} />
      )}

      <CourseList
        courses={courses}
        onEdit={user?.role === 'admin' ? setSelectedCourse : null} // ✅ Solo admin puede editar
        onDelete={user?.role === 'admin' ? deleteCourse : null}    // ✅ Solo admin puede eliminar
      />
    </div>
  );
}

export default CoursesPage;
