import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './user.css'

function User(props) {

    const [userPosts, setUserPosts] = useState([])
    const navigate = useNavigate()

    const imageFormats = ['png', 'jpeg']

    const handlePostClick = (e, user, id) => {
        props.setPageLeave(true)
        setTimeout(() => {
            navigate(`/users/${user}/${id}`)
        }, 500);
    }

    const getUserPosts = () => {
        axios.get('http://localhost:8000/posts/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + props.userInfo.token
            }
        })
            .then(res => setUserPosts(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setTimeout(() => {
            getUserPosts()
            props.setPageLeave(false)
        }, 300);
    }, [])

    console.log(userPosts)
    console.log(props.userInfo.token)

    const userPostJsx = userPosts.map((item) => {
        return(
            <div className='creation-container' onClick={(e) => handlePostClick(e, item.user, item.id)}>
                <h1>{item.title}</h1>
                <div className='creation-file'>
                    {item.file && imageFormats.includes(item.file.slice(-3)) ? 
                    <img alt='' src={item.file}/> : 
                    <video playsInline autostart='true' autoPlay loop controls={false} muted src={item.file}></video>}
                </div>
            </div>
        )
    })

    return (
        <div className={`user-page ${props.pageLeave ? 'user-leave' : ''}`}>
            <div className='profile'>
                <div className='icon'></div>
                <h1>{props.userInfo.user_name}</h1>
            </div>
            <div className='creation-container'>
                <p>[creations]</p>
                <div className='creations'>
                    {userPostJsx}
                </div>
            </div>
        </div>
    )
}

export default User
