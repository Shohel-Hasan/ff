import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Dropdown, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import img from '../../Images/profile-thumbnails.svg';


const UserAllPost = () => {

  const userId = useParams();


  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [thoughtModal, setThoughtModal] = useState(false);
  const [summaryModal, setSummaryModal] = useState(false);

  const [noSummaryPosts, setNoSummaryPosts] = useState([]);
  const [summaryPosts, setSummaryPosts] = useState([]);
  const [userGeneralInfo, setUserGeneralInfo] = useState({});


  const [noThoughtPosts, setNoThoughtPosts] = useState([]);
  const [thoughtPosts, setThoughtPosts] = useState([]);

  const [singleThoughtPost, setSingleThoughtPost] = useState({});
  const [singleSummaryPost, setSingleSummaryPost] = useState({});


  //Local Storage Data State
  const [storeTitlePost, setStoreTitlePost] = useState('');
  const [storeObjectivePost, setStoreObjectivePost] = useState('');
  const [storeTheoreticalPost, setStoreTheoreticalPost] = useState('');
  const [storeGapPost, setStoreGapPost] = useState('');
  const [storeUniquenessPost, setStoreUniquenessPost] = useState('');
  const [storeDataPost, setStoreDataPost] = useState('');
  const [storeMethodologyPost, setStoreMethodologyPost] = useState('');
  const [storeResultPost, setStoreResultPost] = useState('');
  const [storeValidityPost, setStoreValidityPost] = useState('');
  const [storeUsefulnessPost, setStoreUsefulnessPost] = useState('');
  const [storeReferencePost, setStoreReferencePost] = useState('');
  const [storeAnnexPost, setStoreAnnexPost] = useState('');
  const [storeKeywordPost, setStoreKeywordPost] = useState('');

  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();

   const [description, setDescription] = useState("")
 
  const handlePost = () => {
    localStorage.setItem('storeTitlePost', storeTitlePost);
    localStorage.setItem('storeObjectivePost', storeObjectivePost);
    localStorage.setItem('storeTheoreticalPost', storeTheoreticalPost);
    localStorage.setItem('storeUniquenessPost', storeUniquenessPost);
    localStorage.setItem('storeDataPost', storeDataPost);
    localStorage.setItem('storeMethodologyPost', storeMethodologyPost);
    localStorage.setItem('storeResultPost', storeResultPost);
    localStorage.setItem('storeValidityPost', storeValidityPost);
    localStorage.setItem('storeGapPost', storeGapPost);
    localStorage.setItem('storeUsefulnessPost', storeUsefulnessPost);
    localStorage.setItem('storeReferencePost', storeReferencePost);
    localStorage.setItem('storeAnnexPost', storeAnnexPost);
    localStorage.setItem('storeKeywordPost', storeKeywordPost);
 };


 
// getting individual group summary posts 
useEffect(() => {
  fetch(`http://127.0.0.1:8000/post/${userId.userId}/user-summery-all`, {
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
      } 
  })
}, [userId.userId])


// getting individual group thought posts 
useEffect(() => {
  fetch(`http://127.0.0.1:8000/post/${userId.userId}/user-thought-all/`, {
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
        // console.log("asdfsa", data)
      }
  })
}, [userId.userId])



const handleSummaryPost = () => {
  // e.preventDefault();
  const newData = new FormData();
  setModal(false)
  newData.append('title_of_research_article', storeTitlePost);
  newData.append('objective_of_the_study', storeObjectivePost);
  newData.append('theoritical_Background', storeTheoreticalPost);
  newData.append('research_gap', storeGapPost,);
  newData.append('uniqueness_of_the_study', storeUniquenessPost,);
  newData.append("data_source_sample_information",storeDataPost)
  newData.append("research_methodology",storeMethodologyPost)
  newData.append('result_discussion',storeResultPost)
  newData.append('validity_reliability_of_finding',storeValidityPost)
  newData.append('usefulness_of_the_finding',storeUsefulnessPost)
  newData.append('reference',storeReferencePost)
  newData.append('annex',storeAnnexPost)
  newData.append('file1', file1? file1 : "")
  newData.append('file2', file2? file2 : "")
  newData.append('keyword',storeKeywordPost)
  newData.append('user', localStorage.getItem('id'))


  

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
                fetch(`http://127.0.0.1:8000/post/${userId.userId}/user-summery-all/`, {
                  method: 'GET',
                  headers: {
                      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                      "Accept": "application/json",
                      "Content-Type": "application/json"
                  }})
                  .then(res =>res.json())
                  .then(data =>  setSummaryPosts(data))
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
                fetch(`http://127.0.0.1:8000/post/${userId.userId}/user-thought-all/`, {
                  method: 'GET',
                  headers: {
                      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                      "Accept": "application/json",
                      "Content-Type": "application/json"
                  }})
                  .then(res =>res.json())
                  .then(data =>  setThoughtPosts(data))
              }
          })
    .catch(error => console.log(error))
 }


        
