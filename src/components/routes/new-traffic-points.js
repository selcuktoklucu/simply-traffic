import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { newAddress } from '../api'
import messages from '../messages'

class NewTrafficPoints extends Component {
  constructor () {
    super()

    this.state = {
      firstAddress: '',
      secondAddress: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onNewAddresses = event => {
    event.preventDefault()

    const { alert } = this.props
    console.log(this.props.user.token)
    newAddress(this.state, this.props.user.token)
      // .then(() => signIn(this.state))
      // .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      // .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ firstAddress: '', secondAddress: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { firstAddress, secondAddress } = this.state

    return (
      <form className='addresses-form' onSubmit={this.onNewAddresses}>
        <h3>Add two new addresses</h3>

        <label htmlFor="text">First Address</label>
        <input
          required
          name="firstAddress"
          pattern="[a-zA-Z0-9!@#$%^*_, |]{6,25}"
          value={firstAddress}
          type="text"
          placeholder="Boston City Hall"
          onChange={this.handleChange}
        />
        <label htmlFor="text">Second Address</label>
        <input
          required
          name="secondAddress"
          pattern="[a-zA-Z0-9!@#$%^*_, |]{6,25}"
          value={secondAddress}
          type="text"
          placeholder="125 Summer St."
          onChange={this.handleChange}
        />
        <button type="submit">Add New Addresses</button>
      </form>
    )
  }
}

export default withRouter(NewTrafficPoints)
