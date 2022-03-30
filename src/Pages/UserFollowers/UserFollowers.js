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
        <Container className='d-flex justify-content-center'>
            {noFollowers.map((noF, index) => <Row key={index} className="d-flex  g-4 justify-content-center my-3">
                <Col md={8}>
                    <div>No following</div>
                </Col>
            </Row>)
            }
             <Row className="d-flex w-75 justify-content-center my-4">
             {followers.map(follow=>  <Col key={follow.id} md={6} className=" d-flex justify-content-between align-items-center my-3">
                    <Card className='w-100 fb-box-shadow p-4'>
                        <div>
                            {follow.profile_pic!==null && <img style={{ height: "60px", width: "60px", objectFit: 'cover' }} alt="user_profile" className="rounded-circle" src={`${BASE_URL}${follow.profile_pic}`} />}
                            {follow.profile_pic===null && <img style={{ height: "60px", width: "60px", objectFit: 'cover' }} alt="user_profile" className="rounded-circle" src={img} />}
                            <small><b><Link to={`/user/${follow.user}`} className='text-decoration-none mx-4'>{follow.first_name}</Link></b></small>
                        </div>
                        
                    </Card>
                </Col>)}
            </Row>

        </Container>
    );
};

export default UserFollowers;