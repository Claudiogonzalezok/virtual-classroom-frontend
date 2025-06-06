import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanelPage = () => {
  return (
    <div className="container mt-4">
      <h2>Panel Administrativo</h2>
      <ul>
        <li><Link to="/admin/users">Gestionar Usuarios</Link></li>
        <li><Link to="/admin/courses">Gestionar Cursos</Link></li>
        <li><Link to="/admin/classes">Gestionar Clases</Link></li>
        <li><Link to="/admin/assign-courses">Asignar Coursos</Link></li>
      </ul>
    </div>
  );
};

export default AdminPanelPage;
