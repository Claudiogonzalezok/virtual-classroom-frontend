import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function ClassList({ classes, onEdit, onDelete }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="mt-4">
      <h5>Classes</h5>
      {classes.length === 0 ? (
        <p>No hay classes para este curso</p>
      ) : (
        <ul className="list-group">
          {classes.map(classItem => (
            <li
              key={classItem._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{classItem.title}</strong>
                <p className="mb-0">{classItem.description}</p>
              </div>
              {isAdmin && (
                <div>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(classItem)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(classItem._id)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClassList;
