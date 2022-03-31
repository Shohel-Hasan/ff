import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Container,Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import man from "../../Images/man.jpg";
const SummaryPost = (props) => {
  props.triggerCheckLoggedIn();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [summaryPosts, setSummaryPosts] = useState([]);
  const [noSummaryPosts, setNoSummaryPosts] = useState([]);
  
  const userId = useParams();

console.log(summaryPosts);
  
    //Local Storage Data State
    const [summaryTitle, setSummaryTitle] = useState('');
    const [summaryObjective, setSummaryObjective] = useState('');
    const [summaryTheoretical, setSummaryTheoretical] = useState('');
    const [summaryGap, setSummaryGap] = useState('');
    const [summaryUniqueness, setSummaryUniqueness] = useState('');
    const [summaryData, setSummaryData] = useState('');
    const [summaryMethodology, setSummaryMethodology] = useState('');
    const [summaryResult, setSummaryResult] = useState('');
    const [summaryValidity, setSummaryValidity] = useState('');
    const [summaryUsefulness, setSummaryUsefulness] = useState('');
    const [summaryReference, setSummaryReference] = useState('');
    const [summaryAnnex, setSummaryAnnex] = useState('');
    const [SummaryKeyword, setSummaryKeyword] = useState('');

    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();

   
  
    const handle = () => {
      localStorage.setItem('SummaryTitle', summaryTitle);
      localStorage.setItem('SummaryObjective', summaryObjective);
      localStorage.setItem('SummaryTheoretical', summaryTheoretical);
      localStorage.setItem('SummaryUniqueness', summaryUniqueness);
      localStorage.setItem('SummaryData', summaryData);
      localStorage.setItem('SummaryMethodology', summaryMethodology);
      localStorage.setItem('SummaryResult', summaryResult);
      localStorage.setItem('SummaryValidity', summaryValidity);
      localStorage.setItem('SummaryGap', summaryGap);
      localStorage.setItem('SummaryUsefulness', summaryUsefulness);
      localStorage.setItem('SummaryReference', summaryReference);
      localStorage.setItem('SummaryAnnex', summaryAnnex);
      localStorage.setItem('SummaryKeyword', SummaryKeyword);
   };

      
const handleSummaryPost = () => {
  // e.preventDefault();
  const newData = new FormData();
  setShow(false)
  newData.append('title_of_research_article', summaryTitle);
  newData.append('objective_of_the_study', summaryObjective);
  newData.append('theoritical_Background', summaryTheoretical);
  newData.append('research_gap', summaryGap,);
  newData.append('uniqueness_of_the_study', summaryUniqueness,);
  newData.append("data_source_sample_information",summaryData)
  newData.append("research_methodology",summaryMethodology)
  newData.append('result_discussion',summaryResult)
  newData.append('validity_reliability_of_finding',summaryValidity)
  newData.append('usefulness_of_the_finding',summaryUsefulness)
  newData.append('reference',summaryReference)
  newData.append('annex',summaryAnnex)
  newData.append('file1', file1? file1 : "")
  newData.append('file2', file2? file2 : "")
  newData.append('keyword',SummaryKeyword)
  newData.append('user', localStorage.getItem('id'))


  console.log(newData)

  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-summery-create/`, {
    method: "POST",
    headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
    },
    body: newData
  })
    .then(res=> {
              if (res.status===400) {
                alert("please enter all the required field");
              } else if(res.status===201) {
                fetch(`http://127.0.0.1:8000/post/summerypost/all/`, {
                  method: 'GET',
                  headers: {
                      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
                      "Accept": "application/json",
                      "Content-Type": "application/json"
                  }})
                  .then(res => res.json())
                  .then(data =>  setSummaryPosts(data))
              }
          })
    .catch(error => console.log(error))
 }
 // getting individual user summary posts 
