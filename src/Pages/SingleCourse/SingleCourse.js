import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Row, Table, Modal } from 'react-bootstrap';
import './SingleCourse.css'
import badge from '../../Images/badge.svg'
import man from '../../Images/man.jpg'
import Slider from 'react-slick';
import { Link, useParams } from 'react-router-dom';
// import Checkout from '../../components/Checkout';
import Overlay from '../../components/Overlay';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



const SingleCourse = (props) => {
    props.triggerCheckLoggedIn();
    const courseId = useParams();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    
    const [showCheckout, setShowCheckout] = useState(false);
    const [checkoutModal, setCheckoutModalShow] = useState(false);


    const [course, setCourse] =useState([]);
    console.log("course: ", course)
    const [classRoutine, setClassRoutine] = useState({});
    const [isCourseStaff, setIsCourseStaff] = useState(false);

    // course class link states
    const [classLink, setClassLink] = useState("");
    const [getClassLink, setGetClassLink] = useState("");
    const [noLink, setNoLink] = useState("")
    // course notice states
    const [notice, setNotice] = useState("");
    const [getAllNotice, setGetAllNotice] = useState([]);
    const [noNotice, setNoNotice] = useState("")

    // enrolled students list
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [noEnrolledStudents, setNoEnrolledStudents] = useState([]);


    const [isEnrolledAndPaid, setIsEnrolledAndPaid] = useState(false);

    const submitHandler = (event) => {
      event.preventDefault();

      const header = {
          mode: 'cors',
          method: 'POST',
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem('auth_token')}`
          },
          body: JSON.stringify({
              payment_method: paymentMethod,
              number: phoneNumber,
              transaction_id: transactionId

          })
      };
  
      fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/enrollment/course-enrollment-payment/`, header)
          .then(response => response.json())
          .then(data => {
              if (data.message) {
                  alert(`${data.message},  "Please pay the enrollment fee"`)
                  setCheckoutModalShow(false)
                  navigate(`/course/${courseId.courseId}/details`)
              } else{
                  navigate(`/user/${localStorage.getItem('id')}`)
                  setCheckoutModalShow(false)
                  console.log(data)
              } 
             })
  }

    //   ------ Course Admin check --------  //
    useEffect(() =>{
      fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/staff/single-staff`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
      .then((res) => res.json())
      .then((data) =>{console.log("course staff: ", data.role)
                      if (data.role==="Admin") {
                        setIsCourseStaff(true)
                      }
        });
  },[courseId.courseId])

  //   ------ Student is enrolled check --------  //
  useEffect(() =>{
    fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/enrollment/${localStorage.getItem('id')}`, {
      method: 'GET',
      headers: {
          "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
      }})
    .then((res) => res.json())
    .then((data) =>{console.log("is enrolled check: ", data)
                    if (data.is_paid) {
                      setIsEnrolledAndPaid(true)
                    } else{setIsEnrolledAndPaid(false)}
      });
},[courseId.courseId])


  //   ------ Enrolled students--------  //
  useEffect(() =>{
    fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/enrollment/payment-all`, {
      method: 'GET',
      headers: {
          "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
      }})
    .then((res) => res.json())
    .then((data) =>{
        if (data.message) {
          console.log("enrolled students: ", data.message)
          setNoEnrolledStudents([data.message])
        } else {setEnrolledStudents(data)
          console.log("enrolled students ", data)}            
      });
},[courseId.courseId])
   //   ------ Course class link get--------  //
   useEffect(() =>{
    fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/class-link-detail`, {
      method: 'GET',
      headers: {
          "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
      }})
    .then((res) => res.json())
    .then((data) =>{console.log("course class link get: ")
                    if (data.url_link) {
                      setGetClassLink(data.url_link)
                    } else if(data.url_link===undefined){
                      setNoLink(data.message)
                    }
      });
},[courseId.courseId])

    //   ------ Single course details --------  //
    useEffect(() =>{
        fetch(`http://127.0.0.1:8000/course/single-course/${courseId.courseId}`, {
          method: 'GET',
          headers: {
              "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
              "Accept": "application/json",
              "Content-Type": "application/json"
          }})
        .then((res) => res.json())
        .then((data) => setCourse(data));
    },[courseId.courseId])

    //   ------ Course Class Routine --------  //
    useEffect(() =>{
      fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/class-routine`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
      .then((res) => res.json())
      .then((data) => setClassRoutine(data));
  },[courseId.courseId])

      
    // course class link create
    const courseClassLinkHeader = {
      // mode: 'no-cors',
      method: 'POST',
      headers: {
          "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url_link : classLink,
      })
    };

    const courseClassLinkCreate = (e) =>{
      e.preventDefault();
      console.log("I am hitting.....");
      console.log(localStorage.getItem('auth_token'))

      console.log(courseClassLinkHeader.body)

      fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/class-link-create/`, courseClassLinkHeader)
          .then(response => {response.json()
              if (response.status===201) {
                alert("class link created")
              } else if(response.status===400) {
                alert("class link allready created")
              }
          })
          .catch(error => console.log(error))
      
    }
    // course notice create
    const courseNoticeHeader = {
      // mode: 'no-cors',
      method: 'POST',
      headers: {
          "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        notice : notice,
      })
    };

    const courseNoticeCreate = (e) =>{
      e.preventDefault();
      console.log("I am hitting.....");
      console.log(localStorage.getItem('auth_token'))

      console.log(courseNoticeHeader.body)

      fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/notice/create/`, courseNoticeHeader)
          .then(response => {response.json()
              if (response.status===201) {
                alert("class notice created")
              } else if(response.status===400) {
                alert("class notice error")
              }
          })
          .catch(error => console.log(error))
    }

  //   ------ get all course notices --------  //
  useEffect(() =>{
    fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/notice/all/`, {
      method: 'GET',
      headers: {
          "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
      }})
    .then((res) => res.json())
    .then((data) =>{console.log("course notices ", data)
                    if (data.message) {
                      setNoNotice(data.message)
                    } else{setGetAllNotice(data)}
      });
},[courseId.courseId])

    // course class link udpate header
    const courseClassLinkUpdateHeader = {
      // mode: 'no-cors',
      method: 'PATCH',
      headers: {
          "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url_link : classLink,
      })
    };

    const courseClassLinkUpdate = (e) =>{
      e.preventDefault();
      console.log("I am hitting.....");
      console.log(localStorage.getItem('auth_token'))

      console.log(courseClassLinkHeader.body)

      fetch(`http://127.0.0.1:8000/course/${courseId.courseId}/class-link-detail/`, courseClassLinkUpdateHeader)
          .then(response => response.json())
          .then(data=>{
            console.log(data)
            alert("class link updated")
            setGetClassLink(data.url_link)
          })
          .catch(error => console.log(error))
      
    }
    // console.log(course);
    function toggleCheckout() {
      setShowCheckout(!showCheckout);
    }

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 10000,
        dots: false,
        responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
       
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }
  
  ]
      };

