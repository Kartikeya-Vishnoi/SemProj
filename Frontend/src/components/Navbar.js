import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from './images/logo2.jpg'
import { useNavigate } from 'react-router-dom'
import classes from './Navbar.module.css'

const Navbar = () => {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const navigate=useNavigate()

    const closeMenu = () => setClick(false)

    return (
        <div className={classes.header} style={{"backgroundColor":"black"}}>
            {/* <nav className='navbar'> */}
                    {/* <a href='/' className='logo'>
                        <img src={logo} alt='logo' />
                    </a> */}
                {/* <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

                </div> */}

            <div className={classes.logo}>
                 <h1 style={{ "display":"inline-block", "color":"#41d891"}}>PITCH OCEAN</h1>
                <img style={{"height":"50px", "display":"relative","margin-left":"0px", "margin-top":"-1px"}} src="https://cdn.dribbble.com/users/74401/screenshots/15888826/media/7ef83def5f8612079cf24ebcda84f8ec.png?compress=1&resize=400x300"/>
            </div>

                <div>
                <ul>
                    <li className='nav-item'>
                        <a href='/' onClick={closeMenu}>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a href='/about' onClick={closeMenu}>About</a>
                    </li>
                    <li className='nav-item'>
                        <a href='#testimonials' onClick={closeMenu}>Testimonials</a>
                    </li>
                    <li className='nav-item' onClick={() => {navigate("/login")}}>
                        <a href=''>Log in</a>
                    </li>
                </ul>
                </div>
            {/* </nav> */}
        </div>
    )
}

export default Navbar