useEffect(() => {
  fetch(`http://127.0.0.1:8000/post/${localStorage.getItem('id')}/user-summery-all`, {
  method: 'GET',
  headers: {
      "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
      "Accept": "application/json",
      "Content-Type": "application/json"
  }})
  .then(res =>{
    return res.json()
  })
  .then(data => {
      if (data.message) {
        setNoSummaryPosts([{data: data.message}]
        )
      } else {
        setSummaryPosts(data)
      } 
  })
}, [userId.userId]);

  //Dropdown Toggle function
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    href="/#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <i className="fa fa-ellipsis-h text-primary"></i>
  </span>
));
 const BASE_URL = "http://127.0.0.1:8000"

  return (
    <Container>
        <Row className='justify-content-center my-4'>
            <Col md={8}>
                <div className='p-2 shadow-effect d-flex justify-content-center align-items-center'>
                    <div className="w-25">
                      <div className='text-center'>
                          <img
                          className="rounded-circle"
                          style={{ width: "80px", height: "80px", objectFit: 'cover' }} 
                          src={man}
                          alt=''
                          />
                      </div>
                    </div>
                
                   <div className='w-50 mx-4'>
                      <Form.Control
                      onClick={handleShow}
                      className="rounded-pill post-filed mb-2"
                      type="text"
                      placeholder="Share a research summary that you like"
                      />
                  </div>
                </div>
            </Col>              
        </Row>


        <Modal
           show={show}
           onHide={() => setShow(false)}
           dialogClassName="modal-90w"
           aria-labelledby="contained-modal-title-vcenter"
           centered
           size='lg'
         >
          <Modal.Header closeButton>
              <div className=''>
                  <p className='fw-bolder fs-6'>Research Summary</p>
              </div>
          </Modal.Header>
          <Modal.Body className="fb-box-shadow">

                                    
          {/*-------- section-1------------ */}
            <Accordion>
              <form>
                  <Accordion.Item eventKey="0">
                  <Accordion.Header>
                          Title of research article   
                            
                  </Accordion.Header>
                      <Accordion.Body>
                        <div id="example-collapse-text">
                            <Form.Group  onChange={(e) =>setSummaryTitle(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Control defaultValue={localStorage.getItem('SummaryTitle')}  as="textarea" rows={2} placeholder='Objective of the study' />
                           </Form.Group>
                            <div className="text-end">
                                    <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                            </div>
                        </div>
                        </Accordion.Body>
                    </Accordion.Item>
                                      
                    {/* section-2 */}
                    <Accordion.Item eventKey="1">
                    <Accordion.Header>
                          Objective of the study   
                            
                      </Accordion.Header>
                        <Accordion.Body>
                        <div id="example-collapse-text">
                            <Form.Group  onChange={(e) =>setSummaryObjective(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Control defaultValue={localStorage.getItem('SummaryObjective')}  as="textarea" rows={6} placeholder='Objective of the study' />
                          </Form.Group>
                            <div className="text-end">
                              <Button size="sm" onClick={handle} variant="primary">Save as a draft</Button>
                            </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    {/* section-3 */}
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Theoretical Background   
                            
                        </Accordion.Header>
                        <Accordion.Body>
                        <div id="example-collapse-text">
                            <Form.Group onChange={(e) =>setSummaryTheoretical(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Control defaultValue={localStorage.getItem('SummaryTheoretical')} as="textarea" rows={6} placeholder='Theoretical Background' />
                          </Form.Group>
                            <div className="text-end">
                                    <Button onClick={handle} size="sm"  variant="primary">Save as a draft</Button>
                            </div>
                        </div>
                        </Accordion.Body>
                    </Accordion.Item>
                     {/* section-4 */}
                     <Accordion.Item eventKey="3">
                     <Accordion.Header>
                         Research Gap   
                             
                       </Accordion.Header>
                         <Accordion.Body>
                         <div id="example-collapse-text">
                             <Form.Group onChange={(e) =>setSummaryGap(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                               <Form.Control defaultValue={localStorage.getItem('SummaryGap')}  as="textarea" rows={6} placeholder='Research Gap' />
                           </Form.Group>
                             <div className="text-end">
                                     <Button onClick={handle} size="sm"  variant="primary">Save as a draft</Button>
                             </div>
                         </div>
                       </Accordion.Body>
                     </Accordion.Item>
      
                     {/* section-5 */}
                     <Accordion.Item eventKey="4">
                       <Accordion.Header>
                         Uniqueness of the study   
                             
                         </Accordion.Header>
                         <Accordion.Body>
                         <div id="example-collapse-text">
                             <Form.Group onChange={(e) =>setSummaryUniqueness(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                               <Form.Control defaultValue={localStorage.getItem('SummaryUniqueness')} as="textarea" rows={6} placeholder='Uniqueness of the study' />
                           </Form.Group>
                             <div className="text-end">
                                     <Button onClick={handle} size="sm"  variant="primary">Save as a draft</Button>
                             </div>
                         </div>
                         </Accordion.Body>
                     </Accordion.Item>
                            
                    {/* section-6 */}
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>
                            Data source/sample Information   
                                  
                        </Accordion.Header>
                        <Accordion.Body>
                          <div id="example-collapse-text">
                              <Form.Group onChange={(e) =>setSummaryData(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control defaultValue={localStorage.getItem('SummaryData')} as="textarea" rows={6} placeholder='Data source/sample Information' />
                              </Form.Group>
                              <div className="text-end">
                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                              </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
        
                      {/* section-7 */}
                      <Accordion.Item eventKey="6">
                        <Accordion.Header>
                          Research methodology   
                              
                        </Accordion.Header>
                        <Accordion.Body>
                          <div id="example-collapse-text">
                              <Form.Group onChange={(e) =>setSummaryMethodology(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control defaultValue={localStorage.getItem('SummaryMethodology')} as="textarea" rows={6} placeholder='Research methodology' />
                              </Form.Group>
                              <div className="text-end">
                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                              </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
        
                     {/* section-8 */}
                     <Accordion.Item eventKey="7">
                     <Accordion.Header>
                         Result & discussion   
                             
                       </Accordion.Header>
                       <Accordion.Body>
                         <div id="example-collapse-text">
                             <Form.Group onChange={(e) =>setSummaryResult(e.target.value)}  className="mb-3" controlId="exampleForm.ControlTextarea1">
                               <Form.Control defaultValue={localStorage.getItem('SummaryResult')} as="textarea" rows={6} placeholder='Result & discussion' />
                             </Form.Group>
                             <div className="text-end">
                                     <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                             </div>
                         </div>
                         </Accordion.Body>
                     </Accordion.Item>
      
                     {/* section-9 */}
                     <Accordion.Item eventKey="8">
                       <Accordion.Header>
                         Validity & reliability of finding   
                             
                       </Accordion.Header>
                         <Accordion.Body>
                         <div id="example-collapse-text">
                             <Form.Group onChange={(e) =>setSummaryValidity(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                               <Form.Control defaultValue={localStorage.getItem('SummaryValidity')} as="textarea" rows={6} placeholder='Validity & reliability of finding' />
                             </Form.Group>
                             <div className="text-end">
                                     <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                             </div>
                         </div>
                         </Accordion.Body>
                       </Accordion.Item>
      
                      {/* section-10 */}
                      <Accordion.Item eventKey="9">
                          <Accordion.Header>
                              Usefulness of the finding   
                              
                          </Accordion.Header>
                          <Accordion.Body>
                          <div id="example-collapse-text">
                              <Form.Group onChange={(e) =>setSummaryUsefulness(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control defaultValue={localStorage.getItem('SummaryUsefulness')}  as="textarea" rows={6} placeholder='Usefulness of the finding' />
                              </Form.Group>
                              <div className="text-end">
                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                              </div>
                          </div>
                          </Accordion.Body>
                      </Accordion.Item>
        
                    {/* section-11 */}
                    <Accordion.Item eventKey="10">
                      <Accordion.Header>
                          Reference   
                              
                        </Accordion.Header>
                        <Accordion.Body>
                          <div id="example-collapse-text">
                              <Form.Group onChange={(e) =>setSummaryReference(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control defaultValue={localStorage.getItem('SummaryReference')}  as="textarea" rows={6} placeholder='Reference' />
                              </Form.Group>
                              <div className="text-end">
                                      <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                              </div>
                          </div>
                        </Accordion.Body>
                        </Accordion.Item>
                            
                         {/* section-12 */}
                         <Accordion.Item eventKey="11">
                         <Accordion.Header>
                           Annex   
                               
                         </Accordion.Header>
                         <Accordion.Body>
                           <div id="example-collapse-text">
                               <Form.Group  onChange={(e) =>setSummaryAnnex(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                 <Form.Control defaultValue={localStorage.getItem('SummaryAnnex')} as="textarea" rows={6} placeholder='Annex' />
                               </Form.Group>
                               <div className="text-end">
                                       <Button onClick={handle} size="sm" variant="primary">Save as a draft</Button>
                               </div>
                           </div>
                           </Accordion.Body>
                         </Accordion.Item>
        
                     {/* section-13 */}
                     <Accordion.Item eventKey="12">
                         <Accordion.Header>
                           Uploaded File   
                         </Accordion.Header>
                         <Accordion.Body>
                           <div id="example-collapse-text">
                               <Form.Group controlId="formFileSm" className="mb-3">
                                 <Form.Control type="file" size="sm" onChange={e => setFile1(e.target.files[0])} />
                               </Form.Group>
                               <Form.Group controlId="formFileSm" className="mb-3">
                                 <Form.Control type="file" size="sm" onChange={e => setFile2(e.target.files[0])} />
                               </Form.Group>
                           </div>
                           </Accordion.Body>
                       </Accordion.Item>
        
                       {/* section-14 */}
                       <Accordion.Item eventKey="13">
                       <Accordion.Header>
                           Keyword   
                       </Accordion.Header>
                       <Accordion.Body>
                           <div id="example-collapse-text">
                               <Form.Group onChange={(e) =>setSummaryKeyword(e.target.value)} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                 <Form.Control defaultValue={localStorage.getItem('SummaryKeyword')} as="textarea" rows={6} placeholder='Keyword without space' />
                               </Form.Group>
                               <div className="text-end">
                                       <Button onClick={handle} size="sm" variant="primary">Save</Button>
                               </div>
                           </div>
                           </Accordion.Body>
                        </Accordion.Item>

                   {/*----------- Post Button --------------*/}
                   
                   <div className="text-end m-3">
                         <Button className="px-4" onClick={()=> handleSummaryPost()} size="sm" variant="primary">Post</Button>
                   </div>
               </form>
            </Accordion>
        </Modal.Body>
    </Modal>

    {/*-------------------- All Research summary Post showing here----------- */}

    <Row className="d-flex justify-content-center">
                      {summaryPosts && summaryPosts.map((post, index) => <Col md={9}  key={index}>
                        <div className="fb-cards-designs">
                          <div className="fb-clone-card">
                            <div className="fb-card-main-content">
                              <div className="fb-card-header">
                                <div className="user-post-info">
                                  <div className="user-thumb">
                                  { !post.group_name &&  <img  src={`${BASE_URL}${post.user_profile_pic}`} className="img-responsive" alt='user profile not found'/>}
                                  {post.group_name &&  <img  src={`${BASE_URL}${post.group_profile_pic}`} className="img-responsive" alt='group profile not found'/>}

                                  </div>
                                  <div className="user-information">
                                  {!post.group_name && <p>{post.user_first_name}</p>}
                                  {post.group_name && <p>{post.group_name}</p>}

                                    <small>{post.created_date}</small>
                                  </div>
                                </div>
                                <div className="post-action">
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>

                                    <Dropdown.Menu style={{margin: '0', padding: '0'}}>
                                      <Dropdown.Item  eventKey="1">Edit</Dropdown.Item>
                                      <Dropdown.Item  eventKey="2">Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </div>
                              {post.title_of_research_article &&  <div className="fb-card-body simple-text-card simple-image-card">
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Title of research article</b></p>
                                    <small>{post.objective_of_the_study}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Objective of the study</b></p>
                                    <small >{post.objective_of_the_study}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Theoretical background</b></p>
                                    <small >{post.theoritical_Background}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Research gap</b></p>
                                    <small >{post.research_gap}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Uniqueness of the study</b></p>
                                    <small >{post.uniqueness_of_the_study}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Data source/sample information</b></p>
                                    <small >{post.data_source_sample_information}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Research methodology</b></p>
                                    <small >{post.research_methodology}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Result & discussion</b></p>
                                    <small >{post.result_discussion}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Validity & reliability of finding</b></p>
                                    <small >{post.validity_reliability_of_finding}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Usefulness of the finding</b></p>
                                    <small >{post.usefulness_of_the_finding}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Reference</b></p>
                                    <small >{post.reference}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Annex</b></p>
                                    <small >{post.annex}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p className='p-0 m-0'><b>Keyword</b></p>
                                    <small>{post.keyword}</small>
                                  </div> 
                                  <div className='p-3'>
                                    {/* <input type='file' defaultValue={post.file1} /> */}
                                    <a href={`${BASE_URL}${post.file1}`} target="_blank">file1</a> <br />
                                    <a href={`${BASE_URL}${post.file2}`} target="_blank">file2</a>
                                  </div> 
                              </div>}

                              {!post.title_of_research_article &&  <div className="fb-card-body simple-text-card simple-image-card">
                                  <p className='p-3'>{post.description}</p>
                              </div>}
                            </div>

                              <div className="fb-card-actions-holder">
                                <div className="d-flex justify-content-between">
                                    <div className="fb-btn-holder">
                                        <Button className='text-primary' variant="outline-light"><i className="fa hom-icon fa-thumbs-up"></i> <span>10</span> like</Button>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <Button className='text-primary' variant="outline-light"><i className="far hom-icon fa-comment-alt"></i> <span>10</span> Comment</Button>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <Button className='text-primary' variant="outline-light"><i className="fa hom-icon fa-share-square"></i> <span>10</span> Share</Button>
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
                      </Col>)
                      }
                    </Row>



  
    </Container>
  );
};

export default SummaryPost;
