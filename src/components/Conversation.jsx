import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowLeft, faMagnifyingGlass, faMessage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import image from "../img/logo.png"
import OpenAI from 'openai'

function Conversation() {
  const searchRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    setChatLog((prevChatLog) => [...prevChatLog, { type: "user", message: inputValue }]);
     sendMessage(inputValue)
     setInputValue("");
    
  }


  const sendMessage = (message) =>{
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-type': 'application/json',
      "Authorization": `Bearer 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` 
    };
    const data= {
      model: "gpt-4",
      messages:[ {"role": "user", "content" : message} ]
    };
   
    
  
  
    axios.post(url, data, { headers: headers }).then((response) =>{
     console.log(response.data.choices[0].message.content);
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content}])

    }).catch((error) =>{
     
      console.log(error);
    })
  
  }

  return (
    <> 
       <div className='flex p-8 gap-4 items-center'>
            <Link  to={'/home'}>
            <FontAwesomeIcon icon={ faArrowLeft } />
            </Link>
          <FontAwesomeIcon icon={ faMessage } className=' w-10 h-10'/>
          <div>
              <p className='text-3xl'> Conversation</p>
              <p className='text-sm'> Our most advanced conversation model</p>
          </div>
       </div>

       <div className='mt-10 flex flex-col items-center' >
       <div className='relative flex flex-col justify-center p-5 rounded-lg shadow-xl w-full lg:w-[50%]'> 
       <form >
              <div className='relative lg:left-44 left-14'>
                  <input type='text' placeholder='Enter a prompt here'  onChange={(e) => setInputValue(e.target.value)}  className='rounded-lg p-3 w-[70%] border'/>
                  <button type='submit' className=' p-3 absolute lg:left-[61%] left-44 lg:hover:bg-black lg:hover:text-white lg:hover:rounded-lg'
                  >
                     Generate 
                  </button>
              </div>
              </form>
              

              
            </div>
       </div>
       
     
    </>
  )
}

export default Conversation