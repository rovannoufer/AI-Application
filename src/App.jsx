
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Landing from './components/Landing';
import Conversation from './components/Conversation';
import Imagegenerate from './components/Imagegenerate';

import Image from './components/image';
import Conversationl from './pages/Conversationl';
import Content from './components/contentgenerate';
import Contentgl from './pages/Contentgl';
import { AuthContextProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './pages/Signup';

function App() {
  

  return (
    <>
      <AuthContextProvider>
 
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}>
                <Route path='/' element={<Landing />} />
                <Route path='conversation' element={<Conversationl />} />
                <Route path='chat' element ={<ProtectedRoute>  <Conversation /> </ProtectedRoute>} />
                <Route path='/prompt' element={<Image />} />
                <Route path='/imageprompt' element={ <Imagegenerate />} />
              
                <Route path='/contentgenerate' element={<Contentgl />} />
                <Route path='/content' element={<Content />}/>
            </Route>

            <Route path='/signin' element={ <Signup type = "sign-in"/>  }/>
            <Route path='/signup' element={ <Signup type = "sign-up"/> }/>

            
          </Routes>
        </BrowserRouter>

      </AuthContextProvider>
    </>
  )
}

export default App
