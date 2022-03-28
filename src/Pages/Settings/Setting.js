import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './Setting.css'
import ChangepassForm from "../../components/ChangepassForm";
import Overlay from '../../components/Overlay';


const Setting = (props) => {

    
  const [showChangepass, setShowChangepass] = useState(false);
  
  function toggleShowChangePass() {
    setShowChangepass(!showChangepass);
  }
   
    return (
        <Container >
            {showChangepass && <ChangepassForm toggle={toggleShowChangePass} />}
            {showChangepass && <Overlay />}
            <Row>
                <Col className='text-center main_container'>
                    <h4>User Privacy</h4>
                    <Button size='sm' onClick={toggleShowChangePass}>Change password</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Setting;