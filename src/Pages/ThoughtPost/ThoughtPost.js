import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import man from "../../Images/man.jpg";
import "./ThoughtPost.css";

const ThoughtPost = (props) => {
  props.triggerCheckLoggedIn();

  return (
    <Container>
      <Row className="bg-white fb-box-shadow d-flex justify-content-s align-items-center p-3">

        <Col md={2}>
            <img
              className="rounded-circle"
              style={{ width: "80px", height: "80px", objectFit: 'cover' }}
              src={man}
              alt='profile'
            />
          </Col>
          <Col md={6}>
            <Form.Control
              className="rounded-pill"
              type="text"
              placeholder="Share a thought that you like"
            />
          </Col>

      </Row>

         {/* <Modal
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
                        {userGeneralInfo.cover_pic!==null && <div>
                             <img
                               className="rounded-circle mx-2"
                               style={{ width: "35px", height: "35px", 'objectFit': 'cover' }} 
                               src={`${BASE_URL}${userGeneralInfo.profile_pic}`}
                               alt=''
                           />
                         </div>}
                         {userGeneralInfo.cover_pic===null && <div>
                             <img
                               className="rounded-circle mx-2"
                               style={{ width: "35px", height: "35px", 'objectFit': 'cover' }} 
                               src={man}
                               alt=''
                           />
                         </div>}
                         <div> */}
                             {/* <h6>{userGeneralInfo.user_first_name}</h6> */}
                         {/* </div>
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
           </Modal> */}
    </Container>
  );
};

export default ThoughtPost;
