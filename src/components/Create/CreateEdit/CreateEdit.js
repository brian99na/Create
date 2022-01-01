import React, { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { CgRemove } from 'react-icons/cg'
import './createEdit.css'
import axios from 'axios'
import { useNavigate } from 'react-router'


function Create(props) {
    const [formData, setFormData] = useState({title: '', desc: '', file: '', tags: ['art']})
    const [tagValue, setTagValue] = useState('')
    const [token, setToken] = useState('')
    const [error, setError] = useState('')
    const [deleteActive, setDeleteActive] = useState(false)
    const [slideActive, setSlideActive] = useState(1)
    const fileRef = useRef()
    const navigate = useNavigate()

    const imageFormats = ['png', 'jpeg']

    const loadToken = () => {
        setTimeout(() => {
            props.userInfo && setToken(props.userInfo.token)
        }, 300);
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleCreateClick = () => {
        if (props.createActive) {
            setFormData({title: '', desc: '', file: '', tags: ['art']})
        }
        props.setCreateActive(false)
        props.setEditActive(false)
    }

    const handleFileUpload = () => {
        // fileRef.current.click()
        setError('[feature coming soon]')
    }

    const handleFileChange = (e) => {
        if (fileRef.current.files[0]) {
            if (fileRef.current.files[0].size < 10000000) {
                setError('')
                setFormData({...formData, file: URL.createObjectURL(fileRef.current.files[0])})
            } else {
                setError('[file size must be less than 10mb]')
            }
        }
    }
    
    const handleFileLink = (e) => {
        setFormData({...formData, file: e.target.value})
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

    const handleDeleteSlide = (e) => {
        setDeleteActive(true)
    }

    const handleDelModal = () => {
        setDeleteActive(!deleteActive)
    }

    const handleDelClick = () => {
        axios.delete(`https://create-art.herokuapp.com/post/${props.postData.id}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            }
        })
        .then(() => {
            setDeleteActive(!deleteActive)
            props.setCreateActive(false)
            props.setEditActive(false)
            props.setPageLeave(true)
            setTimeout(() => {
                navigate('/')
                setTimeout(() => {
                    props.setPageLeave(false)
                }, 100);
            }, 300);
        })
    }

    // const handleCreate = () => {
    //     let fd = new FormData()
    //     if (fileRef.current.files[0]) {
    //         if (fileRef.current.files[0].size < 10000000) {
    //             fd.append('title', formData.title)
    //             fd.append('file', fileRef.current.files[0], fileRef.current.files[0].name)
    //             fd.append('desc', formData.desc)
    //             fd.append('tags', [...formData.tags])
    //         } else {
    //             setError('[file size must be less than 10mb]')
    //         }
    //     } else {
    //         fd = JSON.stringify({
    //             title: formData.title,
    //             desc: formData.desc,
    //             tags: [formData.tags.join(',')]
    //         })
    //         console.log(fd)
    //     }
    //     axios.patch(`https://create-art.herokuapp.com/post/${props.postData.id}/`, fd, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: 'Token ' + token
    //         }
    //     })
    //     .then((res) => {
    //         console.log(res)
    //         props.setCreateActive(false)
    //         props.setEditActive(false)
    //         window.location.reload()
    //     })
    //     .then(() => {
    //         setFormData({file: '', title: '', desc: '', tags: []})
    //         setSlideActive(1)
    //     })
    //     .catch(() => {
    //         setError('[error]')
    //     })
    // }

    const handleCreate = () => {
        let fd = JSON.stringify({
            title: formData.title,
            desc: formData.desc,
            tags: [formData.tags.join(',')]
        })
        axios.patch(`https://create-art.herokuapp.com/post/${props.postData.id}/`, fd, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            }
        })
        .then((res) => {
            console.log(res)
            props.setCreateActive(false)
            props.setEditActive(false)
            window.location.reload()
        })
        .then(() => {
            setFormData({file: '', title: '', desc: '', tags: []})
            setSlideActive(1)
        })
        .catch(() => {
            setError('[error]')
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

    useEffect(() => {
        props.postData && setFormData({...formData, title: props.postData.title,
        desc: props.postData.desc, tags: props.postData.tags[0].split(','), file: props.postData.file })
    }, [props.createActive])

    console.log(formData)
    console.log(props.userInfo)
    console.log(props.postData)

    return (
        <div className={`modal-upper-edit ${props.createActive ? 'modal-upper-active' : ''}`}>
            <div onClick={handleDelModal} className={`delete-overlay ${deleteActive ? 'deleteOverlayActive' : ''}`}>
                <div className={`delete-modal ${deleteActive ? 'deleteModalActive' : ''}`}>
                    <h1>Are you sure you want to delete this post?</h1>
                    <div className='del-btns'>
                        <button onClick={handleDelModal}>Cancel</button>
                        <button onClick={handleDelClick} className='del-btn'>Delete</button>
                    </div>
                </div>
            </div>
            <div className={`create-modal ${props.createActive ? 'modal-active' : ''}`}>
                <div className='slide-indicators'>
                    <div className={`circle ${slideActive === 1 ? 'dot' : ''}`}></div>
                    <div className={`circle ${slideActive === 2 ? 'dot' : ''}`}></div>
                    <div className={`circle ${slideActive === 3 ? 'dot' : ''}`}></div>
                </div>
                <div className='create-form-main'>
                    <div className={`create-form ${slideActive === 1 ? 'form-left' : slideActive === 2 ? 'form-mid' : slideActive === 3 ? 'form-right' : ''}`}>
                        <div className='upload-slide'>
                            <div className={`skeleton-load ${formData.file ? 'skeleton-invis' : ''}`}>
                                {formData.file && imageFormats.includes(formData.file.slice(-3)) ? 
                                <img alt='' src={formData.file}/> : 
                                <video playsInline autostart='true' autoPlay loop controls={false} muted src={formData.file}></video>}
                            </div>
                            <div className='upload-container'>
                                <input ref={fileRef} onChange={handleFileChange} type='file' hidden/>
                                <button onClick={handleFileUpload}>[upload]</button>
                                <input className='link-upload' onChange={handleFileLink} value={formData.file} placeholder='enter file link here'/>
                            </div>
                        </div>
                        <div className='title-desc-slide'>
                            <div className='title-desc'>
                                <input placeholder='title' maxLength='12' name='title' value={formData.title} onChange={handleChange}/>
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
                </div>
                <div className='btn-container'>
                    <button name='delete' onClick={handleDeleteSlide} className={`back-btn ${slideActive === 1 ? 'btn-active delete' : ''}`}>[delete]</button>
                    <button name='back' onClick={handleSlide} className={`back-btn ${slideActive >= 2 ? 'btn-active' : ''}`}>[back]</button>
                    <button name='next' onClick={handleSlide} className={`next-btn ${slideActive <= 2 ? 'btn-active' : ''}`}>[next]</button>
                    <button onClick={handleCreate} className={`create-btn ${slideActive === 3 ? 'btn-active' : ''}`}>[update]</button>
                </div>
                <p className='error'>{error}</p>
            </div>
            {props.createActive ? <div className='create-icon-edit'>
                <AiOutlinePlus className={`create-icon-2 ${props.createActive ? 'create-icon-x' : ''}`} onClick={handleCreateClick}/>
            </div> : null}
        </div>
    )
}

export default Create
