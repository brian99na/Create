import React, { useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'

function Header(props) {

    const navigate = useNavigate()


    const [navActive, setNavActive] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
    const [userActive, setUserActive] = useState(false)

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

    const handleSignOutClick = () => {
        localStorage.setItem('create-app', '[]')
        setNavActive(!navActive)
        setTimeout(() => {
            props.setUserInfo('[]')
            setUserActive(false)
        }, 500);
    }

    useEffect(() => {
        props.setPageLeave(false)
    }, [])

    useEffect(() => {
        if (props.userInfo === '[]') {
            setUserActive(false)
        } else {
            setUserActive(true)
        }
    }, [props.userInfo])

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
                    {!userActive ? 
                    <Link to='/sign-in' onClick={handleNavClick}>
                        <h1>[Sign In]</h1>
                    </Link> :
                    <Link to={`/users/${props.userInfo.user_name}`} onClick={handleNavClick}>
                        <h1>[Profile]</h1>
                    </Link>}
                    <Link to='/' onClick={handleNavClick}>
                        <h1>[Home]</h1>
                    </Link>
                    {userActive && 
                    <Link to='/' onClick={handleSignOutClick}>
                        <h1>[Sign Out]</h1>
                    </Link>}
                </div>
            </div>
        </header>
    )
}

export default Header
