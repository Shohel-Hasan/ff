import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import group_icon from '../../Images/group.png';

const GroupsHome = () => {


    const [groupsSummaryPosts, setGroupsSummaryPosts] = useState([]);
    const [noGroupsSummaryPosts, setNoGroupsSummaryPosts] = useState([]);

    const [groupsThoughtPosts, setGroupsThoughtPosts] = useState([]);
    const [noGroupsThoughtPosts, setNoGroupsThoughtPosts] = useState([]);

    const [myGroups, setMyGroups] = useState([]);
    const [noGroup, setNoGroup] = useState([]);

    const [otherGroups, setOtherGroups] = useState([]);


    const userId = localStorage.getItem('id')
    const groupId = useParams();

    // getting summary posts
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/post/summerypost/all/`, {
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
                noGroupsSummaryPosts([{data: data.message}]
            )
            } else {
                setGroupsSummaryPosts(data.filter(gPosts => gPosts.group!==null))
            // console.log("asdfsa", data)
            }
        
        })
  }, [])

  // getting summary posts
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/post/thoughtpost/all/`, {
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
            setNoGroupsThoughtPosts([{data: data.message}]
        )
        } else {
            setGroupsThoughtPosts(data.filter(gPosts => gPosts.group!==null))
        // console.log("asdfsa", data)
        }
    })
}, [])


useEffect(() => {
    fetch(`http://127.0.0.1:8000/group/${localStorage.getItem('id')}/my-groups/`, {
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
          setNoGroup([{data: data.message}]
          )
        } else {
          setMyGroups(data)
        }
    })
}, [localStorage.getItem('id')])

console.log(myGroups);
useEffect(() => {
    fetch(`http://127.0.0.1:8000/group/all-groups/`, {
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
          setNoGroup([{data: data.message}]
          )
        } else {
            setOtherGroups(data.filter(otherGroup => otherGroup.creator!== +localStorage.getItem('id')))
        }
    })
}, [localStorage.getItem('id')])

// console.log(otherGroups)

const allGroupsPosts = [...groupsSummaryPosts , ...groupsThoughtPosts ]
// const randomPosts = allGroupsPosts.sort(() => Math.random() - 0.5)

