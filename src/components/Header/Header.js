import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

function Header() {
    return (
        <header>
            <nav>
                <div className='nav-icon'></div>
                <div className='create-btn'>[CREATE]</div>
                <div className='search-box'>
                    <input placeholder='[search]'/>
                </div>
                <div className='search-ham'>
                    <RiSearch2Line />
                    <div className='ham-1'></div>
                    <div className='ham-2'></div>
                    <div className='ham-3'></div>
                </div>
            </nav>
            <div className='nav-active'>
                <h1>[Sign In]</h1>
                <h1>[Home]</h1>
                <h1>[Profile]</h1>
                <h1>[Create]</h1>
            </div>
        </header>
    )
}

export default Header
