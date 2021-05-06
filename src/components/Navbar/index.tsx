import React, { useState, useEffect } from 'react';
import './index.scss';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Index = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
    
    useEffect(()=>{
        setIsLoggedIn(false);
    }, [])

    return (
        <Navbar expand='md'>
            <Container>
                <Navbar.Brand as={Link} to='/'>MARKETING MANAGEMENT</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                        {
                            !isLoggedIn ?
                            <>
                                <Nav.Link as={Link} to='/login'>Giriş Yap</Nav.Link>      
                                <Nav.Link as={Link} to='/signup'>Kaydol</Nav.Link>
                            </> :
                            <>
                                <Nav.Link as={Link} to='/'>Panel</Nav.Link>      
                                <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                                    <NavDropdown.Item as={Link} to='/'>Ayarlar</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/'>Profil</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/'>Çıkış Yap</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        }    
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Index;