// getting individual user summary posts 
useEffect(() => {
    fetch(`http://127.0.0.1:8000/post/${userId.userId}/user-summery-all`, {
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
        } 
    })
  }, [userId.userId]);

  // getting individual user thought posts 
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/post/${userId.userId}/user-thought-all`, {
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
  }, [userId.userId]);

  
// thought delete header
const thoughtDeleteHeader = {
  // mode: 'no-cors',
  method: 'DELETE',
  headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
  },
};
// thought delete
const thoughtDelete = (id) => {
  console.log("i am here..", typeof id)
  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-thought/${id}/`, thoughtDeleteHeader)
      .then(response =>{ response.json()
        if (response.status===204) {
          fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-thought-all`, {
            method: 'GET',
            headers: {
                "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }})
            .then(res =>res.json())
            .then(data => setThoughtPosts(data))
        }
      })
      .catch(error => console.log(error))
}


// summary delete header
const summaryDeleteHeader = {
  // mode: 'no-cors',
  method: 'DELETE',
  headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
  },
};

// summary delete
const summaryDelete = (id) => {
  console.log("i am here..", typeof id)
  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-summery/${id}/`, summaryDeleteHeader)
      .then(response =>{ response.json()
        if (response.status===204) {
          fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-summery-all`, {
                  method: 'GET',
                  headers: {
                      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                      "Accept": "application/json",
                      "Content-Type": "application/json"
                  }})
                  .then(res =>res.json())
                  .then(data => setSummaryPosts(data))
        }
      })
      .catch(error => console.log(error))
}

// thought update modal function
const handleThoughtUpdateModal = (id) => {
  setThoughtModal(true)
  // getting single thought post
  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-thought/${id}/`, {
    method: 'GET',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }})
    .then(res =>res.json())
    .then(data => setSingleThoughtPost(data))
}


// single thought post update header
const thoughtUpdateHeader = {
  // mode: 'no-cors',
  method: 'PATCH',
  headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
  },
  body: JSON.stringify({
    description : description,
  })
};
// single thought post update
const handleUserThoughtPostUpdate = (id) => {
  console.log("i am here..", typeof id)
  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-thought/${id}/`, thoughtUpdateHeader)
      .then(response =>{ response.json()
        if (response.status===200) {
          setThoughtModal(false)

          fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-thought/${id}/`, {
            method: 'GET',
            headers: {
                "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }})
            .then(res =>res.json())
            .then(data => setSingleThoughtPost(data))
            fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-thought-all`, {
              method: 'GET',
              headers: {
                  "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              }})
              .then(res =>res.json())
              .then(data => setThoughtPosts(data))
        }
      })
      .catch(error => console.log(error))
}



const handleSummaryUpdateModal = (id) => {
  console.log(id)

  setSummaryModal(true)
  // getting single thought post
  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-summery/${id}/`, {
    method: 'GET',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }})
    .then(res =>res.json())
    .then(data => setSingleSummaryPost(data))
}

// single thought post update
const handleUserSummaryPostUpdate = (id) => {
  const newData = new FormData();

  newData.append('title_of_research_article', storeTitlePost? storeTitlePost : singleSummaryPost.title_of_research_article );
  newData.append('objective_of_the_study', storeObjectivePost? storeObjectivePost : singleSummaryPost.objective_of_the_study );
  newData.append('theoritical_Background', storeTheoreticalPost? storeTheoreticalPost : singleSummaryPost.theoritical_Background );
  newData.append('research_gap', storeUniquenessPost? storeUniquenessPost : singleSummaryPost.research_gap ,);
  newData.append('uniqueness_of_the_study', storeDataPost? storeDataPost : singleSummaryPost.uniqueness_of_the_study ,);
  newData.append("data_source_sample_information",storeMethodologyPost? storeMethodologyPost : singleSummaryPost.data_source_sample_information )
  newData.append("research_methodology",storeResultPost? storeResultPost : singleSummaryPost.research_methodology )
  newData.append('result_discussion',storeValidityPost? storeValidityPost : singleSummaryPost.result_discussion )
  newData.append('validity_reliability_of_finding',storeGapPost? storeGapPost : singleSummaryPost.validity_reliability_of_finding )
  newData.append('usefulness_of_the_finding',storeUsefulnessPost? storeUsefulnessPost : singleSummaryPost.usefulness_of_the_finding )
  newData.append('reference',storeReferencePost? storeReferencePost : singleSummaryPost.reference )
  newData.append('annex',storeAnnexPost? storeAnnexPost : singleSummaryPost.annex )
  newData.append('file1', file1? file1 : "")
  newData.append('file2', file2? file2 : "")
  newData.append('keyword',storeKeywordPost? storeKeywordPost : singleSummaryPost.keyword )
  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-summery/${id}/`, {
    method: "PATCH",
    headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
    },
    body: newData
  
  })
      .then(response =>{ response.json()
        if (response.status===200) {
          setSummaryModal(false)
          fetch(`http://127.0.0.1:8000/post/${userId.userId}/user-summery/${id}/`, {
            method: 'GET',
            headers: {
                "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }})
            .then(res =>res.json())
            .then(data => setSingleSummaryPost(data))
            fetch(`http://127.0.0.1:8000/post/${userId.userId}/user-summery-all`, {
              method: 'GET',
              headers: {
                  "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              }})
              .then(res =>res.json())
              .then(data => setSummaryPosts(data))
        }
      })
      .catch(error => console.log(error))
}
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

const allUserPosts = [...summaryPosts, ...thoughtPosts]
// const randomPosts = allUserPosts.sort(() => Math.random() - 0.5)


//Dropdown Toggle function
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <i className="fa fa-ellipsis-h text-primary"></i>
    </span>
  ));

