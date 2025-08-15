import React from 'react'
import { Link ,Navigate} from 'react-router-dom';
import { Button,TextInput,Label, Alert, Spinner  } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { loginStart ,loginSuccess,loginFailure } from '../redux/slices.js/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';


export default function SigInPage() {
  const dispatch = useDispatch();
  const[password, setPassword] = React.useState('');
  const[email, setEmail] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);
  const { isloading,error:erroror} = useSelector(state => state.user);
 async function handleSubmit(e) {
    dispatch(loginStart());
    e.preventDefault();
    try{
    const response =  await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
     const data = await response.json();
     
      // setEmail("");
      // setPassword("");
     
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
  if(redirect){
    return <Navigate to={'/'} />;
  }
  return (
    <div className=' bg-white min-h-screen mt-20 dark:bg-gray-900 dark:text-white'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col lg:flex-row md:items-center gap-5'>
        <div className=' flex flex-col flex-1 w-full lg:pr-5 lg:justify-center'>
          <Link className='font-bold text-4xl dark:text-white' to={'/'}> 
            <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-4xl" >Rayan's</span>Blog
          </Link>
          <p className='mt-5 lg:text-xl'>
             this the demo project of mern stack  you can create your account and login to this project 
          </p>
        </div>
        <div className='flex-1 flex flex-col justify-center w-full'>
           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2">Your email</Label>
              </div>
              <TextInput value={email} onChange={(e) => setEmail(e.target.value)} id="email2" type="email" placeholder="name@flowbite.com" required shadow />
            </div>
            <div>
              <div className="mb-4 block">
                <Label htmlFor="password2">Your password</Label>
              </div>
              <TextInput value={password} onChange={(e) => setPassword(e.target.value)} id="password2" type="password" required shadow />
            </div>
            <Button  disabled={isloading}  className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'  type="submit"> 
              {isloading ?(<><Spinner/> <span>Loading...</span></>) :( 'Sign In')}
            </Button>
            <OAuth/>
            <p className='text-sm text-gray-500 mt-3'>Dont have an account? <Link className='text-indigo-600' to={'/sign-up'}>Sign Up</Link></p>
           </form>
          {erroror   && <Alert color="failure">{JSON.stringify(erroror.payload)}</Alert>}
        </div>
      </div>
    </div>
  )
}
