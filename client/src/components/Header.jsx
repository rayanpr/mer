import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogIn } from "react-icons/fi";
import { FaMoon } from 'react-icons/fa';
import React from "react";
import { Link ,useLocation} from "react-router-dom";
import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";

export default function Header() {
  const path = useLocation().pathname
  return (
    <Navbar fluid className="border-b-2">
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
      <Button size='sm' className='lg:hidden' color='gray' pill>
        <AiOutlineSearch className='w-5 h-5'/>
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button size='sm' className='hidden sm:inline' color={'gray'} pill>
          <FaMoon/>
        </Button>
        <Link to={'/sign-in'}>
          <Button size='sm' className='ml-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            SignIn
            <FiLogIn className='ml-1 w-5 h-5' />
          </Button>
        </Link>
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
