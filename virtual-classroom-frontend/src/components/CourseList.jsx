import React from 'react';
import { Button } from 'react-bootstrap';

function CourseList({ courses, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      <h4>Courses</h4>
      <ul className="list-group">
        {courses.map(course => (
          <li key={course._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{course.title}</span>
            <div>
              <Button variant="warning" size="sm" onClick={() => onEdit(course)}>Edit</Button>{' '}
              <Button variant="danger" size="sm" onClick={() => onDelete(course._id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
