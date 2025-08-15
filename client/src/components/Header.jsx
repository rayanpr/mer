import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogIn } from "react-icons/fi";
import { FaMoon,FaSun } from 'react-icons/fa';
import React from "react";
import { Link ,Navigate,useNavigate,useLocation} from "react-router-dom";
import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices.js/userSlice';
import { toggleDarkMode } from '../redux/slices.js/themeSlice'; 
import { DarkThemeToggle } from "flowbite-react";

export default function Header() {
  const path = useLocation().pathname
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const {theme} = useSelector(state => state.theme);
  const navigate = useNavigate();
 async function handleLogout() {
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
  console.log('currentUser',currentUser);
 
  return (
    <Navbar fluid className="border-b-2 bg-white dark:bg-gray-900">
      <Link to={'/'} className="self-center whitespace-nowrap text-sm lg:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-xl" >Rayan's</span>Blog
      </Link>
       <form>
        <TextInput 
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          sizing='md'
          className='hidden lg:inline'
           />
      </form> 
      <Button size='sm' className='lg:hidden' color={theme} pill>
        <AiOutlineSearch className='w-5 h-5'/>
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button onClick={() => dispatch(toggleDarkMode())} size='sm' className='hidden sm:inline ' color={theme}  pill>
          {theme === 'dark'? <FaMoon className='w-5 h-5'/>:<FaSun className='w-5 h-5'/>}
        </Button>
        {currentUser ?(
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={currentUser.profilePic}
                rounded={true}
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </DropdownHeader>
            <Link to={`/dashboard?tab=profile`} className="py-2 px-4 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              <DropdownItem>
                Profile
              </DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={handleLogout}>
              <span>Sign out</span>
            </DropdownItem>
          </Dropdown>
      
        ):( <Link to={'/sign-in'}>
          <Button size='sm' className='ml-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            SignIn
            <FiLogIn className='ml-1 w-5 h-5' />
          </Button>
        </Link>)}
       
        <NavbarToggle className='ml-2'  />
      </div>
      <NavbarCollapse>
        <NavbarLink as={'div'} active={path ==='/'}>
          <Link to={'/'}>
          Home
          </Link>
        </NavbarLink>
        <NavbarLink as={'div'} active={path ==='/about'}>
          <Link to={'/about'}>
          About
          </Link>
        </NavbarLink>
        <NavbarLink as={'div'} active={path ==='/project'}>
          <Link to={'/project'}>
          Project
          </Link>
        </NavbarLink>
      </NavbarCollapse> 
    </Navbar>
  );
}
