import React, { useEffect, useState } from 'react';

const UserForm = ({ onSave, selectedUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        role: selectedUser.role || 'student',
        password: '', // No se muestra ni edita la contraseña actual
        _id: selectedUser._id,
      });
    } else {
      setFormData({ name: '', email: '', role: 'student', password: '' });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await onSave(formData);
      setMessage('✅ Usuario guardado correctamente.');
      setFormData({ name: '', email: '', role: 'student', password: '' });
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setMessage('❌ Error al guardar el usuario.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>{selectedUser ? 'Editar usuario' : 'Crear nuevo usuario'}</h4>
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
          disabled={!!selectedUser} // El email no debe editarse
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
      {!selectedUser && (
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
      )}
      <button type="submit" className="btn btn-primary">
        {selectedUser ? 'Actualizar' : 'Crear'}
      </button>
      {message && <div className="mt-2">{message}</div>}
    </form>
  );
};

export default UserForm;
