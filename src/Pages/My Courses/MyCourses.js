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

  console.log("nocourses: ", noCourses)



  const userId = localStorage.getItem('id')
  const groupId = useParams();

  console.log(userId)


  useEffect(() => {
    fetch(`http://127.0.0.1:8000/course/group/${groupId.groupId}/group-courses/`, {
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
          setMyCourses(data)
          console.log(data)
        }
       
    })
}, [groupId.groupId])
const BASE_URL = "http://127.0.0.1:8000"


  return (
    <div>
      <Container>
       <Row>

         <img  className='rounded-circle w-25  mx-auto mt-5' src={profile}/>
            <h4 style={{color:"blue"}} className='text-center mt-4'> Name: Md. Saddam Hossain</h4>
            <h4 style={{color:"blue"}} className='text-center mt-2'> Designation: Teacher</h4>
       </Row>

       { noCourses && noCourses.map((noCourse, index) => <Row key={index} className="justify-content-center my-4" >
           <Col md={8} className="d-flex justify-content-center my-4" >
            <h4>Courses not created yet</h4>
           </Col>
         </Row>)
         
       }

      { myCourses.map(course => <Row key={course.id} className='d-flex justify-content-center'>
          <Col md={8} >
            <Row className='mt-4 shadow border custom-radius bg-white'>
              <Col sm={3} className="d-flex justify-content-center align-items-center my-2">
              <img style={{"height": "80px", "width": "80px", "border-radius": "50%"}}  src={`${BASE_URL}${course.cover_pic}`} />

              </Col>
              <Col  sm={9}> 
                <h6 style={{color:"blue"}} className='my-3'> <Link to={`/course/${course.id}/details`}>{course.name}</Link> </h6>
                <small>{course.created_date}</small>
              </Col>
            </Row>
          
          </Col>
       </Row>
       ) }



       {/* <Row style={{background : "#ffff"}} className='mt-5 shadow custom-radius '>
          <Col sm={4}>
            <img className='w-75 mx-5 mt-5' src={course_2}/>
           

            </Col>
            <Col sm={8}> 
              <h2 style={{color:"blue"}}  className=' mt-5'>Course Title :</h2>
              <h5><b>Civil Engineering</b> </h5>
              <h3 style={{color:"blue"}}>Other Description :</h3>
              <p>As part of the group creation process, you must assign courses to the group. When a course is assigned to a group, any user who is in the group will automatically get enrolled into the associated course(s).</p>
              <h3 style={{color:"blue"}}>Course Title :</h3>
              <h5><b> Media Studies </b> </h5>
              <h3 style={{color:"blue"}}>Other Description :</h3>
              <p>As part of the group creation process, you must assign courses to the group. When a course is assigned to a group, any user who is in the group will automatically get enrolled into the associated course(s).</p>
              <h3 style={{color:"blue"}}>Course Title :</h3>
              <h5 ><b> Business Studies </b> </h5>
              <h3 style={{color:"blue"}}>Other Description :</h3>
              <p className='mb-5'>As part of the group creation process, you must assign courses to the group. When a course is assigned to a group, any user who is in the group will automatically get enrolled into the associated course(s).</p>
              

            </Col>
       </Row>
       
       <Row style={{background : "#ffff"}} className='mt-5 shadow custom-radius '>
          <Col sm={4}>
            <img className='w-75 mx-5 mt-5' src={course_3}/>


            </Col>
            <Col sm={8}> 
              <h3 style={{color:"blue"}}  className=' mt-5'>Course Title :</h3>
              <h5><b>Social Works</b></h5>
              <h3 style={{color:"blue"}}>Other Description :</h3>
              <p>As part of the group creation process, you must assign courses to the group. When a course is assigned to a group, any user who is in the group will automatically get enrolled into the associated course(s).</p>
              <h3 style={{color:"blue"}}>Course Title :</h3>
              <h5><b>Mechanical Engineering</b></h5>
              <h3 style={{color:"blue"}}>Other Description :</h3>
              <p>As part of the group creation process, you must assign courses to the group. When a course is assigned to a group, any user who is in the group will automatically get enrolled into the associated course(s).</p>
              <h3 style={{color:"blue"}}>Course Title :</h3>
              <h5><b>Robotics And Automation</b></h5>
              <h3 style={{color:"blue "}}>Other Description :</h3>
              <p className='mb-5'>As part of the group creation process, you must assign courses to the group. When a course is assigned to a group, any user who is in the group will automatically get enrolled into the associated course(s).</p>
              

            </Col>
       </Row> */}
       
          

        
      </Container>
    </div>
  );
};

export default MyCourses;