import { Button, Spinner } from 'flowbite-react';
import React, { useEffect , useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import Card from '../components/Card';

export default function PostPage() {
    const {postSlug} = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
   
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

   useEffect(()=>{
    const fetchRecentPosts = async () => {
        try {
            const response = await fetch(`/api/posts?limit=3`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRecentPosts(data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    fetchRecentPosts();
   },[posts]);

    if(loading){
        return(
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
        )
    }
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
        {error && <div>{error}</div>}
        <div className='mt-5 mx-auto w-full max-w-2xl p-3 post-Content' dangerouslySetInnerHTML={{__html: posts && posts.value}}></div>
        <div className='mt-10 max-w-4xl mx-auto w-full'>
            <CallToAction/>
        </div>
        <CommentSection postsId={posts._id}/>
        <div className='flex flex-col items-center mt-10 justify-center mb-5'>
            <h1 className='text-xl mt-5'>Recent articles</h1>
            <div className='flex flex-wrap gap-5 mt-10'>
                {recentPosts && recentPosts.map((post) => (<Card key={post._id} post={post}/>))}
                    
            </div>
        </div>
    </main>
  )
}
