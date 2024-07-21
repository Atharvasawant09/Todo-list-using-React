import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-sky-900 text-white py-2 '>
      <div className="logo">
        <span className='font-bold text-2xl mx-9'>iTask</span>
      </div>
      <ul className="flex gap-7 mx-9">
      <li className='cursor-pointer hover:font-bold transition-all text-center  text-lg ' >Home</li>
      <li className='cursor-pointer hover:font-bold transition-all text-center text-lg ' >Your Tasks</li>
      
      </ul></nav>
  )
}

export default Navbar
