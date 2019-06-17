import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    // console.log(this.props.user.token)
    const { alert } = this.props
    newAddress(this.state, this.props.user.token)
      .then(() => alert('You Successfully Created An Adress Pair', 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ firstAddress: '', secondAddress: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { firstAddress, secondAddress } = this.state

    return (
      <div className="col-md-6 m-auto py-3">
        <Form onSubmit={this.onNewAddresses}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Starting at</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Chinatown Boston"
              name="firstAddress"
              pattern="[a-zA-Z0-9!@#$%^*_, |]{6,45}"
              value={firstAddress}
              onChange={this.handleChange}

            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="TD Garden"
              name="secondAddress"
              pattern="[a-zA-Z0-9!@#$%^*_, |]{6,45}"
              value={secondAddress}
              onChange={this.handleChange}

            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
// <form className='addresses-form auth-form' onSubmit={this.onNewAddresses}>
// <h3>Add two new addresses</h3>
//
// <label htmlFor="text">First Address</label>
// <input
// required
// name="firstAddress"
// pattern="[a-zA-Z0-9!@#$%^*_, |]{6,45}"
// title="Please Enter a Valid Address, 6 to 45 character"
// value={firstAddress}
// type="text"
// placeholder="Boston City Hall"
// onChange={this.handleChange}
// />
// <label htmlFor="text">Second Address</label>
// <input
// required
// name="secondAddress"
// pattern="[a-zA-Z0-9!@#$%^*_, |]{6,45}"
// title="Please Enter a Valid Address, 6 to 45 character"
// value={secondAddress}
// type="text"
// placeholder="125 Summer St."
// onChange={this.handleChange}
// />
// <button type="submit">Add New Addresses</button>
// </form>

export default withRouter(NewTrafficPoints)
