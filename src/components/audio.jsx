import React, { useState } from 'react';
import axios from 'axios';
import upload from "../img/audio.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faXmark } from '@fortawesome/free-solid-svg-icons';
import { storage,ref, uploadBytes,getDownloadURL } from '../js/firebase';
import Model from './showmodel';
import { Toaster, toast } from 'react-hot-toast';

function Audio() {
    const [file, setFile] = useState(null);
    
    const [generatedtext, setGeneratedText] = useState("");
    const [showModel, setShowModel ] = useState(false);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
       

        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
           
            setFile(selectedFile);
            setErrorMessage("");
        } else {
            setFile(null);
            toast.error("Please upload a valid audio file (MP3, WAV, or OGG).");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Clicked")
        if (!file) {
            toast.error("No valid file selected.");
            return;
        }

        if(file){
            const storageRef = ref(storage, `audio/${file.name}`);
            await uploadBytes(storageRef, file);
            const fileURL = await getDownloadURL(storageRef);
            try {
                const response = await axios.post('http://localhost:3000/transcribe', {
                    file_url: fileURL
                  }, {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
                
                setGeneratedText(response.data.transcript);
                setShowModel(true);
            } catch (error) {
                toast.error('Error uploading file:', error);
                toast.error("Error uploading file. Please try again.");
            }
        }

       
    };

    return (
       <>
       <Toaster />
         <div className='flex flex-col lg:flex-row lg:gap-32'>
           <div className='flex flex-col relative mt-[15%] shadow-lg lg:ml-[20%] rounded-xl justify-center lg:w-96 w-52 left-24'>
                <img src={upload} className='h-28 w-24 relative lg:left-36 left-14'/>
                <p className='text-center'>Drop your file here</p>
                <input type="file" id="myFile" name="filename" className='opacity-0 absolute top-0 h-40' onChange={handleFileChange} accept="audio/*" />
                {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
                <button onClick={handleSubmit} className='mt-4 hover:bg-black hover:text-white p-2 rounded-lg mb-4 w-24 relative lg:left-36 left-[25%]'>UPLOAD</button>
           </div>
           
            
           {
                file && 
                <div className='flex text-black  p-3 mt-4 w-full lg:w-[30%] lg:h-32 rounded-2xl shadow-2xl bg-opacity-5 bg-black relative lg:top-60'>
                <img src={upload} className='w-24'/>
                <p className='pl-2 relative top-10'> { file.name} </p>
                <FontAwesomeIcon icon={faXmark} className='absolute right-4 top-4 hover:bg-white p-1 rounded-xl' onClick={()=> setFile("")}/>
               </div>
           }


           
         </div>

         { showModel && <Model onClose={()=> setShowModel(false)} result = { generatedtext }  />  }
       </>
    );
}

export default Audio;
