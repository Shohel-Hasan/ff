import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './MyCourses.css'
import { Link, useParams } from 'react-router-dom';
import profile from "../../Images/user.jpg";
import course_1 from "../../Images/course-1.jpg";
import course_2 from "../../Images/course-2.jpg";
import course_3 from "../../Images/course-3.jpg";



const MyCourses = (props) => {
  props.triggerCheckLoggedIn();

  const [myCourses, setMyCourses] = useState([]);
  const [noCourses, setNoCourses] = useState([]);
  const [users, setUsers] =useState([]);
  const [userGeneralInfo, setUserGeneralInfo] = useState({});

  console.log("nocourses: ", userGeneralInfo)



  const userId = localStorage.getItem('id')
  const groupId = useParams();

  console.log(userId)
// getting user general Info
    useEffect(() => {
        fetch(`http://18.211.204.106/user/user-general-info/${localStorage.getItem('id')}`, {
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
      fetch(`http://18.211.204.106/user/${localStorage.getItem('id')}`, {
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


  useEffect(() => {
    fetch(`http://18.211.204.106/course/enrollment/all/`, {
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
          setMyCourses(data.filter(d => d.student=== +localStorage.getItem('id')))
          console.log(myCourses)
        }
    })
}, [localStorage.getItem('id')])

const BASE_URL = "http://18.211.204.106"


  return (
    <div>
      <Container className='my_course_container'>
       <Row className='justify-content-center align-items-center'>
          <img style={{ borderBottomRightRadius:'8px', borderBottomLeftRadius:'8px', objectFit: 'cover', width:'850px', height:'320px' }} className='' src={`${BASE_URL}${userGeneralInfo.cover_pic}`}/>
          <h4 style={{color:"blue"}} className='text-center mt-4'> {users.first_name}</h4>
          <h4 style={{color:"blue"}} className='text-center mt-2'> {users.profession}</h4>
       </Row>

       { myCourses.length===0 && 
           <Col md={8} className="d-flex justify-content-center my-4" >
            <h4>you don't enroll any course yet</h4>
           </Col>
       }

      { myCourses.map(course => <Row key={course.id} className='d-flex justify-content-center'>
          <Col md={8} >
            <Row className='mt-4 shadow border custom-radius bg-white'>
              <Col sm={3} className="d-flex justify-content-center align-items-center my-2">
              <img style={{"height": "80px", "width": "80px", "borderRadius": "50%"}}  src={`${BASE_URL}${course.course_cover_pic}`} />

              </Col>
              <Col  sm={9} className="d-flex align-items-center my-2"> 
                <h6 style={{color:"blue"}} className='my-3'> <Link to={`/course/${course.id}/details`}>{course.course_name}</Link> </h6>
              </Col>
            </Row>
          
          </Col>
       </Row>
       ) }

        
      </Container>
    </div>
  );
};

export default MyCourses;