import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import './post.css'

function Post(props) {

    const [postData, setPostData] = useState('')
    const { post_id } = useParams()

    const imageFormats = ['png', 'jpeg']

    const getPost = () => {
        axios.get(`http://localhost:8000/post/${post_id}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + props.userInfo.token
            }
        })
        .then(res => setPostData(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        setTimeout(() => {
            getPost()
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
                <h1>{postData && postData.title && postData.title.split(',').join(' ')}</h1>
                <p>{postData && postData.desc.split(',').join(' ')}</p>
                <div className='tag-container'>
                        {postData && postData.tags && postData.tags[0].split(',').map(tag => <p className='tag'>{tag}</p>)}
                </div>
            </div>
        </div>
    )
}

export default Post
