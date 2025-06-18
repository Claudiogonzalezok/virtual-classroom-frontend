import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.msg || 'Se envió un enlace de recuperación a tu correo.');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al enviar el correo');
    }
    };

const handleBack = () => {
    navigate('/login');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="p-4 shadow-lg rounded-4" style={{ width: '26rem' }}>
            <Card.Body>
              <h3 className="text-center mb-4">¿Olvidaste tu contraseña?</h3>
              <p className="text-center">Ingresá tu correo y te enviaremos un enlace para restablecerla.</p>

              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

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

                 <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Enviar instrucciones
                    </Button>
                    <Button variant="secondary" onClick={handleBack}>
                      Volver
                    </Button>
                 </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordPage;

