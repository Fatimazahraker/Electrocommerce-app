import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Singup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Container>
            <Row>
                <Col md={6} className='login__form--container'>
                    <Form style={{ width: "100%" }}>
                    <h1>Create to your account</h1>
                    <Form.Group>
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Button type="submit">Login</Button>
                    </Form.Group>
                    <p>
                        You don't have an account? <Link to="/signup">Create account</Link>{" "}
                        </p>
                    </Form>
                </Col>
                <Col md={6} className="singup__image--container"></Col>
            </Row>
        </Container>
  );
}

export default Singup;