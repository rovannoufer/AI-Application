import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from 'multer';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { app1 } from './firebase.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

const storage = getStorage(app1);

app.use(cors());
app.use(express.json());
const uploads = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY); 


function bufferToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType
    },
  };
}
const accessToken = "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"


app.post('/image', async(req,res)=>{
  try{
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "POST",
        body: JSON.stringify({
          "inputs": "Spiderman"
        })
      }
    );
    const result = await response.blob();
    console.log(result);
   
    res.json({ result });
   
  }catch(e){
    console.log(e)
  }
})


app.post('/conversationgenerate', async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro', 
    });
    const response = await model.generateContent(message);
    const botMessage = response.response.text();
    res.json({ type: 'bot', message: botMessage });
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/contentgeneration', async(req,res) => {

  try {
    const { prompt } = req.body; 
    
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro', 
    });

    const result = await model.generateContentStream([{ text: prompt }]);
    console.log(result)
    let chunkText = "";
    for await (const chunk of result.stream) {
      chunkText += chunk.text();
    }
    console.log(chunkText);
    res.send({ chunkText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
})

app.post('/uploads', uploads.single("files"), async (req, res) => {
  try {
    const storageRef = ref(storage, `files/${req.file.originalname}`);
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File uploaded successfully");
    console.log(downloadURL);

   
    let chunkText = "";

    
    const prompt = ""; 
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const imageParts = [bufferToGenerativePart(req.file.buffer, req.file.mimetype)];

    const result = await model.generateContentStream([prompt, ...imageParts]);

    for await (const chunk of result.stream) {
      chunkText += chunk.text();
    }

    console.log(chunkText);

    res.send({ chunkText , downloadURL});
  } catch (error) {
    console.log("noufer");
    console.error(error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
