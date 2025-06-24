import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Panel de Administración</h2>
      <ul>
        <li><Link to="/admin/users">Gestionar Usuarios</Link></li>
        <li><Link to="/admin/courses">Gestionar Cursos</Link></li>
        <li><Link to="/admin/classes">Gestionar Clases</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
