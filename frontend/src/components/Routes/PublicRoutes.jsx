import React from 'react'
import PublicLayout from '../Layouts/PublicLayout'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ScrollToTop from '../Public/ScrollToTop';

function PublicRoutes() {
    const { userInfo } = useSelector((state) => state.auth);

  return  userInfo?.role === "admin" ? <Navigate to='/admin/dashboard' replace />   : <PublicLayout>    
</PublicLayout>
    
  
}

export default PublicRoutes