import { Table, TableHead, TableRow,TableHeadCell, TableBody, TableCell, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'flowbite-react';
import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [userIdToDelete, setUserIdToDelete] = React.useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users?userId=${currentUser._id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        if(currentUser.isAdmin) {
            fetchUsers();  
        }
        
    }, [currentUser._id,currentUser.isAdmin]);

    const handleDelete = async () => {
        try{
            const response = await fetch(`/api/users/delete-profile/${userIdToDelete}`, {method:'DELETE'});
            if(response.ok){
                const updatedUsers = users.filter((user) => user._id !== userIdToDelete);
                console.log(updatedUsers);
                setShowModal(false);
                setUsers(updatedUsers);
            }
        }catch(error){
            console.error('Error deleting user:', error);
        }
    }
    console.log("showModal",showModal);
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600'>
       {currentUser.isAdmin && users.length > 0 ? (
        <Table className='dark:text-white'>
          <TableHead className=''>
            <TableRow className='dark:bg-gray-800'>
              <TableHeadCell>Updated Date</TableHeadCell>
              <TableHeadCell>Avatar</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className=''>
            {users.map((user) => (
              <TableRow className='dark:bg-gray-800 border-b dark:border-gray-700' key={user._id}>
                <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <img src={user.profilePic? user.profilePic : 'https://flowbite.com/docs/images/people/profile-picture-3.jpg'} alt="Avatar" className="w-12 h-12 rounded-full" />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                <TableCell>
                  <span className='text-red-600 cursor-pointer hover:underline' onClick={() => {setShowModal(true);setUserIdToDelete(user._id)}}>Delete</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center mt-4">
          <p className="text-gray-600">No users found.</p>
        </div>
       )}
       {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)} size="md">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this user?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="failure" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button color="success" onClick={() => handleDelete()}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
       )}
    </div>
    )
}
