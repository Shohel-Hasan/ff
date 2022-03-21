import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
import './UserProfile.css'
import man from '../../Images/man.jpg'
import img from '../../assets/re/cover_photo.svg'
import { Link, useParams } from 'react-router-dom';
import camera from '../../Images/camera.svg'




const UserProfile = (props) => {

    const [users, setUsers] =useState([]);
    const [userGeneralInfo, setUserGeneralInfo] = useState({});
    const param = useParams();



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

    // getting user Info
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/user/${localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        .then(res =>{
        return res.json()
        })
        .then(data => setUsers(data))
    }, [localStorage.getItem('id')])

    console.log(users);

    props.triggerCheckLoggedIn();

    const BASE_URL = "http://127.0.0.1:8000"

    return (
        
        
        <Container fluid className='shadow profile_conatiner'>
            <Row className='justify-content-center align-items-center'>
                   
                {/* -------------Banner Image Section---------------- */}

                <Col md={8}>
                <div className=''>
                   <div class="container">
                       <span class="wrapper">
                           <input  type="file" name="image_src" id="image_filed" />
                       </span>
                   </div>

                <img
                    style={{ borderBottomRightRadius:'8px', borderBottomLeftRadius:'8px', objectFit: 'cover' }}
                    className="profile-cover img-fluid"
                    src={`${BASE_URL}${userGeneralInfo.cover_pic}`}
                    alt=''
                />
                </div>

                    <div className='text-center'>
                        <img
                           style={{backgroundColor: "#ced0d4", marginTop: '-50px', objectFit: 'cover' }}
                           className="rounded-circle p-1"
                           src={`${BASE_URL}${userGeneralInfo.profile_pic}`}
                           width="150px"
                           height="150px"
                           alt=''
                       /> 
                        {/* Upolad image section */}

                        <div class="container">
                            <span class="user-profile-wrapper user-profile ">
                                <input  type="file" name="image_src" id="user-profile-image_filed" />
                            </span>
                        </div>
                        
                        <div>
                            <h1 className="name" style={{ color: "#1877f2" }}> {localStorage.getItem('first_name')} </h1>
                            <h6 className="fw-bold" style={{ color: "#1877f2" }}>{users.profession}</h6>
                            {/* <h6 className="fw-bold" style={{ color: "#1877f2" }}>BUBT</h6> */}
                            <button  
                                className="bg-primary rounded-pill btn-sm btn text-white"
                            >Follow <span><i className="plus-icon fa fa-plus"></i></span></button>
                        </div>
                    </div>

       
                </Col>
                <hr
                        style={{
                        color: "#7d7f85",
                        backgroundColor: "#7d7f85",
                        height: "1px",
                        margin: " auto",
                        width: "67%",
                        marginTop: "15px",
                        }}
                    />
            </Row>

        <Row className="cover-shadow-effect mb-3 justify-content-center nav-border">
            <Col md={8} className=''>
            <div className="col-md-12">
                <div id="content" className="content content-full-width">
                <div className="profile">
                    <div className="profile-header">
                    <ul className="profile-header-tab nav nav-tab">
                        <li>
                        <Nav className='border-bottom-2'>
                            <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Post"
                           
                            >
                            <NavDropdown.Item href="thoughtPost">
                                Thought Post
                            </NavDropdown.Item>
                            <NavDropdown.Item href="summaryPost">
                                Research Summary
                            </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </li>
                        <li className="nav-item">
                        <Link
                            to="name/about"
                            className="nav-link NavLink"
                            data-toggle="tab"
                        >
                            About
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link
                            to="/"
                            className="nav-link NavLink"
                            data-toggle="tab"
                        >
                            Group
                        </Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </Col>
      
        </Row>
    </Container>
    );
};

export default UserProfile;