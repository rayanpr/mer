import React from 'react'
import CallToAction from '../components/CallToAction'

export default function ProjectPage() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-4xl font-bold'>Projects</h1>
      <p className='text-gray-500 text-xs sm:text-sm'>
        build fun and  engaging projects while learning web development and programming skills to enhance your skills and knowledge.
        in this section, you'll find a collection of projects that showcase my passion for web development and programming.
        Each project is a testament to my dedication to creating user-friendly and visually appealing web applications that solve real-world problems.
        Whether you're a beginner or an experienced developer, these projects provide a great opportunity to learn and grow in the field of web development.
      </p>
      <CallToAction />
    </div>
  )
}
