import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLayout from '../Layouts/AdminLayout';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo?.role === "admin" ? <AdminLayout /> : <Navigate to='/login' replace />
};
export default PrivateRoute;
