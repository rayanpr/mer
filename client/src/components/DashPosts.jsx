import { Modal, ModalBody, ModalHeader, Table ,Button,ModalFooter,TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';  
import { Link } from 'react-router-dom';
import { CgDanger } from "react-icons/cg";

export default function DashPosts() {
    const [posts, setPosts] = React.useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const [showModal, setShowModal] = React.useState(false);
    const [postIdToDelete,setPostIdToDelete] = React.useState(null)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/posts?userId=${currentUser._id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        if(currentUser.isAdmin) {
            fetchPosts();  
        }
    }, [currentUser._id,currentUser.isAdmin]);

const handleDelete = async (postId) => {
    try{
        const response = await fetch(`/api/posts/delete-post/${postId}/${currentUser._id}`, {method:'DELETE'})
        if(response.ok){
            const updatedPosts = posts.filter((post) => post._id !== postId);
            console.log(updatedPosts);
            setShowModal(false);
            setPosts(updatedPosts);
        }
    }catch(error){
        console.error('Error deleting post:', error);
    }
};
  
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600'>
        {currentUser.isAdmin && posts.length > 0 ? (
            <Table className='w-full' hoverable={true}>
                <TableHead className="bg-gray-400 dark:bg-gray-700">
                   <TableRow className="text-gray-900 dark:text-white">
                        <TableHeadCell className='text-center '>POST UPDATED</TableHeadCell>
                        <TableHeadCell className='text-center'>Post Avatar</TableHeadCell>
                        <TableHeadCell className='text-center'>Post Title</TableHeadCell>
                        <TableHeadCell className='text-center'>Post Category</TableHeadCell>
                        <TableHeadCell className='text-center'>Edit</TableHeadCell>
                        <TableHeadCell className='text-center'>Delete</TableHeadCell>
                   </TableRow>
                </TableHead>
                <TableBody className='bg-white dark:bg-gray-800 divide-y'>
                    {posts.map((post) => (
                        <TableRow key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <TableCell className='text-center'>{new Date(post.updatedAt).toLocaleString()}</TableCell>
                            
                            <TableCell as={'div'}  className='text-center'>
                            <Link to={`/post/${post.slug}`}>
                                <img src={post.image} alt={post.title} className='w-16 h-16 object-cover rounded-full' />
                            </Link>
                            </TableCell>
                            
                            <TableCell className='text-center'>{post.title}</TableCell>
                            <TableCell className='text-center'>{post.category}</TableCell>
                            <TableCell className='text-center'>
                                <Link to={`/edit-post/${post._id}`}>
                                    <button className='text-blue-500 hover:text-blue-600 hover:underline cursor-pointer'>Edit</button>
                                </Link>
                            </TableCell>
                            <TableCell className='text-center'>
                                <span className='text-red-500 hover:text-red-600 hover:underline cursor-pointer' onClick={() =>{setPostIdToDelete(post._id);setShowModal(true)}}>Delete</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>  
            </Table>
        ):(
            <div className='text-center text-gray-500'>
                {currentUser.isAdmin ? 'No posts available.' : 'You do not have permission to view posts.'}
            </div>
        )}
    {showModal && (
        <Modal  show={showModal} onClose={() => setShowModal(false)}>
            <ModalHeader className='flex justify-center'><CgDanger className='text-red-500 h-8 w-8' /></ModalHeader>
            <ModalBody>
                <p className="text-gray-500 dark:text-gray-400 text-2xl">Are you sure you want to delete this post?</p>
            </ModalBody>
            <ModalFooter className='flex justify-between'>
                <Button color="failure" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button color="success" onClick={() => handleDelete(postIdToDelete)}>
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    )}
    </div>
  )

}




