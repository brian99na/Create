import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './user.css'

function User(props) {

    const [userPosts, setUserPosts] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()

    const imageFormats = ['png', 'jpeg']

    const handlePostClick = (e, post_id) => {
        props.setPageLeave(true)
        setTimeout(() => {
            navigate(`/users/${id}/${post_id}`)
        }, 500);
    }

    const getUserPosts = () => {
        axios.get(`http://localhost:8000/get-id/${id}/`)
        .then((res) => {
            console.log(res)
            axios.get(`http://localhost:8000/user-posts/${res.data.id}/`)
            .then(res => setUserPosts(res.data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserPosts()
        setTimeout(() => {
            props.setPageLeave(false)
        }, 200);
    }, [])

    console.log(userPosts)
    console.log(props.userInfo.token)

    const userPostJsx = userPosts.map((item) => {
        return(
            <div className='creation-main' onClick={(e) => handlePostClick(e, item.id)}>
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
                <h1>[@{id}]</h1>
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
