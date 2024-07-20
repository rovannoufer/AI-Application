import React, { useState } from 'react';
import axios from 'axios';
import upload from "../img/audio.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStoreAltSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { storage, ref, uploadBytes, getDownloadURL } from '../js/firebase';
import toast, { ToastBar, Toaster } from 'react-hot-toast';

function Sentiment() {
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
        } else {
            setFile(null);
            toast.error("Please upload a valid audio file (MP3, WAV, or OGG).");
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("No valid file selected.");
            return;
        }

        if (file) {
            const filename = file.name;
          
            const storageRef = ref(storage, `audio/${file.name}`);
            try {
                await uploadBytes(storageRef, file);
                const fileURL = await getDownloadURL(storageRef);

                const response = await axios.post('http://localhost:3000/sentiment', { 
                    file_url: fileURL,
                    files: filename
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    responseType: 'blob' 
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                setFileUrl(url);
                const text = await response.data.text();
                setFileContent(text);
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error("Error uploading file. Please try again.");
            }
        }
    };

    const handleViewFile = () => {
        if (fileContent) {
            const newWindow = window.open();
            newWindow.document.write('<pre>' + fileContent + '</pre>');
        }
    };

    const handleDownloadFile = () => {
        if (fileUrl) {
            const link = document.createElement('a');
            link.href = fileUrl;
           
            link.setAttribute('download', `${filename.split(".")[0]}.txt`);     
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };

    return (
        <>
        <Toaster />
            <div className='flex flex-col lg:flex-row lg:gap-32'>
                <div className='flex flex-col relative mt-[15%] shadow-lg lg:ml-[20%] rounded-xl justify-center lg:w-96 w-52 left-24'>
                    <img src={upload} className='h-28 w-24 relative lg:left-36 left-14' />
                    <p className='text-center'>Drop your file here</p>
                    <input type="file" id="myFile" name="filename" className='opacity-0 absolute top-0 h-40' onChange={handleFileChange} accept="audio/*" />
                    {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
                    <button onClick={handleSubmit} className='mt-4 hover:bg-black hover:text-white p-2 rounded-lg mb-4 w-24 relative lg:left-36 left-[25%]'>UPLOAD</button>
                </div>

                <div className='flex flex-col'>
                {file && (
                    <div className='flex text-black p-3 mt-4 w-full lg:h-32 rounded-2xl shadow-2xl bg-opacity-5 relative lg:top-60'>
                        <img src={upload} className='w-24' />
                        <p className='pl-2 relative top-10'>{file.name}</p>
                        <FontAwesomeIcon icon={faXmark} className='absolute right-4 top-4 hover:bg-white p-1 rounded-xl' onClick={() => {
                            setFile(null)
                            setFileContent(null)
                           }
                        } />
                    </div>
                )}

                {fileContent && (
                   <>
                    <div className='flex relative lg:top-72 justify-center gap-2'>
                        <p className='relative top-4'> REPORT : </p>
                        <button onClick={handleViewFile} className='mt-2 hover:bg-black hover:text-white p-2 rounded-lg mb-4 w-24'>VIEW</button>
                        <button onClick={handleDownloadFile} className='mt-2 hover:bg-black hover:text-white p-2 rounded-lg mb-4 w-28'>DOWNLOAD</button>
                    </div>
                   </>
                )}
                
                </div>
            </div>
        </>
    );
}

export default Sentiment;
