import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='p-3 flex flex-col sm:flex-row border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>want to learn more about python</h2>
            <p className='text-xl text-gray-500 my-2'>checkout  these resources with useful python concepts and tips to improve your coding skills</p>
            <Button className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-tl-xl rounded-br-none'>
                <a href="https://moncoachdata.com/21-astuces-et-conceptss-Python-utiles/" target='_blank' rel='noreferrer nopener'>Read More</a>
            </Button>
        </div>
        <div className='flex-1 p-7'>
            <img src='https://moncoachdata.com/wp-content/uploads/2024/01/21-astuces-et-conceptss-Python-utiles.webp' alt="" />
        </div>
    </div>
  )
}

