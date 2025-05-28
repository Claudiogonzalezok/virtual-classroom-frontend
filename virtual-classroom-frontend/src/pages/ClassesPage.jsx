import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ClassList from '../components/ClassList';
import ClassForm from '../components/ClassForm';
import { useAuth } from '../context/AuthContext';

const CourseClassesPage = () => {
  const { id } = useParams(); // course ID
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const { token, user } = useAuth();

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/courses/${id}/classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data);
    } catch (error) {
      console.error('Error al obtener las clases:', error);
    }
  };

  const saveClass = async (classData) => {
    try {
      if (classData._id) {
        await axios.put(`http://localhost:5000/api/courses/${id}/classes/${classData._id}`, classData, {
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
      await axios.delete(`http://localhost:5000/api/courses/${id}/classes/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClasses();
    } catch (error) {
      console.error('Error al eliminar la clase:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Clases del Curso</h2>
      {user?.role === 'admin' || user?.role === 'teacher' ? (
        <ClassForm onSave={saveClass} selectedClass={selectedClass} />
      ) : null}
      <ClassList classes={classes} onEdit={setSelectedClass} onDelete={deleteClass} />
    </div>
  );
};

export default CourseClassesPage;