const BASE_URL = "http://127.0.0.1:8000"

    return (
        <Container fluid className='home-container'>
            <Row className=''>
                <Col md={3}>
                    <Accordion className='my-3 rounded' alwaysOpen>
                      
                      <div className='text-center my-3'>
                        <Link to='/my-groups' className='fw-bold text-decoration-none fs-6' >+ Create your group</Link>
                      </div>

                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <img  src={group_icon} alt=''/> <span className='mx-1'>Group you manage</span> </Accordion.Header>
                                <Accordion.Body style={{padding: "0px"}}>
                                { noGroup &&
                                    noGroup.map(no => <Row className="d-flex justify-content-center my-3"><Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center justify-content-center py-3"><div  className="d-flex flex-column justify-content-center mx-4">
                                    <p> {no.data} </p></div></Col></Row> )
                                }

                                { myGroups &&
                                    myGroups.map(group=>  <Row key={group.id} className="d-flex justify-content-center my-3 ">
                                   
                                    <div  className="d-flex justify-content-start align-items-center">
                                       <img style={{height: '30px', width: '30px', objectFit:'cover'}} className='rounded-pill mx-2' src={`${BASE_URL}${group.cover_pic}`}  alt='cover_pic'/>
                                       <Link className='text-decoration-none' to={`/group/${group.id}/details`}>  {group.name}</Link> 
                                    </div>
                                    </Row>)
                                    }
                                </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><img src={group_icon} alt=''/> <span className='mx-1'>Others</span></Accordion.Header>
                                <Accordion.Body style={{padding: "0px"}}>
                              

                                { otherGroups &&
                                    otherGroups.map(group=>  <Row key={group.id} className="d-flex justify-content-center my-3">
                                        <div className="d-flex justify-content-start align-items-center">
                                           <img style={{height: '30px', width: '30px',objectFit:'cover'}} className='rounded-pill mx-2' src={`${BASE_URL}${group.cover_pic}`}  alt='cover_pic'/>
                                          <Link className='text-decoration-none' to={`/group/${group.id}/details`}>  {group.name}</Link> 
                                        </div>
                                    </Row>)
                                    }
                                    { otherGroups === null &&  <h4 className='text-danger'>You Don't Enroll Any Course Yet</h4> }
                                </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col md={7
                }>
                {allGroupsPosts && allGroupsPosts.map((post, index) => <div  key={index} className='my-3'>
                        <div className="fb-cards-designs">
                          <div className="fb-clone-card">
                            <div className="fb-card-main-content">
                              <div className="fb-card-header">
                                <div className="user-post-info">
                                  <div className="user-thumb">
                                  { !post.group_name &&  <img style={{objectFit: 'cover'}} src={`${BASE_URL}${post.user_profile_pic}`} className="img-responsive" alt='user profile not found'/>}
                                  {post.group_name &&  <img style={{objectFit: 'cover'}} src={`${BASE_URL}${post.group_profile_pic}`} className="img-responsive" alt='group profile not found'/>}

                                  </div>
                                  <div className="user-information">
                                  {!post.group_name && <p><Link className='text-decoration-none' to={`/user/${post.user}`}>{post.user_first_name}</Link></p>}
                                  {post.group_name && <p><Link className='text-decoration-none'  to={`/group/${post.group}/details`}>{post.group_name}</Link></p>}

                                    <small>{post.created_date}</small>
                                  </div>
                                </div>
                                <div className="post-action">
                                    <i class="fa fa-ellipsis-h"></i>
                                </div>
                              </div>
                              {post.title_of_research_article &&  <div className="fb-card-body simple-text-card simple-image-card">
                                  <div className='p-3'>
                                    <p><b>Title of research article</b></p>
                                    <small>{post.objective_of_the_study}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Objective of the study</b></p>
                                    <small >{post.objective_of_the_study}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Theoretical background</b></p>
                                    <small >{post.theoritical_Background}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Research gap</b></p>
                                    <small >{post.research_gap}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Uniqueness of the study</b></p>
                                    <small >{post.uniqueness_of_the_study}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Data source/sample information</b></p>
                                    <small >{post.data_source_sample_information}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Research methodology</b></p>
                                    <small >{post.research_methodology}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Result & discussion</b></p>
                                    <small >{post.result_discussion}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Validity & reliability of finding</b></p>
                                    <small >{post.validity_reliability_of_finding}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Usefulness of the finding</b></p>
                                    <small >{post.usefulness_of_the_finding}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Reference</b></p>
                                    <small >{post.reference}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Annex</b></p>
                                    <small >{post.annex}</small>
                                  </div> 
                                  <div className='p-3'>
                                    <p><b>Keyword</b></p>
                                    <small>{post.keyword}</small>
                                  </div> 
                                  <div className='p-3'>
                                    {/* <input type='file' defaultValue={post.file1} /> */}
                                    <a  href={`${BASE_URL}${post.file1}`} target="_blank">file1</a> <br />
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
                                        <span className='text-primary'><i className="fa hom-icon fa-thumbs-up"></i> <span>10</span> Like</span>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <span className='text-primary'><i className="far hom-icon fa-comment-alt"></i> <span>10</span> Comment</span>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <span className='text-primary'><i className="fa hom-icon fa-share-square"></i> <span>10</span> Share</span>
                                    </div>
                                </div>
                              </div>

                              <div className="fb-card-comments">
                                  <div className="comment-input-holder">
                                    <div className="user-thumb">
                                    { !post.group_name &&  <img style={{objectFit: 'cover'}}  src={`${BASE_URL}${post.user_profile_pic}`} className="img-responsive" alt='user profile not found'/>}
                                     {post.group_name &&  <img style={{objectFit: 'cover'}} src={`${BASE_URL}${post.group_profile_pic}`} className="img-responsive" alt='group profile not found'/>}
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
                      </div>)
                      }
                </Col>

                <Col md={2}></Col>

            </Row>
 
        </Container>
    );
};

export default GroupsHome;