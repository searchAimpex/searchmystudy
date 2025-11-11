import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Admin/NavBar'

function AdminLayout() {
  return (
    <div>
       < NavBar />
        <Outlet />
    </div>
  )
}

export default AdminLayout