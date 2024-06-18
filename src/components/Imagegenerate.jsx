import React, { useState, useRef } from 'react';

function Imagegenerate() {
  const [generatedText, setGeneratedText] = useState("");
  const fileref = useRef();

  const handle = async () => {
    const files = fileref.current.files[0];
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" id="myFile" name="filename" ref={fileref} />
      <button onClick={handle}>Generate</button>
      <p className='text-white bg-black'>{generatedText}</p>
    </div>
  );
}

export default Imagegenerate;
