import React from 'react'
import Logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className='mt-48 p-5 bg-primaryColor flex items-center justify-between text-md'>
     <img src={Logo} className='w-[70px]' alt="logo" /> 
     <p>This project is a portfolio project made with <b>React JS</b></p>
    </footer>
  )
}

export default Footer
