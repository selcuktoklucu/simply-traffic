import React, { Component, Fragment } from 'react'
// import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { deleteAddress } from '../api'
import LoadingSpinner from './loadingSpinner'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
// import IntervalRenderer from 'react-interval-renderer'
// import Interval from 'react-interval-rerender'
// import Spinner from 'react-bootstrap/Spinner'

class Traffic extends Component {
  constructor () {
    super()

    this.state = {
      addresses: [],
      tasks: [],
      edit: false,
      loading: false
    }
  }
  componentDidMount () {
    // const { alert } = this.props
    if (this.props.user) {
      this.setState({ loading: true })
    }
    this.getTrafficData()
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 60000)
    this.interval = setInterval(() => this.getTrafficData(), 300000)
  }
  getTrafficData () {
    console.log('filldata called')
    this.forceUpdate()
    const { alert } = this.props
    if (this.props.user) {
      axios({
        method: 'GET',
        url: `${apiUrl}/addresses`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
        .then(res => {
          this.setState({ addresses: res.data.addresses })
          this.setState({ loading: false })
        })
        .catch(() => {
          alert('Looks like there is no address', 'danger')
          this.setState({ edit: true })
        })
    }
  }

  handleDelete = (id) => {
    const { alert } = this.props

    deleteAddress(id, this.props.user.token)
      .finally(() => alert('Delete Address Successful', 'success'))
      .finally(() => { this.setState({ edit: true }) })
  }

  render () {
    const { user } = this.props
    const { addresses, loading, edit } = this.state

    if (edit) {
      return <Redirect to={'/new-traffic-points/'} />
    }
    console.log('state time', this.state.time)
    return (
      <Fragment >
        <div className="d-flex justify-content-between align-items-center py-3">
          {!user && <p className="m-0">Sign In to Observe Traffic</p>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? <LoadingSpinner /> : null }
        </div>
        <div className="row justify-content-center">
          { user && addresses.map(address => (
            <Card key={address.id} className="col-4">
              <img src={address.picUrl} />
              <Card.Body>
                <Card.Text>
                  From: {address.firstAddress}
                </Card.Text>
                <Card.Text>
                  To: {address.secondAddress}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Total Traffic: {address.trafficTime}</ListGroup.Item>
                <ListGroup.Item>Uber Estimated Price: {address.uberEstimatedPrice}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <DropdownButton alignRight title="Options">
                  <Dropdown.Item><Link to={'/home/' + address.id} className="btn btn-primary">Edit Adress</Link></Dropdown.Item>
                  <Dropdown.Item><Button variant="danger" onClick={() => this.handleDelete(address.id)}>Delete the Address!</Button></Dropdown.Item>
                </DropdownButton>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Fragment>
    )
  } // ENDS render
} // ENDS class

export default Traffic
