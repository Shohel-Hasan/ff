import React from 'react';
import { Container } from 'react-bootstrap';

const PrivacyPolicy = (props) => {
    props.triggerCheckLoggedIn();
    return (
        <Container>
            <div className='m-auto mt-3'>
                <h4>Privacy Policy</h4>
                <span className='font-weight-light text-muted mt-1 '>Data, cookie & all user activities are private to a user only.</span>
            </div>
        </Container>
    );
};

export default PrivacyPolicy;