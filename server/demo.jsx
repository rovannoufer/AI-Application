import React, { useState } from 'react';

const accessToken = "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"; 
const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const generateImage = async () => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: "POST",
          body: JSON.stringify({
            inputs: "sundar pichai"
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(response)
      const result = await response.blob();
      console.log(result)
      const imageUrl = URL.createObjectURL(result);
      setImageUrl(imageUrl);
      setError('');  // Clear any previous errors
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={generateImage}>Generate Image</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="90s Era" />}
    </div>
  );
};

export default ImageGenerator;
