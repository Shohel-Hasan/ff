import React from "react";
import { Button, Modal, Container, Row, Form, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { upload } from "@testing-library/user-event/dist/upload";
import { Link, useNavigate } from "react-router-dom";


const MyGroups = (props) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userGeneralInfo, setUserGeneralInfo] = useState({});


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [myGroups, setMyGroups] = useState([]);
  const [noGroup, setNoGroup] = useState([]);

  props.triggerCheckLoggedIn();

      // getting user general Info
      useEffect(() => {
        fetch(`https://research-rider.herokuapp.com/user/user-general-info/${localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        .then(res => res.json())
        .then(data => setUserGeneralInfo(data))
    }, [localStorage.getItem('id')])


  useEffect(() => {
    fetch(`https://research-rider.herokuapp.com/group/${localStorage.getItem('id')}/my-groups/`, {
    method: 'GET',
    headers: {
        "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }})
    .then(res => res.json())
    .then(data => {
        if (data.message) {
          setNoGroup([{data: data.message}]
          )
        } else {
          setMyGroups(data)
          console.log(data)
        }
       
    })
}, [])

// getting user info
useEffect(() => {
  fetch(`https://research-rider.herokuapp.com/user/${localStorage.getItem('id')}`, {
  method: 'GET',
  headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
  }})
  .then(res => res.json())
  .then(data => {
      if (data.message) {
        setNoGroup([{data: data.message}]
        )
      } else {
        setUserInfo(data)
        console.log(data)
      }
     
  })
}, [localStorage.getItem('id')])

console.log(myGroups.length)
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [coverPic, setCoverPic] = useState();
  const [profilePic, setProfilePic] = useState();

//   group create function
//   const createGroupHeader = {
//     // mode: 'no-cors',
//     method: 'POST',
//     headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         name : name,
//         about: about,
//         cover_pic : coverPic,
//         profile_pic : profilePic
//     })
// };

const handleGroup = () => {
  // e.preventDefault();
  const newData = new FormData();
  newData.append('creator', 1)
  newData.append('name', name);
  newData.append('about', about);
  newData.append('cover_pic', coverPic,);
  newData.append('profile_pic', profilePic,);
  console.log(coverPic)
  setShow(false)
  console.log(newData)

  fetch('https://research-rider.herokuapp.com/group/create/', {
    method: "POST",
    headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
    },
    body: newData
  })
    .then(res=> {
      alert("group created successfully.")
      console.log(res)
      window.location.reload();
    })
      
    .catch(error => console.log(error))
}

const BASE_URL = "https://research-rider.herokuapp.com"
  return (
      <Container>
        <Row className="pt-5">
          <img style={{"height": "320px", "width": "850px"}} className="mx-auto mt-5" alt="profile_img" src={`${BASE_URL}${userGeneralInfo.cover_pic}`} />
          <h4 style={{ color: "blue" }} className="text-center mt-4 mb-3">
            {userInfo.first_name}
          </h4>

          <div className="d-flex justify-content-center">
          <Button
            className="mb-4"
            variant="primary"
            onClick={handleShow}
          >
            Create Group
          </Button>
          </div>
        </Row>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Your Name" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>About</Form.Label>
                <Form.Control as="textarea" onChange={e => setAbout(e.target.value)} value={about} rows={3} />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Cover Picture</Form.Label>
                <Form.Control onChange={e => setCoverPic(e.target.files[0])}  type="file" />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control onChange={e => setProfilePic(e.target.files[0])} type="file" />
              </Form.Group>
            
                <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button className="mx-2" onClick={()=> handleGroup()} variant="primary">Save</Button>
              
            </Form>
            
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
        {/* modal end  */}

        { noGroup &&
                       noGroup.map(no => <Row className="d-flex justify-content-center my-3"><Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center justify-content-center py-3"><div  className="d-flex flex-column justify-content-center mx-4">
                       <p className="m-0 p-0"> {no.data} </p></div></Col></Row> )
                    }

        { myGroups &&
            myGroups.map(group=>  <Row key={group.id} className="d-flex justify-content-center my-3">
            <Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center py-3 Python Bangladesh">
              <img style={{ height: "60px", width: "60px" }} alt="s" className="rounded-circle" src={`${BASE_URL}${group.cover_pic}`} />
              <div  className="d-flex flex-column justify-content-center mx-4">
                <p className="m-0 p-0"> <b> <Link to={`/group/${group.id}/details`}>  {group.name}</Link>  </b> </p>
                <small> {group.created_date} </small> 
              </div>
            </Col>
          </Row>)
        }
       {/* { noGroup ? noGroup.map(no => <Row className="d-flex justify-content-center my-3"><Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center justify-content-center py-3"><div  className="d-flex flex-column justify-content-center mx-4">
             <p className="m-0 p-0"> {no.data} </p></div></Col></Row> ) :  myGroups.map(group=>  <Row key={group.id} className="d-flex justify-content-center my-3">
         <Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center py-3 Python Bangladesh">
           <img style={{ height: "60px", width: "60px" }} alt="s" className="rounded-circle" src={`${BASE_URL}${group.cover_pic}`} />
           <div  className="d-flex flex-column justify-content-center mx-4">
             <p className="m-0 p-0"> <b> <Link to={`/group/${group.id}/details`}>  {group.name}</Link>  </b> </p>
             <small> {group.created_date} </small> 
           </div>
         </Col>
       </Row>)
       } */}

{/* 
<Row  className="d-flex justify-content-center my-3">
          <Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center py-3 Python Bangladesh">
            <img style={{ height: "60px", width: "60px" }} alt="s" className="rounded-circle" src={profile} />
            <div  className="d-flex flex-column justify-content-center mx-4">
              <p className="m-0 p-0"> <b>Python Bangladesh Python</b> </p>
              <small> 03/03/2022</small> 
            </div>
          </Col>
        </Row> */}
        {/* <Row  className="d-flex justify-content-center my-3">
          <Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center py-3 Python Bangladesh">
            <img style={{ height: "60px", width: "60px" }} alt="s" className="rounded-circle" src={profile} />
            <div  className="d-flex flex-column justify-content-center mx-4">
              <p className="m-0 p-0"> <b>Python Bangladesh</b> </p>
              <small> 03/03/2022</small> 
            </div>
          </Col>
        </Row>
        <Row  className="d-flex justify-content-center my-3">
          <Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center py-3 Python Bangladesh">
            <img style={{ height: "60px", width: "60px" }} alt="s" className="rounded-circle" src={profile} />
            <div  className="d-flex flex-column justify-content-center mx-4">
              <p className="m-0 p-0"> <b>Python Bangladesh</b> </p>
              <small> 03/03/2022</small> 
            </div>
          </Col>
        </Row>
        <Row  className="d-flex justify-content-center my-3">
          <Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center py-3 Python Bangladesh">
            <img style={{ height: "60px", width: "60px" }} alt="s" className="rounded-circle" src={profile} />
            <div  className="d-flex flex-column justify-content-center mx-4">
              <p className="m-0 p-0"> <b>Python Bangladesh</b> </p>
              <small> 03/03/2022</small> 
            </div>
          </Col>
        </Row> */}
      </Container>
  );
};

export default MyGroups;


// https://meet.google.com/zep-ygmw-rjp