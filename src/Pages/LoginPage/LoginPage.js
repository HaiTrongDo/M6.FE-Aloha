import React, {useState/*,useEffect*/} from 'react';
import './LoginPage.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
    let navigate=useNavigate()
    const [active, setActive] = useState('container');
    const [userSignIn, setUserSignIn] = useState({
        email: '',
        password: ''
    })
    const [userSignUp,setUserSignUp]=useState({
        username:'',
        email:'',
        password:''
    })

    const handleClickSignIn = () => {
        setActive('container')
    }

    const handleClickSignUp = () => {
        setActive('container right-panel-active')
    }

    const handleChangeSignIn = (e) => {
        setUserSignIn({...userSignIn, [e.target.name]: e.target.value})
    }

    const handleChangeSignUp=(e)=>{
        setUserSignUp({...userSignUp,[e.target.name]:e.target.value})
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/auth/signin', userSignIn)
            .then(() => {
                console.log('login success');
                navigate('/')
            })
            .catch(() => console.log('login false'))
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/auth/signup', userSignUp)
            .then(()=>console.log('register success'))
            .catch(() => console.log('register false'))
    }

    return (
        <div className='login'>
            <div className={active}>
                <div className="form-container sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <Link to="" className="social"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="" className="social"><i className="fab fa-google-plus-g"></i></Link>
                            <Link to="" className="social"><i className="fab fa-linkedin-in"></i></Link>
                        </div>
                        <span style={{margin: '10px'}}>or use your email for registration</span>
                        <input type="text" name='username' placeholder="Name" onChange={handleChangeSignUp}/>
                        <input type="email" name='email' placeholder="Email" onChange={handleChangeSignUp}/>
                        <input type="password" name='password' placeholder="Password" onChange={handleChangeSignUp}/>
                        <button style={{marginTop: '10px'}} onClick={handleSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <Link to="" className="social"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="" className="social"><i className="fab fa-google-plus-g"></i></Link>
                            <Link to="" className="social"><i className="fab fa-github"></i></Link>
                        </div>
                        <span style={{margin: '10px'}}>or use your account</span>
                        <input type="email" name='email' placeholder="Email" onChange={handleChangeSignIn}/>
                        <input type="password" name='password' placeholder="Password" onChange={handleChangeSignIn}/>
                        <Link to="" style={{color: 'darkcyan', margin: '20px'}}>Forgot your password?</Link>
                        <button onClick={handleSignIn}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleClickSignIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" onClick={handleClickSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;