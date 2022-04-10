import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GroupProfile from '../GroupProfile/GroupProfile';

const GroupCourse = () => {
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
    


    //getting all courses data
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/course/all/`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                setNoCourses([{data: data.message}]
            )
            } else {
                setAllCourses(data)
                console.log(data)
            }
        })
    }, [localStorage.getItem('id')])
    
const BASE_URL = "http://127.0.0.1:8000"



    return (
        <Container>
      
      {allCourses.map(course=> <Row key={course.id} className='py-2'>
                <Col md={4}>
                    <div>
                        <img style={{objectFit: 'cover'}} className='profile-img img-fluid' src={`${BASE_URL}${course.cover_pic}`} alt="Course Cover" />
                    </div>
                </Col>
                <Col md={8}>        
                    <div className='mt-2 d-flex justify-content-between'>
                        <div>
                            <p className='fw-bold m-0 p-0'><Link to={`/course/${course.id}/details`}>{course.name}</Link></p>
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
                                <span className='text-primary' variant="outline-light"><i className="fa fa-thumbs-up"></i> <span>10</span> Like</span>
                                </div>
                                <div className="fb-btn-holder">
                                <span className='text-primary' variant="outline-light"><i className="far fa-comment-alt"></i> <span>10</span> Comment</span>
                                </div>
                                <div className="fb-btn-holder">
                                <span className='text-primary' variant="outline-light"><i className="fa fa-share-square"></i> <span>10</span> Share</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                <hr  style={{color: "#1877F2", backgroundColor: "#1877F2", height: "1px", margin: " auto", width: "95%" }}/>
            {/*------------ Like, Comment, Share -----------*/}          
            </Row>)}
            

        </Container>
    );
};

export default GroupCourse;