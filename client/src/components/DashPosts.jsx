import { Table } from 'flowbite-react';
import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';  
import Post from '../../../api/models/posts.model';

export default function DashPosts() {
    const [posts, setPosts] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const { currentUser } = useSelector((state) => state.user);
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
    }, [ currentUser._id, currentUser.isAdmin]);

   
console.log('users', users);
console.log('posts', posts);
  return (
    <div className='p-4 min-h-screen max-w-3xl mx-auto'>
        {currentUser.isAdmin && posts.length > 0 ? (
            <Table hoverable={true}>
                <TableHead className="bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-600 ">
                   <TableRow className="bg-gray-100 dark:bg-gray-600">
                        <TableHeadCell className='text-center'>Title</TableHeadCell>
                        <TableHeadCell className='text-center'>Avatar</TableHeadCell>
                        <TableHeadCell className='text-center'>Category</TableHeadCell>
                        <TableHeadCell className='text-center'>User ID</TableHeadCell>
                        <TableHeadCell className='text-center'>Upadated</TableHeadCell>
                   </TableRow>
                </TableHead>
                <TableBody className="divide-y ">
                    {posts.map((post) => (
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={post._id}>
                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {post.title}
                            </TableCell>
                            <TableCell className='text-center'>
                                <img src={post.image} alt={post.title} className='w-12 h-12 rounded-full' />
                            </TableCell>
                            <TableCell className='text-center'>
                                {post.category}
                            </TableCell>
                            <TableCell className='text-center'>
                                {post.userId}
                            </TableCell>
                            <TableCell className='text-center'>
                                {new Date(post.updatedAt).toLocaleDateString()}
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
    </div>
  )
}


