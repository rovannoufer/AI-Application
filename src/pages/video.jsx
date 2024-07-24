import React from 'react'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Video() {
  return (
    <>
    <div className='text-black font-bold py-36 text-center'>
    <div className='text-2xl  md:text-6xl lg:text-7xl '>
      <h1 className='mb-4'> Entertainment with Video</h1>
     
          <div className='italic mb-4 font-light'>
          <Typewriter
            options={{
              strings: ['Video'],
              autoStart: true,
              loop: true,
            }}
            
          />
          </div>
      
    </div>
    <div className='text-sm md:text-xl font-light text-zinc-400'>
         Making fun with Video
        <p>Leveraging advanced machine learning models, it will help to work with video</p>
    </div>
       
    
  </div>

  <div className='flex flex-col justify-center lg:flex-row gap-10 text-black text-center '>
    <div className='shadow-2xl  rounded-2xl  p-10'>
        <div>
        <p className='text-2xl lg:text-3xl mb-5'> Content Generation using video</p>    
        </div> 
        <div>
          
          <Link to={'/videocontent'} className='hover:bg-black hover:text-white p-3 rounded-xl'> Get Started  <FontAwesomeIcon icon={faArrowRight} className='ml-2' /> </Link>
        </div>
    </div>
    <div className='shadow-2xl  rounded-2xl  p-10'>
          <div>
          <p className='text-2xl lg:text-3xl mb-5'> Subtitles </p>    
          </div> 
          <div>
            
            <Link to={'/subtitle'} className='hover:bg-black hover:text-white p-3 rounded-xl'> Get Started  <FontAwesomeIcon icon={faArrowRight} className='ml-2' /> </Link>
          </div>
    </div>
   
  </div>
    </>
  )
}

export default Video