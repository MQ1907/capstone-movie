import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Advertise from '../../components/Advertise'


export default function MainLayout() {
  return (
    <div>
        <Header/>

        <Outlet/>
        
        <Advertise/>

        <Footer/>
    </div>
  )
}
