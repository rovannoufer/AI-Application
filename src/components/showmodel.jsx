import { faCopy, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'

function Model({ result, onClose, url }) {

  const copyRef = useRef(null);
  
  const handleCopy = async () =>{
     const copyData = copyRef.current.innerText;
     try {
        await navigator.clipboard.writeText(copyData);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
  }


  return (
   <>
    <div className='fixed inset-0 bg-opacity-35 bg-black flex items-center justify-center'>
      <div className='flex flex-col gap-5 text-white lg:w-[50%] '>
          <button className='place-self-end rounded-full p-2' onClick={onClose}> <FontAwesomeIcon icon={faXmark}  /> </button>
          <div className='bg-black  rounded-xl shadow-2xl px-20 py-10 flex flex-col items-center gap-5 text-white'>
               
               <div className='bg-red-500'>
                <img src={url} className='h-24 w-28' />
               </div>
              
              
               <div className="overflow-y-auto h-72 text-white p-3 lg:p-11 relative">
                 <h1 className='text-center text-3xl mb-5'> About the Image</h1>
                 <button onClick={handleCopy} className=' hover:bg-white hover:rounded-xl hover:text-black lg:p-2 p-2'>
                    <FontAwesomeIcon icon={ faCopy } className='pr-3'/>
                        Copy </button>
                 <div className='p-5  hover:bg-gray-500 hover:bg-opacity-15'>
                 <p  ref={copyRef}> Description: " { result } "  </p>
                
                 </div>
                 
                
                 </div>
               
          </div>
      </div>
   </div>
  </>
  )
}

export default Model