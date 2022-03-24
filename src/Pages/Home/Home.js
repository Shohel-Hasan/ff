import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Modal,Button, FormControl, InputGroup, Accordion } from 'react-bootstrap';
import Slider from 'react-slick';
import './Home.css';
import man from '../../Images/saddam.jpg';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);
    const [userGeneralInfo, setUserGeneralInfo] = useState({});

    const [summaryPosts, setSummaryPosts] = useState([]);
    const [noSummaryPosts, setNoSummaryPosts] = useState([]);

    const [thoughtPosts, setThoughtPosts] = useState([]);
    const [noThoughtPosts, setNoThoughtPosts] = useState([]);

    const [allCourses, setAllCourses] = useState([]);
    const [noCourses, setNoCourses] = useState([]);

    const navigate = useNavigate();


    //Local Storage Data State
    const [storeTitle, setStoreTitle] = useState('');
    const [storeObjective, setStoreObjective] = useState('');
    const [storeTheoretical, setStoreTheoretical] = useState('');
    const [storeGap, setStoreGap] = useState('');
    const [storeUniqueness, setStoreUniqueness] = useState('');
    const [storeData, setStoreData] = useState('');
    const [storeMethodology, setStoreMethodology] = useState('');
    const [storeResult, setStoreResult] = useState('');
    const [storeValidity, setStoreValidity] = useState('');
    const [storeUsefulness, setStoreUsefulness] = useState('');
    const [storeReference, setStoreReference] = useState('');
    const [storeAnnex, setStoreAnnex] = useState('');
    const [storeKeyword, setStoreKeyword] = useState('');

    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();

    const [description, setDescription] = useState("")
  
    const handle = () => {
      localStorage.setItem('storeTitle', storeTitle);
      localStorage.setItem('storeObjective', storeObjective);
      localStorage.setItem('storeTheoretical', storeTheoretical);
      localStorage.setItem('storeUniqueness', storeUniqueness);
      localStorage.setItem('storeData', storeData);
      localStorage.setItem('storeMethodology', storeMethodology);
      localStorage.setItem('storeResult', storeResult);
      localStorage.setItem('storeValidity', storeValidity);
      localStorage.setItem('storeGap', storeGap);
      localStorage.setItem('storeUsefulness', storeUsefulness);
      localStorage.setItem('storeReference', storeReference);
      localStorage.setItem('storeAnnex', storeAnnex);
      localStorage.setItem('storeKeyword', storeKeyword);
   };


   
const handleSummaryPost = () => {
  // e.preventDefault();
  const newData = new FormData();
  setModal(false)
  newData.append('title_of_research_article', storeTitle);
  newData.append('objective_of_the_study', storeObjective);
  newData.append('theoritical_Background', storeTheoretical);
  newData.append('research_gap', storeGap,);
  newData.append('uniqueness_of_the_study', storeUniqueness,);
  newData.append("data_source_sample_information",storeData)
  newData.append("research_methodology",storeMethodology)
  newData.append('result_discussion',storeResult)
  newData.append('validity_reliability_of_finding',storeValidity)
  newData.append('usefulness_of_the_finding',storeUsefulness)
  newData.append('reference',storeReference)
  newData.append('annex',storeAnnex)
  newData.append('file1', file1? file1 : "")
  newData.append('file2', file2? file2 : "")
  newData.append('keyword',storeKeyword)
  newData.append('user', localStorage.getItem('id'))


  console.log(newData)

  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-summery-create/`, {
    method: "POST",
    headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
    },
    body: newData
  })
    .then(res=> {
              if (res.status===400) {
                alert("please enter all the required field");
              } else if(res.status===201) {
                alert("summary post created")
                navigate('/home')
              }
          })
    .catch(error => console.log(error))
 }


  
const handleThoughtPost = () => {
  // e.preventDefault();
  const newData = new FormData();

  newData.append('description', description)
  newData.append('user', localStorage.getItem('id'))
  setShow(false)

  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-thought-create/`, {
    method: "POST",
    headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
    },
    body: newData
  })
    .then(res=> {
              if (res.status===400) {
                alert("please enter all the required field");
              } else if(res.status===201) {
                alert("Thought post created")
                navigate('/home')
              }
          })
    .catch(error => console.log(error))
 }


