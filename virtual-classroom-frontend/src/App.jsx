import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './utils/PrivateRoute';
import PrivateLayout from './components/PrivateLayout';

function App() {
  return (
    <Routes>
       {/* <Route path="/" element={<LoginPage />} />*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
          } />
        <Route path="/" element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;