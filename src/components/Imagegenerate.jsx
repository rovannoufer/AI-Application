import React, { useState, useRef } from 'react';
import upload from "../img/upload.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faXmark } from '@fortawesome/free-solid-svg-icons';
import Model from './showmodel';



function Imagegenerate() {
  const [generatedText, setGeneratedText] = useState("");
  const [file,setfile ] = useState();
  const [showModel, setShowModel ] = useState(false);
  const [imageURL, setImageURL ] = useState("")
  const fileref = useRef();
  const paraRef = useRef(null);

  console.log(file)

  const handleInput = () =>{
    const files = fileref.current.files[0];
    setfile(files)
    
  }

  const handle = async () => {
    const files = file;
    
    console.log(files);
    if (!files) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('files', files);
    formData.forEach((items=>{
      console.log(items.name)
    }))

    try {
      const response = await fetch("http://localhost:3001/uploads", {
        method: 'POST',
        body: formData, 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
    
      setGeneratedText(data.chunkText); 
      setImageURL(data.downloadURL);
      setShowModel(true);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <>
      <div className='flex flex-col items-center  text-white relative top-48 left-20 w-[65%]  lg:left-96 '>
        <div className='flex flex-col relative items-center p-5 bg-[#ffffff] text-gray-500 mt-3 rounded-2xl shadow-2xl '>
           <img src={upload}  className='h-40'/>
           <p> Drop your file here</p>
           <input type="file" id="myFile" name="filename" ref={fileref} className='opacity-0 absolute top-0 h-56' onChange={handleInput} />
           <button onClick={handle} className='mt-4 hover:bg-black hover:text-white p-2 rounded-lg'> UPLOAD </button>
        </div>
       
       {
        file  && <div className='text-black  p-3 mt-4 w-full lg:w-[30%] rounded-2xl shadow-2xl bg-opacity-5 bg-black relative'>
        <p className='pl-2'> { file.name} </p>
        <FontAwesomeIcon icon={faXmark} className='absolute right-4 top-3 hover:bg-white p-1 rounded-xl' onClick={()=> setfile("")}/>
      </div>
       }
      
      </div>
      
      { showModel && <Model onClose={()=> setShowModel(false)} result = { generatedText }  url = { imageURL } />  }

    </>
    
  );
}

export default Imagegenerate;



// <div>
//      <div className='bg-black'>
//      <input type="file" id="myFile" name="filename" ref={fileref} className='' />
//      </div>
//       <button onClick={handle}>Generate</button>
      
//     </div>
