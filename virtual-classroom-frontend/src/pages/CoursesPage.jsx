import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Container, Card, Row, Col } from 'react-bootstrap';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!token) return  console.log('Token actual:', token); // ⛔ No hacer nada si no hay token  
      try {
       

        const response = await axios.get('http://localhost:5000/api/courses', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Listado de Cursos</h2>
      <Row>
        {courses.map((course) => (
          <Col key={course._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CoursesPage;
