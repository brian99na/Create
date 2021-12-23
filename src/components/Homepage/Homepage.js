import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import './homepage.css'

function Homepage() {
    const [homepagePosts, setHomepagePosts] = useState([])
    const [tagArr, setTagArr] = useState([])
    const [filterBy, setFilterBy] = useState('')
    const [filterBool, setFilterBool] = useState(false)
    const navigate = useNavigate()

    const imageFormats = ['png', 'jpeg']

    const getAllPosts = () => {
        axios.get('http://localhost:8000/all/')
            .then((res) => {
                setHomepagePosts(res.data)
                let tags = res.data[0].tags
                for(let i=1; i < res.data.length; i++) {
                    tags = [...tags, ...res.data[i].tags]
                }
                const filteredTags = tags.filter((item, index) => tags.indexOf(item) === index)
                setTagArr(filteredTags)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    const handlePostClick = (e) => {
        navigate(`/users${e.target.id}/${e.target.post_id}`)
    }

    const handleTagClick = () => {

    }

    useEffect(() => {
        getAllPosts()
    }, [])

    console.log(homepagePosts)
    console.log(tagArr)

    const homePostsJsx = homepagePosts.length > 0 && homepagePosts.map((post) => {
        return(
            <div className='post-container' post_id={post.id} user_id={post.user} onClick={handlePostClick}>
                <p>{post.title}</p>
                <div className='file-container'>
                    {post.file && imageFormats.includes(post.file.slice(-3)) ? <img alt='' src={post.file}/> : <video playsInline autostart='true' autoPlay loop controls={false} muted src={post.file}></video>}
                </div>
            </div>

        )
    })

    const tagJsx = tagArr.map((tag) => {
        return(
            <div className='tag-container'>
                <h1 onClick={handleTagClick}>{tag}</h1>
            </div>
        )
    })

    return (
        <div className='homepage'>
            <div className='tag-bar'>
                {tagJsx}
            </div>
            <div className='posts'>
                {homePostsJsx}
            </div>
        </div>
    )
}

export default Homepage
