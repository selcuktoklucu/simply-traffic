import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
// import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
// import Button from 'react-bootstrap/Button'
import { deleteAddress } from '../api'
// import LoadingSpinner from './loadingSpinner'
// import Spinner from 'react-bootstrap/Spinner'

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
    console.log('This props', this.props)
    console.log('This props user', this.props.user)
    console.log('New componentDidMount')
    axios({
      method: 'GET',
      url: `${apiUrl}/addresses/${this.props.match.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => {
        console.log('New response', response)
        this.setState({ address: response.data.address })
        console.log('Addressjs response retrieved and setted in state,', this.state)
      })
      .catch(() => console.log('ERROR'))
    // .then(res => {
    //   this.setState({ movie: res.data.movie })
    // })
    // .catch(console.log)
  }

  handleDelete = (id) => {
    deleteAddress(id, this.props.user.token)
      .finally(() => alert('Delete Address Successful', 'success'))
  }

  handleChange = (event) => {
    // Update state
    console.log('Changing', event)
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
  // .then(res => {
  //   this.setState({ updated: true })
  // })
  // .catch(console.error)
  }
  render () {
    console.log('props are ', this.props)
    const { address, edit } = this.state
    console.log('addresses are ', address)
    if (edit) {
      return <Redirect to={'/home/'} />
    }
    if (!address) {
      return <p>Loading...</p>
    }
    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">See traffic situation in your Area</h3>
          <form onSubmit={this.handleSubmit}>
            <label>1st Address</label>
            <input
              name='firstAddress'
              placeholder='125 Summer St Boston, MA'
              value={address.firstAddress}
              onChange={this.handleChange}
            />
            <label>2nd Address</label>
            <input
              name='secondAddress'
              placeholder='Quincy City Hall, MA'
              value={address.secondAddress}
              onChange={this.handleChange}
            />
            <button type='submit'>Submit</button>
            <Link to={'/home/'}><button>Cancel</button></Link>
          </form>
        </div>
      </Fragment>
    )
  } // ENDS render
} // ENDS class

export default Address
