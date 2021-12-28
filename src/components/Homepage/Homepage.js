import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import './homepage.css'

function Homepage(props) {
    const [homepagePosts, setHomepagePosts] = useState([])
    const [tagArr, setTagArr] = useState([])
    const [filterValues, setFilterValues] = useState([])
    const navigate = useNavigate()

    const imageFormats = ['png', 'jpeg']

    const getAllPosts = () => {
        axios.get('http://localhost:8000/all/')
            .then((res) => {
                setHomepagePosts(res.data)
                console.log(res.data)
                let tags = []
                for(let i=0; i < res.data.length; i++) {
                    tags = [...tags, ...(res.data[i].tags[0].split(','))]
                }
                const filteredTags = tags.filter((item, index) => tags.indexOf(item) === index)
                setTagArr(filteredTags)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    const handlePostClick = (e, user, id) => {
        props.setPageLeave(true)
        axios.get(`http://localhost:8000/get-user/${user}/`)
        .then((res) => {
            setTimeout(() => {
                navigate(`/users/${res.data.user_name}/${id}`)
            }, 500);
        })

    }

    console.log(homepagePosts)

    const handleTagClick = (e, tag) => {
        if (filterValues.includes(tag)) {
            const newArr = [...filterValues]
            const index = newArr.indexOf(tag)
            newArr.splice(index, 1)
            setFilterValues(newArr)
        } else {
            const newArr = [...filterValues]
            newArr.push(tag)
            setFilterValues(newArr)
        }
    }

    const homePostsJsx = homepagePosts.length > 0 && homepagePosts.filter((post) => {
        return(post.tags[0].includes(filterValues))
    }).map((post) => {
        return(
            <div className='post-container' onClick={(e) => handlePostClick(e, post.user, post.id) }>
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
                <h1 className={`tag-item ${filterValues.includes(tag) ? 'tag-active': ''}`} onClick={(e) => handleTagClick(e, tag)}>{tag}</h1>
            </div>
        )
    })

    useEffect(() => {
        getAllPosts()
        setTimeout(() => {
            props.setPageLeave(false)     
        }, 200);
    }, [])

    return (
        <div className={`homepage ${props.pageLeave ? 'homepage-leave' : ''}`}>
            <div className='tag-bar'>
                {tagJsx}
            </div>
            <div className='posts'>
                <div className='post-inner'>
                    {homePostsJsx}
                </div>
            </div>
        </div>
    )
}

export default Homepage
