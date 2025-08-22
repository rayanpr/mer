import { Table } from 'flowbite-react';
import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux';
import { TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';  
import { Link } from 'react-router-dom';
import { LuDivide } from 'react-icons/lu';


export default function DashPosts() {
    const [posts, setPosts] = React.useState([]);
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
    }, [ currentUser._id, currentUser.isAdmin, posts]);
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

                            <TableCell className='text-center'>
                                <img src={post.image} alt={post.title} className='w-16 h-16 object-cover rounded-full' />
                            </TableCell>
                            <TableCell className='text-center'>{post.title}</TableCell>
                            <TableCell className='text-center'>{post.category}</TableCell>
                            <TableCell className='text-center'>
                                <Link to={`/edit-post/${post._id}`}>
                                    <button className='text-blue-500 hover:text-blue-600 hover:underline'>Edit</button>
                                </Link>
                            </TableCell>
                            <TableCell className='text-center'>
                                <button className='text-red-500 hover:text-red-600 hover:underline'>Delete</button>
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


