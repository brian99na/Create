import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './sign.css'
import axios from 'axios'

function Sign(props) {
    const [signIn, setSignIn] = useState({user: {email: '', password: ''}})
    const [signUp, setSignUp] = useState({email: '', password: '', passwordCheck: '', username: ''})
    const [error, setError] = useState({signIn: false, signUp: false, msg: ''})
    const [signUpActive, setSignUpActive] = useState(false)
    const navigate = useNavigate()

    const handlePageChange = () => {
        setSignUpActive(!signUpActive)
    }

    const handleInChange = (e) => {
        let signInObj = {...signIn}
        let item = e.target.name
        signInObj.user[item] = e.target.value 
        setSignIn(signInObj)
    }

    const handleUpChange = (e) => {
        setSignUp({...signUp, [e.target.name]: e.target.value})
    }

    const localStore = (res) => {
        let oldToken = JSON.parse(localStorage.getItem('create-app'));
        oldToken.pop()
        oldToken.push(res.data.user)
        localStorage.setItem('create-app', JSON.stringify(oldToken));
    }

    const signInFunction = (details) => {
        axios.post('http://localhost:8000/sign-in/', details)
            .then((res) => {
                setError({...error, signIn: false, msg: ''});
                props.setUserInfo(res.data.user);
                localStore(res)
                props.setPageLeave(true)
                setTimeout(() => {
                    navigate(`/users/${res.data.user.user_name}`)
                }, 500);
            })
            .catch((err) => {
                setError({...error, signIn: true, msg: 'sign-in failed'})
            })
    }

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        //axios call to verify and sign in or receive error
        signInFunction(signIn)
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (signUp.password === signUp.passwordCheck) {
            setError({...error, signUp: false, msg: ''})
            axios.post('http://localhost:8000/sign-up/', {user: {
                email: signUp.email,
                password: signUp.password,
                user_name: signUp.username
            }})
                .then((res) => {
                    let signInDetails = {
                        user: {
                            email: signUp.email,
                            password: signUp.password
                        }
                    }
                    signInFunction(signInDetails)
                })
                .catch((err) => {
                    setError({...error, signUp: true, msg: 'sign-up failed'})
                })
        } else {
            setError({...error, signUp: true, msg: 'passwords do not match'})
        }
    }

    useEffect(() => {
        props.setPageLeave(false)
    }, [])
    
    return (
        <div className={`sign-page ${props.pageLeave ? 'sign-leave' : ''}`}>
            <div className={`sign-container ${signUpActive ? 'sign-up-page' : ''}`}>
                <section className='sign-in'>
                    <form onSubmit={handleSignInSubmit}>
                        <h1>Sign In</h1>
                        <input placeholder='[email]' name='email' onChange={handleInChange} value={signIn.user.email}/>
                        <input type='password' placeholder='[password]' name='password' onChange={handleInChange} value={signIn.user.password}/>
                        <button type='submit'>[sign in]</button>
                        <h3>Don't have an account?</h3>
                        <p onClick={handlePageChange}>sign up here</p>
                        <p className='error'>{error.signIn ? 'Error, try again' : null}</p>                    </form>
                </section>
                <section className={`sign-up ${signUpActive ? 'sign-up-anim' : ''}`}>
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Sign Up</h1>
                        <input placeholder='[email]' name='email' onChange={handleUpChange} value={signUp.email}/>
                        <input type='password' placeholder='[password]' name='password' onChange={handleUpChange} value={signUp.password}/>
                        <input type='password' placeholder='[repeat password]' name='passwordCheck' onChange={handleUpChange} value={signUp.passwordCheck}/>
                        <input placeholder='[create username]' name='username' onChange={handleUpChange} value={signUp.username}/>
                        <button type='submit'>[sign up]</button>
                        <p onClick={handlePageChange}>back to sign in</p>
                        <p className='error'>{error.signUp ? `error: ${error.msg}` : ''}</p>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default Sign
