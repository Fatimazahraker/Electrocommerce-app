import React, { useState } from 'react';
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Signup.css';
import { useSignupMutation } from '../services/appApi'
;

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();
    const [TabActive, setTabActive] = useState("login");

  const toggleActive = () => {
    setTabActive((curr) => (curr === "singup" ? "login" : "singup"));
  };
    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }

    return (
        <div className='wrap'>
        <div class="container1" id="container1">
            <div class={`form-container1 sign-up `}> {/* Apply active class based on container state */}
                <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                    <h1>Create to your account</h1>
                    {isError && <Alert variant="danger">{error.data}</Alert>}
                    <input type="text" placeholder="Enter your name" value={name} required onChange={(e) => setName(e.target.value)}/>
                    <input type="email" placeholder="Enter your Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                    <Button type="submit" disabled={isLoading}>Create an account</Button>
                    
                </Form>
            </div>
            
            <div class="toggle-container1">
        <div class="toggle1">
          <div class="toggle-panel1 toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features this signup page</p>
            <button class="hidden" id="login"><Link to="/login" style={{ color: 'white' }}>SIGN IN</Link></button>
          </div>
          
        </div>
      </div>
        </div>
        </div>
    );
}

export default Signup;
