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
                let tags = res.data[0].tags[0].split(',')
                for(let i=0; i < res.data.length; i++) {
                    if (res.data[i].tags[0].includes(',')) {
                        let splitArr = res.data[i].tags[0].split(',')
                        tags = [...tags, ...splitArr]
                    } else {
                        tags = [...tags, ...res.data[i].tags]
                    }
                }
                const filteredTags = tags.filter((item, index) => tags.indexOf(item) === index)
                setTagArr(filteredTags)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    
    const handlePostClick = (e) => {
        props.setPageLeave(true)
        setTimeout(() => {
            navigate(`/users${e.target.id}/${e.target.post_id}`)
        }, 500);
    }

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
            <div className='post-container' post_id={post.id} user_id={post.user} onClick={handlePostClick}>
                <p>{post.title.split(',').join(' ')}</p>
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
        }, 300);        
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
            {/* <div className='triangle'>
                <div className='triangle-inner'></div>
            </div>
            <div className='circle'></div>
            <div className='square'></div> */}
        </div>
    )
}

export default Homepage
