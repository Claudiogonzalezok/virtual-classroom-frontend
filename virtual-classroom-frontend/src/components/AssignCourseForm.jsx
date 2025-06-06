import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AssignCourseForm = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, courseRes] = await Promise.all([
          axios.get('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/courses', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUsers(userRes.data);
        setCourses(courseRes.data);
      } catch (err) {
        console.error('Error al cargar datos:', err);
      }
    };
    fetchData();
  }, [token]);

  console.log('Enviando:', {
  userId: selectedUserId,
  courseIds: selectedCourseIds,
});


  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedUserId || selectedCourseIds.length === 0) {
      return setMessage('⚠️ Seleccioná un usuario y al menos un curso.');
    }

    try {
      await axios.put(
        'http://localhost:5000/api/users/assign-courses',
        {
             userId: selectedUserId,
             courseIds: selectedCourseIds,
         },
        {
            headers: {
            Authorization: `Bearer ${token}`,
      '     Content-Type': 'application/json',
            },
        }
        );

      setMessage('✅ Cursos asignados correctamente.');
    } catch (err) {
      console.error('Error al asignar cursos:', err);
      setMessage('❌ Error al asignar cursos.');
    }
  };

  return (
    <div className="container mt-4">
      <h4>Asignar Cursos a Usuario</h4>
      <form onSubmit={handleAssign}>
        <div className="mb-2">
          <label>Usuario:</label>
          <select
            className="form-control"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">-- Seleccionar Usuario --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Cursos:</label>
          <select
            multiple
            className="form-control"
            value={selectedCourseIds}
            onChange={(e) =>
              setSelectedCourseIds(
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
            required
          >
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Asignar Cursos
        </button>
      </form>
      {message && <div className="mt-2">{message}</div>}
    </div>
  );
};

export default AssignCourseForm;
