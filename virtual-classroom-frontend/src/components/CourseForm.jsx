import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

function CourseForm({ onSave, selectedCourse }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title);
    } else {
      setTitle('');
    }
  }, [selectedCourse]);

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ title, _id: selectedCourse?._id });
    setTitle('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Titulo del Curso</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" className="mt-2">
        {selectedCourse ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
}

export default CourseForm;
