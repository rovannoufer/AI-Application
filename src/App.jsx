
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './components/Landing';
import Conversation from './components/Conversation';
import Imagegenerate from './components/Imagegenerate';
import Video from './components/Video';

function App() {
  

  return (
    <>
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<Home />}>
              <Route path='/home' element={<Landing />} />
              <Route path='/conversation' element={<Conversation />} />
              <Route path='/image' element={<Imagegenerate />} />
              <Route path='/video' element={<Video />} />
           </Route>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
