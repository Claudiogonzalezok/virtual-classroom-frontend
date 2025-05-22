import React, { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import axios from 'axios';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const token = localStorage.getItem('token');
  
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
    if (course._id) {
      await axios.put(`http://localhost:5000/api/courses/${course._id}`, { title: course.title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post('http://localhost:5000/api/courses/', { title: course.title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setSelectedCourse(null);
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Course Management</h2>
      <CourseForm onSave={saveCourse} selectedCourse={selectedCourse} />
      <CourseList courses={courses} onEdit={setSelectedCourse} onDelete={deleteCourse} />
    </div>
  );
}

export default CoursesPage;
