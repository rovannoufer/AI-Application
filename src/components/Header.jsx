import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import image from "../img/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faImage, faList, faMessage, faVideo } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const [toggle, setToggle] = useState(true);

  
  return (


    <>
      <div className='flex justify-between p-2 shadow-2xl'>
        
         <NavLink to={'/'} >   
          <div className='relative flex p-6'> 
            
            <img src= {image} className='w-15'/>
            <p className=' font-bold  ml-4 absolute left-16'> AI APP </p>
          </div>
          </NavLink>
        

         <div className={`absolute ${ toggle ? " -top-full" :  " top-[110px]"} z-[1] left-0 w-full mr-3  bg-black text-white flex flex-col items-center justify-center p-10 gap-4   lg:static lg:flex-row lg:bg-transparent lg:justify-end`}> 

           <NavLink to={'/'} className={`  lg:text-black sm:text-white`} >
           <FontAwesomeIcon icon={faHouse} className='pr-3'  />
              Home
            
            </NavLink>
           <NavLink to={'/conversation'} className={"  lg:text-black sm:text-white"}>
           <FontAwesomeIcon icon={faMessage} className='pr-3'/>
            Conversation
           </NavLink>
           <NavLink to={'/prompt'} className={" lg:text-black sm:text-white"}> 
           <FontAwesomeIcon icon={faImage} className='pr-3'/>
           Prompting
           </NavLink>
           <NavLink to={'/video'} className={" lg:text-black sm:text-white"}>
           <FontAwesomeIcon icon={faVideo} className='pr-3'/>
           Content Generation
           </NavLink>
         

            
         </div>

         <div className='relative p-5 top-4 w-10 right-3 lg:hidden'>
         <button onClick={()=>{
         setToggle(!toggle);
          }}>
            <FontAwesomeIcon icon={faList} />
         </button>
         </div>

         
      </div>
    </>
  )
}

export default Header







