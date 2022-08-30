import React, {useState} from 'react';
import './LoginPage.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from '../../axios/index';
import {auth, googleAuthProvider, faceBookAuthProvider, githubAuthProvider} from "../../Config/firebase"
import {signInWithPopup} from "firebase/auth"
import isEmpty from "validator/es/lib/isEmpty";
import {useDispatch} from 'react-redux'
import {UserLoginWithFireBase, UserLoginWithPassword} from '../../Features/CurrentUser/UserSlice'
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";
import DialogWallet from "../../Components/Dialog/DialogWallet";


const DEFAULT_USER_URL = "https://firebasestorage.googleapis.com/v0/b/aloha-money.appspot.com/o/DefaultUser.jpg?alt=media&token=58615f07-c33a-42f7-aa11-43b9d8170593"


const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [active, setActive] = useState('container');
    const [userSignIn, setUserSignIn] = useState({
        email: '',
        password: ''
    })
    const [userSignUp, setUserSignUp] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [validateSignInMsg, setValidateSignInMsg] = useState({});
    const [validateSignUpMsg, setValidateSignUpMsg] = useState('');
    const [listWallet, setListWallet] = useState([]);
    const [isHaveWallet, setIsHaveWallet] = useState(false);

    const handleClickSignIn = () => {
        setActive('container')
    }

    const handleClickSignUp = () => {
        setActive('container right-panel-active')
    }

    const handleChangeSignIn = (e) => {
        setUserSignIn({...userSignIn, [e.target.name]: e.target.value})
    }

    const handleChangeSignUp = (e) => {
        setUserSignUp({...userSignUp, [e.target.name]: e.target.value})
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        const isValid = validateSignIn()
        if (isValid) {
            await axios
                .post('auth/signin', userSignIn)
                .then(async (resultFromBEAloha) => {
                    await axios.post('wallet/render', {userId: resultFromBEAloha.data.currentUser._id})
                        .then(res => {
                            console.log(res.data.data)
                            dispatch(UserLoginWithPassword({
                                ...resultFromBEAloha.data.currentUser,
                                wallet: res.data.data
                            }))
                            const [key, value] = resultFromBEAloha.data.token.split(' ')
                            localStorage.setItem(key, JSON.stringify(value));
                            navigate('/transactions')
                        })


                })
                .catch(() => {
                    setValidateSignInMsg({password: '* Wrong email or password *'})
                })
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const isValid = validateSignUp();
        if (isValid) {
            axios.post('auth/signup', userSignUp)
                .then(() => {
                    setUserSignUp({
                        username: '',
                        email: '',
                        password: ''
                    })
                    setActive('container')
                    setUserSignIn({email: userSignUp.email, password: userSignUp.password})
                })
                .catch((err) => {
                    setActive('container right-panel-active')
                    const {msg} = err.response.data;
                    setValidateSignUpMsg({password: msg})
                })
        }
    }

    const validateSignIn = async () => {
        const msg = {};
        if (isEmpty(userSignIn.email)) {
            msg.email = '* Please input your email *'
        }
        if (isEmpty(userSignIn.password)) {
            msg.password = '* Please input your password *'
        }
        if (!isEmpty(userSignIn.email) && !isEmpty(userSignIn.password)) {
            axios.post('auth/signin', userSignIn)
                .catch(() => {
                    msg.password = '* Wrong email or password *'
                })
        }
        setValidateSignInMsg(msg)
        return Object.keys(msg).length <= 0;
    }

    const validateSignUp = async () => {
        const msg = {};
        if (isEmpty(userSignUp.email)) {
            msg.email = '* Please input your email *'
        }
        if (isEmpty(userSignUp.password)) {
            msg.password = '* Please input your password *'
        }
        // setValidateSignUpMsg(msg)
        return Object.keys(msg).length <= 0;
    }

    const signInWithFireBase = async (auth, provider) => {
        signInWithPopup(auth, provider)
            .then((resultFromAuthProvider) => {
                axios.post(`auth/firebase`, {
                    username: resultFromAuthProvider.user.displayName || "Name Not Stated",
                    email: resultFromAuthProvider.user.email || resultFromAuthProvider.user.providerData[0].email,
                    uid: resultFromAuthProvider.user.uid,
                    avatarUrl: resultFromAuthProvider.user.photoURL || DEFAULT_USER_URL
                }).then(resultFromBEAloha => {
                    const [key, value] = resultFromBEAloha.data.token.split(' ')
                    localStorage.setItem(key, JSON.stringify(value));
                    dispatch(UserLoginWithFireBase(resultFromBEAloha.data.currentUser))
                    navigate("/transactions")
                })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <motion.div className='login'
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    variants={Variants.variant1}>
            <div className={active}>
                <div className="form-container sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <Link to="" onClick={() => signInWithFireBase(auth, faceBookAuthProvider)}
                                  className="social"><i className="fab fa-facebook-f"/></Link>
                            <Link to="" onClick={() => signInWithFireBase(auth, googleAuthProvider)} className="social"><i
                                className="fab fa-google-plus-g"/></Link>
                            <Link to="" onClick={() => signInWithFireBase(auth, githubAuthProvider)} className="social"><i
                                className="fab fa-linkedin-in"/></Link>
                        </div>
                        <span style={{margin: '10px'}}>or use your email for registration</span>
                        <input type="text" name='username' placeholder="Name" onChange={handleChangeSignUp}/>
                        {validateSignUpMsg.username &&
                            <p className='text-red-500 text-xs italic'>{validateSignUpMsg.username}</p>}
                        <input type="email" name='email' placeholder="Email" onChange={handleChangeSignUp}/>
                        {validateSignUpMsg.email &&
                            <p className='text-red-500 text-xs italic'>{validateSignUpMsg.email}</p>}
                        <input type="password" name='password' placeholder="Password" onChange={handleChangeSignUp}/>
                        {validateSignUpMsg.password &&
                            <p className='text-red-500 text-xs italic'>{validateSignUpMsg.password}</p>}
                        <button style={{marginTop: '10px'}} onClick={handleSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <Link to="" onClick={() => signInWithFireBase(auth, faceBookAuthProvider)}
                                  className="social"><i className="fab fa-facebook-f"/></Link>
                            <Link to="" onClick={() => signInWithFireBase(auth, googleAuthProvider)} className="social"><i
                                className="fab fa-google-plus-g"/></Link>
                            <Link to="" onClick={() => signInWithFireBase(auth, githubAuthProvider)} className="social"><i
                                className="fab fa-github"/></Link>
                        </div>
                        <span style={{margin: '10px'}}>or use your account</span>
                        <input type="email" name='email' placeholder="Email" onChange={handleChangeSignIn}
                               value={userSignIn.email}/>
                        {validateSignInMsg.email &&
                            <p className='text-red-500 text-xs italic'>{validateSignInMsg.email}</p>}
                        <input type="password" name='password' placeholder="Password" onChange={handleChangeSignIn}
                               value={userSignIn.password}/>
                        {validateSignInMsg.password &&
                            <p className='text-red-500 text-xs italic'>{validateSignInMsg.password}</p>}
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
        </motion.div>
    );
};

export default LoginPage;