import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './post.css'
import CreateEdit from '../Create/CreateEdit/CreateEdit'

function Post(props) {

    const [postData, setPostData] = useState('')
    const [user, setUser] = useState('')
    const [createActive, setCreateActive] = useState(false)
    const { id, post_id } = useParams()
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
        setCreateActive(true)
    }

    const getPost = () => {
        axios.get(`http://localhost:8000/get-id/${id}/`)
        .then((res) => {
            axios.get(`http://localhost:8000/post/${res.data.id}/${post_id}/`)
            .then((res) => {
                setPostData(res.data)
            })
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

    console.log(postData)

    return (
        <div className={`post-upper ${props.pageLeave ? 'post-leave' : ''}`}>
            <div className='post-container'>
                <div className='file-container'>
                    {(postData && postData.file && imageFormats.includes(postData.file.slice(-3))) ? 
                    <img alt='' src={postData.file}/> : 
                    <video playsInline autostart='true' autoPlay loop controls={false} muted src={postData.file}></video>
                    }
                </div>
                <div className='title-at'>
                    <h1>{postData.title}</h1>
                    <p onClick={handleUserClick}>[@{user}]</p>
                </div>
                <p>{postData.desc}</p>
                <div className='tag-container'>
                        {postData.tags && postData.tags[0].split(',').map(tag => <p className='tag'>{tag}</p>)}
                </div>
                {props.userInfo.user_name === id ? <button className='edit-btn' onClick={handleEditClick}>[edit post]</button> : null}
            </div>
            <CreateEdit userInfo={props.userInfo} postData={postData} createActive={createActive} setCreateActive={setCreateActive} setEditActive={props.setEditActive} />
        </div>
    )
}

export default Post
