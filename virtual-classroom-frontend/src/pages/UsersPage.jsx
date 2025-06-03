import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const UsersPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      toast.error('Error al obtener usuarios');
    }
  };

  const saveUser = async (userData) => {
    //const confirmDelete = window.confirm('¿Estás seguro de Modificar este usuario?');
    //if (!confirmDelete) return;
    try {
      if (userData._id) {
        //const confirmDelete = window.confirm('¿Estás seguro de eliminar este usuario?');
        //if (!confirmDelete) return;
        await axios.put(`http://localhost:5000/api/users/${userData._id}`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.info('✏️ Usuario actualizado');
      } else {
        await axios.post('http://localhost:5000/api/users', userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('✅ Usuario creado correctamente');
      }
      setSelectedUser(null);
      fetchUsers();              
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      toast.error('❌ Error al guardar el usuario');
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.warn('🗑️ Usuario eliminado');
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      toast.error('❌ Error al eliminar el usuario');
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase()) ||
      user.role.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reinicia a la primera página al buscar
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Gestión de Usuarios</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre, email o rol"
          className="form-control"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <UserForm onSave={saveUser} selectedUser={selectedUser} />
      <UserList users={currentUsers} onEdit={setSelectedUser} onDelete={deleteUser} />
      <div className="mt-3 d-flex justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;