import React, { useEffect, useState } from 'react';
import {Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AllCourses.css'
import img from '../../Images/man.jpg'

const AllCourses = (props) => {
    props.triggerCheckLoggedIn();

    const [allCourses, setAllCourses] = useState([]);
    const [noCourses, setNoCourses] = useState([]);
    const [searchCourses, setSearchCourses] = useState([]);
    const [noSearchCourses, setNoSearchCourses] = useState([]);
    
    
    const searchCoursePost = (e) =>{
        e.preventDefault();
        const searchText = e.target.value;

        fetch(`http://127.0.0.1:8000/course/search-course?name=${searchText}`, {
            method: 'GET',
            headers: {
                "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message) {
                    setNoSearchCourses([{data: data.message}]
                )
                } else {
                    setSearchCourses(data)
                    setAllCourses([])
                }
            })
            .catch(error => console.log(error))
    }
    


    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/course/all`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        .then(res =>{
        return res.json()
        })
        .then(data => {
            if (data.message) {
                setNoCourses([{data: data.message}]
            )
            } else {
                setAllCourses(data)
            console.log(data)
            }
        })
    }, [])
    
const BASE_URL = "http://127.0.0.1:8000"

    return (
        <Container className='all_courses'>
            <Row>
                <Col>
                    {/* Search Section Start */}
                    <div className="nav_left">
                        <div className="nav_search mt-4">
                            <i className="material-icons">search</i>
                            <input type="text" className='mx-2' placeholder="Search a class" onChange={searchCoursePost} />
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Search Section End */}

               {/* Nested Routing Section Start */}


                {/* <div className='d-flex justify-content-around mt-5'>
                    <div className='fb-box-shadow p-3 mx-1'><Link className='text-decoration-none'  to="#">Create course</Link></div>
                    <div className='fb-box-shadow p-3 mx-1'><Link className='text-decoration-none' to="#">Course teacher</Link></div>
                    <div className='fb-box-shadow p-3 mx-1'><Link className='text-decoration-none' to="#">Course student</Link></div>
                </div>
                 <hr
                    style={{
                    color: "#7d7f85",
                    backgroundColor: "#7d7f85",
                    height: "2px",
                    margin: " auto",
                    width: "90%",
                    marginTop: "15px",
                    }}
                /> */}
             {/* Nested Routing Section End */}

              {/* Notification Section Start */}
                    {/* <div className='d-flex justify-content-around mt-3 flex-wrap'>
                        <div><Button className='mx-1 mt-2'> Following <Badge bg="danger">9</Badge>
                        <span className="visually-hidden">unread messages</span></Button>
                        </div>
                        <div><Button className='mx-1 mt-2'> Like <Badge bg="danger">9</Badge>
                        <span className="visually-hidden">unread messages</span></Button>
                        </div>
                        <div><Button className='mx-1 mt-2'> Comment <Badge bg="danger">9</Badge>
                        <span className="visually-hidden">unread messages</span></Button>
                        </div>
                        <div><Button className='mx-1 mt-2'> Share <Badge bg="danger">9</Badge>
                        <span className="visually-hidden">unread messages</span></Button>
                        </div> 
                    </div>
                        <hr
                        style={{
                        color: "#1877F2",
                        backgroundColor: "#1877F2",
                        height: "2px",
                        margin: " auto",
                        width: "90%",
                        marginTop: "15px",
                        }}
                    /> */}
            {/* Notification Section End */}


            {/* Course Info. Section Start */}

            
            {searchCourses && searchCourses.map(course=> <Row key={course.id} className='mt-5'>
                <Col md={4}>
                    <div>
                        <img className=' profile-img img-fluid' src={`${BASE_URL}${course.cover_pic}`} alt="Course Cover" />
                    </div>
                </Col>

                <Col md={8}>        
                    <div className='mt-2 d-flex justify-content-between'>
                        <div>
                            <p className='fw-bold m-0 p-0'>{course.name}</p>
                            <small>{course.created_date}</small>
                        </div>
                        <Link to={`/course/${course.id}/details`}><Button size="sm">Enroll +</Button></Link>
                    </div>
                    <div className='mt-4 '>
                        <small>Course Topic:{course.course_topic} </small> <br/>
                        <small>Course Start date: {course.start_date} </small> <br/>
                        <small>Course Start date: {course.end_date} </small> <br/>
                        <small>Course Enroll Start date: {course.course_enroll_start_date} </small> <br/>
                        <small>Course Enroll Start date: {course.course_enroll_end_date} </small>
                    </div>
                </Col>
               
            {/*------ Like, Comment, Share------ */}
                <hr className='mt-4' style={{color: "#1877F2", backgroundColor: "#1877F2", height: "1px", margin: " auto", width: "95%" }}/>
                <Col >
                         <div className="fb-card-actions-holder">
                            <div className="fb-card-actions d-flex justify-content-around">
                                <div className="fb-btn-holder">
                                <Button className='text-primary' variant="outline-light"><i className="fa fa-thumbs-up"></i> Like</Button>
                                </div>
                                <div className="fb-btn-holder">
                                <Button className='text-primary' variant="outline-light"><i className="far fa-comment-alt"></i> Comment</Button>
                                </div>
                                <div className="fb-btn-holder">
                                <Button className='text-primary' variant="outline-light"><i className="fa fa-share-square"></i> Share</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                <hr  style={{color: "#1877F2", backgroundColor: "#1877F2", height: "1px", margin: " auto", width: "95%" }}/>
            {/*------------ Like, Comment, Share -----------*/}
                                        
            </Row>)}


            {allCourses.map(course=> <Row key={course.id} className='mt-5'>
                <Col md={4}>
                    <div>
                        <img className=' profile-img img-fluid' src={`${BASE_URL}${course.cover_pic}`} alt="Course Cover" />
                    </div>
                </Col>
                <Col md={8}>        
                    <div className='mt-2 d-flex justify-content-between'>
                        <div>
                            <p className='fw-bold m-0 p-0'>{course.name}</p>
                            <small>{course.created_date}</small>
                        </div>
                        <Link to={`/course/${course.id}/details`}><Button size="sm">Enroll +</Button></Link>
                    </div>
                    <div className='mt-4 '>
                        <small>Course Topic:{course.course_topic} </small> <br/>
                        <small>Course Start date: {course.start_date} </small> <br/>
                        <small>Course Start date: {course.end_date} </small> <br/>
                        <small>Course Enroll Start date: {course.course_enroll_start_date} </small> <br/>
                        <small>Course Enroll Start date: {course.course_enroll_end_date} </small>
                    </div>
                </Col>
                   
            {/*------ Like, Comment, Share------ */}
            <hr className='mt-4' style={{color: "#1877F2", backgroundColor: "#1877F2", height: "1px", margin: " auto", width: "95%" }}/>
                <Col >
                         <div className="fb-card-actions-holder">
                            <div className="fb-card-actions d-flex justify-content-around">
                                <div className="fb-btn-holder">
                                <Button className='text-primary' variant="outline-light"><i className="fa fa-thumbs-up"></i> Like</Button>
                                </div>
                                <div className="fb-btn-holder">
                                <Button className='text-primary' variant="outline-light"><i className="far fa-comment-alt"></i> Comment</Button>
                                </div>
                                <div className="fb-btn-holder">
                                <Button className='text-primary' variant="outline-light"><i className="fa fa-share-square"></i> Share</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                <hr  style={{color: "#1877F2", backgroundColor: "#1877F2", height: "1px", margin: " auto", width: "95%" }}/>
            {/*------------ Like, Comment, Share -----------*/}          
            </Row>)}


{/* 
                    <Row className='pt-4 mt-5'>
                        
                        <Col>
                            <div className='d-flex'>
                            <div>
                                <img className='rounded profile-img img-fluid' src={img} alt="Course Cover" />
                            </div>
                            <div className='mx-2'>
                                <p className='fw-bold'>Lorem ipsum dolor sit amet.</p>
                               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod hic repellat vero perspiciatis animi eum, <br/> cupiditate, consequatur dolor eos nostrum blanditiis dicta dolore magnam illum.</p>
                            </div>
                            <div>
                                <Button size="sm">Follow +</Button>
                            </div>
                               
                            </div>
                        </Col>
                    <hr
                    style={{
                    color: "#1877F2",
                    backgroundColor: "#1877F2",
                    height: "2px",
                    margin: " auto",
                    width: "90%",
                    marginTop: "15px",
                    }}
                /> */}
                      
                        {/* <Col md='12' className='mt-3 pb-3'>
                             <div className="fb-card-actions-holder">
                                <div className="fb-card-actions d-flex justify-content-around">
                                    <div className="fb-btn-holder">
                                        <a className='a-link' href="/"><i className="fa fa-thumbs-up"></i> Like</a>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <a className='a-link' href="/"><i className="far fa-comment-alt"></i> Comment</a>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <a className='a-link' href="/"><i className="fa fa-share-square"></i> Share</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        </Row>
                    </Col> */}
                   
        </Container>
    );
};

export default AllCourses;