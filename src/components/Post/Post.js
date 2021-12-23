import React, { useEffect } from 'react'

function Post() {

    const getPost = () => {
        
    }

    useEffect(() => {
        setTimeout(() => {
            getPost()
        }, 300)
    }, [])

    return (
        <div>
            <h1>Hello this is the post</h1>
        </div>
    )
}

export default Post
