import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Image() {
    

  return (
    <>
          <div className='text-black font-bold py-24 text-center'>
          <div className='text-2xl  md:text-6xl lg:text-7xl '>
            <h1 className='mb-4'> The Best Prompting Tool</h1>
          
                <div className='italic mb-4 font-light'>
                <Typewriter
                  options={{
                    strings: ['Prompting'],
                    autoStart: true,
                    loop: true,
                  }}
                  
                />
                </div>
            
          </div>
          <div className='text-sm md:text-xl font-light text-zinc-400'>
              Create content using AI
              <p>Unlock the power of AI-driven creativity with image-based prompts!</p>
          </div>
            
          
        </div>

        <div className='flex flex-col items-center  text-black text-center '>
              <div className='lg:shadow-2xl  lg:rounded-2xl lg:w-[25%] p-10 '>
              <div>
              <p className='text-2xl lg:text-xl mb-5'> Our advanced AI models can generate captivating content from your uploaded images, 
                transforming them into inspiring narratives or engaging descriptions. </p>    
              </div> 
              <div>
                
                <Link to={'/imageprompt'} className='bg-black text-white p-3 rounded-xl'> Get Started
                <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                 </Link>
              </div>
              </div>
        </div>
    
    </>
  )
}

export default Image