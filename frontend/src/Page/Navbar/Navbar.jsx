import { Avatar } from '@mui/material'
import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='container z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center'>

      <p className='font-bold text-lg'>Task Forge</p>
      <div className='flex items-center gap-5'>
        <p>Shubham</p>
        <Avatar src='https://cdn.pixabay.com/photo/2024/01/24/19/06/leaves-8530206_640.jpg' />
      </div>
    </div>
  )
}

export default Navbar
