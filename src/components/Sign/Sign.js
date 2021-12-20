import React, { useRef, useState } from 'react'
import './sign.css'

function Sign() {
    const [signIn, setSignIn] = useState({email: '', password: ''})
    const [signUp, setSignUp] = useState({email: '', password: '', passwordCheck: '', username: ''})
    const [error, setError] = useState({signIn: '', signUp: ''})
    const [signUpActive, setSignUpActive] = useState(false)

    const handlePageChange = () => {
        setSignUpActive(!signUpActive)
    }

    const handleInChange = (e) => {
        setSignIn({...signIn, [e.target.name]: e.target.value})
    }

    const handleUpChange = (e) => {
        setSignUp({...signUp, [e.target.name]: e.target.value})
    }

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        //axios call to verify and sign in or receive error
    }

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (signUp.password === signUp.passwordCheck) {
            setError({signIn: '', signUp: ''})
        } else {
            setError({...error, signUp: 'Passwords do not match'})
        }
    }

    return (
        <div className='sign-page'>
            <div className={`sign-container ${signUpActive ? 'sign-up-page' : ''}`}>
                <section className='sign-in'>
                    <form onSubmit={handleSignInSubmit}>
                        <h1>Sign In</h1>
                        <input placeholder='[email]' name='email' onChange={handleInChange} value={signIn.email}/>
                        <input type='password' placeholder='[password]' name='password' onChange={handleInChange} value={signIn.password}/>
                        <button type='submit'>[sign in]</button>
                        <h3>Don't have an account?</h3>
                        <p onClick={handlePageChange}>sign up here</p>
                        <p className='error'>{error.signIn}</p>                    </form>
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
                        <p className='error'>{error.signUp}</p>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default Sign
