import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { CgRemove } from 'react-icons/cg'
import { useNavigate } from 'react-router'
import './create.css'



function Create(props) {
    const [formData, setFormData] = useState({file: {title: '', file: ''}, title: '', desc: '', tags: []})
    const [tagValue, setTagValue] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleCreateClick = () => {
        props.setPageLeave(false)
        setTimeout(() => {
          navigate('/create')
        }, 500)
    }

    const handleTagSubmit = (e) => {
        e.preventDefault();
        let tagArr = [...formData.tags]
        tagArr.append(tagValue)
        setFormData({...formData, tags: tagArr})
    }

    const handleTagChange = (e) => {
        setTagValue(e.target.value)
    }

    const removeTagClick = (e) => {
        let tagArr = [...formData.tags]
        tagArr.splice(e.target.value, 1)
    }

    const tagsJsx = formData.tags && formData.tags.map((tag, index) => {
        return(
            <div className='tag-container'>
                <p className='tag'>{tag}</p>
                <CgRemove value={index} onClick={removeTagClick}/>
            </div>
        )
    })

    return (
        <div className='create-modal'>
            <form className='create-form'>
                <div className='upload-container'>
                    <input type='file' hidden/>
                    <button>
                        Upload File
                    </button>
                </div>
                <div className='title-desc'>
                    <input placeholder='Title' name='title' value={formData.title} onChange={handleChange}/>
                    <textarea placeholder='Description' name='desc' value={formData.desc} onChange={handleChange}/>
                </div>
                <form className='tags' onSubmit={handleTagSubmit}>
                    <input placeholder='input tags' value={tagValue} onChange={handleTagChange}/>
                    {tagsJsx}
                </form>
                <button type='submit'>[create]</button>
            </form>
            <div className='create-icon'>
                <div className='create-icon-1'></div>
                <AiOutlinePlus className='create-icon-2' onClick={handleCreateClick}/>
                <div className='create-icon-3'></div>
            </div>
        </div>
    )
}

export default Create
