import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <>
      <Header />
      <Outlet />     
    </>
  )
}

export default Home