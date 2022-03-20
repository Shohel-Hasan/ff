import React from 'react';
import { Container } from 'react-bootstrap';

const ProductPolicy = (props) => {
    props.triggerCheckLoggedIn();
    return (
        <Container>
            <div className='m-auto mt-3'>
                <h4>Product Policy</h4>
                <span className='font-weight-light text-muted mt-1'>Some products on Research Rider is free. On the other hand, some products on Research Rider are purchased by consumers according to their choice and sold by Research Rider itself and also sold by sellers according to their choice.</span>
            </div>
        </Container>
    );
};

export default ProductPolicy;