import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function ProductPreview({_id, category, name, pictures}) {
  // Check if pictures array exists and has at least one element
  const imageUrl = pictures && pictures.length > 0 ? pictures[0].url : ''; 

  return (
    <LinkContainer to={`/product/${_id}`} style={{cursor: 'pointer', width: '13rem', margin: '10px'}}>
      <Card style={{width: '20rem', margin: '10px'}}>
        {/* Check if imageUrl is not empty before rendering the image */}
        {imageUrl && <Card.Img variant='top' className="product-preview-img" src={imageUrl} />}
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Badge bg='warning' text='dark'>
            {category}
          </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
