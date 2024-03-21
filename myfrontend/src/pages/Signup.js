import React, { useState } from 'react';
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Signup.css';
import { useSignupMutation } from '../services/appApi'

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }

    return (
        <Container>
            <Row>
                <Col md={6} className='login__form--container'>
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                    <h1>Create to your account</h1>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" value={name} required onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Button type="submit" disabled={isLoading}>Create an account</Button>
                    </Form.Group>
                    <p>
                        You don't have an account? <Link to="/login">Login</Link>{" "}
                        </p>
                    </Form>
                </Col>
                <Col md={6} className="signup__image--container"></Col>
            </Row>
        </Container>
  );
}

export default Signup;