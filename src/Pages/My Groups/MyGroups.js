import React from "react";
import { Button, Modal, Container, Row, Form, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from '../../assets/re/cover_photo.svg'


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
        fetch(`http://127.0.0.1:8000/user/user-general-info/${localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        .then(res => res.json())
        .then(data => setUserGeneralInfo(data))
    }, [localStorage.getItem('id')])


    // getting my-groups data
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/group/${localStorage.getItem('id')}/my-groups/`, {
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
}, [localStorage.getItem('id')])

// getting user info
useEffect(() => {
  fetch(`http://127.0.0.1:8000/user/${localStorage.getItem('id')}`, {
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


const handleGroup = () => {
  // e.preventDefault();
  const newData = new FormData();
  // newData.append('creator', 1)
  newData.append('name', name);
  newData.append('about', about);
  newData.append('cover_pic', coverPic,);
  newData.append('profile_pic', profilePic,);
  console.log(coverPic)
  setShow(false)
  console.log(newData)

  fetch('http://127.0.0.1:8000/group/create/', {
    method: "POST",
    headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
    },
    body: newData
  })
    .then(res=> {
      res.json()
      if (res.status!==201){
        return alert("all fileds required")
      } else {
        // getting my-groups again
        fetch(`http://127.0.0.1:8000/group/${localStorage.getItem('id')}/my-groups/`, {
          method: 'GET',
          headers: {
              "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
              "Accept": "application/json",
              "Content-Type": "application/json"
          }})
          .then(res => res.json())
          .then(data => {
            setMyGroups(data)
            setNoGroup([])
          })
      }
    })
    .catch(error => console.log(error))
}

const BASE_URL = "http://127.0.0.1:8000"
  return (
      <Container>
        <Row className="pt-1">
         {userGeneralInfo.cover_pic!==null && <img style={{height: "320px", width: "850px", objectFit: 'cover'}} className="mx-auto mt-5" alt="profile_img" src={`${BASE_URL}${userGeneralInfo.cover_pic}`} />}
        {userGeneralInfo.cover_pic===null && <img style={{height: "320px", width: "850px", objectFit:'cover'}} className="mx-auto mt-5" alt="profile_img" src={img} />}
          <h2 style={{ color: "#1877f2" }} className="text-center my-3">
            {userInfo.first_name}
          </h2>

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
                <Form.Control type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Group Name" />
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
              <img style={{ height: "60px", width: "60px", objectFit: 'cover' }} alt="s" className="rounded-circle" src={`${BASE_URL}${group.cover_pic}`} />
              <div  className="d-flex flex-column justify-content-center mx-4">
                <p className="m-0 p-0"> <b><Link  className="text-decoration-none" to={`/group/${group.id}/details`}>  {group.name}</Link></b></p>
                <small> {group.created_date} </small> 
              </div>
            </Col>
          </Row>)
        }
      </Container>
  );
};

export default MyGroups;

