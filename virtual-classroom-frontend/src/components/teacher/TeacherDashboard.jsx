import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div>
      <h2>Panel del Profesor</h2>
      <ul>
        <li><Link to="/teacher/courses">Ver Cursos a Cargo</Link></li>
        <li><Link to="/teacher/classes/create">Agregar Clases</Link></li>
        <li><Link to="/teacher/materials">Subir Material</Link></li>
      </ul>
    </div>
  );
};

export default TeacherDashboard;
