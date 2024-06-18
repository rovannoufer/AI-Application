import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowLeft, faMessage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import image from "../img/logo.png"

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
      "Authorization": `api-key` 
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

      <div className='flex flex-col items-center top-24'>
          <div className='flex flex-col justify-center p-5 border-t-2 rounded-lg shadow-xl w-[50%]'>
              <form onSubmit={handleSubmit}>
              <div className='w-[80%] relative left-44'>
                  <input type='text' placeholder='Enter a prompt here'  onChange={(e) => setInputValue(e.target.value)}  className='rounded-lg p-3 w-[70%] border'/>
                  <button type='submit' className=' p-3 absolute left-[56%] hover:bg-black hover:text-white hover:rounded-lg'
                  >
                     Generate 
                  </button>
              </div>
              </form>
              <div className='mt-4 flex flex-col'>
              {
                  chatLog.map((message, index) => (
                  <div key={index} className={`flex mb-4 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                    <div className={` ${
                      message.type === 'user' ? 'bg-black w-[25%]' : 'bg-black w-[75%]'
                    } rounded-lg p-4 text-white`}>
                      {
                        message.type === 'user' ? <h1>USER : </h1> : <img src={image} className='bg-white h-8'/>
                      }
                      
                      {message.message}
                    </div>
                    </div>
                ))
            }

              </div>
          </div>
          
          
      </div>

    </>
  )
}

export default Conversation