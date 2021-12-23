import React, { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { CgRemove } from 'react-icons/cg'
import './create.css'
import axios from 'axios'
import { useNavigate } from 'react-router'


function Create(props) {
    const [createActive, setCreateActive] = useState(false)
    const [formData, setFormData] = useState({title: '', desc: '', file: '', tags: ['art']})
    const [tagValue, setTagValue] = useState('')
    const [token, setToken] = useState('')
    const [slideActive, setSlideActive] = useState(1)
    const fileRef = useRef()
    const navigate = useNavigate()

    const loadToken = () => {
        setTimeout(() => {
            props.userInfo && setToken(props.userInfo.token)
        }, 300);
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleCreateClick = () => {
        setCreateActive(!createActive)

    }

    const handleFileUpload = () => {
        fileRef.current.click()
    }

    const handleFileChange = (e) => {
        console.log(fileRef.current.files[0])
        console.log(e.target.files[0])

        setFormData({...formData, file: URL.createObjectURL(fileRef.current.files[0])})
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

    const handleCreate = () => {
        setSlideActive(1)
        const fd = new FormData()
        fd.append('title', formData.title)
        fd.append('file', fileRef.current.files[0], fileRef.current.files[0].name)
        fd.append('desc', formData.desc)
        fd.append('tags', formData.tags)
        console.log(fd)
        axios.post('http://localhost:8000/posts/', fd, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            }
        })
        .then((res) => {
            setCreateActive(false)
            navigate(`/users/${res.user}/${res.id}`)
        })
        .then(() => {
            setFormData({file: '', title: '', desc: '', tags: []})
        })
    }

    const tagsJsx = formData.tags && formData.tags.map((tag, index) => {
        return(
            <div className='tag-container'>
                <p className='tag'>{tag}</p>
                <CgRemove className='remove-tag' onClick={(e) => removeTagClick(e, index)}/>
            </div>
        )
    })

    useEffect(() => {
        loadToken()
    }, [])

    useEffect(() => {
        loadToken()
    }, [props.userInfo])

    console.log(formData)
    console.log(formData.file)
    console.log(token)
    console.log(typeof formData.tags[0])
    console.log(props.userInfo)

    return (
        <div className={`modal-upper ${createActive ? 'modal-upper-active' : ''}`}>
            <div className={`create-modal ${createActive ? 'modal-active' : ''}`}>
                <div className='slide-indicators'>
                    <div className={`circle ${slideActive === 1 ? 'dot' : ''}`}></div>
                    <div className={`circle ${slideActive === 2 ? 'dot' : ''}`}></div>
                    <div className={`circle ${slideActive === 3 ? 'dot' : ''}`}></div>
                </div>
                <div className={`create-form ${slideActive === 1 ? 'form-left' : slideActive === 2 ? 'form-mid' : slideActive === 3 ? 'form-right' : ''}`}>
                    <div className='upload-slide'>
                        <div className={`skeleton-load ${formData.file.file ? 'skeleton-invis' : ''}`}>
                            <img src={formData.file} alt=''/>
                        </div>
                        <div className='upload-container'>
                            <input ref={fileRef} onChange={handleFileChange} type='file' hidden/>
                            <button onClick={handleFileUpload}>{formData.file.file ? formData.file.title : '[upload]'}</button>
                        </div>
                    </div>
                    <div className='title-desc-slide'>
                        <div className='title-desc'>
                            <input placeholder='title' maxLength='24' name='title' value={formData.title} onChange={handleChange}/>
                            <textarea placeholder='description' maxLength='500' name='desc' value={formData.desc} onChange={handleChange}/>
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
                    <button onClick={handleCreate} className={`create-btn ${slideActive === 3 ? 'btn-active' : ''}`}>[create]</button>
                </div>
            </div>
            <div className='create-icon'>
                <AiOutlinePlus className={`create-icon-2 ${createActive ? 'create-icon-x' : ''}`} onClick={handleCreateClick}/>
            </div>
        </div>
    )
}

export default Create
