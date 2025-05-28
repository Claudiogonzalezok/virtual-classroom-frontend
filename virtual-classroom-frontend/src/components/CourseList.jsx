import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CourseList({ courses, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleViewClasses = (courseId) => {
    navigate(`/courses/${courseId}/classes`);
  };

  return (
    <div className="mt-4">
      <h4>Courses</h4>
      <ul className="list-group">
        {courses.map(course => (
          <li
            key={course._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{course.title}</span>
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleViewClasses(course._id)}
              >
                Ver Clases
              </Button>

              {onEdit && (
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => onEdit(course)}
                >
                  Edit
                </Button>
              )}

              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(course._id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;

