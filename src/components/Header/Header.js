import React, { useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import './header.css'
import axios from 'axios'

function Header(props) {

    const navigate = useNavigate()

    const [navActive, setNavActive] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
    const [username, setUsername] = useState()

    const handleNavClick = (e) => {
        if (e.target.getAttribute('name')){
            props.setPageLeave(true)
            setTimeout(() => {
                setNavActive(!navActive)
                navigate(`${e.target.getAttribute('name')}`)
                setTimeout(() => {
                    props.setPageLeave(false)
                }, 300);
            }, 300);
        } else {
            setNavActive(!navActive)
        }
    }

    const handleSearchClick = () => {
        setSearchActive(!searchActive)
    }

    const handleHomeClick = () => {
        props.setPageLeave(true)
        setTimeout(() => {
            navigate('/')
            setTimeout(() => {
                props.setPageLeave(false)
            }, 200);
        }, 500)
    }

    const handleSignOutClick = () => {
        localStorage.setItem('create-app', '[]')
        props.setPageLeave(true)
        setTimeout(() => {
            navigate('/')
            setTimeout(() => {
                setNavActive(!navActive)
                setTimeout(() => {
                    props.setUserInfo('')
                }, 100);
            }, 100);
        }, 500);
    }

    useEffect(() => {
        props.setPageLeave(false)
    }, [])

    console.log(props.userInfo)

    const linksJsx = props.userInfo.token ? 
    <>
        <h1 name={`/users/${props.userInfo.user_name}`} onClick={handleNavClick}>[Profile]</h1>
        <h1 onClick={handleSignOutClick}>[Sign Out]</h1>
    </> : 
        <h1 name='/sign-in' onClick={handleNavClick}>[Sign In/Up]</h1>

    return (
        <header>
            <nav>
                <div className={`create-btn ${searchActive ? 'create-active' : '' }`}onClick={handleHomeClick}>
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
                    <h1 name='/' onClick={handleNavClick}>[Home]</h1>
                    {linksJsx}
                </div>
            </div>
        </header>
    )
}

export default Header
