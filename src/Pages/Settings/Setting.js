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
            <div>
                <select class="form-control">
                    <option selected="selected">orange</option>
                    <option>white</option>
                    <option>purple</option>
                    <option><input type="text" className='form-control' placeholder='sam'/></option>
                </select>
               
                
            </div>
            
        </Container>
    );
};

export default Setting;