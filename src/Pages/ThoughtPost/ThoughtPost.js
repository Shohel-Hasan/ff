import React from "react";
import { Container, Form } from "react-bootstrap";
import man from "../../Images/man.jpg";
import "./ThoughtPost.css";

const ThoughtPost = (props) => {
  props.triggerCheckLoggedIn();

  return (
    <Container>
      <div className="d-flex p-4 mt-5 sbg-white fb-box-shadow ">
        <div>
          <img
            className="rounded-circle mx-3"
            style={{ width: "40px", height: "40px" }}
            src={man}
          />
        </div>
        <div>
          <Form.Control
            className="rounded-pill mx-4 p-2 px-5"
            type="text"
            placeholder="Share your any research/logical thought"
          />
        </div>
      </div>

      <div className="d-flex mt-4 p-4 bg-white  fb-box-shadow ">
        <div>
          <img
            className="rounded-circle mx-3"
            style={{ width: "40px", height: "40px" }}
            src={man}
          />
        </div>
        <div>
          <Form.Control
            className="rounded-pill mx-5 p-2"
            type="text"
            placeholder="Title of research article"
          />
        </div>
      </div>
    </Container>
  );
};

export default ThoughtPost;