const BASE_URL = "http://127.0.0.1:8000"

    return (
        <Container>
      {/*----------- Post Section Start ---------------*/}
              {localStorage.getItem('id')===userId.userId && <Row className='justify-content-center my-3'>   
                    <Col md={8} className='shadow-effect py-3'>
                      <div className="d-flex align-items-center">
                        {userGeneralInfo.profile_pic!==null && <div className='w-25 text-center'>
                            <img
                              className="rounded-circle"
                              style={{ width: "56px", height: "56px", objectFit: 'cover' }} 
                              src={`${BASE_URL}${userGeneralInfo.profile_pic}`}
                              alt=''
                            />
                        </div>}
                        {userGeneralInfo.profile_pic==null && <div className='w-25 text-center'>
                            <img
                              className="rounded-circle"
                              style={{ width: "80px", height: "80px", objectFit: 'cover' }} 
                              src={img}
                              alt=''
                            />
                        </div>}
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
                                  <p className='fw-bolder'>Thought Post </p>
                          </Modal.Header>
                          <Modal.Body className="fb-box-shadow">
                              <div className='d-flex mb-2'>
                                  <div>
                                      <img
                                        className="rounded-circle mx-2"
                                        style={{ width: "35px", height: "35px", 'objectFit': 'cover' }} 
                                        src={img}
                                        alt=''
                                    />
                                  </div>
                                  <div>
                                      <h6>Nazirul Islam</h6>

                                  </div>
                              </div>
                              <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                  <Form.Control onChange={(e) =>setDescription(e.target.value)} as="textarea" rows={8}  placeholder="Share a thought that you like"/>
                                </Form.Group>
                              </Form>

                              <div className="d-grid gap-2">
                                <Button onClick={()=> handleThoughtPost()} variant="primary" size="sm"  >
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
                                  <p className='fw-bolder'>Research Summary</p>

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
                                          <Form.Group onChange={(e) =>setStoreTitlePost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeTitlePost')}  as="textarea" rows={4} placeholder='Title of research article' />
                                        </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                          <Form.Group  onChange={(e) =>setStoreObjectivePost(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeObjectivePost')}  as="textarea" rows={8} placeholder='Objective of the study' />
                                        </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                          <Form.Group  onChange={(e) =>setStoreTheoreticalPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeTheoreticalPost')} as="textarea" rows={8} placeholder='Theoretical Background' />
                                        </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm"  variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setStoreGapPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeGapPost')}  as="textarea" rows={8} placeholder='Research Gap' />
                                        </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm"  variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setStoreUniquenessPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeUniquenessPost')} as="textarea" rows={8} placeholder='Uniqueness of the study' />
                                        </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm"  variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setStoreDataPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeDataPost')} as="textarea" rows={8} placeholder='Data source/sample Information' />
                                          </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setStoreMethodologyPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeMethodologyPost')} as="textarea" rows={8} placeholder='Research methodology' />
                                          </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost}  size="sm" variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setStoreResultPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeResultPost')} as="textarea" rows={8} placeholder='Result & discussion' />
                                          </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setStoreValidityPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeValidityPost')} as="textarea" rows={8} placeholder='Validity & reliability of finding' />
                                          </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost}  size="sm" variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setStoreUsefulnessPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeUsefulnessPost')}  as="textarea" rows={8} placeholder='Usefulness of the finding' />
                                          </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setStoreReferencePost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeReferencePost')}  as="textarea" rows={8} placeholder='Reference' />
                                          </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                          <Form.Group onChange={(e) =>setStoreAnnexPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control defaultValue={localStorage.getItem('storeAnnexPost')} as="textarea" rows={8} placeholder='Annex' />
                                          </Form.Group>
                                          <div className="text-end">
                                                  <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                        <Form.Group onChange={(e)=> setStoreKeywordPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                          <Form.Control defaultValue={localStorage.getItem('storeKeywordPost')} as="textarea" rows={4} placeholder='Keyword without space' />
                                        </Form.Group>
                                        <div className="text-end">
                                          <Button onClick={handlePost} size="sm" variant="primary">Save</Button>
                                        </div>
                                      </div>
                                    </Accordion.Body>
                                  </Accordion.Item>

                              {/*----------- Post Button --------------*/}
                              <div className="text-end m-3">
                                    <Button onClick={()=> handleSummaryPost()} className="px-4"  size="sm" variant="primary">Post</Button>
                              </div>
                          </Form>
                        </Accordion>
                      </Modal.Body>
                    </Modal>
                  </Col>
             </Row>}
              {/*----------- Post Section End ---------------*/}


              {/*------- All Post Showing Section Start--------*/}
              <Row className="d-flex justify-content-center">
                {allUserPosts && allUserPosts.map((post, index) => <Col md={9}  key={index}>
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
                          {post.title_of_research_article && <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
                              {localStorage.getItem('id')===userId.userId && <Dropdown.Menu style={{margin: '0', padding: '0'}}>
                                <Dropdown.Item  eventKey="1" onClick={()=> handleSummaryUpdateModal(post.id)}>Edit</Dropdown.Item>
                                <Dropdown.Item  eventKey="2" onClick={() => summaryDelete(post.id)}>Delete</Dropdown.Item>
                              </Dropdown.Menu>}
                            </Dropdown>}
                            {/* summary update modal  */}
                            <Modal show={summaryModal} onHide={() => setSummaryModal(false)}  dialogClassName="modal-90w"  aria-labelledby="contained-modal-title-vcenter"
                                      centered size="lg">

                                      <Modal.Header closeButton>
                                              <p className='fw-bolder'>Update Research Summary</p>

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
                                                      <InputGroup className="mb-3"  onChange={(e) =>setStoreTitlePost(e.target.value)}>
                                                        <FormControl defaultValue={singleSummaryPost.title_of_research_article} placeholder="Title of research article" />
                                                      </InputGroup> 
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                                      <Form.Group  onChange={(e) =>setStoreObjectivePost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.objective_of_the_study}  as="textarea" rows={6} placeholder='Objective of the study' />
                                                    </Form.Group>
                                                      <div className="text-end">
                                                              <Button size="sm" onClick={handlePost} variant="primary">Save as a draft</Button>
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
                                                      <Form.Group onChange={(e) =>setStoreTheoreticalPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.theoritical_Background} as="textarea" rows={6} placeholder='Theoretical Background' />
                                                    </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm"  variant="primary">Save as a draft</Button>
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
                                                      <Form.Group onChange={(e) =>setStoreGapPost(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.research_gap}  as="textarea" rows={6} placeholder='Research Gap' />
                                                    </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm"  variant="primary">Save as a draft</Button>
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
                                                      <Form.Group onChange={(e) =>setStoreUniquenessPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.uniqueness_of_the_study} as="textarea" rows={6} placeholder='Uniqueness of the study' />
                                                    </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm"  variant="primary">Save as a draft</Button>
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
                                                      <Form.Group onChange={(e) =>setStoreDataPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.data_source_sample_information} as="textarea" rows={6} placeholder='Data source/sample Information' />
                                                      </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                                      <Form.Group onChange={(e) =>setStoreMethodologyPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.research_methodology} as="textarea" rows={6} placeholder='Research methodology' />
                                                      </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                                      <Form.Group onChange={(e) =>setStoreResultPost(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.result_discussion} as="textarea" rows={6} placeholder='Result & discussion' />
                                                      </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                                      <Form.Group onChange={(e) =>setStoreValidityPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.validity_reliability_of_finding} as="textarea" rows={6} placeholder='Validity & reliability of finding' />
                                                      </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                                      <Form.Group onChange={(e) =>setStoreUsefulnessPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.usefulness_of_the_finding}  as="textarea" rows={6} placeholder='Usefulness of the finding' />
                                                      </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                                      <Form.Group onChange={(e) =>setStoreReferencePost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.reference}  as="textarea" rows={6} placeholder='Reference' />
                                                      </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                                      <Form.Group  onChange={(e) =>setStoreAnnexPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Control defaultValue={singleSummaryPost.annex} as="textarea" rows={6} placeholder='Annex' />
                                                      </Form.Group>
                                                      <div className="text-end">
                                                              <Button onClick={handlePost} size="sm" variant="primary">Save as a draft</Button>
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
                                                    <Form.Group onChange={(e) =>setStoreKeywordPost(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                      <Form.Control defaultValue={singleSummaryPost.keyword} as="textarea" rows={6} placeholder='Keyword without space' />
                                                    </Form.Group>
                                                    <div className="text-end">
                                                      <Button onClick={handlePost} size="sm" variant="primary">Save</Button>
                                                    </div>
                                                  </div>
                                                </Accordion.Body>
                                              </Accordion.Item>

                                          {/*----------- Post Button --------------*/}
                                          <div className="text-end m-3">
                                                <Button className="px-4" onClick={()=> handleUserSummaryPostUpdate(post.id)}  size="sm" variant="primary">Update</Button>
                                          </div>
                                      </Form>
                                  </Accordion>
                                      </Modal.Body>
                          </Modal>

                            {!post.title_of_research_article && <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
                                {localStorage.getItem('id')===userId.userId && <Dropdown.Menu style={{margin: '0', padding: '0'}}>
                                  <Dropdown.Item  eventKey="1"  onClick={()=> handleThoughtUpdateModal(post.id)}>Edit</Dropdown.Item>
                                  <Dropdown.Item  eventKey="2" onClick={()=> thoughtDelete(post.id)}>Delete</Dropdown.Item>
                                </Dropdown.Menu>}
                              </Dropdown>}
                              <Modal
                                    show={thoughtModal}
                                    onHide={() => setThoughtModal(false)}
                                    dialogClassName="modal-90w"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                  >
                                    <Modal.Header closeButton >   
                                            <p className='fw-bolder'>Update Thought Post </p>
                                    </Modal.Header>
                                    <Modal.Body className="fb-box-shadow">
                                        
                                        <Form>
                                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control onChange={(e) =>setDescription(e.target.value)} defaultValue={singleThoughtPost.description} as="textarea" rows={8}  placeholder="Share a thought that you like"/>
                                          </Form.Group>
                                        </Form>
                                        <div className="d-grid gap-2">
                                          <Button variant="primary" size="sm" onClick={()=> handleUserThoughtPostUpdate(post.id)} >
                                            update
                                          </Button>
                                          </div>
                                    </Modal.Body>
                                  </Modal>

                          </div>
                        </div>
                        {post.title_of_research_article &&  <div className="fb-card-body simple-text-card simple-image-card">
                            <div className='p-3'>
                              <p className='p-0 m-0'><b>Title of research article</b></p>
                              <small>{post.title_of_research_article}</small>
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

                        <div className="fb-card-actions-holder">
                          <div className="d-flex justify-content-between">
                              <div className="fb-btn-holder">
                                  <Button className='text-primary' variant="outline-light"><i className="fa hom-icon fa-thumbs-up"></i> <span>10</span> like</Button>
                              </div>
                              <div className="fb-btn-holder">
                                  <Button className='text-primary' variant="outline-light"><i className="far hom-icon fa-comment-alt"></i> <span>10</span> Comment</Button>
                              </div>
                              <div className="fb-btn-holder">
                                  <Button className='text-primary' variant="outline-light"><i className="fa hom-icon fa-share-square"></i> <span>10</span> Share</Button>
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
        </Container>
    );
};

export default UserAllPost;