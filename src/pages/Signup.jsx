import React, { useEffect, useRef } from 'react'
import { faUser, faEnvelope, faKey  } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../components/AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../js/firebase';
import InputBox from '../components/inputbox';

function Signup({type}) {

  const authForm = useRef();

  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () =>{
    try{
       await googleSignIn();
       navigate('/')
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(user!=null){
      navigate('/signin');
    }
  },[user])

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

  const signInHandleSubmit= async (e) =>{
    e.preventDefault();
    let form = new FormData(authForm.current);

    let formData ={};
    for(let [key, value] of form.entries()){
      formData[key] = value;
    }
    
    let { email , password } = formData;

    try{
      const user = await signInWithEmailAndPassword(auth,email,password);
      navigate('/')
    }catch(error){
      console.log(error);
    }
  }





  return (
         <>
           <form ref={ authForm }>
           <div className=' px-60 my-44'>
              <h1 className='text-3xl capitalize text-center mb-24'> 
                {type === "sign-in" ? "Welcome back" : "Join us today"}
              </h1>
              {
                type !== "sign-in" ?
                <InputBox 
                 name="fullname"
                 type="text"
                 placeholder="Full name"
                 icon= {faUser}
                 
                />
                : " "
              }
              <InputBox 
                 name="email"
                 type="email"
                 placeholder="E-mail"
                 icon= {faEnvelope}
                />

              <InputBox 
                 name="password"
                 type="password"
                 placeholder="Password"
                 icon= { faKey }
                />

             

                {
                 type !== "sign-in" ? 
                 <button className='whitespace-nowrap bg-black text-white rounded-full py-3 px-6 text-xl capitalize hover:bg-opacity-80 block mx-auto mt-14'
                 type="submit" onClick={signupHandleSubmit}
                 > 
                    { type.replace("-", " ")}
                 </button> 

                 : 
                 
                 <button className='whitespace-nowrap bg-black text-white rounded-full py-3 px-6 text-xl capitalize hover:bg-opacity-80 block mx-auto mt-14'
                 type="submit" onClick={signInHandleSubmit}
                 > 
                    { type.replace("-", " ")}
                 </button>

                }

                <div className='relative w-full flex items-center gap-2
                my-10 opacity-10 uppercase text-black font-bold'>
                    <hr className='w-1/2 border-black'/>
                    <p className='text-black'> OR </p>
                    <hr className='w-1/2 border-black'/>
                </div>

                <button className='whitespace-nowrap bg-black text-white rounded-full py-3 px-6 text-xl capitalize hover:bg-opacity-80  bg-grey block mx-auto'
                   onClick={handleGoogleSignIn}>
                  {/* <GoogleIcon  className='mr-3'/> */}
                  {/* <FontAwesomeIcon icon="fa-brands fa-google" /> */}
                    Continue With Google
                </button>

                 {
                    type === "sign-in" ?  
                     
                      <Link to="/signup" className="underline text-black
                      text-xl ml-1">
                        <p className='mt-6 text-dark-grey text-xl text-center'>
                      Don't have an account ?
                      </p>
                      </Link>
                    
                    : <Link to="/signin" className="underline text-black
                    text-xl ml-1">
                      <p className='mt-6 text-dark-grey text-xl text-center'>
                    Already have an account
                    </p>
                    </Link>
                }

        </div>

           </form>
         
         </>
  )
}

export default Signup