import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Modal,Button, FormControl,  InputGroup, Accordion, Badge } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import "./GroupProfile.css";
import man from '../../Images/man.jpg';
import badge from '../../Images/badge.png'

const GroupProfile = (props) => {

  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [setting, setSetting] = useState(false);
  const [nameModal, setNameModal] =useState(false);
  const [updateGroupName, setUpdateGroupName] = useState("");

  const [singleGroup, setSingleGroup] = useState({})

  const [description, setDescription] = useState("")


  const [groupMember, setGroupMember] = useState({});
  const [criteriaTitle, setCriteriaTitle] = useState("");
  const [criteriaDetail, setCriteriaDetail] = useState("");
  const [groupCriteria, setGroupCriteria] = useState([]);
  const [groupCourses, setGroupCourses] = useState([]);
  const [noGroupCourses, setNoGroupCourses] = useState([]);

  const [GroupSummaryPosts, setGroupSummaryPosts] = useState([]);
  const [GroupNoSummaryPosts, setGroupNoSummaryPosts] = useState([]);

  const [GroupThoughtPosts, setGroupThoughtPosts] = useState([]);
  const [GroupNoThoughtPosts, setGroupNoThoughtPosts] = useState([]);

  //Local Storage Data State
  const [storeTitleGroup, setStoreTitleGroup] = useState('');
  const [storeObjectiveGroup, setStoreObjectiveGroup] = useState('');
  const [storeTheoreticalGroup, setStoreTheoreticalGroup] = useState('');
  const [storeGapGroup, setstoreGapGroup] = useState('');
  const [storeUniquenessGroupGroup, setstoreUniquenessGroupGroup] = useState('');
  const [storeDataGroup, setstoreDataGroup] = useState('');
  const [storeMethodologyGroup, setstoreMethodologyGroup] = useState('');
  const [storeResultGroup, setstoreResultGroup] = useState('');
  const [storeValidityGroup, setstoreValidityGroup] = useState('');
  const [storeUsefulnessGroup, setstoreUsefulnessGroup] = useState('');
  const [storeReferenceGroup, setstoreReferenceGroup] = useState('');
  const [storeAnnexGroup, setstoreAnnexGroup] = useState('');
  const [storeKeywordGroup, setstoreKeywordGroup] = useState('');

  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();


  const handleGroup = () => {
    localStorage.setItem('storeTitleGroup', storeTitleGroup);
    localStorage.setItem('storeObjectiveGroup', storeObjectiveGroup);
    localStorage.setItem('storeTheoreticalGroup', storeTheoreticalGroup);
    localStorage.setItem('storeUniquenessGroupGroup', storeUniquenessGroupGroup);
    localStorage.setItem('storeDataGroup', storeDataGroup);
    localStorage.setItem('storeMethodologyGroup', storeMethodologyGroup);
    localStorage.setItem('storeResultGroup', storeResultGroup);
    localStorage.setItem('storeValidityGroup', storeValidityGroup);
    localStorage.setItem('storeGapGroup', storeGapGroup);
    localStorage.setItem('storeUsefulnessGroup', storeUsefulnessGroup);
    localStorage.setItem('storeReferenceGroup', storeReferenceGroup);
    localStorage.setItem('storeAnnexGroup', storeAnnexGroup);
    localStorage.setItem('storeKeywordGroup', storeKeywordGroup);
 };




  const [groupAboutText, setGroupAboutText] = useState('')
  const userId = localStorage.getItem('id')
  console.log("userId: ", userId)
  // Use Params
  const groupId = useParams();
  console.log("group id: ", groupId);

  props.triggerCheckLoggedIn();


  
const handleGroupSummaryPost = () => {
  // e.preventDefault();
  const newData = new FormData();
  setModal(false)

  newData.append('title_of_research_article', storeTitleGroup);
  newData.append('objective_of_the_study', storeObjectiveGroup);
  newData.append('theoritical_Background', storeTheoreticalGroup);
  newData.append('research_gap', storeGapGroup,);
  newData.append('uniqueness_of_the_study', storeUniquenessGroupGroup,);
  newData.append("data_source_sample_information",storeDataGroup)
  newData.append("research_methodology",storeMethodologyGroup)
  newData.append('result_discussion',storeResultGroup)
  newData.append('validity_reliability_of_finding',storeValidityGroup)
  newData.append('usefulness_of_the_finding',storeUsefulnessGroup)
  newData.append('reference',storeReferenceGroup)
  newData.append('annex',storeAnnexGroup)
  newData.append('file1', file1)
  newData.append('file2', file2)
  newData.append('keyword',storeKeywordGroup)
  newData.append('user', localStorage.getItem('id'))
  console.log(newData)

  fetch(`http://127.0.0.1:8000/post/${groupId.groupId}/group-summery-create/`, {
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
              }
          })
    .catch(error => console.log(error))
 }


 // group thought post
 const handleGroupThoughtPost = () => {
  // e.preventDefault();
  const newData = new FormData();
  setShow(false)

  newData.append('description', description)
  newData.append('group', groupId.groupId)
  console.log(newData)

  fetch(`http://127.0.0.1:8000/post/${groupId.groupId}/group-thought-create/`, {
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
                setGroupSummaryPosts(GroupSummaryPosts)
              }
          })
    .catch(error => console.log(error))
 }

