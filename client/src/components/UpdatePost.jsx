import React , { useEffect, useState } from 'react'
import { Button, Select, TextInput, FileInput } from 'flowbite-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { RiUpload2Fill } from "react-icons/ri";
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function CreatePost() {
    const {currentUser} = useSelector((state) => state.user);
    const posetId = useParams();
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'list',
         'link', 'image'
    ];
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean'] // remove formatting button
        ],
    };
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts?postId=${posetId.postId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data.posts && data.posts.length > 0) {
                    const post = data.posts[0];
                    setTitle(post.title || '');
                    setValue(post.value || '');
                    setCategory(post.category || '');
                    setImage(post.image || null);
                }
                
                console.log('Fetched post data:', data);
               
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [ posetId.postId ]);
    const handleSelect = (ev) => {
        setCategory(ev.target.value);
    };
    const handleUploadImage = (ev) => {
        ev.preventDefault();
        const file = ev.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            fetch('/api/posts/upload-image', {
                method: 'POST',
                body: formData,
                credentials: 'include', // Include credentials for authentication
            })
            .then(response => response.json())
            .then(data => {
                if (data.image) {
                    setImage(data.image);
                } else {
                    console.error('Image upload failed:', data);
                }
            })
            .catch(error => console.error('Error uploading image:', error));
        }
    };
    console.log('category', category);
    console.log('image', image);
    const handleSubmit = async(ev)=>{
        setLoading(true);
        ev.preventDefault();
        const postData = {title, value, category, image};
        try {
            const response = await fetch(`/api/posts/update-post/${posetId.postId}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
                credentials: 'include', // Include credentials for authentication
            });
            const data = await response.json();
            if (response.ok) {
               console.log('Post updated  successfully:', data.post);
               setLoading(false);
                setRedirect(true);
                setTitle('');
                setValue('');
                setCategory('');
                setImage(null);
            } else {
                console.error('Failed to create post:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    if(redirect&&!loading){
        return <Navigate to={'/dashboard?tab=posts'} />
    }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7  font-semibold'>Update And Publish New Post</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-center'> 
                <TextInput 
                    id ='title'
                    name='title'
                    type='text'
                    placeholder='Title'
                    className='border border-gray-300 rounded p-2 flex-1'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Select onChange={handleSelect} className='border border-gray-300 rounded p-2 w-1/3 '>
                    <option  className='text-gray-400' value="">Select Category</option>
                    <option  className='text-gray-400' value="typeScript">TypeScript</option>
                    <option className='text-gray-400' value="javaScript">JavaScipt</option>
                    <option className='text-gray-400' value="reactJs">ReactJs</option>
                    <option className='text-gray-400' value="nodeJs">NodeJs</option>
                    <option className='text-gray-400' value="nextJs">NextJs</option>
                    <option className='text-gray-400' value="mongoDB">MongoDB</option>
                    <option className='text-gray-400' value="expressJs">ExpressJs</option>
                    <option className='text-gray-400' value="tailwindCss">TailwindCss</option> 
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dashed p-4 rounded-lg'>
               <FileInput
                    id='image'
                    name='image'
                    type='file'
                    className='border border-gray-300 rounded p-1 w-full hidden'
                    onChange={handleUploadImage}
                
                />
                <label htmlFor='image' size='xl' className='flex-1 flex items-center justify-center h-20 text-sm bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500' >
                    {image ? (image):(<div className='flex items-center justify-center text-white font-semibold'> 
                    <RiUpload2Fill className='ml-2 h-6 w-6' /></div>)}
                </label>
            </div>
            <div className='flex flex-col items-center justify-center'>
                {image && (
                <div className='w-full rounded-lg relative'>
                    <button type='button' className='absolute top-4 right-4 bg-red-500 text-white px-2 py-3 rounded-full' onClick={() => setImage(null)}>X</button>
                    <img src={"http://localhost:3400/"+image} alt="Post Preview" className='w-full h-64 object-cover rounded-lg mb-4' />
                </div>)
                }
            </div>
            <ReactQuill modules={modules} formats={formats}  className='h-76 mb-12' placeholder='Write your blog' theme="snow" value={value} onChange={setValue} requiered />
            <Button type='submit' className='bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold mb-20'>
                Update Post
            </Button>
        </form>
    </div>
  )
}
