import React, { useState } from 'react';
import { Col, Container, Form, Row, Modal,Button, Collapse, FormControl, InputGroup } from 'react-bootstrap';
import Slider from 'react-slick';
import './Home.css';
import man from '../../Images/saddam.jpg';


const Home = () => {
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);

    // Summary Post States
    const [title, setTitle] = useState(false);
    const [objective, setObjective] = useState(false);
    const [theoretical, setTheoretical] = useState(false);
    const [gap, setGap] = useState(false);
    const [uniqueness, setUniqueness] = useState(false);
    const [data, setData] = useState(false);
    const [methodology, setMethodology] = useState(false);
    const [result, setResult] = useState(false);
    const [validity, setValidity] = useState(false);
    const [usefulness, setUsefulness] = useState(false);
    const [reference, setReference] = useState(false);
    const [annex, setAnnex] = useState(false);
    const [upload, setUpload] = useState(false);
    const [keyword, setKeyword] = useState(false);

    //Local Storage Data State

    const [storeTitle, setStoreTitle] = useState('');
    const [storeObjective, setStoreObjective] = useState('');
    const [storeTheoretical, setStoreTheoretical] = useState('');
    const [storeGap, setStoreGap] = useState('');
    const [storeUniqueness, setStoreUniqueness] = useState('');
    const [storeData, setStoreData] = useState('');
    const [storeMethodology, setStoreMethodology] = useState('');
    const [storeResult, setStoreResult] = useState('');
    const [storeValidity, setStoreValidity] = useState('');
    const [storeUsefulness, setStoreUsefulness] = useState('');
    const [storeReference, setStoreReference] = useState('');
    const [storeAnnex, setStoreAnnex] = useState('');
    
  
    const handle = () => {
      localStorage.setItem('storeTitle', storeTitle);
      localStorage.setItem('storeObjective', storeObjective);
      localStorage.setItem('storeTheoretical', storeTheoretical);
      localStorage.setItem('storeUniqueness', storeUniqueness);
      localStorage.setItem('storeData', storeData);
      localStorage.setItem('storeMethodology', storeMethodology);
      localStorage.setItem('storeResult', storeResult);
      localStorage.setItem('storeValidity', storeValidity);
      localStorage.setItem('storeGap', storeGap);
      localStorage.setItem('storeUsefulness', storeUsefulness);
      localStorage.setItem('storeReference', storeReference);
      localStorage.setItem('storeAnnex', storeAnnex);
   };


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

  console.log(localStorage.getItem('storeTitle'))
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
                                placeholder="Share a thought that you like"
                                />
                    
                                <Form.Control
                                onClick={() => setModal(true)}
                                className="rounded-pill my-1 post-filed"
                                type="text"
                                placeholder="Share a research summary that you like"
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
                                     <Form.Control as="textarea" rows={3}  placeholder="Share a thought that you like"/>
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
                                       <p className='fw-bold title'>Research Summary</p>
                                   </div>
                              </Modal.Header>
                              <Modal.Body className="fb-box-shadow">

                                 <form>
                                     {/*-------- section-1------------ */}
                                     <div>
                                        <p onClick={() => setTitle(!title)} aria-expanded={title}>
                                             Title of research article &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={title}>
                                           <div id="example-collapse-text">
                                              <InputGroup className="mb-3"  onChange={(e) =>setStoreTitle(e.target.value)}>
                                                <FormControl defaultValue={localStorage.getItem('storeTitle')} placeholder="Title of research article" />
                                              </InputGroup> 
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                                      {/* section-2 */}
                                      <div>
                                        <p onClick={() => setObjective(!objective)} aria-expanded={objective}>
                                             Objective of the study &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={objective}>
                                           <div id="example-collapse-text">
                                              <Form.Group  onChange={(e) =>setStoreObjective(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Control defaultValue={localStorage.getItem('storeObjective')}  as="textarea" rows={6} placeholder='Objective of the study' />
                                             </Form.Group>
                                              <div className="text-end">
                                                      <Button size="sm" onClick={handle} variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                                      {/* section-3 */}
                                      <div>
                                        <p onClick={() => setTheoretical(!theoretical)} aria-expanded={theoretical}>
                                          Theoretical Background &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={theoretical}>
                                           <div id="example-collapse-text">
                                              <Form.Group onChange={(e) =>setStoreTheoretical(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Control defaultValue={localStorage.getItem('storeTheoretical')} as="textarea" rows={6} placeholder='Theoretical Background' />
                                             </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm"  variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                                      {/* section-4 */}
                                      <div>
                                        <p onClick={() => setGap(!gap)} aria-expanded={gap}>
                                          Research Gap &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={gap}>
                                           <div id="example-collapse-text">
                                              <Form.Group onChange={(e) =>setStoreGap(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Control defaultValue={localStorage.getItem('storeGap')}  as="textarea" rows={6} placeholder='Research Gap' />
                                             </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm"  variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                       {/* section-5 */}
                                       <div>
                                        <p onClick={() => setUniqueness(!uniqueness)} aria-expanded={uniqueness}>
                                          Uniqueness of the study &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={uniqueness}>
                                           <div id="example-collapse-text">
                                              <Form.Group onChange={(e) =>setStoreUniqueness(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Control defaultValue={localStorage.getItem('storeUniqueness')} as="textarea" rows={6} placeholder='Uniqueness of the study' />
                                             </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm"  variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                     {/* section-6 */}
                                     <div>
                                        <p onClick={() => setData(!data)} aria-expanded={data}>
                                          Data source/sample Information &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={data}>
                                           <div id="example-collapse-text">
                                              <Form.Group onChange={(e) =>setStoreData(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                 <Form.Control defaultValue={localStorage.getItem('storeData')} as="textarea" rows={6} placeholder='Data source/sample Information' />
                                              </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                      {/* section-7 */}
                                      <div>
                                        <p onClick={() => setMethodology(!methodology)} aria-expanded={methodology}>
                                          Research methodology &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={methodology}>
                                           <div id="example-collapse-text">
                                              <Form.Group onChange={(e) =>setStoreMethodology(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                 <Form.Control defaultValue={localStorage.getItem('storeMethodology')} as="textarea" rows={6} placeholder='Research methodology' />
                                              </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                      {/* section-8 */}
                                      <div>
                                        <p onClick={() => setResult(!result)} aria-expanded={result}>
                                          Result & discussion &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={result}>
                                           <div id="example-collapse-text">
                                              <Form.Group onChange={(e) =>setStoreResult(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                 <Form.Control defaultValue={localStorage.getItem('storeResult')} as="textarea" rows={6} placeholder='Result & discussion' />
                                              </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                       {/* section-9 */}
                                       <div>
                                        <p onClick={() => setValidity(!validity)} aria-expanded={validity}>
                                          Validity & reliability of finding &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={validity}>
                                           <div id="example-collapse-text">
                                              <Form.Group onChange={(e) =>setStoreValidity(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                 <Form.Control defaultValue={localStorage.getItem('storeValidity')} as="textarea" rows={6} placeholder='Validity & reliability of finding' />
                                              </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                      {/* section-10 */}
                                      <div>
                                        <p onClick={() => setUsefulness(!usefulness)} aria-expanded={usefulness}>
                                          Usefulness of the finding &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={usefulness}>
                                           <div id="example-collapse-text">
                                              <Form.Group onChange={(e) =>setStoreUsefulness(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                 <Form.Control defaultValue={localStorage.getItem('storeUsefulness')}  as="textarea" rows={6} placeholder='Usefulness of the finding' />
                                              </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                     {/* section-11 */}
                                     <div>
                                        <p onClick={() => setReference(!reference)} aria-expanded={reference}>
                                          Reference &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={reference}>
                                           <div id="example-collapse-text">
                                              <Form.Group onChange={(e) =>setStoreReference(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                 <Form.Control defaultValue={localStorage.getItem('storeReference')}  as="textarea" rows={6} placeholder='Reference' />
                                              </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                        {/* section-12 */}
                                        <div>
                                        <p onClick={() => setAnnex(!annex)} aria-expanded={annex}>
                                          Annex &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={annex}>
                                           <div id="example-collapse-text">
                                              <Form.Group  onChange={(e) =>setStoreAnnex(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                 <Form.Control defaultValue={localStorage.getItem('storeAnnex')} as="textarea" rows={6} placeholder='Annex' />
                                              </Form.Group>
                                              <div className="text-end">
                                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                     {/* section-13 */}
                                     <div>
                                        <p onClick={() => setUpload(!upload)} aria-expanded={upload}>
                                          Uploaded File &nbsp;
                                        </p>
                                         <Collapse in={upload}>
                                           <div id="example-collapse-text">
                                              <Form.Group controlId="formFileSm" className="mb-3">
                                                <Form.Control type="file" size="sm" />
                                              </Form.Group>
                                              <Form.Group controlId="formFileSm" className="mb-3">
                                                <Form.Control type="file" size="sm" />
                                              </Form.Group>
                                           </div>
                                        </Collapse>
                                     </div>
                        
                                      {/* section-14 */}
                                      <div>
                                        <p onClick={() => setKeyword(!keyword)} aria-expanded={keyword}>
                                          Keyword &nbsp;
                                              <i style={{color: 'blue'}} className='fas fa-edit'></i>
                                         </p>
                                         <Collapse in={keyword}>
                                           <div id="example-collapse-text">
                                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                 <Form.Control as="textarea" rows={6} placeholder='Keyword without space' />
                                              </Form.Group>
                                              <div className="text-end">
                                                      <Button size="sm" variant="primary">Save</Button>
                                              </div>
                                           </div>
                                        </Collapse>
                                     </div>

                                   {/*----------- Post Button --------------*/}
                                   <div className="text-end m-3">
                                        <Button className="px-4" size="sm" variant="primary">Post</Button>
                                   </div>
                              </form>
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