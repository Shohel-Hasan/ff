import React from 'react';
import { Container } from 'react-bootstrap';

const CookiePolicy = (props) => {
    props.triggerCheckLoggedIn();
    return (
        <Container>
    
        <div className='m-auto mt-3'>
            <h4>Cookie Policy</h4>
            <span className='font-weight-light text-muted mt-1 '>Research Rider uses cookie for providing better utility to a user only.</span>
        </div>
        </Container>
    );
};

export default CookiePolicy;