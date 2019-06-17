import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Footer from './footer/Footer'
import Traffic from './components/routes/Traffic'
import NewTrafficPoints from './components/routes/new-traffic-points'
import Address from './components/routes/Address'
import Welcome from './components/routes/Welcome'

import AutoDismissAlert from './components/autoDismissAlert.js'
// import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor (params) {
    super(params)

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            alert={alert}
          />
        ))}
        <main className="container">
          <AuthenticatedRoute user={user} exact path='/home/:id' render={(match) => (
            <Address alert={this.alert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/home' render={() => (
            <Traffic alert={this.alert} user={user} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Welcome />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/new-traffic-points' render={() => (
            <NewTrafficPoints alert={this.alert} user={user} />
          )} />
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App
