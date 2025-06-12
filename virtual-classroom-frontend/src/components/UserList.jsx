import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
     
    if (users.length === 0) {
        return <p>No se encontraron usuarios.</p>;
    }
  return (
    <div className="mt-4">
      <hr />
      <h3>Lista de Usuarios</h3>
      <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(user)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
