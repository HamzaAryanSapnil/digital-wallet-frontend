import React from 'react'
import { Outlet } from 'react-router'



export default function AdminLayout() {
  return (
    <div>
      This is admin layout
      <Outlet/>
    </div>
  )
}