// Related Course & Student Slider

  const setting = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          setting: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          setting: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          setting: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

const BASE_URL = "http://127.0.0.1:8000"

     

    return (
        <Container className='single_course'>
          {/* {showCheckout && <Overlay />}
          {showCheckout && <Checkout toggleCheckout={toggleCheckout} courseId={courseId.courseId}/>} */}
          <div className='bg-white pb-3' style={{borderBottom: "1px solid #ced0d4"}}>
            <Row className='justify-content-center'>
                <Col md={8} className='text-center'>
                   <div className="text-end">
                       <span className="cover_up_wrapper">
                       <input name="image_src" id="cover_up_filed"  />
                      </span>
                   </div>
                  <div><img className='course-img img-fluid rounded' src={`${BASE_URL}${course.cover_pic}`} alt=""/></div>
                </Col>
            </Row>

            
            <Row>
                <Col className='text-center'>
                    <h1 className='Group-name mt-2'>{course.name}</h1>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                  <Col md={8}>
                    <Row>
                    <Col md={4} > 
                    <div className='text-center'>
                      <img className='group-img ' style={{"objectFit": "cover"}} src={`${BASE_URL}${course.group_profile_pic}`} alt=""/>
                      <div className='text-center'><small style={{ color: "#1877f2", fontSize: '20px'}}>{course.group_name}</small></div>
                    </div>
                    <div className='text-center'>
                       <img className="verified-badge" src={badge} alt=''/>
                    </div>
                   
                      
                    
                  </Col>
                  <Col md={8} className='d-flex align-items-center mt-4'>
                    <div className='mx-auto'>
                        <div>
                      {!course.course_availability &&  <Button  className='m-4 badge badge-pill mt-2'>Upcoming</Button>}

                      {course.course_availability &&  <Button  className='m-4 badge badge-pill mt-2'>Ongoing</Button>}

                      {!isCourseStaff && !isEnrolledAndPaid &&  <Button onClick={() => setCheckoutModalShow(true)}  className='m-4 badge badge-pill mt-2'>Enroll</Button>}
                      {isEnrolledAndPaid &&  <Button onClick={toggleCheckout} className='m-4 badge badge-pill mt-2'>Enrolled</Button>}


                      <Modal show={checkoutModal} onHide={() => setCheckoutModalShow(false)} dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton >
                          <p className='title p-2 mx-1'>Checkout</p>
                            
                        </Modal.Header>
                        <Modal.Body className="fb-box-shadow">
                        <div className='my-3'>
                            <p>Checkout here to enroll into this course</p>
                            <p>Please send money in the given number and put the tranxaction number and your phone number</p>
                            <p>01841779449</p>
                        </div>

                        <form action="" className={`form-group`} onSubmit={submitHandler}>
                            {/* <input type="password" className={`form-control my-2`} required placeholder='Old Password'/> */}
                            <select name="method" id="" className='form-control my-1' onChange={event => setPaymentMethod(event.target.value)} required>
                                <option value="" selected disabled>Select payment method</option>
                                <option value="bkash">Bkash</option>
                                <option value="bkash">Rocket</option>
                                {/* <option value="bkash">Nogod</option> */}
                            </select>

                            
                            <PhoneInput
                          
                              inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true
                              }}
                              onBlur={event => setPhoneNumber(event.target.value)}
                            />
                            <input className='form-control my-1' type="text" required placeholder="Transaction ID" onChange={event => setTransactionId(event.target.value)}/>

                            <div className='d-flex justify-content-center align-items-center my-3'>
                                <input type="submit"  />
                            </div>
                        </form>
                            
                        </Modal.Body>
                      </Modal>


                      {!isCourseStaff &&  <Button  className='m-4 badge badge-pill mt-2'>Follow +</Button>}
                        </div>
                        <div>
                          <div className="fb-card-actions d-flex justify-content-around">
                            <div className="fb-btn-holder text-center mt-3">
                                <a  className='text-decoration-none' href='/' ><i className="far fa-thumbs-up "></i> Like</a>
                            </div>
                            <div className="fb-btn-holder text-center mt-3">
                                <a className='text-decoration-none' href='/'><i className="far fa-comment"></i> Comment</a>
                            </div>
                            <div className="fb-btn-holder text-center mt-3">
                                <a className='text-decoration-none' href='/'><i className="far fa-share-square"></i> Share</a>
                            </div>
                          </div>
                        </div>
                    </div>
                  </Col>
                    </Row>
                  </Col>
            </Row>
          </div>


          {/* course information  */}

                  
          <Accordion className="p-3 " defaultActiveKey={["0"]} alwaysOpen >
            <Accordion.Item eventKey="1">
              <Accordion.Header> <b>Course Information</b> </Accordion.Header>
                <Accordion.Body>            
                  <Row className='my-4 justify-content-center'>
                    <Col md={12}>
                      <p>Course hour per class: {course.hour_per_class} </p>
                      <p>Course class per week: {course.class_per_week} </p>
                      <p>Course total class: {course.total_class} </p>
                      <p>Course total class hour: {course.total_class_hour} </p>
                      <p>Course start date: {course.start_date} </p>
                      <p>Course end date: {course.end_date} </p>

                      <div>
                        <h6>Course Class Routine</h6>
                        <Table responsive="md">
                          <thead>
                            <tr>
                              <th scope="col">sat</th>
                              <th scope="col">sun</th>
                              <th scope="col">mon</th>
                              <th scope="col">tue</th>
                              <th scope="col">wed</th>
                              <th scope="col">thu</th>
                              <th scope="col">fri</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{classRoutine.sat}</td>
                              <td>{classRoutine.sun}</td>
                              <td>{classRoutine.mon}</td>
                              <td>{classRoutine.tue}</td>
                              <td>{classRoutine.wed}</td>
                              <td>{classRoutine.thu}</td>
                              <td>{classRoutine.fri}</td>
                            </tr>
                            
                          </tbody>
                        </Table>
                      </div>
                      <p>Course  topic: {course.course_topic} </p>
                      <p>Course  outcome: {course.course_outcome} </p>
                      <p>Course  reward: {course.course_reward} </p>
                      <p>Course enrollment requirement: {course.enrollment_requirement} </p>
                      <p>Course  responsibility: {course.course_responsibility} </p>
                      <p>Course  enroll start date: {course.course_enroll_start_date} </p>
                      <p>Course enroll end date: {course.course_enroll_end_date} </p>
                      <p>Course enrollment fee: {course.enrollment_fee} </p>
                      <p>Course payment procedure: {course.payment_procedure} </p>
                      <p>Course disclaimer from group: {course.disclaimer_from_group} </p> 
                    </Col>
                  </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

         {isCourseStaff && <Accordion className="p-3" defaultActiveKey={["0"]} alwaysOpen >
            <Accordion.Item eventKey="2">
              <Accordion.Header> <b>Course Class Link</b> </Accordion.Header>
                <Accordion.Body>            
                  <Row className='my-4 justify-content-center'>
                    <Col md={12}>
                      {noLink &&  <div>  <small>{noLink}</small>  </div>}
                      {getClassLink &&  <div> <small>{getClassLink}</small>  </div>}
                    { isCourseStaff &&  <form>
                        <div className="form-group my-2">
                          <label >Class Meet Link</label>
                          <input type="url" className="form-control" onChange={e=> setClassLink(e.target.value)}  aria-describedby="emailHelp" placeholder="class link" /> 
                        </div>
                        {!getClassLink &&  <button onClick={(e)=> courseClassLinkCreate(e)}  className="btn btn-primary my-2">Submit</button>}
                        {getClassLink &&  <button onClick={(e)=> courseClassLinkUpdate(e)}  className="btn btn-primary my-2">Update</button>}
                      </form>
                    }
 
                    </Col>
                  </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
}

          {isCourseStaff && 
            <Accordion className="p-3" defaultActiveKey={["0"]} alwaysOpen >
              <Accordion.Item eventKey="3">
                <Accordion.Header> <b>Course Notices </b> </Accordion.Header>
                  <Accordion.Body>            
                    <Row className='my-4 justify-content-center'>
                      <Col md={12}>
                      {noNotice &&  <p></p>  }
                    
                      { getAllNotice && getAllNotice.map((notice,  index )=> <div key={notice.id}>
                          <p> {index+1}. {notice.notice}</p> 
                      </div>)}
                      
                    { isCourseStaff &&  
                      <form >
                        <div className="form-group my-2">
                          <label >Course notice: </label>
                          <input type="text" className="form-control" onChange={e=> setNotice(e.target.value)}  aria-describedby="emailHelp" placeholder="class link" /> 
                        </div>
                        <button onClick={(e)=> courseNoticeCreate(e)}  className="btn btn-primary my-2">Submit</button>
                      </form>
                    } 
                      </Col>
                    </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          }

          { isEnrolledAndPaid && 
            <Accordion className="p-3" defaultActiveKey={["0"]} alwaysOpen >
              <Accordion.Item eventKey="2">
                <Accordion.Header> <b>Course Class Link</b> </Accordion.Header>
                  <Accordion.Body>            
                    <Row className='my-4 justify-content-center'>
                      <Col md={12}>

                      {noLink &&  <div>
                                  <small>{noLink}</small>
                        </div>}

                        {getClassLink &&  <div>
                                  <small>{getClassLink}</small>
                        </div>}
                      </Col>
                    </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          }

          {isEnrolledAndPaid  && 
            <Accordion className="p-3" defaultActiveKey={["0"]} alwaysOpen >
              <Accordion.Item eventKey="2">
                <Accordion.Header> <b>Course Notice</b> </Accordion.Header>
                  <Accordion.Body>            
                    <Row className='my-4 justify-content-center'>
                      <Col md={12}> 
                        { getAllNotice && getAllNotice.map((notice,  index )=> <div key={notice.id}>
                            <p> {index+1}. {notice.notice}</p>
                        </div>)}
                      </Col>
                    </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          }
          

        {/* -----------------------------------------Header Section End------------------------------------------------------- */}
            {/* <Row className='mt-5 mb-5 box'> 
              <Col md='5'>
                    <span className='fs-5 fw-bold square'>Course Teacher</span>
              </Col>
              <Col md='7' className='mt-1'>
                <Slider {...settings}>
                  <div>
                      <img className="img-ban rounded-circle img-fluid" src={img} alt=''/>
                      <span className='text-muted mx-1'>Name</span>
                  </div>
                  <div>
                      <img className="img-ban rounded-circle img-fluid" src={img} alt=''/>
                      <span className='text-muted mx-1'>Name</span>
                  </div>
                  <div>
                      <img  className="img-ban rounded-circle img-fluid" src={img} alt=''/>
                      <span className='text-muted mx-1'>Name</span>
                  </div>
                  <div>
                      <img  className="img-ban rounded-circle img-fluid" src={img} alt=''/>
                      <span className='text-muted mx-1'>Name</span>
                  </div>
                </Slider>
              </Col> 
            </Row> */}


            <Row className='box'>
              <Col className='mt-5'>
            
                <div className='mt-4'>
                    <span className='fs-5 fw-bold'>Course Enrolled Students</span>
                </div>

                <hr  style={{  color: "#1877F2", backgroundColor: "#1877F2", height: "2px", margin: " auto", width: "75%", marginBottom: "15px", marginTop:'10px'  }} />
          
                <div>
                  <Slider {...setting}>

                    {
                      noEnrolledStudents && noEnrolledStudents.map(noSt => <div key={noSt.id}>
                          <p>{noSt}</p>
                      </div>)
                    }
                   { enrolledStudents.length!==0 && enrolledStudents.map((st, index) => <div key={index}>
                        <img className="slider-img img-fluid" src={man} alt=''/>
                        <h6> <Link to={`/user/${st.student_first_name}`}> {st.student_first_name}</Link> </h6>
                    </div> ) }
                   
                  </Slider>
                </div>
              </Col>
            </Row>
                           
            <Row className='box'>
              <Col>
            
                <div className='mt-4'>
                    <span className='fs-5 fw-bold  square'>Related Course</span>
                </div>

                <hr style={{ color: "#1877F2",  backgroundColor: "#1877F2",  height: "2px", margin: " auto",  width: "75%",  marginBottom: "15px", marginTop:'10px'  }}  />
            
                <div>
                  <Slider {...setting}>
                    <div>
                        <img className="slider-img img-fluid" src={man} alt=''/>
                      
                    </div>
                    <div>
                        <img className="slider-img img-fluid" src={man} alt=''/>
                        
                    </div>
                    <div>
                        <img  className="slider-img img-fluid" src={man} alt=''/>
                      
                    </div>
                    <div>
                        <img  className="slider-img img-fluid" src={man} alt=''/>
                    
                    </div>
                    <div>
                        <img  className="slider-img img-fluid" src={man} alt=''/>
                    
                    </div>
                  </Slider>
                </div>
              </Col>
            </Row>
                       
            {/* </Row> */}
        </Container>
    );
};

export default SingleCourse;