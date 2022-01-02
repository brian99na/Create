import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './post.css'

function Post(props) {

    const [user, setUser] = useState('')
    const { id, post_id } = useParams()
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    const imageFormats = ['png', 'jpeg']

    const handleUserClick = () => {
        props.setPageLeave(true)
        setTimeout(() => {
            navigate(`/users/${id}`)
        }, 300);
    }

    const handleEditClick = () => {
        props.setEditActive(true)
        props.setCreateActive(true)
    }

    const getPost = () => {
        axios.get(`https://create-art.herokuapp.com/get-id/${id}/`)
        .then((res) => {
            axios.get(`https://create-art.herokuapp.com/post/${res.data.id}/${post_id}/`)
            .then((res) => {
                props.setPostData(res.data)
            })
            .then(() => setLoaded(true))
            .catch(err => console.log(err))
        })
    }

    useEffect(() => {
        setUser(id)
        getPost()
        setTimeout(() => {
            props.setPageLeave(false)
        }, 300)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getPost()
        }, 300)
    }, [post_id])

    const skeleJsx = <div className='post-skele'></div>

    return (
        <div className={`post-upper ${props.pageLeave ? 'post-leave' : ''}`}>
            <div className='post-container'>
                {loaded ? <div className='file-container'>
                    {(props.postData && props.postData.file && imageFormats.includes(props.postData.file.slice(-3))) ? 
                    <img alt='' src={props.postData.file}/> : 
                    <video playsInline autostart='true' autoPlay loop controls={false} muted src={props.postData.file}></video>
                    }
                </div> :
                skeleJsx}
                <div className='title-at'>
                    <h1>{props.postData.title}</h1>
                    <p onClick={handleUserClick}>[@{user}]</p>
                </div>
                <p>{props.postData.desc}</p>
                <div className='tag-container'>
                        {props.postData.tags && props.postData.tags[0].split(',').map(tag => <p className='tag'>{tag}</p>)}
                </div>
                {props.userInfo && props.userInfo.user_name === id ? <button className='edit-btn' onClick={handleEditClick}>[edit post]</button> : null}
            </div>
        </div>
    )
}

export default Post
