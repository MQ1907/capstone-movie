import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin'

export default function AdminLayout() {
  return (
    <div>
        <HeaderAdmin/>
        
        <Outlet/>



        <Footer/>
    </div>
  )
}
