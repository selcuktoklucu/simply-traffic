import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
// import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
// import Button from 'react-bootstrap/Button'
import { deleteAddress } from '../api'
// import LoadingSpinner from './LoadingSpinner'
// import Spinner from 'react-bootstrap/Spinner'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Address extends Component {
  constructor () {
    super()

    this.state = {
      address: null,
      edit: false,
      loading: false,
      deleted: false
    }
  }
  componentDidMount () {
    axios({
      method: 'GET',
      url: `${apiUrl}/addresses/${this.props.match.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({ address: response.data.address })
      })
      .catch(() => console.log('ERROR'))
  }

  handleDelete = (id) => {
    deleteAddress(id, this.props.user.token)
      .finally(() => alert('Delete Address Successful', 'success'))
  }

  handleChange = (event) => {
    // Update state
    // console.log('Changing', event)
    const updatedField = {
      [event.target.name]: event.target.value
    }
    // it updated by key value pair
    const editedAddress = Object.assign(this.state.address, updatedField)
    this.setState({ address: editedAddress })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await axios({
      url: `${apiUrl}/addresses/${this.props.match.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        address: this.state.address
      }
    })
    this.setState({ edit: true })
  }
  render () {
    // console.log('props are ', this.props)
    // console.log('addresses are ', address)
    const { address, edit } = this.state
    if (edit) {
      return <Redirect to={'/home/'} />
    }
    if (!address) {
      return <p>Loading...</p>
    }
    return (
      <div className="col-md-6 m-auto py-3">
        <div className="d-flex justify-content-between align-items-center py-3">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>example@example.com</Form.Label>
              <Form.Control
                name='firstAddress'
                placeholder='125 Summer St Boston, MA'
                value={address.firstAddress}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                name='secondAddress'
                placeholder='Quincy City Hall, MA'
                value={address.secondAddress}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
            <Link to={'/home/'}><button>Cancel</button></Link>
          </Form>
        </div>
      </div>
    )
  } // ENDS render
} // ENDS class

export default Address
