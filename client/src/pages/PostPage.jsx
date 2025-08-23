
import { set } from 'mongoose';
import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'

export default function PostPage() {
    const {postSlug} = useParams();
    const [posts, setPosts] = useState([]);
    const [data, setData] = useState([]);
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
                setData(data);
                setPosts(data.posts[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        if(postSlug) fetchPosts();
        
    }, [ postSlug]);
    console.log('data', data.posts  );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className=''>{posts && posts.title}</h1>
        
    </main>
  )
}
