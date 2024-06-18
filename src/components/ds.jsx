import React, { useState } from 'react';

function Imagegenerate() {
  const [generatedText, setGeneratedText] = useState("");

  const handle = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/predictions", {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); 
      console.log(data)// Parse the JSON response
      setGeneratedText(data.text); // Update state with generated text
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handle}>Generate</button>
      <div>{generatedText}</div>
    </div>
  );
}

export default Imagegenerate;
