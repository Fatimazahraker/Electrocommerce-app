import React from 'react';
import { Navbar, Button, Nav, NavDropdown, Container } from 'react-bootstrap';
import './Navigation.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { useContext, useState , useEffect } from 'react';


function Navigation() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  
    const [checked, setChecked] = useState(false);
    
 
  
  
    
 


  function handleLogout() {
    dispatch(logout());
}


  return (
    <Navbar expand="lg" className={` navigation`}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>EcommerceElectro</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
            
            {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
            )}
            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i>
                {user?.cart.count > 0 && (
                  <span className='badge badge-warning' id='cartcount'>
                    {user.cart.count}
                  </span>
                )}
              </Nav.Link>
              </LinkContainer>
            )}
            {/* ifuser */}
            {user && (
            <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                {user.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin">
                                                <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/new-product">
                                                <NavDropdown.Item>Create Product</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                  )}
                  {!user.isAdmin && (
                                        <>
                                            <LinkContainer to="/cart">
                                                <NavDropdown.Item>Cart</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/orders">
                                                <NavDropdown.Item>My orders</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                  )}
              <NavDropdown.Divider />
              <Button variant="danger" onClick={handleLogout} className="logout-btn">
                                        Logout
              </Button>
            </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default Navigation