// getting individual group summary posts 
useEffect(() => {
  fetch(`http://127.0.0.1:8000/post/${groupId.groupId}/group-summery-all`, {
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
        setGroupNoSummaryPosts([{data: data.message}]
        )
      } else {
        setGroupSummaryPosts(data)
        // console.log("asdfsa", data)
      }
     
  })
}, [])


// getting individual group thought posts 
useEffect(() => {
  fetch(`http://127.0.0.1:8000/post/${groupId.groupId}/group-thought-all`, {
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
        setGroupNoThoughtPosts([{data: data.message}]
        )
      } else {
        setGroupThoughtPosts(data)
        // console.log("asdfsa", data)
      }
     
  })
}, [])

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

    // group about update 
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
        console.log(localStorage.getItem('auth_token'))
        e.preventDefault();
        console.log(updateGroupHeader.body)
        setSetting(false)

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
      console.log(localStorage.getItem('auth_token'))
      e.preventDefault();
      setSetting(false)

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


  
const allPosts = [...GroupSummaryPosts , ...GroupThoughtPosts ]
const randomPosts = allPosts.sort(() => Math.random() - 0.5)


// update group name header
const updateGroupNameHeader = {
  // mode: 'no-cors',
  method: 'PATCH',
  headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
  },
  body: JSON.stringify({
      name : updateGroupName,
  })
};

