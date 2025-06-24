import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, Button, Form, Card, Row, Col } from 'react-bootstrap';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role
      });

      const { token, user } = response.data;
      login(user, token);
      alert('Usuario registrado correctamente');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data?.msg || 'Error al registrarse');
      alert(err.response?.data?.msg || 'No se pudo registrar');
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const passwordsMatch = password === confirmPassword;

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="p-4 shadow-lg rounded-4" style={{ width: '26rem' }}>
            <Card.Body>
              <h3 className="text-center mb-4">Registro</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Reingresar contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={confirmPassword && !passwordsMatch}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Las contraseñas no coinciden
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formRole">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="student">Estudiante</option>
                    <option value="teacher">Docente</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="success" type="submit" disabled={!passwordsMatch}>
                    Registrarse
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </div>
              </Form>

              <div className="mt-4 text-center">
                <span>
                  ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;

