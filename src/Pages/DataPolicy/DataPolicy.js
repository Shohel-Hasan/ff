import React from 'react';
import { Container } from 'react-bootstrap';

const DataPolicy = (props) => {
    props.triggerCheckLoggedIn();
    return (
        <Container>
    
              <div className='m-auto mt-3'>
                  <h4>Data Policy</h4>
                  <span className='font-weight-light text-muted mt-1 '>A user is the only one who has the property right of data. The responsibility of data management and data sharing belongs to a user only. Research Rider works as user’s data sharing hub according to user’s own preference only. </span>
              </div>
      </Container>
    );
};

export default DataPolicy;