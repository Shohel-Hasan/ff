import { useEffect, useRef, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import image from '../assets/re/Logo_update.svg';
import style from '../styles/Login.module.css';
import Overlay from './Overlay';
import Registration from './Registration';

export default function Login() {
    const navigate = useNavigate();
    const [overlay, setOverlay] = useState(false);
    const [mailVerification, setMailVerification] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    // state for forget password and reset password
    const [mailForVerification, setMailForVerification] = useState('');
    const [newPassWord, setNewPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState();

    // states for login
    const [username, setUsername] = useState('');
    const [passForLogin, setPassForLogin] = useState('');

    const forgotPassModal = useRef(0);

    // const url = "https://researchrider1.pythonanywhere.com"

    // login function
    const loginHeader = {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: username ,
            password: passForLogin
        })
    };

    const loginHeader2 = {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: localStorage.getItem('auth_token') ,
        })
    };


    useEffect(() => {
        if (localStorage.auth_token) {
            fetch(`http://127.0.0.1:8000/user/token-check`, loginHeader2)
                .then(response => {
                    // console.log(`http://127.0.0.1:8000/user/token-check`)
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.log(error))
        } else {
            
        }
    }, [])


    const handleLogin = event => {
        event.preventDefault();

        // fetch('http://127.0.0.1:8000/user/signin', loginHeader)
        // fetch(`${url}/user/signin`, loginHeader)
        fetch(`http://127.0.0.1:8000/user/signin`, loginHeader)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.logged_in) {
                    window.localStorage.setItem('id', data.data.id);
                    window.localStorage.setItem('first_name', data.data.first_name);
                    window.localStorage.setItem('last_name', data.data.last_name);
                    window.localStorage.setItem('email', data.data.email);
                    window.localStorage.setItem('auth_token', data.data.token);
                    console.log("Logged in");
                    navigate(`/user/${localStorage.id}`);
                    setShowA(false);
                } else {
                    setShowA(true);
             
                    
                }
            })
            .catch(error => console.log(error))
    }


    const openModal = () => {
        setOverlay(true);
        setShowSignup(true);
    }

    const closeModal = () => {
        setOverlay(false);
        setShowSignup(false);
    }



    const openForgotPass = () => {
        setOverlay(true);
        setMailVerification(false);
        forgotPassModal.current.style.position = 'absolute';
        forgotPassModal.current.style.zIndex = '2000';
    }

    const closeForgotPass = () => {
        setOverlay(false);
        forgotPassModal.current.style.position = 'fixed';
        forgotPassModal.current.style.zIndex = '-2000';
    }

    const forgetPassHeader = {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: mailForVerification
        })
    };

    const handleMailVerification = (event) => {
        event.preventDefault();

        if (mailForVerification === '') {
            alert('Enter a valid email!')
        }

        // **** process for mail verification request to server goes here **** //
        fetch('http://127.0.0.1:8000/user/forget-password', forgetPassHeader)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message) {
                    setMailVerification(true)
                } else {
                    setMailVerification(false);
                    alert("email not matched. please enter your correct email");
                }
            })
            .catch(error => alert(error))

        setMailVerification(true);
    }

    const resetPassHeader = {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: mailForVerification,
            verification_code: verificationCode,
            password: newPassWord
        })
    };
    const handlePassChange = (event) => {
        event.preventDefault();

        // **** process for changing password request to server goes here **** //
        fetch('http://127.0.0.1:8000/user/reset-password', resetPassHeader)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message){
                    alert("password changed successfully.")
                    closeForgotPass();
                } else {
                    alert("wrong email or verification code.")
                }
            })
            .catch(error => alert(error))
        closeForgotPass();
    }

    return (
        <>
        <div className={`container ${style.main_container}`}>
            {/* <ChangepassForm /> */}
            { overlay && <Overlay /> }
            <div className={`${style.login_box} d-flex justify-content-between align-items-center flex-wrap`}>
                <div className={`${style.image} d-flex flex-column justify-content-center align-items-center`}>
                    <img style={{objectFit: 'cover'}} src={image} alt="logo" />
                    <h5 className={`${style.slogan}`}>Grow up being a researcher</h5>
                </div>

                <div className={`${style.side_bar}`}></div>

                <div className={`${style.form}`}>
                    <div className={`${style.form_box} ${style.fb_box_shadow} d-flex flex-column align-items-center`}>

                       {/* login form */}

                        <form onSubmit={handleLogin} className={`form-group ${style.form_box}  d-flex flex-column align-items-center`}>
                            <input onChange={e => setUsername(e.target.value)} value={username} type="email" className='form-control' placeholder='Email address or Phone Number' required  />
                            <input onChange={e => setPassForLogin(e.target.value)} value={passForLogin} type="password" className='form-control' placeholder='Password'  required />
                            <Toast className='toast' show={showA} onClick={toggleShowA}>
                               <Toast.Body className='text-danger'>invalid credentials...</Toast.Body>
                            </Toast>
                            <input type="submit" value='Login' className={`${style.button}`} />
                            <span onClick={openForgotPass} className={`${style.forgot_pass}`}>Forgotten Password?</span>
                            <div className={`${style.bar}`}></div>
                        </form>
                        <button onClick={openModal} className={`${style.button} ${style.register}`}>Create New Account</button>
                    </div>
                </div>
            </div>

            {/* registration form start */}
            { showSignup && <Registration closeModal={closeModal} />}

            {/* forgor pass form start */}
            <div ref={forgotPassModal} className={`d-flex flex-column shadow ${style.forgot_pass_box}`}>
                <div className='d-flex align-items-center justify-content-between'>
                    <h3>Forgotten Password?</h3>
                    <i onClick={closeForgotPass} className="material-icons" style={{cursor: 'pointer'}}>close</i>
                </div>

                <div className={`${style.reg_bar}`}></div>

                { !mailVerification ? <div className='my-3'>Enter your email address to reset your password</div> : <div className='my-3'>Enter your new password to change your password</div> }

                <form action="" className={`form-group`}>
                    { !mailVerification ? <input type="email" onChange={(e) => setMailForVerification(e.target.value)} value={mailForVerification} className={`form-control my-2`} placeholder='Your Email'/> : <div> <input type="number" onChange={(e) => setVerificationCode(e.target.value)} value={verificationCode} className={`form-control my-2`} required placeholder='Verification Code'/> <input type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassWord} className={`form-control my-2`} required placeholder='Set New Password'/> </div> }

                    <div className='d-flex justify-content-center align-items-center my-3'>
                        { !mailVerification ? <input onClick={handleMailVerification} type="submit" className={`${style.register} ${style.button} verification`} /> : <input onClick={handlePassChange} type="submit" className={`${style.register} ${style.button} done`} /> }
                    </div>
                </form>
            </div>
            {/* forgor pass form end */}
        </div>

        {/* <div>
            <Footer />
        </div> */}
        </>
    )
}