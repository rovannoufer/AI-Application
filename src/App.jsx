
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './components/Landing';
import Conversation from './components/Conversation';
import Imagegenerate from './components/Imagegenerate';

import Image from './components/image';
import Conversationl from './pages/Conversationl';
import Content from './components/contentgenerate';
import Contentgl from './pages/Contentgl';

function App() {
  

  return (
    <>
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<Home />}>
              <Route path='/' element={<Landing />} />
              <Route path='conversation' element={<Conversationl />} />
              <Route path='chat' element ={<Conversation />} />
              <Route path='/prompt' element={<Image />} />
              <Route path='/imageprompt' element={ <Imagegenerate />} />
             
              <Route path='/contentgenerate' element={<Contentgl />} />
              <Route path='/content' element={<Content />}/>
           </Route>

           
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
