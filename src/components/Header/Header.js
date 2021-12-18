import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

function Header(props) {

    const [navActive, setNavActive] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
    const navigate = useNavigate()

    const handleNavClick = () => {
        setNavActive(!navActive)
    }

    const handleSearchClick = () => {
        setSearchActive(!searchActive)
    }

    const handleDelayClick = () => {
        setTimeout(() => {
            navigate('/')
        }, 500)
    }

    return (
        <header>
            <nav>
                <div className='create-btn' onClick={handleDelayClick}>
                    <div className='create-1'></div>
                    <h1>CREATE</h1>
                    <div className='create-2'></div>
                </div>
                <div className={`search-box ${searchActive ? 'search-active' : ''}`}>
                    <input placeholder='[search]'/>
                </div>
                <div className='search-ham'>
                    <RiSearch2Line className='search-icon' onClick={handleSearchClick}/>
                    <div className='ham-main' onClick={handleNavClick}>
                        <div className='ham-1'></div>
                        <div className='ham-2'></div>
                        <div className='ham-3'></div>
                    </div>
                </div>
            </nav>
            <div className={`nav-links ${navActive ? 'nav-links-active' : ''}`}>
                <Link to='/sign-in'>
                    <h1>[Sign In]</h1>
                </Link>
                <Link to='/'>
                    <h1>[Home]</h1>
                </Link>
                <Link to={`/${props.username}`}>
                    <h1>[Profile]</h1>
                </Link>
            </div>
        </header>
    )
}

export default Header
