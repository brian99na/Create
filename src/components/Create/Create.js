import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { CgRemove } from 'react-icons/cg'
import { useNavigate } from 'react-router'
import './create.css'



function Create(props) {
    const [formData, setFormData] = useState({file: {title: '', file: ''}, title: '', desc: '', tags: []})
    const [tagValue, setTagValue] = useState('')
    const [slideActive, setSlideActive] = useState(1)
    const navigate = useNavigate()
    const fileRef = useRef()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleCreateClick = () => {
        props.setPageLeave(false)
        setTimeout(() => {
          navigate('/create')
        }, 500)
    }

    const handleFileUpload = () => {
        fileRef.current.click()
    }

    const handleFileChange = () => {
        console.log(fileRef.current.files[0])
        setFormData({...formData, file: {title: fileRef.current.files[0].name, file: fileRef.current.files[0]}})

    }

    const handleTagSubmit = (e) => {
        e.preventDefault();
        let tagArr = [...formData.tags]
        tagArr.push(tagValue)
        setFormData({...formData, tags: tagArr})
        setTagValue('')
    }

    const handleTagChange = (e) => {
        setTagValue(e.target.value)
    }

    const removeTagClick = (e, index) => {
        let tagArr = [...formData.tags]
        tagArr.splice(index, 1)
        setFormData({...formData, tags: tagArr})
    }

    const handleSlide = (e) => {
        if (e.target.name === 'next' & slideActive < 3) {
            setSlideActive(slideActive + 1)
        } else if (e.target.name === 'back' & slideActive > 1) {
            setSlideActive(slideActive - 1)
        }
    }

    const tagsJsx = formData.tags && formData.tags.map((tag, index) => {
        return(
            <div className='tag-container'>
                <p className='tag'>{tag}</p>
                <CgRemove className='remove-tag' onClick={(e) => removeTagClick(e, index)}/>
            </div>
        )
    })

    return (
        <div className='create-modal'>
            <div className='slide-indicators'>
                <div className={`circle ${slideActive === 1 ? 'dot' : ''}`}></div>
                <div className={`circle ${slideActive === 2 ? 'dot' : ''}`}></div>
                <div className={`circle ${slideActive === 3 ? 'dot' : ''}`}></div>
            </div>
            <div className={`create-form ${slideActive === 1 ? 'form-left' : slideActive === 2 ? 'form-mid' : slideActive === 3 ? 'form-right' : ''}`}>
                <div className='upload-slide'>
                    <div className='skeleton-load'></div>
                    <div className='upload-container'>
                        <input ref={fileRef} onChange={handleFileChange} type='file' hidden/>
                        <button onClick={handleFileUpload}>[upload]</button>
                    </div>
                </div>
                <div className='title-desc-slide'>
                    <div className='title-desc'>
                        <input placeholder='title' maxLength='24' name='title' value={formData.title} onChange={handleChange}/>
                        <textarea placeholder='description' name='desc' value={formData.desc} onChange={handleChange}/>
                    </div>
                </div>
                <form className='tags-slide' onSubmit={handleTagSubmit}>
                    <div className='tags-container'>
                        {tagsJsx}
                    </div>
                    <input placeholder='input tags' value={tagValue} onChange={handleTagChange}/>
                </form>
            </div>
            <div className='btn-container'>
                <button name='back' onClick={handleSlide} className={`back-btn ${slideActive >= 2 ? 'btn-active' : ''}`}>[back]</button>
                <button name='next' onClick={handleSlide} className={`next-btn ${slideActive <= 2 ? 'btn-active' : ''}`}>[next]</button>
                <button className={`create-btn ${slideActive === 3 ? 'btn-active' : ''}`}>[create]</button>
            </div>
            <div className='create-icon'>
                <div className='create-icon-1'></div>
                <AiOutlinePlus className='create-icon-2' onClick={handleCreateClick}/>
                <div className='create-icon-3'></div>
            </div>
        </div>
    )
}

export default Create
