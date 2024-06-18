import React, { useState } from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from 'react-router-dom';
import image from "../img/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faImage, faList, faMessage, faVideo, } from '@fortawesome/free-solid-svg-icons';

function Header() {

    const [open,setOpen] = useState(true);
  return (
       <div className={`h-full md:flex w-16 md:flex-col ${ open ? "w-60": " w-16"} fixed inset-y-0 z-1
       bg-black`}>
          <div className='text-white flex flex-col py-10'>
            <div className='flex justify-end mr-5 mb-5'>
            <FontAwesomeIcon icon={faList} className='text-white cursor-pointer' onClick={()=> setOpen(!open)}/>    
           </div>
          
          <div className='px-3 py-2 flex'>
             <Link to={"/home"} className='pl-3 mb-14 relative'> 
                    <div className='w-10 h-10 mr-4'>  
                        <img src={image} className='bg-white rounded-lg'/>
                        
                    </div>
                    <p className={`text-white pt-2 text-3xl absolute left-16 top-0 whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}> Noufer </p>
             </Link>
          </div>
          <div className='flex hover:bg-white hover:bg-opacity-10 rounded-lg p-5'>
          <Link to={'/home'} >
                <FontAwesomeIcon icon={faHouse} className='pr-8' />
                <div className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'} relative left-10 bottom-5`}> Home </div> 
          </Link>
          </div>
          <div className='hover:bg-white hover:bg-opacity-10 rounded-lg p-5'>
          <Link to={'/conversation'}>
          <FontAwesomeIcon icon={faMessage} className='pr-8'/>
          <p className={` whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'} relative left-10 bottom-5`}> Conversation </p>
          </Link>
          </div>
          <div className='hover:bg-white hover:bg-opacity-10 rounded-lg p-5'>
          <Link to={'/image'}>
          <FontAwesomeIcon icon={faImage} className='pr-8'/>
          <p className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'} relative left-10 bottom-5`}> Image generation</p>
          </Link>
          </div>
          <div className='hover:bg-white hover:bg-opacity-10 rounded-lg p-5'>
             <Link to={'/video'}>
             <FontAwesomeIcon icon={faVideo} className='pr-8'/>
             <p className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'} relative left-10 bottom-5`}> Video Generation </p>
             </Link>
          </div>
      </div>

       </div>
        

     

  )
}

export default Header