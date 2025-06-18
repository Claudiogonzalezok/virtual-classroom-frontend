import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, Button, Form, Card, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data?.msg || 'Error al iniciar sesión');
      alert(err.response?.data?.msg || 'Credenciales inválidas');
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="p-4 shadow-lg rounded-4" style={{ width: '25rem' }}>
            <Card.Body>
              <h3 className="text-center mb-4">Iniciar sesión</h3>
              <Form onSubmit={handleSubmit}>
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

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Ingresar
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancelar
                  </Button>
                </div>
              </Form>

              <div className="mt-4 text-center">
                <Link to="/forgot-password" className="d-block mb-2">
                  ¿Olvidaste tu contraseña?
                </Link>
                <span>
                  ¿No tenés cuenta?{' '}
                  <Link to="/register">Registrate</Link>
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

