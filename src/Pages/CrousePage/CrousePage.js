import React from 'react';
import {Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CrousePage.css'
import img from '../../Images/man.jpg'

const CrousePage = (props) => {
    props.triggerCheckLoggedIn();
    return (
        <Container >
            <Row>
             <Col>
                 <Row>
                 <Col>
                {/* Search Section Start */}
                <div className="nav_left">
                    <div className="nav_search mt-4">
                         <i className="material-icons">search</i>
                        <input type="text" className='mx-2' placeholder="Search a class" />
                    </div>
                </div>
              </Col>
            </Row>
             {/* Search Section End */}

               {/* Nested Routing Section Start */}


                <div className='d-flex justify-content-around mt-5'>
                    <div className='fb-box-shadow p-3 mx-1'><Link className='text-decoration-none'  to="#">Create course</Link></div>
                    <div className='fb-box-shadow p-3 mx-1'><Link className='text-decoration-none' to="#">Course teacher</Link></div>
                    <div className='fb-box-shadow p-3 mx-1'><Link className='text-decoration-none' to="#">Course student</Link></div>
                </div>
                 <hr
                    style={{
                    color: "#7d7f85",
                    backgroundColor: "#7d7f85",
                    height: "2px",
                    margin: " auto",
                    width: "90%",
                    marginTop: "15px",
                    }}
                />
             {/* Nested Routing Section End */}

              {/* Notification Section Start */}
                    <div className='d-flex justify-content-around mt-3 flex-wrap'>
                        <div><Button className='mx-1 mt-2'> Following <Badge bg="danger">9</Badge>
                        <span className="visually-hidden">unread messages</span></Button>
                        </div>
                        <div><Button className='mx-1 mt-2'> Like <Badge bg="danger">9</Badge>
                        <span className="visually-hidden">unread messages</span></Button>
                        </div>
                        <div><Button className='mx-1 mt-2'> Comment <Badge bg="danger">9</Badge>
                        <span className="visually-hidden">unread messages</span></Button>
                        </div>
                        <div><Button className='mx-1 mt-2'> Share <Badge bg="danger">9</Badge>
                        <span className="visually-hidden">unread messages</span></Button>
                        </div> 
                    </div>
                        <hr
                        style={{
                        color: "#1877F2",
                        backgroundColor: "#1877F2",
                        height: "2px",
                        margin: " auto",
                        width: "90%",
                        marginTop: "15px",
                        }}
                    />
             {/* Notification Section End */}


            {/* Course Info. Section Start */}
            
                    <Row className='pt-4 mt-5'>
                        
                        <Col>
                            <div className='d-flex'>
                            <div>
                                <img className='rounded profile-img img-fluid' src={img} alt="Course Cover" />
                            </div>
                            <div className='mx-2'>
                                <p className='fw-bold'>Lorem ipsum dolor sit amet.</p>
                               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod hic repellat vero perspiciatis animi eum, <br/> cupiditate, consequatur dolor eos nostrum blanditiis dicta dolore magnam illum.</p>
                            </div>
                            <div>
                                <Button size="sm">Follow +</Button>
                            </div>
                               
                            </div>
                        </Col>

                       
                        
                    
                        {/* Information Details */}

                    
                    

                     {/* Like, Comment section */}


                      <hr
                    style={{
                    color: "#1877F2",
                    backgroundColor: "#1877F2",
                    height: "2px",
                    margin: " auto",
                    width: "90%",
                    marginTop: "15px",
                    }}
                />
                      
                        <Col md='12' className='mt-3 pb-3'>
                             <div className="fb-card-actions-holder">
                                <div className="fb-card-actions d-flex justify-content-around">
                                    <div className="fb-btn-holder">
                                        <Button className='text-primary' variant="outline-light"> <i className="fa fa-thumbs-up"></i> Like</Button>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <Button className='text-primary' variant="outline-light"><i className="far fa-comment-alt"></i> Comment</Button>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <Button className='text-primary' variant="outline-light"><i className="fa fa-share-square"></i> Share</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                         </Row>
                    <Row className='pt-4 mt-5'>
                        
                        <Col>
                            <div className='d-flex'>
                            <div>
                                <img className='rounded profile-img img-fluid' src={img} alt="Course Cover" />
                            </div>
                            <div className='mx-2'>
                                <p className='fw-bold'>Lorem ipsum dolor sit amet.</p>
                               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod hic repellat vero perspiciatis animi eum, <br/> cupiditate, consequatur dolor eos nostrum blanditiis dicta dolore magnam illum.</p>
                            </div>
                            <div>
                                <Button size="sm">Follow +</Button>
                            </div>
                               
                            </div>
                        </Col>

                       
                        
                    
                        {/* Information Details */}

                    
                    

                     {/* Like, Comment section */}


                      <hr
                    style={{
                    color: "#1877F2",
                    backgroundColor: "#1877F2",
                    height: "2px",
                    margin: " auto",
                    width: "90%",
                    marginTop: "15px",
                    }}
                />
                      
                        <Col md='12' className='mt-3 pb-3'>
                             <div className="fb-card-actions-holder">
                                <div className="fb-card-actions d-flex justify-content-around">
                                    <div className="fb-btn-holder">
                                        <Button className='text-primary' variant="outline-light"><i className="fa fa-thumbs-up"></i> Like</Button>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <Button className='text-primary' variant="outline-light"><i className="far fa-comment-alt"></i> Comment</Button>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <Button className='text-primary' variant="outline-light"><i className="fa fa-share-square"></i> Share</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                         </Row>
                    </Col>
                   
            </Row>

            
        </Container>

    );
};

export default CrousePage;