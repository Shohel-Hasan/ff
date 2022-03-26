import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Setting.css'
import { useNavigate } from 'react-router-dom';

const Setting = () => {
    const navigate = useNavigate();
  
    return (
        <Container>
            <div className='text-center'>
                <h2>Setting Page</h2>
                <Link to='/settings'><Button size='sm' onClick={() => {localStorage.clear(); navigate('/')}}>Logout </Button></Link>
            </div>
           
        </Container>
    );
};

export default Setting;