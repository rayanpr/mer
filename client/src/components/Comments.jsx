import React, { useEffect } from 'react'
import moment from 'moment';

export default function Comments({comment}) {
    // console.log('comment',comment);
    const [users, setUsers] = React.useState([]);
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
        <p className='mt-1 text-sm text-gray-500 mb-2'>{comment.value}</p>
       </div>
    </div>
  )
}
