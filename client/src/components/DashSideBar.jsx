import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiDocument, HiDocumentText, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices.js/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { HiAnnotation } from "react-icons/hi";


export default function DashSideBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = React.useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  
  async function logouts(){
    try{
      const response = await fetch("/api/auth/sign-out",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('response',response);
      if(response.ok){
        dispatch(logout());
        navigate('/sign-in');
      }
    }catch(error){
      console.log(error);
    }
    }


  return (
    <Sidebar className="w-full md:w-54 border-b-4 border-gray-200">
      <SidebarItems>
        <SidebarItemGroup className="w-full mb-5 flex flex-col gap-4">
            <Link to={'/dashboard?tab=profile'}>
                <SidebarItem as={'div'}  active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark'>
                Profile
                </SidebarItem>
            </Link>
          { currentUser.isAdmin && (
            <Link to={'/dashboard?tab=posts'}>
            <SidebarItem as={'div'} active={tab==='posts'} icon={HiDocumentText} >
              Posts
            </SidebarItem>
          </Link>
          )}
          {
            currentUser.isAdmin && (
              <Link to={'/dashboard?tab=users'}>
              <SidebarItem as={'div'} active={tab==='users'} icon={FaUsers} >
              Users
              </SidebarItem>
            </Link>
            )
          }
          {currentUser.isAdmin && (
            <Link className=" mb-3" to={'/dashboard?tab=comments'}>
            <SidebarItem as={'div'} active={tab==='comments'} icon={HiAnnotation}   >
            Comments
            </SidebarItem>
          </Link>
          )}
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem className=" mb-3" onClick={logouts} icon={LuLogOut} >
            Logout
            </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>      
    </Sidebar>
  )
}
