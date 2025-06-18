import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

   const renderLinks = () => {
    if (!user) return null;

    switch (user.role) {
      case "admin":
        return (
          <>
            <Nav.Link href="/admin">Inicio</Nav.Link>
            <Nav.Link href="/admin/users">Usuarios</Nav.Link>
            <Nav.Link href="/admin/courses">Cursos</Nav.Link>
          </>
        );
      case "teacher":
        return (
          <>
            <Nav.Link href="/professor/dashboard">Inicio</Nav.Link>
            <Nav.Link href="/professor/my-courses">Mis Cursos</Nav.Link>
            <Nav.Link href="/professor/upload-material">Subir Material</Nav.Link>
          </>
        );
      case "student":
        return (
          <>
            <Nav.Link href="/student/dashboard">Inicio</Nav.Link>
            <Nav.Link href="/student/my-courses">Mis Cursos</Nav.Link>
            <Nav.Link href="/student/submit-work">Enviar Trabajo</Nav.Link>
          </>
        );
      default:
        return null;
    }
  };


  if (!user) return null; // No mostrar navbar si no está logueado

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">Aula Virtual</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {renderLinks()}
          </Nav>
          <Nav>
            <NavDropdown title={`Hola, ${user.name}`} align="end">
              <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
