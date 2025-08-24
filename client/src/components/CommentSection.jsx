import { Alert, Button, Textarea, Spinner } from 'flowbite-react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from './Comments';

export default function CommentSection({postsId}) {
    const {currentUser} = useSelector(state => state.user);
    const [value ,setValue] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [errorComment, setErrorComment] = React.useState('');
    const [comments, setComments] = React.useState([]);

    useEffect(() => {
        const getComments = async () => {
            try{
                const response = await fetch(`/api/comments/get-comment/${postsId}`);
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }else{
                    const data = await response.json();
                    setComments(data);
                }
            }catch(error){
                console.log(error);
            }
        }
        getComments();
    }, [postsId]);
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true); setErrorComment('');
        try{
            const response = await fetch('/api/comments/create-comment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  value,
                  postsId,
                  userId: currentUser._id,
                }),
                credentials: 'include', // Include credentials for authentication
              });
              const data = await response.json();
              if (response.ok) {
                setComments([ data,...comments]);
                setValue('');
                setLoading(false);
              } else {
                setErrorComment(data.message);
                setLoading(false);
              } 
        }catch(error){
            console.log(error);
        
        }
    }
            
    if(loading){
        return(
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
        )
    }
  return (
    <div className='mt-5 max-w-2xl mx-auto w-full p-3'>
        {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as : </p>
            <img className='w-5 h-5 object-cover rounded-full' src={currentUser.profilePic} alt="" />
            <Link className='text-xs text-cyan-600 hover:underline' to={`/dashboard?tab=profile`}>
                @{currentUser.username}
            </Link>

        </div>) : (
            <div className='flex items-center gap-1 my-5 text-teal-500 text-sm'>
                You need to be signed in to comment.
                <Link className='text-xs text-cyan-600 hover:underline' to={'/sign-in'}>Sign in</Link>
            </div>
        )}
        {currentUser && (
            <form onSubmit={handleSubmit} className='flex flex-col gap-2 border border-teal-500 p-3 rounded-2xl'>
                <Textarea
                className='my-2 border border-teal-500'
                placeholder="Write a comment..."
                rows={4}
                maxLength={200}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
            <div className='flex justify-between'>
                <p className='text-gray-500 text-xs'>{200 - value.length} : Characters left</p>
                <Button outline color='teal' type='submit'>Submit</Button>
            </div>
            </form>
        )}
        {errorComment && <Alert color='failure'>{errorComment}</Alert>}
        {comments.length === 0 ? (
            <p className='text-gray-500 text-sm'>No comments yet</p>
            
        ):(
            <>
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                <p>{comments.length} comments</p>
                <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                    <p>{comments.length}</p>
                </div>
            </div>
            {comments.map((comment) => (
                <Comments key={comment._id} comment={comment}/>
            ))}
            </>

        )}
    </div>
  )
  
}
