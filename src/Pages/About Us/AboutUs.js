import React from 'react';
import { Container } from 'react-bootstrap';

const AboutUs = (props) => {
  props.triggerCheckLoggedIn();
  return (
 
      <Container >
    
              <div className='m-auto mt-3'>
                  <h4>About Us</h4>
                  <span className='font-weight-light text-muted mt-1 '>Research Rider provides various products,services, and supports which are highly based on research and ICT platforms.</span>
              </div>    
      </Container>
  
  );
};

export default AboutUs;