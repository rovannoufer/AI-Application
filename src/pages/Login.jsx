import React from 'react'
import { useState,useRef, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link,  useNavigate  } from 'react-router-dom';
import { UserAuth } from '../components/AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../js/firebase';


function Login() {
  const authForm = useRef();
  const [password, setpassword] = useState(false);
  const navigate = useNavigate();
  const signupHandleSubmit= async (e) =>{
    e.preventDefault();
    let form = new FormData(authForm.current);

    let formData ={};
    for(let [key, value] of form.entries()){
      formData[key] = value;
    }
    
    let { email , password } = formData;

    try{
      const user = await createUserWithEmailAndPassword(auth,email,password);

      navigate('/')
    }catch(error){
      console.log(error);
    }
  }
  return (
    <form ref={authForm} onClick={signupHandleSubmit}>

            <div className='flex flex-col items-center mt-32'>

            <div className='border p-14'>
            <h1 className='text-3xl capitalize text-center mb-24'> Welcome back </h1>
            <div className='relative mb-4'>
            <input 
                
                name="fullname"
                type="text"
                placeholder="Full name"
                className='block mx-auto rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black '
                />
                <FontAwesomeIcon icon={ faUser } className="absolute left-4 top-1/2 -translate-y-1/2" />
                
            </div>
            <div className='relative mb-4'>
            <input 
                
                name="email"
                type="email"
                placeholder="E-mail"
                className='block mx-auto rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black '
                />
                <FontAwesomeIcon icon={ faUser } className="absolute left-4 top-1/2 -translate-y-1/2" />
                
            </div>
            <div className='relative'>
            <input 
                type={ password ? "text" : "password"}
                name="password"
                placeholder="Password" 
                className='block mx-auto rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black '
                />
                <FontAwesomeIcon icon={faKey}  className='absolute top-7 left-4 -translate-y-1/2'/>
                <FontAwesomeIcon icon = { password ? faEye : faEyeSlash } 
                className="absolute  cursor-pointer top-7 right-5 -translate-y-1/2
                    " onClick={() => setpassword(value => !value)} />
            </div>

            <div className="flex flex-col items-center justify-center mt-4 gap-4"> 
                <button className='bg-black text-white p-4 rounded-lg' type='submit' > Login </button>
                <Link to={'/signin'} > <p className='mt-6 text-dark-grey text-xl text-center'>Already have an account ? </p></Link>
            </div>
            
            </div>

            </div>
    </form>
  )
}

export default Login