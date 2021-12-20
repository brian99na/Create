import React, { useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

function Header(props) {

    const navigate = useNavigate()


    const [navActive, setNavActive] = useState(false)
    const [searchActive, setSearchActive] = useState(false)

    const handleNavClick = () => {
        setNavActive(!navActive)
    }

    const handleSearchClick = () => {
        setSearchActive(!searchActive)
    }

    const handleDelayClick = () => {
        props.setPageLeave(true)
        setTimeout(() => {
            navigate('/')
        }, 500)
    }

    useEffect(() => {
        props.setPageLeave(false)
    }, [])
    
    return (
        <header>
            <nav>
                <div className={`create-btn ${searchActive ? 'create-active' : '' }`}onClick={handleDelayClick}>
                    <h1>create</h1>
                </div>
                <input className={`search-box ${searchActive ? 'search-active' : ''}`} placeholder='[search]'/>
                <div className='search-ham'>
                    <RiSearch2Line className='search-icon' onClick={handleSearchClick}/>
                    <div className='ham-main' onClick={handleNavClick}>
                        <div className={`ham-1 ${navActive ? 'ham-active-1' : ''}`}></div>
                        <div className={`ham-2 ${navActive ? 'ham-active-2' : ''}`}></div>
                        <div className={`ham-3 ${navActive ? 'ham-active-3' : ''}`}></div>
                    </div>
                </div>
            </nav>
            <div className={`nav-links ${navActive ? 'nav-links-active' : ''}`}>
                <div className='nav-links-main'>
                    <Link to='/sign-in' onClick={handleNavClick}>
                        <h1>[Sign In]</h1>
                    </Link>
                    <Link to='/' onClick={handleNavClick}>
                        <h1>[Home]</h1>
                    </Link>
                    <Link to={`/${props.username}`} onClick={handleNavClick}>
                        <h1>[Profile]</h1>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
