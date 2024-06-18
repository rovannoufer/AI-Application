import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <>
     <div className='h-full relative'>
           <Header />
         
         <div className='flex flex-col pl-60'> 
            <Navbar />
            <Outlet />
         </div>
      </div>
    </>
  )
}

export default Home