import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div>
      <h2>Panel del Estudiante</h2>
      <ul>
        <li><Link to="/student/courses">Ver Cursos Inscriptos</Link></li>
        <li><Link to="/student/classes">Ver Clases</Link></li>
        <li><Link to="/student/materials">Ver Archivos</Link></li>
      </ul>
    </div>
  );
};

export default StudentDashboard;
