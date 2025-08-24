import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSideBar from '../components/DashSideBar';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';

export default function DashboardPage() {
  const location = useLocation();
  const [tab, setTab] = React.useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);  
  console.log('tab',tab);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* sidebar */}
        <DashSideBar/>
      </div>
      {/* profile */}
      {tab ==='profile' && <DashProfile/>}
      {/* posts */}
      {tab ===  'posts' && <DashPosts/>}
      {/* users */}
      {tab ===  'users' && <DashUsers/>}
      {/* comments */}
      {tab ===  'comments' && <DashComment/>}

    </div>
  )
}
