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
    const {isloading} = useSelector(state => state.user);
    const [redirect, setRedirect] = React.useState(false);  
    async function handleOAuth() {
        try{
            dispatch(loginStart());
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: "select_account" });
            const result = await signInWithPopup(auth, provider);
            const username = result.user.displayName + Math.random().toString(36).slice(2);
            const email = result.user.email;
            const imageUrl = result.user.photoURL;
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username,
                  email,
                  imageUrl
                }),
            })
            if(response.ok){
                dispatch(loginSuccess(await response.json()));
                setRedirect(true);
            }else{
                dispatch(loginFailure( await response.json()));
            }
        }catch(error){
            console.log(error);
        }
    }
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
