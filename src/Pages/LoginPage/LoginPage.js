import React, {useState/*,useEffect*/} from 'react';
import './LoginPage.css';
import {Link} from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
    const [active, setActive] = useState('container');
    const [user, setUser] = useState({
        name:'',
        email: '',
        password: ''
    })

    const handleClickSignIn = () => {
        setActive('container')
    }

    const handleClickSignUp = () => {
        setActive('container right-panel-active')
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/auth/signin', user)
            .then(() => console.log('login success'))
            .catch(() => console.log('login false'))
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/auth/signup', user)
            .then(()=>console.log('register success'))
            .catch(() => console.log('register false'))
    }

    return (
        <div>
            <div className={active}>
                <div className="form-container sign-up-container">
                    <form action="" method='post'>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <Link to="" className="social"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="" className="social"><i className="fab fa-google-plus-g"></i></Link>
                            <Link to="" className="social"><i className="fab fa-linkedin-in"></i></Link>
                        </div>
                        <span style={{margin: '10px'}}>or use your email for registration</span>
                        <input type="text" name='name' placeholder="Name" onChange={handleChange}/>
                        <input type="email" name='email' placeholder="Email" onChange={handleChange}/>
                        <input type="password" name='password' placeholder="Password" onChange={handleChange}/>
                        <button style={{marginTop: '10px'}} onClick={handleSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <Link to="" className="social"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="" className="social"><i className="fab fa-google-plus-g"></i></Link>
                            <Link to="" className="social"><i className="fab fa-github"></i></Link>
                        </div>
                        <span style={{margin: '10px'}}>or use your account</span>
                        <input type="email" name='email' placeholder="Email" onChange={handleChange}/>
                        <input type="password" name='password' placeholder="Password" onChange={handleChange}/>
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