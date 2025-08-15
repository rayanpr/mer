import React from 'react'
import { Button,  Label, Checkbox, TextInput, Alert } from "flowbite-react";
import { Link ,Navigate} from 'react-router-dom'

export default function SignUpPage() {
  const[username, setUsername] = React.useState('');
  const[password, setPassword] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);
  const[email, setEmail] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try{
    const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });
      if(response.status === 200){
        setRedirect(true)
        Alert('success', 'User has been created');
      }
    }catch(error){
      console.log(error);
    }
  }
  if(redirect) return <Navigate to={'/sign-in'} />
  return (
    <div className=' bg-white min-h-screen mt-10 dark:bg-gray-900 dark:text-white'>
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
           <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username">Your Username</Label>
              </div>
              <TextInput value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text" placeholder="Your Username" required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2">Your email</Label>
              </div>
              <TextInput value={email} onChange={(e) => setEmail(e.target.value)} id="email2" type="email" placeholder="name@flowbite.com" required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2">Your password</Label>
              </div>
              <TextInput value={password} onChange={(e) => setPassword(e.target.value)} id="password2" type="password" required shadow />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeat-password">Repeat password</Label>
              </div>
              <TextInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="repeat-password" type="password" required shadow />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} id="agree" />
                <Label htmlFor="agree" className="flex">
                  I agree with the&nbsp;
                  <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                    terms and conditions
                  </Link>
                </Label>
              </div>
            <Button disabled={!agreed} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'  type="submit">Register new account</Button>
            <p className='text-sm text-gray-500 mt-3'>Already have an account? <Link className='text-indigo-600' to={'/sign-in'}>Sign In</Link></p>
           </form>
        </div>
      </div>
    </div>
    )
}
