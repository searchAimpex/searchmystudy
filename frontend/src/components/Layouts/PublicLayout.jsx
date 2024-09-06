import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavBar from '../Public/PublicNavBar'
import Footer from '../Public/Footer'

function PublicLayout() {
  return (
    <div>
        <PublicNavBar />
        <Outlet />
        < Footer />
    </div>
  )
}

export default PublicLayout