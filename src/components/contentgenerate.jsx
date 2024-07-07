import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Toaster, toast } from 'react-hot-toast';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
function Content() {
  const inputRef = useRef();
  const [answer,setAnswer] = useState("");
  const copyRef = useRef(null)

  const handle = async () => {
    const data = { prompt: inputRef.current.value }; 
   

    try {
      const response = await fetch("https://ai-app-server.onrender.com/contentgeneration", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data) 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setAnswer(result.chunkText)
    } catch (e) {
      console.error(e);
    }
  };


  const handleCopy = async () =>{
    const copyData = copyRef.current.innerText;
    try {
       await navigator.clipboard.writeText(copyData);
       toast.success('Content copied to clipboard');
     } catch (err) {
       toast.error('Failed to copy: ', err);
     }
 }

  return (
   <>
   <Toaster />
     <div className='flex p-8 gap-4 items-center'>
            <Link  to={'/contentgenerate'}>
            <FontAwesomeIcon icon={ faArrowLeft } />
            </Link>
          {/* <FontAwesomeIcon icon={ } className=' w-10 h-10'/> */}
          <div>
              <p className='text-3xl'> Content Generation </p>
              <p className='text-sm'> Our most advanced generating model</p>
          </div>
       </div>
   

       <div className='mt-10 flex flex-col items-center' >
              <div className='relative flex flex-col justify-center p-5 rounded-lg shadow-xl w-full lg:w-[50%]'> 
                      
                      <div className=' flex justify-center '>
                          <input type='text' placeholder='Enter a prompt here' 
                           ref={inputRef}
                            className='rounded-lg p-3 w-[70%] text-center border'/>
                         
                      </div>
                     <div className='flex justify-center'>
                          <button type='submit' className=' p-3 mt-4 mb-4 hover:bg-black hover:text-white hover:rounded-lg'
                                  onClick={handle}
                                  >
                            Generate 
                          </button>

                          <button className='ml-5 hover:bg-black hover:rounded-lg hover:text-white p-3 mt-4 mb-4' onClick={handleCopy}> Copy</button>
                          
                     </div>
                      

                      {
                        answer && <div className='bg-black text-center text-white rounded-xl p-5 ' >
                
                        <p ref={copyRef}>{answer} </p>

                      </div>
                      }
            </div>

           
       </div>
   </>
    
        
     
  
  );
}

export default Content;
