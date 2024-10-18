import React from 'react';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';




function Header() {
//retrieves the cart function from store.js
  const {cartItems}=useSelector((state)=>state.cart)

  console.log(cartItems)
  return (
    <header>
      <Navbar variant='dark' expand="lg" className="bg-body-tertiary" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} alt='Proshop' /> Proshop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {
                    cartItems.length>0 && (<Badge pill bg='success' style={{marginLeft: '5px'}}> {cartItems.reduce((a,c) => a+c.qty,0)} </Badge>)
                  }
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
