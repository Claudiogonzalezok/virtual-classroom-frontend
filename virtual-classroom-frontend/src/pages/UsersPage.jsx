import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import { useAuth } from '../context/AuthContext';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { token } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const saveUser = async (userData) => {
    try {
      if (userData._id) {
        await axios.put(`http://localhost:5000/api/users/${userData._id}`, userData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/users', userData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Gestión de Usuarios</h2>
      <UserForm onSave={saveUser} selectedUser={selectedUser} />
      <UserList users={users} onEdit={setSelectedUser} onDelete={deleteUser} />
    </div>
  );
};

export default UsersPage;