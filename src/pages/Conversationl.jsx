import React from 'react'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'

function Conversationl() {
  return (
    <>
    <div className='text-black font-bold py-36 text-center'>
    <div className='text-2xl  md:text-6xl lg:text-7xl '>
      <h1 className='mb-4'> The Best Conversation Tool</h1>
     
          <div className='italic mb-4 font-light'>
          <Typewriter
            options={{
              strings: ['Conversation'],
              autoStart: true,
              loop: true,
            }}
            
          />
          </div>
      
    </div>
    <div className='text-sm md:text-xl font-light text-zinc-400'>
        Create content using AI
        <p>Experience the future of communication with AI that learns and evolves with every conversation</p>
    </div>
       
    
  </div>

  <div className='flex flex-col items-center  text-black text-center '>
    <div className='shadow-2xl  rounded-2xl lg:w-[25%] p-10'>
    <div>
    <p className='text-2xl lg:text-3xl mb-5'> Enhance your interactions with our advanced AI-driven conversational tools. </p>    
    </div> 
    <div>
       
       <Link to={'/chat'} className='hover:bg-black hover:text-white p-3 rounded-xl'> Get Started </Link>
    </div>
    </div>
  </div>
    </>
  )
}

export default Conversationl