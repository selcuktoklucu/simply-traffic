import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/home">Home</Link>
    <Link to="/new-traffic-points">Add new Address</Link>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
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
    <h2>Simply Traffic, See One Step Further!</h2>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
