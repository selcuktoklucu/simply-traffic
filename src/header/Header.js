import React from 'react'
import { Link } from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/home">Home</Link>
    <DropdownButton alignRight title="My Account" className="btn-info">
      <Dropdown.Item><Link to="/new-traffic-points">Add new Address</Link></Dropdown.Item>
      <Dropdown.Item><Link to="/change-password">Change Password</Link></Dropdown.Item>
      <Dropdown.Item><Link to="/sign-out">Sign Out</Link></Dropdown.Item>
      <Dropdown.Item href="#/action-1"></Dropdown.Item>
    </DropdownButton>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>

  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <img src="https://cdn0.iconfinder.com/data/icons/tiny-icons-1/100/tiny-08-512.png" />
    <h2>Simply Traffic</h2>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
