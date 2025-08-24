import { Table, TableHead, TableRow,TableHeadCell, TableBody, TableCell, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'flowbite-react';
import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashComment() {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = React.useState('');
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comments?userId=${currentUser._id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setComments(data.comments);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        if(currentUser.isAdmin) {
            fetchComments();  
        }
        
    }, [currentUser._id,currentUser.isAdmin]);

    const handleDelete = async () => {
        try{
            const response = await fetch(`/api/comments/${commentIdToDelete}`, {method:'DELETE'});
            if(response.ok){
                const updatedComments  = comments.filter((comment) => comment._id !== commentIdToDelete);
                console.log(updatedComments);
                setShowModal(false);
                setComments(updatedComments);
            }
        }catch(error){
            console.error('Error deleting Comment:', error);
        }
    }
    console.log("showModal",showModal);
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600'>
       {currentUser.isAdmin && comments.length > 0 ? (
        <Table className='dark:text-white'>
          <TableHead className=''>
            <TableRow className='dark:bg-gray-800'>
              <TableHeadCell className='text-center'>Updated Date</TableHeadCell>
              <TableHeadCell>Comment Content</TableHeadCell>
              <TableHeadCell>Number Of Likes</TableHeadCell>
              <TableHeadCell>Post Id</TableHeadCell>
              <TableHeadCell>User Id</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className=''>
        {comments.map((comment) => (
              <TableRow className='dark:bg-gray-800 border-b dark:border-gray-700' key={comment._id}>
                <TableCell>{new Date(comment.updatedAt).toLocaleString()}</TableCell>
                <TableCell>{comment.value}</TableCell>
                <TableCell>{comment.numberOfLikes}</TableCell>
                <TableCell>{comment.postId}</TableCell>
                <TableCell>{comment.userId}</TableCell>
                <TableCell>
                  <span className='text-red-600 cursor-pointer hover:underline' onClick={() => {setShowModal(true);setCommentIdToDelete(comment._id)}}>Delete</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center mt-4">
          <p className="text-gray-600">No comments found.</p>
        </div>
       )}
       {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)} size="md">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this comment?</p>
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
