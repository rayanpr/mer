import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, Button, Modal, TextInput,ModalBody, ModalHeader, ModalFooter } from 'flowbite-react'
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, logout, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/slices.js/userSlice.js';
import { MdOutlineDangerous } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { TiUserDelete } from "react-icons/ti";




export default function DashProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user);
  const [profilePicUrl, setProfilePicUrl] = React.useState(currentUser.profilePic);
  const [username, setUsername] = React.useState(currentUser.username);
  const [email, setEmail] = React.useState(currentUser.email);
  const [password, setPassword] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);  
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const handleImageChange = async(ev) => {
    const file = ev.target.files;
    const formData = new FormData();
    formData.append('profilePic', file[0]);
   const res = await fetch('/api/users/upload-pic', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const data = await res.json();
    if(res.ok) {
      console.log('Profile picture updated:', data);
      setProfilePicUrl(data);
    }else {
      console.error('Error updating profile picture:', data);
    }
    
  };
  const handleSubmit = async (ev) => {
    dispatch(updateUserStart());
    ev.preventDefault();
    const updatedData = {
      username,
      email,
      password,
      profilePic: profilePicUrl.profilePic
    };
    const res = await fetch('/api/users/update-profile/'+ currentUser._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
      credentials: 'include',
    });
    const data = await res.json();
    if(res.ok) {
      dispatch(updateUserSuccess(data));
      console.log('Profile updated successfully:', data);
    } else {
      dispatch(updateUserFailure(data));
      console.error('Error updating profile:', data);
    }
  };
  const deleteAccount = async () => {
    dispatch(deleteUserStart());
    const res = await fetch('/api/users/delete-profile/' + currentUser._id, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    if(res.ok) {
      dispatch(deleteUserSuccess());
      console.log('Account deleted successfully');
      navigate('/sign-in');
      // Optionally, redirect or update state to reflect account deletion
    } else {
      dispatch(deleteUserFailure(data));
      console.error('Error deleting account');
    }
  }
   async function logouts(){
      try{
        const response = await fetch("/api/auth/sign-out",{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('response',response);
        if(response.ok){
          dispatch(logout());
          navigate('/sign-in');
        }
      }catch(error){
        console.log(error);
      }
      }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='text-2xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       
       <label className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
        <input type='file' className='hidden'  onChange={handleImageChange}  />
        <img
          className='w-full h-full rounded-full border-8 object-cover border-[lightgray]'
          src={profilePicUrl && profilePicUrl.profilePic ? `http://localhost:3400/${profilePicUrl.profilePic}` : currentUser.profilePic}
          alt="user"
        />
       </label>
       <TextInput onChange={(e) => setUsername(e.target.value)} label='Username' defaultValue={currentUser.username} />   
       <TextInput onChange={(e) => setEmail(e.target.value)} label='Email' defaultValue={currentUser.email}  />
       <TextInput onChange={(e) => setPassword(e.target.value)} placeholder='Update Password' defaultValue={null} />
       <Button type='submit' className='bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white text-lg'>Update Profile</Button>
      </form>
      <div className='flex j gap-2 mt-5 justify-between'>
        <div onClick={()=>setShowModal(true)} className='flex items-centertext-red-500 cursor-pointer'>
          <TiUserDelete className='text-blue-700 inline-block text-2xl' />
          <span className='ml-2 text-red-500'>Delete Account</span>
        </div>
        <span onClick={()=>setShowLogoutModal(true)} className='text-red-500 cursor-pointer'>Logout</span>
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ModalHeader className='flex justify-center'>Delete Account</ModalHeader>
          <ModalBody className='flex gap-3' >
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?, this action cannot be undone. 
            </p>    
            <MdOutlineDangerous className='text-red-500 text-2xl' />        
          </ModalBody>
          <ModalFooter className='flex justify-between'>
            <Button color="red" onClick={deleteAccount}>Delete</Button>
            <Button color="gray" onClick={() => setShowModal(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}
      {showLogoutModal && (
        <Modal show={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
          <ModalHeader className='flex justify-center'>Logout</ModalHeader>
          <ModalBody className='flex gap-3' >
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to logout?
            </p>    
            <MdOutlineDangerous className='text-red-500 text-2xl' />        
          </ModalBody>
          <ModalFooter className='flex justify-between'>
            <Button color="red" onClick={() =>logouts()}>Logout</Button>
            <Button color="gray" onClick={() => setShowLogoutModal(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}
