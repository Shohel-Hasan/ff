
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import bar_horizontal from '../assets/bar_horizontal_icon.svg';
// import class_icon from '../assets/class_icon.svg';
// import group_icon from '../assets/group_icon.svg';
// import home_icon from '../assets/home_icon.svg';

import class_icon from '../assets/re/Classroom.svg';
import group_icon from '../assets/re/Group.svg';
import home_icon from '../assets/re/Home.svg';

import logo from '../assets/re/Navbar_Logo.svg';
import avatar from '../assets/man.jpg';
import notification_icon_filled from '../assets/re/Notice.svg';
import style from '../styles/Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';




export default function Navbar(props) {
  props.triggerCheckLoggedIn();
  const navigate = useNavigate();

  const hamburger = useRef(null);
  const [toggle1, setToggle1] = useState(false);
  const [userGeneralInfo, setUserGeneralInfo] = useState({});


  const sideNavPosition = "-100%";




  const toggleSideNav = () => {
    if (!toggle1) {
      hamburger.current.style.transform = "rotate(90deg)";
      setToggle1(true);
      sideNav.current.style.right = "0";
      setToggle(true)
    } else {
      hamburger.current.style.transform = "rotate(180deg)";
      setToggle1(false);
      sideNav.current.style.right = sideNavPosition;
      setToggle(false)
    }
  }

  const sideNav = useRef(null);
    const [toggle, setToggle] = useState(false);

    const toggleNav = () => {
        if (!toggle) {
            sideNav.current.style.right = "0";
            setToggle(true)
        } else {
            sideNav.current.style.right = sideNavPosition;
            setToggle(false)
        }
    }
    //--------------------------------------------------------//
 
        // getting user general Info
        useEffect(() => {
          fetch(`http://127.0.0.1:8000/user/user-general-info/${localStorage.getItem('id')}`, {
          method: 'GET',
          headers: {
              "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
              "Accept": "application/json",
              "Content-Type": "application/json"
          }})
          .then(res =>{
          return res.json()
          })
          .then(data => setUserGeneralInfo(data))
      }, [localStorage.getItem('id')])
      const BASE_URL = "http://127.0.0.1:8000"

  return (
    <div className={`${style.navbar_main_container} ${style.fb_box_shadow} d-flex flex-row justify-content-between`}>
      <div className={`${style.branding} d-flex flex-row justify-content-center align-items-center`}>
        <div className={`${style.logo} mx-1`}>
          <Link to='/home'><img style={{objectFit: 'cover', width:'45px', height:'45px'}} src={logo} alt='logo' /></Link>
        </div>
        <div style={{backgroundColor: 'rgb(213 228 251)'}} className={`${style.nav__search}`}>
          <i className="material-icons">search</i>
          <input  type="text" placeholder="Search Research Rider" />
        </div>
      </div>

      <div className={`${style.mid_section} d-flex flex-row justify-content-center align-items-center`}>
         <Link  to='/home'><img src={home_icon} className={`material-icons ${style.icons}`} alt='home' /></Link>
         <Link  to='/groups-home'><img src={group_icon} className={`material-icons ${style.icons}`} alt='home' /></Link>
         <Link  to="all-courses" ><img src={class_icon} className={`material-icons ${style.icons}`} alt='home' /></Link>
      </div>
      
      <div className={`${style.profile_section} d-flex flex-row justify-content-center align-items-center`}>
       {userGeneralInfo.profile_pic && <img src={`${BASE_URL}${userGeneralInfo.profile_pic}`} className={`${style.avatar}`} alt='home' />}
       {userGeneralInfo.profile_pic===null &&  <img src={avatar} className={`${style.avatar}`} alt='home' />}

        <img  src={notification_icon_filled} className={`${style.end_icons} ${style.notification_icon}`} alt='home' />
        <img ref={hamburger} src={bar_horizontal} onClick={toggleSideNav} className={`${style.end_icons} ${style.hamburger}`} alt='home' />
      </div>


      {/* sideNavbar */}

      <div ref={sideNav} className={`${style.main} ${style.sideNav_shadow} d-flex`}>
            <div className={`${style.container} d-flex align-items-center flex-column`}>
                <img className='my-3' src={logo} alt="" />
                <div className={`${style.links} d-flex flex-column justify-content-center align-items-center pb-3`}>
                    <Link style={{textDecoration:'none'}} to="/home" onClick={toggleNav}><p className='d-flex justify-content-center align-items-center '>Home</p></Link>
                    <Link style={{textDecoration:'none'}} to={`/user/${localStorage.getItem('id')}`} ><p className='d-flex justify-content-center align-items-center '>Dashboard </p></Link>
                    <Link style={{textDecoration:'none'}} to="my-groups" ><p className='d-flex justify-content-center align-items-center '>My-Groups</p></Link>
                    <Link style={{textDecoration:'none'}} to={`user/${localStorage.getItem('id')}/user-profile-post`}><p className='d-flex justify-content-center align-items-center'>Profile Post</p></Link>
                    {/* <Link style={{textDecoration:'none'}} to="create-course" ><p className='d-flex justify-content-center align-items-center text-decoration-none'>Create Course</p></Link> */}
                    {/* <Link style={{textDecoration:'none'}} to='course/:courseId/details'><p className='d-flex justify-content-center align-items-center text-decoration-none'>Single Course</p></Link> */}
                    {/* <Link style={{textDecoration:'none'}} to="user/:userId" ><p className='d-flex justify-content-center align-items-center text-decoration-none'>Update User Profile</p></Link> */}
                    <Button size='sm' onClick={() => {localStorage.clear(); navigate('/')}}>Logout </Button>
                </div>
            </div>
        </div>
    </div>
  )
}
