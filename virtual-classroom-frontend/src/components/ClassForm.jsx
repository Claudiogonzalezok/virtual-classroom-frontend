import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function ClassForm({ onSave, selectedClass, courseId }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {courseId1}= useParams();

  useEffect(() => {
    if (selectedClass) {
      setTitle(selectedClass.title);
      setDescription(selectedClass.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [selectedClass]);

  const handleSubmit = e => {
    e.preventDefault();

    onSave({
      title,
      description,
      _id: selectedClass?._id,
      course: courseId,
    });

    setTitle('');
    setDescription('');
  };

  if (!isAdmin) return null; // ✅ Solo visible para admin

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Form.Group>
        <Form.Label>Titulo de la Clase</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" className="mt-3">
        {selectedClass ? 'Update Class' : 'Crear Clase'}
      </Button>
    </Form>
  );
}

export default ClassForm;
