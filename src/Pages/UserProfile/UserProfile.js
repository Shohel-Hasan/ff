import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Nav, NavDropdown, Row, Modal, Button } from 'react-bootstrap';
import './UserProfile.css'
import man from '../../Images/man.jpg'
import img from '../../assets/re/cover_photo.svg'
import { Link, Outlet, useParams } from 'react-router-dom';
import camera from '../../Images/camera.svg'
import { height } from '@mui/system';




const UserProfile = (props) => {

    const [users, setUsers] =useState([]);
    const [userGeneralInfo, setUserGeneralInfo] = useState({});
    const userId = useParams();
    console.log(userId.userId)
    const [coverPic, setCoverPic] = useState();
    const [profilePic, setProfilePic] = useState();

    const [show, setShow] = useState(false);
    const [coverPicModal, setCoverPicModal] = useState(false);
    const [modal, setModal] = useState(false);
    const handleClose = () => setShow(false);

    const [following, setFollowing] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);


    // getting user general Info
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/user/user-general-info/${userId.userId}`, {
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
    }, [userId.userId])

    console.log(userGeneralInfo)

    // getting user Info
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/user/${userId.userId}`, {
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
    }, [userId.userId])

    console.log(users);

    props.triggerCheckLoggedIn();


    // update users cover pic 
    const updateUserCoverPic = () => {
        // e.preventDefault();
        const newData = new FormData();
        newData.append('cover_pic', coverPic)
        console.log("i am here...", newData)
        console.log("coverPic...", coverPic)
        setCoverPicModal(false)

        fetch(`http://127.0.0.1:8000/user/user-general-info-update/${localStorage.getItem('id')}`, {
        // mode: 'cors',
        method: "PATCH",
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`, 
        },
        body: newData
        })
        .then(res=> {
            if (res.status===200){
                fetch(`http://127.0.0.1:8000/user/user-general-info/${localStorage.getItem('id')}`, {
                    method: 'GET',
                    headers: {
                        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }})
                    .then(res => res.json()
                    )
                    .then(data => setUserGeneralInfo(data))
            }
        })
        // .then(data=> console.log(data))
            
        .catch(error => console.log(error))
    }

    
    // update users cover pic 
    const updateUserProfilePic = () => {
        // e.preventDefault();
        const newData = new FormData();
        newData.append('profile_pic', profilePic)
        console.log("i am here...", newData)
        console.log("profilePic...", profilePic)
        setShow(false)

        fetch(`http://127.0.0.1:8000/user/user-general-info-update/${localStorage.getItem('id')}`, {
        method: "PATCH",
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`, 
        },
        body: newData
        })
        .then(res=> {
            if (res.status===200){
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
            }

        })
        .catch(error => console.log(error))
    }


    // follow creating header
    const followCreateHeader = {
        // mode: 'no-cors',
        method: 'POST',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            following_id : userId.userId,
        })
    };
    // follow create api
    const followCreate = event => {
        fetch('http://127.0.0.1:8000/social/create-following/', followCreateHeader)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                fetch(`http://127.0.0.1:8000/social/following/${localStorage.getItem('id')}`, {
                    method: 'GET',
                    headers: {
                        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }})
                    .then(res => res.json())
                    .then(data => {console.log(data)
                        const following_ins = data.find(d=> d.following_id===+userId.userId)
                        console.log(following_ins.following_id)
                        if (following_ins.following_id===+userId.userId) {
                            setIsFollowing(true);
                        }
                    })
            })
            .catch(error => console.log(error))
    }

    // getting is follow
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/social/following/${localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        .then(res => res.json())
        .then(data => {console.log(data)
            const following_ins = data.find(d=> d.following_id===+userId.userId)
            console.log(following_ins.following_id)
            if (following_ins.following_id===+userId.userId) {
                setIsFollowing(true);
            }
        })
    }, [userId.userId])

    const BASE_URL = "http://127.0.0.1:8000"

    return (
        <Container fluid className='profile_conatiner'>
            <Row className='justify-content-center align-items-center'>
                {/* -------------Banner Image Section---------------- */}

                <Col md={8}>
                    
                    { localStorage.getItem('id')===userId.userId &&  <div className="container">
                        <span className="wrapper">
                            <input name="image_src" id="image_filed" onClick={() => setCoverPicModal(true)}/>
                        </span>
                    </div>}

                    <Modal
                        show={coverPicModal}
                        onHide={() => setCoverPicModal(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                        <Modal.Header closeButton >
                            <div className=''>
                                <p className='title'>Upload Cover Picture</p>
                            </div>
                        </Modal.Header>
                        <Modal.Body className="fb-box-shadow">
                        <Form >
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Cover Picture</Form.Label>
                                <Form.Control  onChange={e => setCoverPic(e.target.files[0])}  type="file" />
                            </Form.Group>
                            <Button className="mx-2" onClick={()=>updateUserCoverPic()} variant="primary">Upload</Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Form>  
                        
                            
                        </Modal.Body>
                    </Modal>

                    {userGeneralInfo.cover_pic!==null && <div className='text-center'>
                        <img
                            style={{ borderBottomRightRadius:'8px', borderBottomLeftRadius:'8px', objectFit: 'cover', width:'850px', height:'320px' }}
                            className="img-fluid"
                            src={`${BASE_URL}${userGeneralInfo.cover_pic}`}
                            alt='upload your cover pic'
                        />
                    </div>}
                    {userGeneralInfo.cover_pic===null && <div className='text-center'>
                        <img
                            style={{ borderBottomRightRadius:'8px', borderBottomLeftRadius:'8px', objectFit: 'cover', width:'850px', height:'320px' }}
                            className="img-fluid"
                            src={img}
                            alt='upload your cover pic'
                        />
                    </div>}

                    <div className='text-center'>
                        {userGeneralInfo.profile_pic!==null && <img
                           style={{backgroundColor: "#ced0d4", marginTop: '-50px', objectFit: 'cover' }}
                           className="rounded-circle p-1"
                           src={`${BASE_URL}${userGeneralInfo.profile_pic}`}
                           width="150px"
                           height="150px"
                           alt='upload your profile pic'
                        /> }

                         {userGeneralInfo.profile_pic===null && <img
                           style={{backgroundColor: "#ced0d4", marginTop: '-50px', objectFit: 'cover' }}
                           className="rounded-circle p-1"
                           src={man}
                           width="150px"
                           height="150px"
                           alt='upload your profile pic'
                        /> }

                        {/* Upolad image section */}

                        {localStorage.getItem('id')===userId.userId && <div className="">
                            <span className="user-profile ">
                                <input onClick={() => setShow(true)} name="image_src" id="user-profile-image_filed" />
                            </span>
                        </div>}

                        <Modal
                            show={show}
                            onHide={() => setShow(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton >
                                <div className=''>
                                    <p className='title'>Upload Profile Picture</p>
                                </div>
                            </Modal.Header>
                            <Modal.Body className="fb-box-shadow">
                            <Form >
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Form.Control  onChange={e => setProfilePic(e.target.files[0])}  type="file" />
                                </Form.Group>
                                <Button className="mx-2" onClick={()=>updateUserProfilePic()} variant="primary">Upload</Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Form>
                            </Modal.Body>
                        </Modal>
                    
                        <div style={{marginTop: '-10px'}}>
                            <h1 className="name" style={{ color: "#1877f2" }}> {users.first_name} </h1>
                            <h6 className="fw-bold" style={{ color: "#1877f2" }}>{users.profession}</h6>
                           {localStorage.getItem('id')!==userId.userId && !isFollowing && <button className="bg-primary rounded-pill btn-sm btn text-white" onClick={()=>followCreate()}>Follow <span>+</span></button>}
                           {isFollowing && <button className="bg-primary rounded-pill btn-sm btn text-white">Following</button>}
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
                                to="user-profile-post"
                                className="nav-link NavLink"
                                data-toggle="tab"
                            >
                                About
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link
                            to="/my-groups"
                            className="nav-link NavLink"
                            data-toggle="tab"
                        >
                            My Group
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link
                            to="/my-courses"
                            className="nav-link NavLink"
                            data-toggle="tab"
                        >
                            My Course
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link
                            to="user-following"
                            className="nav-link NavLink"
                            data-toggle="tab"
                        >
                            User Following
                        </Link>
                        </li>
                        <li className="nav-item">
                        <Link
                            to="user-follow-us"
                            className="nav-link NavLink"
                            data-toggle="tab"
                        >
                            Follow Us
                        </Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </Col>
      
        </Row>
        <Outlet/>
    </Container>
    );
};

export default UserProfile;