import React, { useState } from 'react';
import axios from 'axios';
import upload from "../img/images.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from 'react-hot-toast';

function Subtitle() {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [fileUrl, setFileUrl] = useState(null);
    const [filename, setFilename] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ['video/mp4', 'video/avi', 'video/mkv'];

        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setErrorMessage("");
        } else {
            setFile(null);
            toast.error("Please upload a valid video file (MP4, AVI, MKV).");
        }

    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        console.log("Clicked handlesubmit");
        if (!file) {
            toast.error("No valid file selected.");
            return;
        }

        const formData = new FormData();
        formData.append('video', file);

        try {
            const response = await axios.post('https://audio-2.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const audioPath = response.data.audioPath;

            const subtitleResponse = await axios.post('https://audio-2.onrender.com/subtitle', {
                audioPath
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'blob'
            });

            console.log("datarecived");
            const url = window.URL.createObjectURL(new Blob([subtitleResponse.data]));
            setFileUrl(url);
            setFilename(file.name.replace(/\.[^/.]+$/, ".vtt")); 
        } catch (error) {
            console.error('Error processing file:', error);
            toast.error("Error processing file. Please try again.");
        }
    };


    const handleDownloadFile = () => {
        if (fileUrl) {
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', filename);
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
                    <input type="file" id="myFile" name="filename" className='opacity-0 absolute top-0 h-40' onChange={handleFileChange} accept="video/*" />
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
                            setFileUrl(null)
                           }
                        } />
                    </div>
                )}

                {fileUrl && (
                   <>
                    <div className='flex relative lg:top-72 justify-center gap-2'>
                        <p className='relative top-4'> SUBTITLE: </p>
                        
                        <button onClick={handleDownloadFile} className='mt-2 hover:bg-black hover:text-white p-2 rounded-lg mb-4 w-28'>DOWNLOAD</button>
                    </div>
                   </>
                )}
                
                </div>
            </div>
        </>
    );
}

export default Subtitle;
