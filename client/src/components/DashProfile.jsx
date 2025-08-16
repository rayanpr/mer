import React from 'react'
import { useSelector } from 'react-redux'
import { Button, TextInput } from 'flowbite-react'

export default function DashProfile() {
    const {currentUser} = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='text-2xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
       <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
        <img className='w-full h-full rounded-full border-8 object-cover border-[lightgray]' src={currentUser.profilePic} alt="user" />
       </div>
       <TextInput label='Username' defaultValue={currentUser.username} />   
       <TextInput label='Email' defaultValue={currentUser.email}  />
       <TextInput placeholder='Update Password' defaultValue={currentUser.password} />
       <Button type='submit' className='bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white text-lg'>Update Profile</Button>
      </form>
      <div className='flex j gap-2 mt-5 justify-between'>
        <span className='text-red-500 cursor-pointer'>Delete Account</span>
        <span className='text-red-500 cursor-pointer'>Logout</span>
      </div>
    </div>
  )
}
