import React from 'react'
import PublicLayout from '../Layouts/PublicLayout'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PublicRoutes() {
    const { userInfo } = useSelector((state) => state.auth);

  return  userInfo?.role === "admin" ? <Navigate to='/admin/dashboard' replace />   : <PublicLayout />
    
  
}

export default PublicRoutes