import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let initialUser = null;
  try {
    const storedUser = localStorage.getItem('user');
    initialUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error('Error al parsear el usuario desde localStorage:', err);
  }

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

