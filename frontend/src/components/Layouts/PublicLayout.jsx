import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavBar from '../Public/PublicNavBar'

function PublicLayout() {
  return (
    <div>
        <PublicNavBar />
        <Outlet />
    </div>
  )
}

export default PublicLayout