import React, { useState } from "react";
import { Container, Form, Modal } from "react-bootstrap";
import man from "../../Images/man.jpg";
import "./MainPost.css";

const MainPost = (props) => {
  const [show, setShow] = useState(false);

  props.triggerCheckLoggedIn();

  return (
    <Container>
      {/* Post form section */}
      <div className="d-flex p-4 mt-5  bg-white fb-box-shadow justify-content-center align-items-center">
        <div>
          <div>
            <img
              className="rounded-circle"
              style={{ width: "70px", height: "70px" }}
              src={man}
            />
          </div>
        </div>

        <div>
          <Form.Control
            onClick={() => setShow(true)}
            className="rounded-pill mx-4 p-2 px-5 mb-3"
            type="text"
            placeholder="Share your any research/logical thought"
          />

          <Form.Control
            onClick={() => setShow(true)}
            className="rounded-pill mx-4 p-2 px-5"
            type="text"
            placeholder="Share your any research/logical thought"
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
          <Modal.Header closeButton>
            <Modal.Title
              className="justify-content-center"
              id="example-custom-modal-styling-title"
            >
              Create Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="fb-box-shadow">
            <textarea />
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default MainPost;
