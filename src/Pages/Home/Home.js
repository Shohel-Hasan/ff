import React, { useState } from 'react';
import { Col, Container, Form, Row, Modal,Button } from 'react-bootstrap';
import Slider from 'react-slick';
import './Home.css';
import man from '../../Images/saddam.jpg';

const Home = () => {
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);


    
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
   
    responsive: [
      
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          width: '200px'
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
         
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          borderRadius: '8px',
         
        }
      }
    ]
  };

    return (
        <Container fluid className='pt-5'>
            <Row className="justify-content-md-center pt-5">
                {/* Left col section start */}
                <Col xs={3} className=''>
                    Left col section 
                </Col>
                {/* Left col section End */}

                {/* Middle col section start */}
                <Col xs={7}>
                    <Row className='justify-content-center align-items-center'>
                        <Col>
                            <Slider {...settings}>
                                <div>
                                    <img style={{'objectFit': 'cover' }} className="home-slider img-fluid" src={man} alt=''/>
                                    
                                </div>
                                <div>
                                    <img style={{'objectFit': 'cover' }} className="home-slider img-fluid" src={man} alt=''/>
                                    
                                </div>
                                <div>
                                    <img style={{'objectFit': 'cover' }} className="home-slider img-fluid" src={man} alt=''/>
                                    
                                </div>
                                <div>
                                    <img style={{'objectFit': 'cover' }} className="home-slider img-fluid" src={man} alt=''/>
                                
                                </div>
                                <div>
                                    <img style={{'objectFit': 'cover' }} className="home-slider img-fluid" src={man} alt=''/>
                                
                                </div>
                            </Slider>
                        </Col>
                    </Row>

                {/* Post Section */}
                <Row className='justify-content-center my-4'>
                    <Col md={9}>
                        <div className="p-3 shadow-effect d-flex align-items-center  ">
                            <div className='w-25'>
                                <img
                                className="rounded-circle"
                                style={{ width: "56px", height: "56px", 'objectFit': 'cover' }} 
                                src={man}
                                alt=''
                                />
                            </div>
                            <div className='w-75'>
                                <Form.Control
                                onClick={() => setShow(true)}
                                className="rounded-pill post-filed mb-2 "
                                type="text"
                                placeholder="Share your research thought"
                                />
                    
                                <Form.Control
                                onClick={() => setModal(true)}
                                className="rounded-pill my-1 post-filed"
                                type="text"
                                placeholder="Share your logical thought"
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
                              <Modal.Header closeButton >
                                   <div className=''>
                                       <p className='title'>Thought Post </p>
                                   </div>
                              </Modal.Header>
                              <Modal.Body className="fb-box-shadow">
                                  <div className='d-flex mb-2'>
                                      <div>
                                          <img
                                             className="rounded-circle mx-2"
                                             style={{ width: "35px", height: "35px", 'objectFit': 'cover' }} 
                                             src={man}
                                             alt=''
                                         />
                                      </div>
                                      <div>
                                           <h6>Md. Saddam Hossain</h6>
                                      </div>
                                  </div>
                                   <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                     <Form.Control as="textarea" rows={3}  placeholder="What's on your mind?"/>
                                   </Form.Group>
                                   
                                   <div className="d-grid gap-2">
                                    <Button variant="primary" size="sm">
                                      Post
                                    </Button>
                                    </div>
                                   
                              </Modal.Body>
                            </Modal>
                          </div>

                       
                            <Modal
                              show={modal}
                              onHide={() => setModal(false)}
                              dialogClassName="modal-90w"
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header closeButton>
                                   <div className=''>
                                       <p className='fw-bold'>Research Summary</p>
                                   </div>
                              </Modal.Header>
                              <Modal.Body className="fb-box-shadow">
                                  <div className='d-flex mb-2'>
                                      <div>
                                          <img
                                             className="rounded-circle mx-2"
                                             style={{ width: "35px", height: "35px", 'objectFit': 'cover' }} 
                                             src={man}
                                             alt=''
                                         />
                                      </div>
                                      <div>
                                           <h6>Md. Saddam Hossain</h6>
                                      </div>
                                  </div>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3} />
                                  </Form.Group>
                                  <div className="d-grid gap-2">
                                        <Button variant="primary" size="sm">
                                          Post
                                        </Button>
                                  </div>

                                </Modal.Body>
                            </Modal>
                    </Col>
                </Row>

                {/* Course Information Start */}
                <Row>
                    <Col className='my-3'>
                       <div className="fb-cards-designs">
                          <div className="fb-clone-card">
                              <div className="fb-card-main-content">
                                    <div className="fb-card-header">
                                        <div className="user-post-info">
                                                <div className="user-thumb">
                                                    <img src="https://i.ibb.co/St6QD00/DSC-0003.jpg" className="img-responsive" alt=''/>
                                                </div>
                                                <div className="user-information">
                                                          <p>Nazirul Islam</p>
                                                          <small>1 hr</small>
                                                  </div>
                                                  </div>
                                                  <div className="post-action">
                                                      <i class="fa fa-ellipsis-h"></i>
                                                  </div>
                                              </div>
                                              <div className="fb-card-body simple-text-card simple-image-card">
                                                  <p className='p-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                              </div>
                                          </div>

                                          <div className="fb-card-like-comment-holder">
                                              <div className="fb-card-like-comment">
                                                  <div className="likes-emoji-holder">
                                                      <span className='emoji-holder'>14 Likes</span>
                                                  </div>
                                                  <div className="like-comment-holder">
                                                      <span  className='emoji-holder'>10 Comments</span>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="fb-card-actions-holder">
                                              <div className="fb-card-actions">
                                                  <div className="fb-btn-holder">
                                                      <a href="/"><i className="fa hom-icon fa-thumbs-up"></i> Like</a>
                                                  </div>
                                                  <div className="fb-btn-holder">
                                                      <a href="/"><i className="far hom-icon fa-comment-alt"></i> Comment</a>
                                                  </div>
                                                  <div className="fb-btn-holder">
                                                      <a href="/"><i className="fa hom-icon fa-share-square"></i> Share</a>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="fb-card-comments">
                                              <div className="comment-input-holder">
                                                  <div className="user-thumb">
                                                      <img src="https://i.ibb.co/St6QD00/DSC-0003.jpg" className="img-responsive" alt=''/>
                                                  </div>
                                                  <div className="comment-input">
                                                     
                                                      <Form.Control
                                                        className="comment-box rounded-pill "
                                                        type="text"
                                                        placeholder="Write a comment..."
                                                      />
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                            </Col>
                         </Row>

              </Col>
               {/* Middle col section end */}


               {/* Right Col section */}
              <Col xs={2}  className=''>
                Right Col section
              </Col>
            </Row>
       </Container>
    );
};

export default Home;