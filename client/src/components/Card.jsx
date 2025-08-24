import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({post}) {
  return (
    <div className='group relative w-full overflow-hidden border border-teal-500 hover:border-2 h-[360px] rounded-lg sm:w-[360px] transition-all duration-300'>
      <Link to={`/post/${post.slug}`}>
        <img className='h-[260px] w-full object-cover group-hover:h-[220px] transition-all duration-300 z-20' src={"http://localhost:3400/"+post.image} alt={post.title} />
      </Link>
      <div className='flex flex-col gap-2 p-3'>
        <h2 className='text-2xl semibold line-clamp-2'>{post.title}</h2>
        <p className='text-gray-500 italic'>{post.category}</p>
        <Link className='z-10 group-hover:bottom-0 bottom-[-50px] absolute left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 py-2 mb-2 text-center rounded-md !rounded-tl-none mx-2' to={`/post/${post.slug}`}>
           Read Article
        </Link>
      </div>
    </div>
  )
}