// getting summary posts
useEffect(() => {
  fetch(`http://127.0.0.1:8000/post/summerypost/all/`, {
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
        setNoSummaryPosts([{data: data.message}]
        )
      } else {
        setSummaryPosts(data)
        // console.log("asdfsa", data)
      }
     
  })
}, [])


// getting thought posts
useEffect(() => {
  fetch(`http://127.0.0.1:8000/post/thoughtpost/all/`, {
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
        setNoThoughtPosts([{data: data.message}]
        )
      } else {
        setThoughtPosts(data)
      }
     
  })
}, [])

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

const allPosts = [...summaryPosts , ...thoughtPosts ]
const randomPosts = allPosts.sort(() => Math.random() - 0.5)


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
   
    responsive: [
      
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          width: '200px'
        
         
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
         
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          borderRadius: '8px',
         
        }
      }
    ]
  };
  const BASE_URL = "http://127.0.0.1:8000"
  console.log(userGeneralInfo)

    return (
        <Container fluid className='home-container'>
            <Row className="justify-content--center">
                {/* Left col section start */}
                <Col xs={2} className='left-col'>
                    Left col section 
                </Col>
                {/* Left col section End */}

                {/* Middle col section start */}
                <Col xs={8} className='mid-col'>
                        <Row className='justify-content-center align-items-center'>
                            <Col>
                                <Slider {...settings}>
                                 { allCourses.length!==0 && allCourses.map((course, index) => <div>
                                        <img style={{'objectFit': 'cover' }} className="home-slider img-fluid" src={`${BASE_URL}${course.cover_pic}`} alt=''/>
                                    </div>
                                     )  }
                                  
                                </Slider>
                            </Col>
                        </Row>

                    {/* Post Section */}
                    <Row className='justify-content-center my-4'>
                        <Col>
                            <div className="p-3 shadow-effect d-flex align-items-center  ">
                               {userGeneralInfo.cover_pic!==null && <div className='w-25'>
                                    <div className='text-center'>
                                      <img
                                      className="rounded-circle"
                                      style={{ width: "56px", height: "56px", 'objectFit': 'cover' }} 
                                      src={`${BASE_URL}${userGeneralInfo.profile_pic}`}
                                      alt=''
                                      />
                                    </div>
                                </div>}

                                {userGeneralInfo.cover_pic===null && <div className='w-25'>
                                    <div className='text-center'>
                                      <img
                                      className="rounded-circle"
                                      style={{ width: "56px", height: "56px", 'objectFit': 'cover' }} 
                                      src={man}
                                      alt=''
                                      />
                                    </div>
                                </div>}

                                <div className='w-75'>
                                    <Form.Control
                                    onClick={() => setShow(true)}
                                    className="rounded-pill post-filed mb-2 "
                                    type="text"
                                    placeholder="Share a thought that you like"
                                    />
                        
                                    <Form.Control
                                    onClick={() => setModal(true)}
                                    className="rounded-pill my-1 post-filed"
                                    type="text"
                                    placeholder="Share a research summary that you like"
                                    /> 
                                </div>
                            </div>

                              {/* Modal Section */}
                              <div>
                                <Modal
                                  show={show}
                                  onHide={() => setShow(false)}
                                  dialogClassName="modal-90w"
                                  aria-labelledby="contained-modal-title-vcenter"
                                  centered
                                >
                                  <Modal.Header closeButton >
                                      
                                          <p className='fw-bolder fs-6'>Thought Post </p>
                                      
                                  </Modal.Header>
                                  <Modal.Body className="fb-box-shadow">
                                      <div className='d-flex mb-2'>
                                          <div>
                                              <img
                                                className="rounded-circle mx-2"
                                                style={{ width: "35px", height: "35px", 'objectFit': 'cover' }} 
                                                src={man}
                                                alt=''
                                            />
                                          </div>
                                          <div>
                                              {/* <h6>{userGeneralInfo.user_first_name}</h6> */}
                                          </div>
                                      </div>
                                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control onChange={(e) =>setDescription(e.target.value)} as="textarea" rows={8}  placeholder="Share a thought that you like"/>
                                      </Form.Group>
                                      
                                      <div className="d-grid gap-2">
                                        <Button variant="primary" size="sm" onClick={()=> handleThoughtPost()} >
                                          Post
                                        </Button>
                                        </div>
                                      
                                  </Modal.Body>
                                </Modal>
                              </div>
                                <Modal
                                  show={modal}
                                  onHide={() => setModal(false)}
                                  dialogClassName="modal-90w"
                                  aria-labelledby="contained-modal-title-vcenter"
                                  centered
                                  size='lg'
                                >
                                  <Modal.Header closeButton>
                                      <div className=''>
                                          <p className='fw-bolder fs-6'>Research Summary</p>
                                      </div>
                                  </Modal.Header>
                                  <Modal.Body className="fb-box-shadow">

                                    
                                        {/*-------- section-1------------ */}
                                <Accordion>
                                  <form>
                                        <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                                Title of research article   
                                                  
                                        </Accordion.Header>
                                            <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group  onChange={(e) =>setStoreTitle(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeTitle')}  as="textarea" rows={2} placeholder='Objective of the study' />
                                                 </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                              </Accordion.Body>
                                          </Accordion.Item>
                                      
                                          {/* section-2 */}
                                          <Accordion.Item eventKey="1">
                                          <Accordion.Header>
                                                Objective of the study   
                                                  
                                            </Accordion.Header>
                                              <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group  onChange={(e) =>setStoreObjective(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeObjective')}  as="textarea" rows={6} placeholder='Objective of the study' />
                                                </Form.Group>
                                                  <div className="text-end">
                                                    <Button size="sm" onClick={handle} variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                            </Accordion.Body>
                                          </Accordion.Item>
                                          {/* section-3 */}
                                          <Accordion.Item eventKey="2">
                                            <Accordion.Header>
                                              Theoretical Background   
                                                  
                                              </Accordion.Header>
                                              <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreTheoretical(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeTheoretical')} as="textarea" rows={6} placeholder='Theoretical Background' />
                                                </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm"  variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                              </Accordion.Body>
                                          </Accordion.Item>
                                          {/* section-4 */}
                                          <Accordion.Item eventKey="3">
                                          <Accordion.Header>
                                              Research Gap   
                                                  
                                            </Accordion.Header>
                                              <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreGap(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeGap')}  as="textarea" rows={6} placeholder='Research Gap' />
                                                </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm"  variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                            </Accordion.Body>
                                          </Accordion.Item>
                            
                                          {/* section-5 */}
                                          <Accordion.Item eventKey="4">
                                            <Accordion.Header>
                                              Uniqueness of the study   
                                                  
                                              </Accordion.Header>
                                              <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreUniqueness(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeUniqueness')} as="textarea" rows={6} placeholder='Uniqueness of the study' />
                                                </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm"  variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                              </Accordion.Body>
                                          </Accordion.Item>
                            
                                        {/* section-6 */}
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header>
                                                Data source/sample Information   
                                                      
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreData(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeData')} as="textarea" rows={6} placeholder='Data source/sample Information' />
                                                  </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                            </Accordion.Body>
                                          </Accordion.Item>
                            
                                          {/* section-7 */}
                                          <Accordion.Item eventKey="6">
                                            <Accordion.Header>
                                              Research methodology   
                                                  
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreMethodology(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeMethodology')} as="textarea" rows={6} placeholder='Research methodology' />
                                                  </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                            </Accordion.Body>
                                          </Accordion.Item>
                            
                                          {/* section-8 */}
                                          <Accordion.Item eventKey="7">
                                          <Accordion.Header>
                                              Result & discussion   
                                                  
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreResult(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeResult')} as="textarea" rows={6} placeholder='Result & discussion' />
                                                  </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                              </Accordion.Body>
                                          </Accordion.Item>
                            
                                          {/* section-9 */}
                                          <Accordion.Item eventKey="8">
                                            <Accordion.Header>
                                              Validity & reliability of finding   
                                                  
                                            </Accordion.Header>
                                              <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreValidity(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeValidity')} as="textarea" rows={6} placeholder='Validity & reliability of finding' />
                                                  </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                              </Accordion.Body>
                                            </Accordion.Item>
                            
                                          {/* section-10 */}
                                          <Accordion.Item eventKey="9">
                                              <Accordion.Header>
                                                  Usefulness of the finding   
                                                  
                                              </Accordion.Header>
                                              <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreUsefulness(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeUsefulness')}  as="textarea" rows={6} placeholder='Usefulness of the finding' />
                                                  </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                              </Accordion.Body>
                                          </Accordion.Item>
                            
                                        {/* section-11 */}
                                        <Accordion.Item eventKey="10">
                                          <Accordion.Header>
                                              Reference   
                                                  
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreReference(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeReference')}  as="textarea" rows={6} placeholder='Reference' />
                                                  </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                            </Accordion.Body>
                                            </Accordion.Item>
                            
                                            {/* section-12 */}
                                            <Accordion.Item eventKey="11">
                                            <Accordion.Header>
                                              Annex   
                                                  
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group  onChange={(e) =>setStoreAnnex(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeAnnex')} as="textarea" rows={6} placeholder='Annex' />
                                                  </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                                  </div>
                                              </div>
                                              </Accordion.Body>
                                            </Accordion.Item>
                            
                                        {/* section-13 */}
                                        <Accordion.Item eventKey="12">
                                            <Accordion.Header>
                                              Uploaded File   
                                            </Accordion.Header>
                                            <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group controlId="formFileSm" className="mb-3">
                                                    <Form.Control type="file" size="sm" onChange={e => setFile1(e.target.files[0])} />
                                                  </Form.Group>
                                                  <Form.Group controlId="formFileSm" className="mb-3">
                                                    <Form.Control type="file" size="sm" onChange={e => setFile2(e.target.files[0])} />
                                                  </Form.Group>
                                              </div>
                                              </Accordion.Body>
                                          </Accordion.Item>
                            
                                          {/* section-14 */}
                                          <Accordion.Item eventKey="13">
                                          <Accordion.Header>
                                              Keyword   
                                          </Accordion.Header>
                                          <Accordion.Body>
                                              <div id="example-collapse-text">
                                                  <Form.Group onChange={(e) =>setStoreKeyword(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control defaultValue={localStorage.getItem('storeKeyword')} as="textarea" rows={6} placeholder='Keyword without space' />
                                                  </Form.Group>
                                                  <div className="text-end">
                                                          <Button onClick={handle} size="sm" variant="primary">Save</Button>
                                                  </div>
                                              </div>
                                              </Accordion.Body>
                                              </Accordion.Item>

                                      {/*----------- Post Button --------------*/}
                                      <div className="text-end m-3">
                                            <Button className="px-4" onClick={()=> handleSummaryPost()} size="sm" variant="primary">Post</Button>
                                      </div>
                                  </form>
                              </Accordion>
                                  </Modal.Body>
                                </Modal>
                        </Col>
                    </Row>

                    {/* Course Information Start */}
                    <Row>
                      {allPosts && allPosts.map((post, index) => <div  key={index} className='my-3'>
                        <div className="fb-cards-designs">
                          <div className="fb-clone-card">
                            <div className="fb-card-main-content">
                              <div className="fb-card-header">
                                <div className="user-post-info">
                                  <div className="user-thumb">
                                  { !post.group_name &&  <img  src={`${BASE_URL}${post.user_profile_pic}`} className="img-responsive" alt='user profile not found'/>}
                                  {post.group_name &&  <img  src={`${BASE_URL}${post.group_profile_pic}`} className="img-responsive" alt='group profile not found'/>}

                                  </div>
                                  <div className="user-information">
                                  {!post.group_name && <p>{post.user_first_name}</p>}
                                  {post.group_name && <p>{post.group_name}</p>}

                                    <small>{post.created_date}</small>
                                  </div>
                                </div>
                                <div className="post-action">
                                    <i class="fa fa-ellipsis-h"></i>
                                </div>
                              </div>
                              {post.title_of_research_article &&  <div className="fb-card-body simple-text-card simple-image-card">
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Title of research article</b></p>
                                    <small>{post.objective_of_the_study}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Objective of the study</b></p>
                                    <small >{post.objective_of_the_study}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Theoretical background</b></p>
                                    <small >{post.theoritical_Background}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Research gap</b></p>
                                    <small >{post.research_gap}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Uniqueness of the study</b></p>
                                    <small >{post.uniqueness_of_the_study}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Data source/sample information</b></p>
                                    <small >{post.data_source_sample_information}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Research methodology</b></p>
                                    <small >{post.research_methodology}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Result & discussion</b></p>
                                    <small >{post.result_discussion}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Validity & reliability of finding</b></p>
                                    <small >{post.validity_reliability_of_finding}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Usefulness of the finding</b></p>
                                    <small >{post.usefulness_of_the_finding}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Reference</b></p>
                                    <small >{post.reference}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Annex</b></p>
                                    <small >{post.annex}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Keyword</b></p>
                                    <small>{post.keyword}</small>
                                  </div> 
                                  <div className='p-3'>
                                    {/* <input type='file' defaultValue={post.file1} /> */}
                                    <a href={`${BASE_URL}${post.file1}`} target="_blank">file1</a> <br />
                                    <a href={`${BASE_URL}${post.file2}`} target="_blank">file2</a>
                                  </div> 
                              </div>}

                              {!post.title_of_research_article &&  <div className="fb-card-body simple-text-card simple-image-card">
                                  <p className='p-3'>{post.description}</p>
                              </div>}
                            </div>

                              <div className="fb-card-like-comment-holder">
                                <div className="fb-card-like-comment">
                                  <div className="likes-emoji-holder">
                                      <span className='emoji-holder'>14 Likes</span>
                                  </div>
                                  <div className="like-comment-holder">
                                      <span  className='emoji-holder'>10 Comments</span>
                                  </div>
                                </div>
                              </div>

                              <div className="fb-card-actions-holder">
                                <div className="d-flex justify-content-between">
                                    <div className="fb-btn-holder">
                                        <Button className='text-info' variant="outline-light"><i className="fa hom-icon fa-thumbs-up"></i> Like</Button>
                                      
                                    </div>
                                    <div className="fb-btn-holder">
                                        <Button className='text-info' variant="outline-light"><i className="far hom-icon fa-comment-alt"></i> Comment</Button>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <Button className='text-info' variant="outline-light"><i className="fa hom-icon fa-share-square"></i> Share</Button>
                                    </div>
                                </div>
                              </div>

                              <div className="fb-card-comments">
                                  <div className="comment-input-holder">
                                    <div className="user-thumb">
                                        <img src="https://i.ibb.co/St6QD00/DSC-0003.jpg" className="img-responsive" alt=''/>
                                    </div>
                                    <div className="comment-input"> 
                                        <Form.Control
                                          className="comment-box rounded-pill "
                                          type="text"
                                          placeholder="Write a comment..."
                                        />
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </div>
                      </div>)
                      }
                    </Row>

              </Col>
               {/* Middle col section end */}


               {/* Right Col section */}
              <Col xs={2}  className='right-col'>
                Right Col section
              </Col>
            </Row>
       </Container>
    );
};

export default Home;