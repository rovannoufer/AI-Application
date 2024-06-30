import React, { useState, useRef, useCallback, useEffect } from 'react';
import upload from "../img/upload.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faXmark, faArrowLeft, faImage } from '@fortawesome/free-solid-svg-icons';
import Model from './showmodel';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';



function Imagegenerate() {
  const [generatedText, setGeneratedText] = useState("");
  const [file,setfile ] = useState("");
  const [showModel, setShowModel ] = useState(false);
  const [imageURL, setImageURL ] = useState("")
  const fileref = useRef();
  const [dataURL, setDataURL ] = useState(null);
  const paraRef = useRef(null);
  
  const onDrop = useCallback(file =>{
    file.forEach(file=>{
      const reader = new FileReader()
      reader.onload =() =>{
        const binaryStr = reader.result
        setDataURL(binaryStr)
      }
      reader.readAsDataURL(file)
    })

  },[])

  // const { getRootProps,acceptedFiles,getInputProps,isDragActive } = useDropzone({ onDrop })

  // useEffect(() => {
  //   if (acceptedFiles.length > 0) {
  //     const selectedFile = acceptedFiles[0];
  //     // console.log(selectedFile);
  //     setfile(selectedFile);
  //   }
  // }, [acceptedFiles]);

  
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
     <div className='flex p-8 gap-4 items-center'>
            <Link  to={'/prompt'}>
            <FontAwesomeIcon icon={ faArrowLeft } />
            </Link>
          <FontAwesomeIcon icon={ faImage } className=' w-10 h-10'/>
          <div>
              <p className='text-3xl'> Image Prompting </p>
              <p className='text-sm'> Our most advanced Prompting model</p>
          </div>
       </div>
      <div className='flex flex-col items-center  text-white relative top-20 lg:top-32 left-20 w-[65%]  lg:left-96 '>
        <div className='flex flex-col relative items-center p-5 bg-[#ffffff] text-gray-500 mt-3 rounded-2xl shadow-2xl '>
           <img src={upload}  className='h-40'/>
           <p> Drop your file here</p>
           <input type="file" id="myFile" name="filename" ref={fileref} className='opacity-0 absolute top-0 h-56' onChange={handleInput} />
           <button onClick={handle} className='mt-4 hover:bg-black hover:text-white p-2 rounded-lg'> UPLOAD </button>
        </div>
       
       {
        file && 
        <div className='flex text-black  p-3 mt-4 w-full lg:w-[30%] rounded-2xl shadow-2xl bg-opacity-5 bg-black relative'>
         <img src={dataURL} className='w-24'/>
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
