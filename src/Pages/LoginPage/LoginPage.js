import React, {useState} from 'react';
import './LoginPage.css';
import {Link} from 'react-router-dom';


const LoginPage = () => {
    const [active,setActive]=useState('container');

    const handleClickSignIn=()=>{
        setActive('container')
    }

    const handleClickSignUp=()=>{
        setActive('container right-panel-active')
    }

    return (
        <div>
            <div className={active}>
                <div className="form-container sign-up-container">
                    <form action="">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <Link to="" className="social"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="" className="social"><i className="fab fa-google-plus-g"></i></Link>
                            <Link to="" className="social"><i className="fab fa-linkedin-in"></i></Link>
                        </div>
                        <span style={{margin:'10px'}}>or use your email for registration</span>
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button style={{marginTop:'10px'}}>Sign Up</button>
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
                        <span style={{margin:'10px'}}>or use your account</span>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <Link to="" style={{color:'darkcyan',margin: '20px'}}>Forgot your password?</Link>
                        <button>Sign In</button>
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