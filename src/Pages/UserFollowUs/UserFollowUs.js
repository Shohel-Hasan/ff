import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img from '../../Images/RR_Logo (3)-01.png';

const UserFollowUs = () => {
    return (
        <Container>
            <Row xs={1} md={3}  className="d-flex justify-content-center g-4">
                <Col md={8} style={{ marginTop: '20px' }} className="fb-box-shadow d-flex align-items-center py-3">
                     <img style={{ height: "60px", width: "60px", objectFit: 'cover' }} alt="user_profile" className="rounded-circle" src={img} />
                     <div  className="d-flex flex-column justify-content-center mx-4">
                         <p><b> <Link className='text-decoration-none' to='#'>Md.Nazirul Islam</Link>  </b></p>
                         <small>P-HERO</small> 
                     </div>
                </Col>
            </Row>

        </Container>
    );
};

export default UserFollowUs;