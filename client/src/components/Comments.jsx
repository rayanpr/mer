import React, { useEffect } from 'react'
import moment from 'moment';
import { Button, Textarea, Modal, ModalBody, ModalHeader, ModalFooter } from 'flowbite-react';
import { FaThumbsUp } from 'react-icons/fa';

export default function Comments({comment,onLikes,currentUser,onEdit,deleteComment}) {
    // console.log('comment',comment);
    const [users, setUsers] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedComment, setEditedComment] = React.useState(comment.value);
    useEffect(() => {
        const getUser = async () => {
            try{
                const response = await fetch(`/api/users/${comment.userId}`);
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }else{
                    const data = await response.json();
                    setUsers(data);
                } 
            }catch(error){
                console.log(error);
            }
        }
        getUser();
    }, [comment])

    const handleEdit = () => {
        setIsEditing(true);
        setEditedComment(comment.value);
    }

    const handleSave = async() => {
       try{
           const response = await fetch(`/api/comments/update-comment/${comment._id}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({value: editedComment}),
            credentials: 'include', // Include credentials for authentication
       });
       const data = await response.json();
       if(response.ok){

        onEdit(comment,editedComment);
        setIsEditing(false);
       }else{
        console.log(data.message);
       }
       }catch(error){
        console.log(error);
       }

    }


  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
       <div className='flex-shrink-0 mr-3 items-center mb-1'>
        <img src={users.profilePic} alt="" className='w-10 h-10 rounded-full bg-gray-400'/>
       </div>
       <div className='flex-1'>
        <div className='flex items-center ms-2'>
            <span className='font-semibold mr-1 text-xs truncate'>{users? `@${users.username}`:'Anonymous User'}</span>
            <span className='text-sm text-gray-400'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        {isEditing ? (
           <>
            <Textarea
            value={editedComment}
            onChange={(e) => {setEditedComment(e.target.value);}}
            className='mt-2'
            />
            <div className='flex justify-end gap-2 text-xs'>
            <Button color={'inherit'} size='xs' className='text-xs' onClick={handleSave}>
                Save
            </Button>
            <Button  color={'failure'} size='xs' outline className='text-xs' onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
        
           </>
            
        ):(
        <>
        <p className='mt-1 text-sm text-gray-500 mb-2'>{comment.value}</p>
        <div className='flex items-center gap-2 pt-2 border-t dark:border-gray-700 max-w-fit'>
        <Button  color={'inherit'} size='xs' className={`text-xs  ${currentUser && comment.likes.includes(currentUser._id)?'!text-blue-500':'text-gray-500'}`} onClick={()=>onLikes(comment._id)}>
            <FaThumbsUp className='text-sm' />
        </Button>
        <p className='text-xs text-gray-400'>{comment.numberOfLikes >0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes > 1 ? 'likes' : 'like')}</p>
        {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin)  && (
            <Button color={'failure'} size='xs' className='text-xs' onClick={() => setShowModal(true)}>Delete</Button>
            )}
        {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin)  && (
            <Button color={'warning'} size='xs' className='text-xs' onClick={handleEdit}>Edit</Button>
            )}
       </div>
       </>
        )}
        {showModal && (
            <Modal className='z-50' show={showModal} onClose={() => setShowModal(false)}>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this comment?
                </ModalBody>
                <ModalFooter>
                    <Button color="failure" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button color="failure" onClick={() => deleteComment(comment._id)}>Delete</Button>
                </ModalFooter>
            </Modal>
        )}
       </div>
    </div>
  )
}
