import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Modal,Button, FormControl,  InputGroup, Accordion } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import "./GroupProfile.css";
import man from '../../Images/man.jpg';

const GroupProfile = (props) => {

  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [singleGroup, setSingleGroup] = useState({})
  // const [title, setTitle] = useState(false);
  // const [objective, setObjective] = useState(false);
  // const [theoritical, setTheoritical] = useState(false);
  // const [gap, setGap] = useState(false);
  // const [unique, setUnique] = useState(false);
  // const [data, setData] = useState(false);
  // const [methodology, setMethodology] = useState(false);
  // const [result, setResult] = useState(false);
  // const [validity, setValidity] = useState(false);
  // const [useful, setUseful] = useState(false);
  // const [reference, setReference] = useState(false);
  // const [annex, setAnnex] = useState(false);
  // const [file, setFile] = useState(false);
  // const [fileName, setFileName] = useState(false);


  const [groupMember, setGroupMember] = useState({});
  const [criteriaTitle, setCriteriaTitle] = useState("");
  const [criteriaDetail, setCriteriaDetail] = useState("");
  const [groupCriteria, setGroupCriteria] = useState([]);
  const [groupCourses, setGroupCourses] = useState([]);
  const [noGroupCourses, setNoGroupCourses] = useState([]);



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




  const [groupAboutText, setGroupAboutText] = useState('')
  const userId = localStorage.getItem('id')
  console.log("userId: ", userId)
  // Use Params
  const groupId = useParams();
  console.log("group id: ", groupId);

  props.triggerCheckLoggedIn();

  // getting group details
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/group/${groupId.groupId}/group-detail/`, {
    method: 'GET',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }})
    .then(res => res.json())
    .then(data => {setSingleGroup(data)
        // console.log(data)
    })
}, [groupId.groupId])

  
// getting group member info
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/group/${groupId.groupId}/${userId}/member-detail/`, {
    method: 'GET',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }})
    .then(res => res.json() )
    .then(data => {
        // console.log("group member: ", data)
        if (data.message) {
          setGroupMember({
            role: "user"
          })
        }
        else {
          setGroupMember(data)
          // console.log(data)
        }
    })
}, [userId])

  // getting group criteria all
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/group/${groupId.groupId}/all-criteria/`, {
    method: 'GET',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }})
    .then(res => res.json())
    .then(data => {setGroupCriteria(data)
        console.log(data)
    })
}, [groupId.groupId])


//getting group courses
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
        setNoGroupCourses([{data: data.message}]
        )
      } else {
        setGroupCourses(data)
        console.log(data)
      }
     
  })
}, [])

// course data function
    const updateGroupHeader = {
        // mode: 'no-cors',
        method: 'PATCH',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            about : groupAboutText,
        })
    };

    const updateGroup = (e) =>{
        e.preventDefault();
        console.log("I am hitting.....");
        console.log(localStorage.getItem('auth_token'))

        console.log(updateGroupHeader.body)
        e.preventDefault();
        console.log(updateGroupHeader.body)

        fetch(`http://127.0.0.1:8000/group/${groupId.groupId}/group-update/`, updateGroupHeader)
            .then(response => {response.json()
                              if (response.status===200) {
                                alert("group about info updated")
                              }
            })
            .catch(error => console.log(error))
        
    }

    // group criteria post header
    const groupCriteriaPostHeader = {
      // mode: 'no-cors',
      method: 'POST',
      headers: {
          "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          criteria_title : criteriaTitle,
          criteria_detail: criteriaDetail
      })
  };

  const groupCriteriaPost = (e) =>{
      e.preventDefault();
      console.log("I am hitting.....");
      console.log(localStorage.getItem('auth_token'))

      console.log(updateGroupHeader.body)
      e.preventDefault();
      console.log(updateGroupHeader.body)

      fetch(`http://127.0.0.1:8000/group/${groupId.groupId}/add-criteria/`, groupCriteriaPostHeader)
          .then(response => {response.json()
                            console.log(response)
                            if (response.status===201) {
                              alert("group criteria data inserted")
                            }
          })
          .then(data => {
              console.log(data)
          })
          .catch(error => console.log(error))
      
  }

  console.log("groupCriteria: ", groupCriteria)

  console.log("single group info: ", singleGroup)
  console.log("group member info: ", groupMember)
  const BASE_URL = "http://127.0.0.1:8000"

  return (
    <Container className="custom">
        {/* Group Profile */}

        <Row className="justify-content-center">
          <Col md={8}>
              <div>
                <img  className="rounded group-cover img-fluid" src={`${BASE_URL}${singleGroup.cover_pic}`} alt='/'/>
              </div>
          </Col>
        </Row>

        <Row  className='mt-2'>
          <Col md={{ span: 3, offset: 2 }}> 
              <div className='icon-container d-flex align-items-center'>
                <img style={{'objectFit': 'cover' }} className='group-pic'  src={`${BASE_URL}${singleGroup.profile_pic}`} alt='' />
                <div className="image-load m-2">
                  <small style={{ color: "#1877f2", fontSize:'20px', marginLeft: '10px' }} > {singleGroup.name}</small>
                </div>
                </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center my-2 ">
                    {
                       groupMember.role==="Creator" ? <div className="d-flex justify-content-center"> <Link to={`/${groupId.groupId}/create-course`}>Create Course</Link> </div> : <div>
                       <select
                         className="form-select form-select-lg mb-3 w-25 mx-auto"
                         aria-label="form-select-lg example"
                       >
                         <option value="1">Follow</option>
                         <option value="2">UnFollow</option>
                         <option value="3">Joint as Content Creator</option>
                         <option value="4">Requested as Content Creator</option>
                              <option value="5">Content Creator</option>
                            </select>
                      </div> 
                    }
                </Col>
            
        </Row>

      {/*-------------- Post Section----------------------- */}

       <Row className='justify-content-center my-3'>
                        <Col xs={9} className='shadow-effect py-3'>
                            <div className="d-flex align-items-center ">
                                <div className='w-25'>
                                    <img
                                    className="rounded-circle"
                                    style={{ width: "56px", height: "56px", 'objectFit': 'cover' }} 
                                    src={man}
                                    alt=''
                                    />
                                </div>
                                <div className='w-75'>
                                    <Form.Control
                                    onClick={() => setShow(true)}
                                    className="rounded-pill post-filed mb-2 group-post-input"
                                    type="text"
                                    placeholder="Share a thought that you like"
                                    />
                        
                                    <Form.Control
                                    onClick={() => setModal(true)}
                                    className="rounded-pill my-1 post-filed  group-post-input"
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
                                      <div className=''>
                                          <p className='title'>Thought Post </p>
                                      </div>
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
                                              <h6>Md. Saddam Hossain</h6>
                                          </div>
                                      </div>
                                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control onChange={(e) =>setDescription(e.target.value)} as="textarea" rows={3}  placeholder="Share a thought that you like"/>
                                      </Form.Group>
                                      
                                      <div className="d-grid gap-2">
                                        <Button variant="primary" size="sm"  >
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
                                >
                                  <Modal.Header closeButton>
                                      <div className=''>
                                          <p className='fw-bold title'>Research Summary</p>
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
                                                  <InputGroup className="mb-3"  onChange={(e) =>setStoreTitle(e.target.value)}>
                                                    <FormControl defaultValue={localStorage.getItem('storeTitle')} placeholder="Title of research article" />
                                                  </InputGroup> 
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
                                            <Button className="px-4"  size="sm" variant="primary">Post</Button>
                                      </div>
                                  </form>
                              </Accordion>
                                  </Modal.Body>
                                </Modal>
                        </Col>
                    </Row>


      <Accordion
        className=" container shadow-lg p-3 mb-5 bg-white rounded"
        alwaysOpen >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            About Us <br />
            <i style={{color: 'blue'}} className="fas fa-edit p-2 "></i>
          </Accordion.Header>
          <Accordion.Body>
            <div class="mb-3">
              <form onSubmit={updateGroup}>
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="About Us" 
                    onChange= {e=> setGroupAboutText(e.target.value)}
                    required
                    defaultValue={singleGroup.about}
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  {
                    groupMember.role==="Creator" && 
                    <Button type='submit' variant="primary justify ">Save</Button>
                  }
                </div>
              </form>
            </div>
          
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Group Criteria</Accordion.Header>
          <Accordion.Body>

            { groupCriteria?.length!==0 && 
              groupCriteria?.map(criteria => <div key={criteria.id}>
                <h6>Title: {criteria.criteria_title}</h6>
                <p>Description: {criteria.criteria_detail}</p>

              </div>)
            }


            { groupMember.role==="Creator" && 
              <form onSubmit={groupCriteriaPost}>
              <div class="mb-3">
                <p>
                  Title <i style={{color: 'blue'}}  className="fas fa-edit p-2"></i>
                </p>

                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Title"
                    onChange={e=> setCriteriaTitle(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <p>
                Description <i className="fas fa-edit p-2 icon-clr"></i>
              </p>
              <div class="mb-3">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Description"
                    onChange={e=> setCriteriaDetail(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="text-end mt-2">
                <i className="fas fa-plus"></i>
              </div>
              <div className="text-end mt-3">
                <Button type="submit" variant="primary justify ">Save</Button>
              </div>
              </form>
            }
            
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Group Creator</Accordion.Header>
          <Accordion.Body>
           {singleGroup && <Link to={`/user/${localStorage.getItem('id')}`}><p className="Name"> { singleGroup['first_name']}  </p></Link>}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Group Courses</Accordion.Header>
          <Accordion.Body>
           {groupCourses && groupCourses.map(gCourse => <Link to={`/course/${gCourse.id}/details`}><p className="Name"> { gCourse.name}  </p></Link>)}
          </Accordion.Body>
        </Accordion.Item>
        {/* <Accordion.Item eventKey="3">
          <Accordion.Header> Admin</Accordion.Header>
          <Accordion.Body>
            <Form.Label htmlFor=""></Form.Label>
            <Form.Control
            className="mb-2"
              type="text"
              aria-describedby=""
              placeholder="search admin /paste the link of admin"
            />
            <a className="mx-2" href="#">
              Send Request for admin
            </a>
          </Accordion.Body>
        </Accordion.Item> */}


        
        {/* <Accordion.Item eventKey="4">
          <Accordion.Header>Moderator</Accordion.Header>
          <Accordion.Body>
            <Form.Label htmlFor=""></Form.Label>
            <Form.Control
             className="mb-2"
              type="text"
              aria-describedby=""
              placeholder="search admin /paste the link of moderator"
            />
             <a className="mx-2" href="#">
              Send Request for moderator
            </a>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Content Creator</Accordion.Header>
          <Accordion.Body>Mr.Z</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>Linked Group</Accordion.Header>
          <Accordion.Body>
          
              <a  className="mx-2 mb-2"  href="#"> Create Group </a>
              <Form.Label htmlFor=""></Form.Label>
            <Form.Control
             className="mb-2 mt-2"
              type="text"
              aria-describedby=""
              placeholder="search linked group/paste the link of linked group BUBT"
            />
              <a className="mx-2" href="#">Send Request for moderator</a>
            
          </Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item eventKey="7">
          <Accordion.Header>
            Contact Us <br />
            <i style={{color: 'blue'}} className="fas fa-edit p-2"></i>
          </Accordion.Header>
          <Accordion.Body>
            <div class="mb-3">
              <div class="input-group">
                <div class="input-group-prepend"></div>
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  placeholder="Contact Us"
                ></textarea>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item eventKey="8">
          <Accordion.Header>Followed keyword</Accordion.Header>
          <Accordion.Body>
            <p>
              Name of folder<i style={{color: 'blue'}} className="fas fa-edit p-2"></i>
            </p>
            <div class="">
              <div class="input-group">
                <div class="input-group-prepend"></div>
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  Placeholder="Name of folder"
                ></textarea>
              </div>
            </div>
            <p className="mt-2">
              Keyword <i style={{color: 'blue'}} className="fas fa-edit p-2"></i>
            </p>
            <div class="">
              <div class="input-group">
                <div class="input-group-prepend"></div>
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  Placeholder="keyword without space"
                ></textarea>
              </div>
            </div>
            <div className="text-end mt-2">
              <i className="fas fa-plus"></i>
            </div>
            <div className="text-end mt-3">
              <Button variant="primary justify ">Save</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item eventKey="9">
          <Accordion.Header>Followed resercher</Accordion.Header>
          <Accordion.Body>
            <Form.Label htmlFor=""></Form.Label>
            <Form.Control
              type="text"
              aria-describedby=""
              placeholder="Search followed person/paste the link of followed person"
            />
          </Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item eventKey="10">
          <Accordion.Header>Followed group</Accordion.Header>
          <Accordion.Body>
            <Form.Label htmlFor=""></Form.Label>
            <Form.Control
              type="text"
              aria-describedby=""
              placeholder="Search followed person/paste the link of followed group"
            />
          </Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item eventKey="11">
          <Accordion.Header>Share research thought </Accordion.Header>
          <Accordion.Body>
            <div class="input-group">
              <div class="input-group-prepend"></div>
              <textarea
                class="form-control"
                aria-label="With textarea"
                placeholder="Share your any research/logical thought"
              ></textarea>
            </div>
            <div className="text-end mt-3">
              <Button variant="primary justify ">Save as a draft</Button>
            </div>
            <div className="text-end mt-3">
              <Button variant="primary justify ">Post</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item eventKey="12">
          <Accordion.Header>Post a research article</Accordion.Header>
          <Accordion.Body>
          
            <p
              onClick={() => setTitle(!title)}
              aria-controls="example-title-text"
              aria-expanded={title}
            >
              Title of research article <i style={{color: 'blue'}} className="fas fa-edit "></i>
            </p>
            <Collapse in={title}>
              <div id="example-objective-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Title of research article"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setObjective(!objective)}
              aria-controls="example-objective-text"
              aria-expanded={objective}
            >
              Objective of the study <i style={{color: 'blue'}} className="fas fa-edit"></i>
            </p>
            <Collapse in={objective}>
              <div id="example-title-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Objective  of the study"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>

            <p
              onClick={() => setTheoritical(!theoritical)}
              aria-controls="example-title-text"
              aria-expanded={theoritical}
            >
              Theoritical Background <i style={{color: 'blue'}} className="fas fa-edit"></i>
            </p>
            <Collapse in={theoritical}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Theoritical background"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setGap(!gap)}
              aria-controls="example-title-text"
              aria-expanded={gap}
            >
              Research Gap <i style={{color: 'blue'}} className="fas fa-edit"></i>
            </p>
            <Collapse in={gap}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Research Gap"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setUnique(!unique)}
              aria-controls="example-title-text"
              aria-expanded={unique}
            >
              Uniqueness of the study <i style={{color: 'blue'}} className="fas fa-edit"></i>
            </p>
            <Collapse in={unique}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Uniqueness of the study"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setData(!data)}
              aria-controls="example-title-text"
              aria-expanded={data}
            >
              Data source / Sample information <i style={{color: 'blue'}} className="fas fa-edit"></i>
            </p>
            <Collapse in={data}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Data source/ Sample information"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setMethodology(!methodology)}
              aria-controls="example-title-text"
              aria-expanded={methodology}
            >
              Research methodology <i style={{color: 'blue'}} className="fas fa-edit"></i>
            </p>
            <Collapse in={methodology}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Research methodology"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setResult(!result)}
              aria-controls="example-title-text"
              aria-expanded={result}
            >
              Result & discussion <i style={{color: 'blue'}} className="fas fa-edit icon"></i>
            </p>
            <Collapse in={result}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Result & discussion"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setValidity(!validity)}
              aria-controls="example-title-text"
              aria-expanded={validity}
            >
              Validity & reliability of finding{" "}
              <i style={{color: 'blue'}} className="fas fa-edit icon"></i>
            </p>
            <Collapse in={validity}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Validity & reliability of finding"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setUseful(!useful)}
              aria-controls="example-title-text"
              aria-expanded={useful}
            >
              Usefulness of the finding <i style={{color: 'blue'}} className="fas fa-edit icon"></i>
            </p>
            <Collapse in={useful}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder=" Usefulness of the finding"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify "> Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setReference(!reference)}
              aria-controls="example-title-text"
              aria-expanded={reference}
            >
              Reference <i style={{color: 'blue'}} className="fas fa-edit icon"></i>
            </p>
            <Collapse in={reference}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Reference"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>


            <p
              onClick={() => setAnnex(!annex)}
              aria-controls="example-title-text"
              aria-expanded={annex}
            >
              Annex <i style={{color: 'blue'}} className="fas fa-edit icon"></i>
            </p>
            <Collapse in={annex}>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Annex"
                  ></textarea>
                </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save as a draft</Button>
                </div>
              </div>
            </Collapse>

            <p
              onClick={() => setFile(!file)}
              aria-controls="example-title-text"
              aria-expanded={file}
            >
              Uploaded file 
            </p>
            <Collapse in={file}>
              <div id="example-theoritical-text">
              <Form.Group controlId="formFile" className="mb-3">
            <Form.Label > </Form.Label>
              <Form.Control type="file" />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
            <Form.Label > </Form.Label>
              <Form.Control type="file" />
              </Form.Group>
              </div>
            </Collapse>


            
              
            <p
              onClick={() => setFileName(!fileName)}
              aria-controls="example-title-text"
              aria-expanded={fileName}
            >
              
              Keyword <i style={{color: 'blue'}} className="fas fa-edit icon"></i>
            </p>
            <Collapse in={fileName }>
              <div id="example-theoritical-text">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    placeholder="Keyword without space"
                  ></textarea>
                </div>
                
                <div className="text-end mt-2">
              <i className="fas fa-plus"></i>
            </div>
                <div className="text-end mt-3">
                  <Button variant="primary justify ">Save </Button>
                </div>
              </div>
            </Collapse>
            
            

           
          </Accordion.Body>
        </Accordion.Item> */}

        {/* <div className="text-end mt-3">
                  <Button variant="primary justify ">Post</Button>
                </div> */}
               
      </Accordion>
    </Container>
  );
};

export default GroupProfile;
