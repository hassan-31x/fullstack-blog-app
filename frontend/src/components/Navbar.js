import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/authContext.js'
import Logo from '../assets/logo.png'
import { BsPencilSquare } from 'react-icons/bs'
import { IconContext } from "react-icons";

// let itemStyle = 
const Navbar = () => {

  const [hover, setHover] = useState(false)

  const location = useLocation()
  const write = location.pathname

  const {currentUser, logout} = useContext(AuthContext)
  
  return (
    <div className='mt-1 sticky top-0 bg-lightPrimary z-[100]'>
      <div className="pb-3 flex justify-between items-center">
        <Link to='/'><div className='flex gap-1 items-center'>
          <img src={Logo} alt="logo" className='w-[70px]'/>
          <p className='text-lg font-semibold pt-4'>fable <span className='bg-primaryColor px-[0.15rem]'>hub</span></p>
        </div></Link>
        <div className='flex gap-3 items-center pt-4'>
          <span className='cursor-pointer font-semibold opacity-80 text-lg'>
            <Link to={currentUser ? '/write' : '/login'} className={`flex gap-2 items-center font-normal py-2 px-3 rounded-md ${write === '/write' ? 'hidden' : 'block'} ${hover ? 'text-black' : 'text-gray-600'}`}
            onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}}>
              <IconContext.Provider value={{ color: hover ? "black" : "gray", size: "23" }}>
                <BsPencilSquare />
              </IconContext.Provider>Write</Link>
          </span>
          <span className='cursor-pointer font-semibold capitalize text-lg'>{currentUser?.username}</span>
          {currentUser ? 
          <span className='cursor-pointer text-lg bg-darkSecondary hover:bg-secondaryColor hover:text-black delay-100 text-white rounded-md border border-black border-1 py-1 px-2 drop-shadow-[3px_4px_0px_rgba(0,0,0,1)]' onClick={logout}>Logout</span> :
          <Link className='cursor-pointer text-lg bg-darkSecondary hover:bg-secondaryColor delay-100 border border-black border-1 text-white rounded-md py-1 px-2 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:text-black' to='/login'>Login</Link>}
        </div>
      </div>
    </div>
  )
}

export default Navbar
