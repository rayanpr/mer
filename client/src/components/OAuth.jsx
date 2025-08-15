import React from 'react'
import { Button,Spinner } from 'flowbite-react'
import { FcGoogle } from "react-icons/fc";
import {app} from '../../firbaseConfig'
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import { Navigate } from 'react-router-dom';
import { loginStart ,loginSuccess,loginFailure } from '../redux/slices.js/userSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function OAuth() {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = React.useState(false);  
    const {isloading,currentUser} = useSelector(state => state.user);  
    const auth = getAuth(app);
    async function handleOAuth() {
        dispatch(loginStart());
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try{
            const result = await signInWithPopup(auth, provider);
             const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: result.user.displayName,
                  email: result.user.email,
                  imageUrl: result.user.photoURL
                }),
            })
          const data = await response.json();
          console.log(response.ok);
          if(response.ok){
            dispatch(loginSuccess(data));
            setRedirect(true);
          }else{
            dispatch(loginFailure(data));
          }
        }catch(error){
            console.log(error);
        }
    }
    console.log("currentUser",currentUser);
    if(redirect){
        return <Navigate to={'/'} />
    }
  return (
    <Button  onClick={handleOAuth} type='button' disabled={isloading} className='bggradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' outline>
      {isloading ?(<><Spinner/> <span>Loading...</span></>) :( 'Sign In with Google')}
    < FcGoogle className='w-5 h-5 ml-2' />
    </Button>
    )
}
