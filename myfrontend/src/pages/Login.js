import React, { useState } from 'react';
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useLoginMutation } from '../services/appApi';
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, isLoading, isError }] = useLoginMutation();
  
  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
  
    <div className='wrap'>
            <div class="container2" id="container2">
              <div class={`form-container2 sign-in `}>
                <Form  onSubmit={handleLogin}>
                  <h1>Login to your account</h1>
                  {isError && <Alert variant="danger">{error.data}</Alert>}
                  
                 
                    <input type="email" placeholder="Enter your email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter your password" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                 
                  
          
                    <Button type="submit" disabled={isLoading}>Login</Button>
                  
                 
                </Form>
                </div>
                <div class="toggle-container2">
                  <div class="toggle2">
                    
                    <div class="toggle-panel2 toggle-right">
                      <h1>Hello, Friend!</h1>
                      <p>
                        Register with your personal details to use all of site features this is login page
                      </p>
                      <button class="hidden" id="register"><Link to="/signup" style={{ color: 'white' }}>SIGN UP</Link></button>
                    </div>
                  </div>
                </div>
            </div>
        </div>
   
  );
}

export default Login