import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../components/admin/AdminDashboard";
import TeacherDashboard from "../components/teacher/TeacherDashboard";
import StudentDashboard from "../components/student/StudentDashboard";

function DashboardPage() {
  const { user } = useAuth();

  if (!user) return <p>Cargando...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenido, {user.name}</h1>
      <p>Rol: {user.role}</p>

      {user.role === "admin" && <AdminDashboard />}
      {user.role === "teacher" && <TeacherDashboard />}
      {user.role === "student" && <StudentDashboard />}
    </div>
  );
}

export default DashboardPage;
