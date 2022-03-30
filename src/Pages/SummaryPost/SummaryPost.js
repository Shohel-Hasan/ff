import React from "react";
import { Container, Form } from "react-bootstrap";
import man from "../../Images/man.jpg";
const SummaryPost = (props) => {
  props.triggerCheckLoggedIn();
  return (
    <Container>
      <div className="d-flex p-4  bg-white fb-box-shadow ">
        <div>
          <img
            className="rounded-circle mx-3"
            style={{ width: "40px", height: "40px" }}
            src={man}
            alt='profile'
          />
        </div>
        <div>
          <Form.Control
            className="rounded-pill mx-4 p-2 px-5"
            type="text"
            placeholder="Research summary"
          />
        </div>
      </div>

  
    </Container>
  );
};

export default SummaryPost;
