import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Modal, Row } from "react-bootstrap";
import man from "../../Images/man.jpg";
import "./ThoughtPost.css";

const ThoughtPost = (props) => {
  props.triggerCheckLoggedIn();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [description, setDescription] = useState("");
  const [thoughtPosts, setThoughtPosts] = useState([]);
  const [noThoughtPosts, setNoThoughtPosts] = useState([]);



  
// getting thought posts
useEffect(() => {
  fetch(`http://127.0.0.1:8000/post/thoughtpost/all/`, {
  method: 'GET',
  headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
  }})
  .then(res => res.json())
  .then(data => {
      if (data.message) {
        setNoThoughtPosts([{data: data.message}]
        )
      } else {
        setThoughtPosts(data)
        console.log(data)
      }
  })
}, [])
   
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
                fetch(`http://127.0.0.1:8000/post/thoughtpost/all/`, {
                  method: 'GET',
                  headers: {
                      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                      "Accept": "application/json",
                      "Content-Type": "application/json"
                  }})
                  .then(res => res.json()
                  )
                  .then(data => setThoughtPosts(data))
              }
          })
    .catch(error => console.log(error))
 }
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
    <Container className="">
        <Row className='justify-content-center my-4'>
            <Col md={8}>
                <div className='p-2 shadow-effect d-flex justify-content-center align-items-center'>
                    <div className="w-25">
                      <div className='text-center'>
                          <img
                          className="rounded-circle"
                          style={{ width: "80px", height: "80px", objectFit: 'cover' }} 
                          src={man}
                          alt=''
                          />
                      </div>
                    </div>
                
                   <div className='w-50 mx-4'>
                      <Form.Control
                      onClick={handleShow}
                      className="rounded-pill post-filed mb-2"
                      type="text"
                      placeholder="Share a thought that you like"
                      />
                  </div>
                </div>
            </Col>              
        </Row>


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
                     <div className='d-flex align-items-center mb-2'>
                        <div>
                             <img
                               className="rounded-circle mx-2"
                               style={{ width: "35px", height: "35px", 'objectFit': 'cover' }} 
                               src={man}
                               alt=''
                           />
                         </div>
                         <div> 
                             <h6>Nazirul Islam</h6>
                          </div>
                     </div>
                     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                       <Form.Control onChange={(e) =>setDescription(e.target.value)}  as="textarea" rows={8}  placeholder="Share a thought that you like"/>
                     </Form.Group>
                       
                     <div className="d-grid gap-2">
                       <Button onClick={()=> handleThoughtPost()} variant="primary" size="sm" >
                         Post
                       </Button>
                     </div>
                       
                   </Modal.Body>
           </Modal> 
          
            {/*------- All Post Showing Section Start--------*/}
            <Row className="d-flex justify-content-center">
                      {thoughtPosts && thoughtPosts.map((post, index) => <Col md={9}  key={index}>
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
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>

                                    <Dropdown.Menu style={{margin: '0', padding: '0'}}>
                                      <Dropdown.Item  eventKey="1">Edit</Dropdown.Item>
                                      <Dropdown.Item  eventKey="2">Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </div>
                          
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

export default ThoughtPost;
