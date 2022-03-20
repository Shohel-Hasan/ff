import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
import './UserProfile.css'
import man from '../../Images/man.jpg'
import img from '../../assets/re/cover_photo.svg'
import { Link, useParams } from 'react-router-dom';
import camera from '../../Images/camera.svg'




const UserProfile = (props) => {

    const [users, setUsers] =useState([]);
    const param = useParams();
    console.log(param.userId);



//   ------ For API Integration --------  //

    useEffect(() =>{
        fetch('')
        .then((res) => res.json())
        .then((data) =>setUsers(data))
    },[]);

    // console.log(users);

    props.triggerCheckLoggedIn();


    return (
        
        
        <Container fluid className='shadow profile_conatiner'>
            <Row className='justify-content-center'>
                   
                {/* -------------Banner Image Section---------------- */}

                <Col md={8}>
                <div className=''>
                    <div className='text-end cover-edit'>
                         <label for="file-input">
                             <img src={camera} alt=''/>
                          </label>
                    </div>
                <img
                    style={{ borderBottomRightRadius:'8px', borderBottomLeftRadius:'8px' }}
                    className="img-fluid"
                    src={img}
                    alt=''
                />
                </div>
                    <div className='text-center icon-container'>
                        <img
                           style={{backgroundColor: "#ced0d4", marginTop: '-50px', objectFit: 'cover' }}
                           className="rounded-circle p-1"
                           src={man}
                           width="150px"
                           height="150px"
                           alt=''
                       /> 

                       <div className="image-upload">
                            <label for="file-input">
                               <img src={camera} alt=''/>
                            </label>
                            <input id="file-input" type="file"/>
                        </div>
                        <div style={{marginTop:'-50px'}}>
                            <h1 className="name" style={{ color: "#1877f2" }}> {localStorage.getItem('first_name')} </h1>
                            <h6 className="fw-bold" style={{ color: "#1877f2" }}>Dept. of Economics</h6>
                            <h6 className="fw-bold" style={{ color: "#1877f2" }}>BUBT</h6>
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