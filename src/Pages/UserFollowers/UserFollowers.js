import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import img from '../../Images/RR_Logo (3)-01.png';

const UserFollowers = () => {

    const [followers, setFollowers] = useState([]);
    const [noFollowers, setNoFollowers] = useState([]);

    const userId = useParams()
    console.log(typeof userId.userId)


    // getting is follow
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/social/followers/${userId.userId}`, {
        method: 'GET',
        headers: {
            "Authorization" : `Token ${localStorage.getItem('auth_token')}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }})
        .then(res => res.json())
        .then(data => {console.log(data)
            if (data.message) {
                setNoFollowers([{data: data.message}]
                )
              } else {
                setFollowers(data)
                console.log(data)
              }
        })
    }, [userId.userId])

    const BASE_URL = "http://127.0.0.1:8000"


    return (
        <Container>
            {noFollowers.map(noF => <Row key={noF.id} className="d-flex  g-4 justify-content-center my-3">
                <Col md={8}>
                    <div>No following</div>
                </Col>
            </Row>)

            }
            {followers.map(follow=> <Row key={follow.id} xs={1} md={3}  className="d-flex  g-4 justify-content-center my-3">
                <Col md={8} style={{  marginTop: '20px' }} className="fb-box-shadow d-flex align-items-center py-3">
                    {follow.profile_pic!==null && <img style={{ height: "60px", width: "60px", objectFit: 'cover' }} alt="user_profile" className="rounded-circle" src={`${BASE_URL}${follow.profile_pic}`} />}
                    {follow.profile_pic===null && <img style={{ height: "60px", width: "60px", objectFit: 'cover' }} alt="user_profile" className="rounded-circle" src={img} />}
                    
                    <div  className="d-flex flex-column justify-content-center mx-4">
                        <p><b><Link to={`/user/${follow.following_id}`} className='text-decoration-none'>{follow.first_name}</Link></b></p>
                    </div>
                    <div>
                        {localStorage.getItem('id')===userId.userId && <button className='btn btn-primary'>Follow</button>}
                    </div>
                </Col>
            </Row>)}

        </Container>
    );
};

export default UserFollowers;