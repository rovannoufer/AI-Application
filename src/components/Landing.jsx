import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

function Landing() {
  return (
    <>
      <div className='text-black font-bold py-36 text-center'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl '>
        <h1 className='mb-4'> The Best AI Tool</h1>
       
            <div className='italic mb-4 font-light'>
            <Typewriter
              options={{
                strings: ['Content Generation', 'Prompting', 'Conversation'],
                autoStart: true,
                loop: true,
              }}
              
            />
            </div>
        
      </div>
      <div className='text-sm md:text-xl font-light text-zinc-400'>
          Create content using AI
      </div>
       
    </div>

    <div className=' flex flex-col flex-wrap lg:flex-row justify-center text-white gap-5 '>
        <div className='p-10 basis-[10%] lg:basis-[25%] border rounded-2xl shadow-2xl  text-center bg-black '>
         
          <h1 className='text-4xl sm:text-3xl md:text-4xl lg:text-5xl mb-2'> Conversation </h1>
                  <p className='italic'> Engage in dynamic, real-time conversations </p>
                  <p className='italic'> Powered by cutting-edge AI, </p>  
                  <Link to={'/conversation'}> <button className='mt-5 hover:bg-white hover:text-black p-3 hover:rounded-xl'> Get Started
                       <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                     </button> </Link>
            </div>
         <div className='p-10 basis-[10%] lg:basis-[25%] border rounded-2xl shadow-2xl  bg-black text-center'>
              <h1 className='text-4xl sm:text-3xl md:text-4xl lg:text-5xl mb-2'> Image </h1>
              <p className='italic'> This generate content from media files </p>
              <Link to={'/prompt'}> <button className='mt-5 hover:bg-white hover:text-black p-3 hover:rounded-xl'> Get Started
                       <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                     </button> </Link>
         </div>
         <div className='p-10 basis-[10%] lg:basis-[25%] border rounded-2xl shadow-2xl  bg-black text-center'>
              <h1 className='text-4xl sm:text-3xl md:text-4xl lg:text-5xl mb-2'> Audio </h1>
              <p className='italic'> Get Entertained with Audio </p>
              <Link to={'/contentgenerate'}> <button className='mt-5 hover:bg-white hover:text-black p-3 hover:rounded-xl'> Get Started
                       <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                     </button> </Link>
         </div>
         <div className='p-10 basis-[10%] lg:basis-[25%] border rounded-2xl shadow-2xl  bg-black text-center'>
              <h1 className='text-4xl sm:text-3xl md:text-4xl lg:text-5xl mb-2'> Video </h1>
              <p className='italic'> Get Entertained with Video </p>
              <Link to={'/video'}> <button className='mt-5 hover:bg-white hover:text-black p-3 hover:rounded-xl'> Get Started
                       <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
                     </button> </Link>
         </div>
    </div>
    </>
  )
}

export default Landing