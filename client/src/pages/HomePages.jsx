import React, { useEffect, useState } from 'react'
import CallToAction from '../components/CallToAction'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

export default function HomePages() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, [])
  console.log('posts', posts);
  return (
    <div className='flex flex-col gap-6 mx-5'>
      <div className='flex flex-col gap-6 lg:p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold'>Welcome to Rayan's Blog</h1>
        <p className='mt-4 text-gray-500 text-xs sm:text-sm'>
          Share your thoughts and ideas about programming, web development, and more. 
          Whether you're a beginner or an experienced developer, our blog is the perfect place to find inspiration and knowledge.
        </p>
      </div>
      <Link to={'/search'} className='text-xs sm:text-sm font-bold text-teal-500 hover:underline mt-5'>
         View All Posts
      </Link>
      <div className='p-3 mx-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction  />
      </div>
      <div className='flex flex-col py-7 p-3 gap-6 lg:p-28 px-3 max-w-8xl  mx-auto'>
      {posts && posts.length > 0 && (
        <div className='flex flex-col gap-6 '>
          <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
          <div className='flex flex-wrap justify-center gap-6'>
            {posts.map((post) => (
              <Card key={post._id} post={post} />
            ))}
          </div>
           <Link to={'/search'} className='text-xs sm:text-sm font-bold text-teal-500 hover:underline  mt-5'>
              View All Posts
            </Link>
        </div>
      )}
       
      </div>
    </div>
  )
}
