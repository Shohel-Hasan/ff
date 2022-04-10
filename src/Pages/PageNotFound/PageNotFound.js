import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import notFound from '../../Images/404.png'
import homeIcon from '../../assets/home_icon.svg'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className='text-center'>
                         <img src={notFound} alt="" />
                        
                    </div>
                </Col>
                <div className='text-center mt-4'>
                    <span 
                    className='text-white fs-3 fw-bolder rounded p-2'
                    style={{backgroundColor: '#dd7b7c'}}
                    >Page Not Found 404 !</span>   
                </div>

              
               <div className='mt-3 d-flex justify-content-center align-items'> 
                      <Button variant="outline-primary" className="rounded d-flex justify-content-center align-items" > 
                          <img 
                            style={{ width: "20px", height: "20px", objectFit:'cover' }}
                            src={homeIcon} 
                            alt=''
                          />
                          <Link to='/' className='text-primary text-decoration-none'>  Home </Link>
                    </Button>
                </div>
             
            </Row>
        </Container>
    );
};

export default PageNotFound;