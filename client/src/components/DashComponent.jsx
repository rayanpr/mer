import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, TableHead, TableRow,TableHeadCell, TableBody, TableCell ,} from 'flowbite-react';
import { HiArrowNarrowUp, HiOutlineUserGroup,HiAnnotation,HiDocumentText  } from "react-icons/hi";


export default function DashComponent() {
    const [users, setUsers] = React.useState([]);
    const [comments, setComments] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [totalUsers, setTotalUsers] = React.useState(0);
    const [totalComments, setTotalComments] = React.useState(0);
    const [totalPosts, setTotalPosts] = React.useState(0);
    const [lastMonthUsers, setLastMonthUsers] = React.useState(0);  
    const [lastMonthPosts, setLastMonthPosts] = React.useState(0);
    const [lastMonthComments, setLastMonthComments] = React.useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users?limit=5`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data.users);
                setTotalUsers(data.totalUsers);
                setLastMonthUsers(data.lastMonthUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comments?limit=5`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setComments(data.comments);
                setTotalComments(data.totalComments);
                setLastMonthComments(data.lastMonthComments);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/posts?limit=5`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data.posts);
                setTotalPosts(data.totalPosts);
                setLastMonthPosts(data.lastMonthPosts);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchPosts();
        fetchComments();
        fetchUsers();
    },[currentUser]);
   console.log('comments',comments);
   console.log('posts',posts);
   console.log('users',users);
  return (
    <div className='p-3 md:mx-auto my-2'>
        <div className='flex flex-wrap gap-4 justify-center my-2'>
        <div className='flex flex-col gap-4 p-3 dark:bg-slate-800 w-full md:w-72 rounded-md shadow-md'>
            <div className='flex justify-between' >
                <div>
                    <h3 className='text-md text-gray-500 uppercase'> Total Users</h3>
                    <p className='text-2xl semibold'>{totalUsers}</p>
                </div>
                <HiOutlineUserGroup className='bg-teal-600 p-2 rounded-full text-5xl text-white shadow-lg' />
            </div>
        <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp/>
                <p>{lastMonthUsers}</p>
            </span>
            <div className='text-sm text-gray-500'>Last Month</div>
        </div>
        </div>
        <div className='flex flex-col gap-4 p-3 dark:bg-slate-800 w-full md:w-72 rounded-md shadow-md'>
            <div className='flex justify-between' >
                <div>
                    <h3 className='text-md text-gray-500 uppercase'> Total Posts</h3>
                    <p className='text-2xl semibold'>{totalPosts}</p>
                </div>
                <HiDocumentText className='bg-indigo-500 p-2 rounded-full text-5xl text-white shadow-lg' />
            </div>
        <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp/>
                <p>{lastMonthPosts}</p>
            </span>
            <div className='text-sm text-gray-500'>Last Month</div>
        </div>
        </div>
        <div className='flex flex-col gap-4 p-3 dark:bg-slate-800 w-full md:w-72 rounded-md shadow-md'>
            <div className='flex justify-between' >
                <div>
                    <h3 className='text-md text-gray-500 uppercase'> Total Comments</h3>
                    <p className='text-2xl semibold'>{totalComments}</p>
                </div>
                <HiAnnotation className='bg-yellow-500 p-2 rounded-full text-5xl text-white shadow-lg' />
            </div>
        <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp/>
                <p>{lastMonthComments}</p>
            </span>
            <div className='text-sm text-gray-500'>Last Month</div>
        </div>
        </div>
        </div>
        <div>
            <div className='flex flex-wrap gap-4 justify-center mt-10 my-2'>
             <div className='flex flex-col md:w-75 gap-4 p-3 dark:bg-slate-800 w-full  rounded-md shadow-md'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-md text-center p-2 text-gray-500 uppercase'> Recent Users</h1>
                    <Button outline color={'teal'} >
                        <Link to='/dashboard?tab=users'>View All</Link>
                    </Button>
                </div>
                <Table striped={true} hoverable={true} className='dark:bg-slate-800'>
                    <TableHead>
                        <TableRow className='dark:bg-slate-800 text-sm font-bold'>
                            <TableHeadCell>User Image</TableHeadCell>
                            <TableHeadCell>User Name</TableHeadCell> 
                        </TableRow>
                    </TableHead>
                    <TableBody className=' divide-y'>
                        {users.map((user) => (
                            <TableRow  key={user._id}>
                                <TableCell>
                                    <img className='w-10 h-10 rounded-full' src={user.profilePic} alt="" />
                                </TableCell>
                                <TableCell>
                                    <p>{user.username}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='flex flex-col md:w-75 gap-4 p-3 dark:bg-slate-800 w-full  rounded-md shadow-md'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-md text-center p-2 text-gray-500 uppercase'> Recent Posts</h1>
                    <Button outline color={'teal'} >
                        <Link to='/dashboard?tab=posts'>View All</Link>
                    </Button>
                </div>
                <Table striped={true} hoverable={true} className='dark:bg-slate-800'>
                    <TableHead>
                        <TableRow className='dark:bg-slate-800 text-sm font-bold'>
                            <TableHeadCell>Post Image</TableHeadCell>
                            <TableHeadCell>Post Title</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className=' divide-y'>
                        {posts.map((post) => (
                            <TableRow  key={post._id}>
                                <TableCell>
                                    <img className='w-10 h-10 rounded-full' src={post.image} alt="" />
                                </TableCell>
                                <TableCell>
                                    <p>{post.title}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='flex flex-col  gap-4 p-3 md:w-75 dark:bg-slate-800 w-full  rounded-md shadow-md'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-md text-center p-2 text-gray-500 uppercase'> Recent Comments</h1>
                    <Button outline color={'teal'} >
                        <Link to='/dashboard?tab=comments'>View All</Link>
                    </Button>
                </div>
                <Table striped={true} hoverable={true} className='dark:bg-slate-800'>
                    <TableHead>
                        <TableRow className='dark:bg-slate-800 text-sm font-bold'>
                            <TableHeadCell>Comment Content</TableHeadCell>
                            <TableHeadCell>Likes</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className=' divide-y'>
                        {comments.map((comment) => (
                            <TableRow  key={comment._id}>
                                <TableCell className='w-96'>
                                    <p className='text-sm line-clamp-2'>{comment.value}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{comment.numberOfLikes}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            </div>
           
        </div>
    </div>
  )
}
