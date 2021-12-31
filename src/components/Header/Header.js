import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'
import { HiHome } from 'react-icons/hi'
import { IoMdPerson } from 'react-icons/io'
import { MdExitToApp } from 'react-icons/md'
import square from '../../images/Rectangle 1.svg'
import triangle from '../../images/Polygon 1.svg'
import circle from '../../images/Ellipse 1.svg'

function Header(props) {

    const navigate = useNavigate()

    const [navActive, setNavActive] = useState(false)

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

    const linksJsx = props.userInfo && props.userInfo.token ? 
    <>
        <h1 name={`/users/${props.userInfo.user_name}`} onClick={handleNavClick}>{<IoMdPerson />}[Profile]</h1>
        <h1 onClick={handleSignOutClick}>{<MdExitToApp />}[Sign Out]</h1>
    </> : 
        <h1 name='/sign-in' onClick={handleNavClick}>{<MdExitToApp style={{transform: 'rotate(180deg)'}} />}[Sign In/Up]</h1>

    return (
        <header>
            <nav>
                <div className='create-btn' onClick={handleHomeClick}>
                    <div className='header-shapes' onClick={handleHomeClick} >
                        <img className='sqr' src={square}/>
                        <img className='tri' src={triangle}/>
                        <img className='circ' src={circle}/>
                        <p className='secret-text'>hi :)</p>
                    </div>
                    <h1>create</h1>
                </div>
                <div className='search-ham'>
                    <div className='ham-main' onClick={handleNavClick}>
                        <div className={`ham-1 ${navActive ? 'ham-active-1' : ''}`}></div>
                        <div className={`ham-2 ${navActive ? 'ham-active-2' : ''}`}></div>
                        <div className={`ham-3 ${navActive ? 'ham-active-3' : ''}`}></div>
                    </div>
                </div>
            </nav>
            <div className={`nav-links ${navActive ? 'nav-links-active' : ''}`}>
                <div className='nav-links-main'>
                    <h1 name='/' onClick={handleNavClick}>{<HiHome />}[Home]</h1>
                    {linksJsx}
                </div>
            </div>
        </header>
    )
}

export default Header