const updateGroupNameFunction = () =>{
  // e.preventDefault();
  console.log("I am update.....");
  console.log(localStorage.getItem('auth_token'))

  fetch(`http://127.0.0.1:8000/group/${groupId.groupId}/group-update/`, updateGroupNameHeader)
      .then(response => {response.json()
            if (response.status===200) {
              alert("group name updated")
              setNameModal(false)
              window.location.href=`/group/${groupId.groupId}/details`
            }
      })
      .catch(error => console.log(error))
}

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

        <Row  className='mt-2 align-items-center justify-content-center'>
          <Col md={8} className="d-flex justify-content-start"> 
              <div className='d-flex align-items-center'>
                <img style={{'objectFit': 'cover' }} className='group-pic'  src={`${BASE_URL}${singleGroup.profile_pic}`} alt=''/>
               <div className="">
                       <img className="badge-wrapper" src={badge} alt=''/>
               </div>
                <div className="image-load m-2">
                  <small style={{ color: "#1877f2", fontSize:'20px', marginLeft: '10px' }} > {singleGroup.name}</small>
                  { groupMember.role==="Creator" && <i style={{color: '#1876f2'}} className="fas fa-edit mx-2" onClick={() => setNameModal(true)}></i>} 
                  <Modal  show={nameModal}  onHide={() => setNameModal(false)} dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton >
                      <div className=''>
                        <p className='title'>Update your group name </p>
                      </div>
                    </Modal.Header>
                    <Modal.Body className="fb-box-shadow">
                        <Form>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control onChange={(e) =>setUpdateGroupName(e.target.value)} as="textarea" rows={3}  placeholder="Edit your group name"/>
                          </Form.Group>
                        </Form>
                        <div className="d-grid gap-2">
                          <Button variant="primary" size="sm" onClick={()=> updateGroupNameFunction()} >
                            Update
                          </Button>
                        </div>
                    </Modal.Body>
                  </Modal>
                </div>
                </div>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col md={8} className=" setting-section d-flex justify-content-end" >
              {groupMember.role==="Creator" ? <div className="mx-2"> <Link to={`/${groupId.groupId}/create-course`}><Button size='sm' bg="primary">Create Course </Button></Link> </div> : <div>
                <select
                  className="form-select form-select-sm  mx-auto"
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
              <Button onClick={() => setSetting(true)} variant="outline-primary" size="sm"><i className="fa fa-gear"></i></Button>
            </Col>
        </Row>

      {/*-------------- Post Section----------------------- */}

       <Row className='justify-content-center my-3'>
       { groupMember.role==="Creator" &&   <Col md={8} className='shadow-effect py-3'>
                     <div className="d-flex align-items-center">
                          <div className='w-25 text-center'>
                              <img
                                className="rounded-circle"
                                style={{ width: "56px", height: "56px", 'objectFit': 'cover' }} 
                                src={`${BASE_URL}${singleGroup.cover_pic}`}
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
                                    <p className='title p-2 mx-1'>Thought Post </p>
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
                                        <h6>{singleGroup.name}</h6>
                                    </div>
                                </div>
                                <Form>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control onChange={(e) =>setDescription(e.target.value)} as="textarea" rows={8}  placeholder="Share a thought that you like"/>
                                  </Form.Group>
                                </Form>
                                
                                <div className="d-grid gap-2">
                                  <Button variant="primary" size="sm" onClick={()=> handleGroupThoughtPost()} >
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
                            centered size="lg"
                          >
                            <Modal.Header closeButton>
                                    <p className='title p-2 mx-1'>Research Summary</p>

                            </Modal.Header>
                            <Modal.Body className="fb-box-shadow">

                              
                                  {/*-------- section-1------------ */}
                          <Accordion>
                            <Form>
                                  <Accordion.Item eventKey="0">
                                  <Accordion.Header>
                                          Title of research article   
                                            
                                  </Accordion.Header>
                                      <Accordion.Body>
                                        <div id="example-collapse-text">
                                            <InputGroup className="mb-3"  onChange={(e) =>setStoreTitleGroup(e.target.value)}>
                                              <FormControl defaultValue={localStorage.getItem('storeTitleGroup')} placeholder="Title of research article" />
                                            </InputGroup> 
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm" variant="primary">Save as a draft</Button>
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
                                            <Form.Group  onChange={(e) =>setStoreObjectiveGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeObjectiveGroup')}  as="textarea" rows={6} placeholder='Objective of the study' />
                                          </Form.Group>
                                            <div className="text-end">
                                                    <Button size="sm" onClick={handleGroup} variant="primary">Save as a draft</Button>
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
                                            <Form.Group onChange={(e) =>setStoreTheoreticalGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeObjectiveGroup')} as="textarea" rows={6} placeholder='Theoretical Background' />
                                          </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm"  variant="primary">Save as a draft</Button>
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
                                            <Form.Group onChange={(e) =>setstoreGapGroup(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeGapGroup')}  as="textarea" rows={6} placeholder='Research Gap' />
                                          </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm"  variant="primary">Save as a draft</Button>
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
                                            <Form.Group onChange={(e) =>setstoreUniquenessGroupGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeUniquenessGroupGroup')} as="textarea" rows={6} placeholder='Uniqueness of the study' />
                                          </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm"  variant="primary">Save as a draft</Button>
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
                                            <Form.Group onChange={(e) =>setstoreDataGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeDataGroup')} as="textarea" rows={6} placeholder='Data source/sample Information' />
                                            </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm" variant="primary">Save as a draft</Button>
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
                                            <Form.Group onChange={(e) =>setstoreMethodologyGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeMethodologyGroup')} as="textarea" rows={6} placeholder='Research methodology' />
                                            </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm" variant="primary">Save as a draft</Button>
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
                                            <Form.Group onChange={(e) =>setstoreResultGroup(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeResultGroup')} as="textarea" rows={6} placeholder='Result & discussion' />
                                            </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm" variant="primary">Save as a draft</Button>
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
                                            <Form.Group onChange={(e) =>setstoreValidityGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeValidityGroup')} as="textarea" rows={6} placeholder='Validity & reliability of finding' />
                                            </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm" variant="primary">Save as a draft</Button>
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
                                            <Form.Group onChange={(e) =>setstoreUsefulnessGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeUsefulnessGroup')}  as="textarea" rows={6} placeholder='Usefulness of the finding' />
                                            </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm" variant="primary">Save as a draft</Button>
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
                                            <Form.Group onChange={(e) =>setstoreReferenceGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeReferenceGroup')}  as="textarea" rows={6} placeholder='Reference' />
                                            </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm" variant="primary">Save as a draft</Button>
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
                                            <Form.Group  onChange={(e) =>setstoreAnnexGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                              <Form.Control defaultValue={localStorage.getItem('storeAnnexGroup')} as="textarea" rows={6} placeholder='Annex' />
                                            </Form.Group>
                                            <div className="text-end">
                                                    <Button onClick={handleGroup} size="sm" variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setstoreKeywordGroup(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeKeywordGroup')} as="textarea" rows={6} placeholder='Keyword without space' />
                                          </Form.Group>
                                          <div className="text-end">
                                            <Button onClick={handleGroup} size="sm" variant="primary">Save</Button>
                                          </div>
                                        </div>
                                      </Accordion.Body>
                                    </Accordion.Item>

                                {/*----------- Post Button --------------*/}
                                <div className="text-end m-3">
                                      <Button className="px-4" onClick={()=> handleGroupSummaryPost()}  size="sm" variant="primary">Post</Button>
                                </div>
                            </Form>
                        </Accordion>
                            </Modal.Body>
                          </Modal>
                  </Col>}
              </Row>

              <Row className="d-flex justify-content-center">
                      {allPosts && allPosts.map((post, index) => <Col md={9}  key={index} className='my-3'>
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
                                        <a className='text-decoration-none' href="/"><i className="fa hom-icon fa-thumbs-up"></i> Like</a>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <a className='text-decoration-none' href="/"><i className="far hom-icon fa-comment-alt"></i> Comment</a>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <a className='text-decoration-none' href="/"><i className="fa hom-icon fa-share-square"></i> Share</a>
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
                      </Col>)
                      }
                    </Row>

                      {/*--------- Setting Modal Section---------  */}
              <Modal show={setting}
                       onHide={() => setSetting(false)}
                       dialogClassName="modal-90w"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                >
                  <Modal.Body className="">
                    <Accordion
                      className="container rounded"
                      alwaysOpen >
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          About Us
                          
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
                                  <Button size="sm" type='submit' variant="primary justify ">Save</Button>
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
                              <Button size="sm" type="submit" variant="primary justify ">Save</Button>
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
                    </Accordion>
                  </Modal.Body>
              </Modal>
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
               
    
    </Container>
  );
};

export default GroupProfile;
