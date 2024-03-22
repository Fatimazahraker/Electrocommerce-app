import React from 'react';
import { useState } from 'react';
import './NewProduct.css';
import { useCreateProductMutation } from '../services/appApi'
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row, Alert, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { error, isLoading, isError, isSuccess }] = useCreateProductMutation();


  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpslbe5xm",
        uploadPreset: "zecbbtbx"
      },
      (error, result) => {
        if(!error && result.event === 'success') {
          setImages((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}])
        }
      }
    );
    widget.open();
  }

  return (
  <Container>
    <Row>
      <Col md={6} className='new-product__form--container'>
          <Form style={{ width: "100%" }}>
                  <h1>Create a product</h1>
                  {isSuccess && <Alert variant="success">Product created with seccess</Alert>}
                  {isError && <Alert variant="danger">{error.data}</Alert>}
                  <Form.Group className="mb-3">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control type="email" placeholder="Enter the product name" value={name} required onChange={(e) => setName(e.target.value)}/>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Product description</Form.Label>
                    <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px"}} value={description} required onChange={(e) => setDescription(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Price($)</Form.Label>
                    <Form.Control type="number" placeholder="Price($)" value={price} required onChange={(e) => setPrice(e.target.value)}/>
                  </Form.Group>

                  <Form.Group className="mb-3" nChange={(e) => setCategory(e.target.value)}>
                    <Form.Label>Category</Form.Label>
                    <Form.Select>
                      <option disabled selected>
                        -- Select One --
                      </option>
                      <option value="technology">technology</option>
                      <option value="tablets">tablets</option>
                      <option value="phones">phones</option>
                      <option value="laptops">laptops</option>
                  </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Button type="button" onClick={showWidget}>Upload Images</Button>
                    <div className='images-preview-container'>
                      {images.map((image) => (
                        <div className='image-preview'>
                          <img src={image.url} />
                          {}
                        </div>
                      ))}
                    </div>
                  </Form.Group>
                  
                  <Form.Group>
                    <Button type="submit" disabled={isLoading || isSuccess}>Create Product</Button>
                  </Form.Group>

                </Form>
      </Col>
      <Col md={6} className='new-product__image--container'></Col>
    </Row>
  </Container>
  );
}

export default NewProduct;