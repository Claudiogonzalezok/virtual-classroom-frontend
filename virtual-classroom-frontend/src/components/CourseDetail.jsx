import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ClassList from '../components/ClassList';
import ClassForm from '../components/ClassForm';

function CourseDetail() {
  const { id } = useParams(); // course ID from URL
  const { token, user } = useAuth();

  const [course, setCourse] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const isAdminOrTeacher = user?.role === 'admin' || user?.role === 'teacher';

  useEffect(() => {
    fetchCourse();
    fetchClasses();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(res.data);
    } catch (error) {
      console.error('Error al cargar el curso:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/courses/${id}/classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data);
    } catch (error) {
      console.error('Error al cargar las clases:', error);
    }
  };

  const saveClass = async (classData) => {
    try {
      if (classData._id) {
        await axios.put(`http://localhost:5000/api/classes/${classData._id}`, classData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`http://localhost:5000/api/courses/${id}/classes`, classData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setSelectedClass(null);
      fetchClasses();
    } catch (error) {
      console.error('Error al guardar la clase:', error);
    }
  };

  const deleteClass = async (classId) => {
    try {
      await axios.delete(`http://localhost:5000/api/classes/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClasses();
    } catch (error) {
      console.error('Error al eliminar la clase:', error);
    }
  };

  if (!course) return <p>Cargando curso...</p>;

  return (
    <div className="container mt-4">
      <h2>{course.title}</h2>

      {isAdminOrTeacher && (
        <ClassForm onSave={saveClass} selectedClass={selectedClass} />
      )}

      <ClassList
        classes={classes}
        onEdit={isAdminOrTeacher ? setSelectedClass : null}
        onDelete={isAdminOrTeacher ? deleteClass : null}
      />
    </div>
  );
}

export default CourseDetail;