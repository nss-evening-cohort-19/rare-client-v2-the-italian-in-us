/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
  Dropdown,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import getSingleUser from '../utils/data/userData';

export default function NavBar() {
  const { user } = useAuth();
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    getSingleUser(user.id, user.uid).then(setLoggedUser);
  }, [user]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>RARE ITALIAN</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav-links me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/posts">
              <Nav.Link>All Posts
              </Nav.Link>
            </Link>
            <Link passHref href={`/posts/customFeed/${user.id}`}>
              <Nav.Link>Custom Feed
              </Nav.Link>
            </Link>
            <Link passHref href={`/users/${user.id}`}>
              <Nav.Link>My Profile
              </Nav.Link>
            </Link>
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                Admin
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link href="/categories" passHref>
                  <Dropdown.Item>Category Manager</Dropdown.Item>
                </Link>
                <Link href="/" passHref>
                  <Dropdown.Item>Tag Manager</Dropdown.Item>
                </Link>
                <Link href="/" passHref>
                  <Dropdown.Item>Admin Requests</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            <div className="nav-user-and-signout">
              <Image className="nav-user-image" src={loggedUser.profileImageUrl} />
              <Link passHref href={`/users/${user.id}`}>
                <Nav.Link>Hello {loggedUser.firstName}</Nav.Link>
              </Link>
              <Button variant="danger" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
