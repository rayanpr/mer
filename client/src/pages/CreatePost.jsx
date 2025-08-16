import React , { useState } from 'react'
import { Button, Select, TextInput, FileInput } from 'flowbite-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { RiUpload2Fill } from "react-icons/ri";

export default function CreatePost() {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7  font-semibold'>Create And Publish New Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-center'> 
                <TextInput 
                    id ='title'
                    name='title'
                    type='text'
                    placeholder='Title'
                    className='border border-gray-300 rounded p-2 flex-1'
                />
                <Select className='border border-gray-300 rounded p-2 w-1/3 '>
                    <option className='text-gray-400' value="">Select Category</option>
                    <option className='text-gray-400' value="technology">Technology</option>
                    <option className='text-gray-400' value="health">JavaScipt</option>
                    <option className='text-gray-400' value="sports">ReactJs</option>
                    <option className='text-gray-400' value="entertainment">NodeJs</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dashed p-4 rounded-lg'>
               <FileInput
                    id='image'
                    name='image'
                    type='file'
                    className='border border-gray-300 rounded p-1 w-full'
                
                />
                <Button type='button' size='xl' className='text-sm bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500' >
                    Upload Image
                    <RiUpload2Fill className='ml-2 h-6 w-6' />
                </Button>
            </div>
            <ReactQuill className='h-76 mb-12' placeholder='Write your blog' theme="snow" value={value} onChange={setValue} requiered />
            <Button type='submit' className='bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold mb-20'>
                Publish Post
            </Button>
        </form>
    </div>
  )
}
