import React, { useEffect, useState } from 'react';
import { Accordion, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GroupsHome = () => {


    const [groupsSummaryPosts, setGroupsSummaryPosts] = useState([]);
    const [noGroupsSummaryPosts, setNoGroupsSummaryPosts] = useState([]);

    const [groupsThoughtPosts, setGroupsThoughtPosts] = useState([]);
    const [noGroupsThoughtPosts, setNoGroupsThoughtPosts] = useState([]);

    const [myGroups, setMyGroups] = useState([]);
    const [noGroup, setNoGroup] = useState([]);

    const [otherGroups, setOtherGroups] = useState([]);


    const userId = localStorage.getItem('id')


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
const randomPosts = allGroupsPosts.sort(() => Math.random() - 0.5)

const BASE_URL = "http://127.0.0.1:8000"

    return (
        <Container fluid className='home-container'>
            <Row className=''>
                <Col md={3}>
                    <Accordion className='my-3 rounded' alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>My-Groups</Accordion.Header>
                                <Accordion.Body>
                                { noGroup &&
                                    noGroup.map(no => <Row className="d-flex justify-content-center my-3"><Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center justify-content-center py-3"><div  className="d-flex flex-column justify-content-center mx-4">
                                    <p className="m-0 p-0"> {no.data} </p></div></Col></Row> )
                                }

                                { myGroups &&
                                    myGroups.map(group=>  <Row key={group.id} className="d-flex justify-content-center my-3">
                                    
                                    <div  className="d-flex flex-column justify-content-center mx-4">
                                        <p className="m-0 p-0"> <b> <Link className='text-decoration-none' to={`/group/${group.id}/details`}>  {group.name}</Link>  </b> </p>
                                    </div>
                                    </Row>)
                                    }
                                </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Others-Group</Accordion.Header>
                                <Accordion.Body>
                                { noGroup &&
                                    noGroup.map(no => <Row className="d-flex justify-content-center my-3"><Col md={8} style={{ background: "#fff" }} className="fb-box-shadow d-flex align-items-center justify-content-center py-3"><div  className="d-flex flex-column justify-content-center mx-4">
                                    <p className="m-0 p-0"> {no.data} </p></div></Col></Row> )
                                }

                                { otherGroups &&
                                    otherGroups.map(group=>  <Row key={group.id} className="d-flex justify-content-center my-3">
                                        <div className="d-flex flex-column justify-content-center mx-4">
                                            <p className="m-0 p-0"> <b> <Link className='text-decoration-none' to={`/group/${group.id}/details`}>  {group.name}</Link>  </b> </p>
                                        </div>
                                    </Row>)
                                    }
                                </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col md={8}>
                {allGroupsPosts && allGroupsPosts.map((post, index) => <div  key={index} className='my-3'>
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
                                  {!post.group_name && <p><Link to={`/user/${post.user}`}>{post.user_first_name}</Link></p>}
                                  {post.group_name && <p><Link to={`/group/${post.group}/details`}>{post.group_name}</Link></p>}

                                    <small>{post.created_date}</small>
                                  </div>
                                </div>
                                <div className="post-action">
                                    <i class="fa fa-ellipsis-h"></i>
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
                                <div className="d-flex justify-content-between">
                                    <div className="fb-btn-holder">
                                        <a className='text-decoration-none' href="/"><i className="fa hom-icon fa-thumbs-up"></i> Like</a>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <a className='text-decoration-none' href="/"><i className="far hom-icon fa-comment-alt"></i> Comment</a>
                                    </div>
                                    <div className="fb-btn-holder">
                                        <a className='text-decoration-none' href="/"><i className="fa hom-icon fa-share-square"></i> Share</a>
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
                      </div>)
                      }
                </Col>

            </Row>
 
        </Container>
    );
};

export default GroupsHome;