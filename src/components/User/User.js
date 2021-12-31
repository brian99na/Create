import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './user.css'
import Avatar from 'boring-avatars'

function User(props) {

    const [userPosts, setUserPosts] = useState([])
    const [avatar, setAvatar] = useState({style: '', colors: []})
    const navigate = useNavigate()
    const { id } = useParams()

    const imageFormats = ['png', 'jpeg']
    const avatarTypes = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus']
    const avatarColors = ["#92A1C6", "#146A7C", "#F0AB3D", "#C20D90", "264653", "2a9d8f", "e9c46a", "f4a261", "e76f51"]

    const handlePostClick = (e, post_id) => {
        props.setPageLeave(true)
        setTimeout(() => {
            navigate(`/users/${id}/${post_id}`)
        }, 500);
    }

    const setAvatarStyle = () => {
        let type = avatarTypes[Math.floor(Math.random() * avatarTypes.length)]
        let colors = []
        for (let i = 0; i < 5; i++) {
            colors.push(avatarColors[Math.floor(Math.random() * avatarColors.length)])
        }
        setAvatar({style: type, colors: colors})
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
        setAvatarStyle()
        getUserPosts()
        setTimeout(() => {
            props.setPageLeave(false)
        }, 200);
    }, [])

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

    
    console.log(userPosts)
    console.log(props.userInfo.token)
    console.log(avatar)

    return (
        <div className={`user-page ${props.pageLeave ? 'user-leave' : ''}`}>
            <div className='profile'>
                <Avatar className='boring-avatar' size={80} variant={avatar.style} colors={avatar.colors}/>
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
