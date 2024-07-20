
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
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import Audio from './components/audio';
import Sentiment from './components/sentiment';


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
                <Route path='/imageprompt' element={ <ProtectedRoute> <Imagegenerate /> </ProtectedRoute>} />
              
                <Route path='/audio' element={<ProtectedRoute><Audio /> </ProtectedRoute>} />
                <Route path='/sentiment' element={<ProtectedRoute> <Sentiment /> </ProtectedRoute>} />
                <Route path='/contentgenerate' element={<Contentgl />} />
                <Route path='/content' element={<ProtectedRoute> <Content /> </ProtectedRoute>}/>
            </Route>

            <Route  path='/signin' element={<SignIn /> } />
            <Route path='/login' element={<Login />} />

            
          </Routes>
        </BrowserRouter>

      </AuthContextProvider>
    </>
  )
}

export default App
