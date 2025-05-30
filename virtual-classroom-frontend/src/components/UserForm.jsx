import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
  });
  const { token } = useAuth();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/users/admin-create', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Usuario creado exitosamente.');
      setFormData({ name: '', email: '', role: 'student', password: '' });
      if (onUserCreated) onUserCreated();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setMessage('❌ Error al crear el usuario.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Crear nuevo usuario</h4>
      <div className="mb-2">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <select
          name="role"
          className="form-control"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Alumno</option>
          <option value="teacher">Profesor</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div className="mb-2">
        <input
          type="text"
          name="password"
          placeholder="Contraseña temporal"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Crear Usuario</button>
      {message && <div className="mt-2">{message}</div>}
    </form>
  );
};

export default UserForm;
