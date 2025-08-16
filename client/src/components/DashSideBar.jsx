import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect }  from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices.js/userSlice';
import { useNavigate } from 'react-router-dom';


export default function DashSideBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
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
        <SidebarItemGroup>
            <Link to={'/dashboard?tab=profile'}>
                <SidebarItem as={'div'}  active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark'>
                Profile
                </SidebarItem>
          </Link>
          <SidebarItem onClick={logouts} icon={LuLogOut} >
            Logout
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>

      
    </Sidebar>
  )
}
