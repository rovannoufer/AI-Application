import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMagnifyingGlass, faMessage } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import image from "../img/logo.png"
import { UserAuth } from './AuthContext'
import { GoogleGenerativeAI } from '@google/generative-ai'

function Conversation() {

  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const {user } = UserAuth();
  console.log(user.photoURL)

  const genAi = new GoogleGenerativeAI("api key")

  const model = genAi.getGenerativeModel({
    model: "gemini-1.5-pro"
  })

  



  const handleSubmit = (e) =>{
    e.preventDefault();
    setChatLog((prevChatLog) => [...prevChatLog, { type: "user", message: inputValue }]);
     sendMessage(inputValue)
     setInputValue("");
    
  }


  const sendMessage = async(message ) =>{
    try{
      const response = await model.generateContent(message)
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.response.text()}])
      console.log(response.response.text())
 
    } catch(e){
      console.log(e);
    }

  
  }

  return (
    <> 
       <div className='flex p-8 gap-4 items-center'>
            <Link  to={'/conversation'}>
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
                      
                      <div className=' flex justify-center '>
                          <input type='text' placeholder='Enter a prompt here'  onChange={(e) => setInputValue(e.target.value)}  className='rounded-lg p-3 w-[70%] text-center border'/>
                          {/* <button type='submit' className=' p-3 absolute lg:left-[61%] left-44 lg:hover:bg-black lg:hover:text-white lg:hover:rounded-lg'
                           onClick={handleSubmit}
                          >
                            Generate 
                          </button> */}
                      </div>
                     <div className='flex justify-center'>
                          <button type='submit' className=' p-3 mt-4 hover:bg-black hover:text-white hover:rounded-lg'
                                  onClick={handleSubmit}
                                  >
                            Generate 
                          </button>
                     </div>
                      

                      <div>
                      {
                            chatLog.map((message, index) => (
                            <div key={index} className={`flex mb-5 mt-5 ${
                              message.type === 'user' ? 'justify-end' : 'justify-start'
                              }`}>
                              <div className={`${
                                message.type === 'user' ? 'bg-black lg:w-[25%] ' : 'bg-black lg:w-[75%] h-40 overflow-y-auto'
                              } rounded-lg p-4 text-white`}>
                                {
                                  message.type === 'user' ? <img src={user.photoURL} className='bg-white rounded-2xl h-10 '/> :<img src={image} className='bg-white rounded-lg '/>
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