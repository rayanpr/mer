
import { Button, Spinner } from 'flowbite-react';
import { set } from 'mongoose';
import React, { useEffect , useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction';

export default function PostPage() {
    const {postSlug} = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/posts?postSlug=${postSlug}`);
                if (!response.ok) {
                    setError('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data.posts[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
       fetchPosts();
    }, [postSlug]);
    if(loading){
        return(
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
        )
    }
    console.log('posts',posts.value.length);
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{posts && posts.title}</h1>
        <Link className='self-center' to={`/search?category=${posts && posts.category}`}>
         <Button className='mt-5' color={'gray'} pill size='xs'>{posts && posts.category}</Button>
        </Link>
        <img className='mx-auto mt-10 rounded-2xl' src={"http://localhost:3400/"+(posts && posts.image)} alt="" />
        <div className='flex justify-between mt-5 p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>{posts && new Date(posts.createdAt).toDateString()}</span>
            <span className='italic'>{posts && (posts.value.length /1000).toFixed(0)} min read</span>
        </div>
        <div className='mt-5 mx-auto w-full max-w-2xl p-3 post-Content' dangerouslySetInnerHTML={{__html: posts && posts.value}}></div>
        <div className='mt-10 max-w-4xl mx-auto w-full'>
            <CallToAction/>
        </div>
    </main>
  )
}
