import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import { deleteAddress } from '../api'
import LoadingSpinner from './loadingSpinner'
import Card from 'react-bootstrap/Card'
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
  // https://maps.googleapis.com/maps/api/directions/json?origin=195SydnedStBoston,MA&destination=Concord,MA&
  // departure_time=now&key=AIzaSyCZOKfp7vh0jn2g0VUk7Pk8OHNJDQgtsm8
  componentDidMount () {
    if (this.props.user) {
      this.setState({ loading: true })
    }
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
        .catch(() => console.log('Error in trafficJs'))
    }
  }

  handleDelete = (id) => {
    deleteAddress(id, this.props.user.token)
      .finally(() => alert('Delete Address Successful', 'success'))
  }

  render () {
    const { user } = this.props
    const { addresses, loading } = this.state
    return (
      <Fragment >
        <div className="d-flex justify-content-between align-items-center py-3">
          {!user && <p className="m-0">Sign In to Observe Traffic</p>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? <LoadingSpinner /> : null }
        </div>
        <ListGroup style={{ display: 'flex', flexDirection: 'row' }}>
          { user && addresses.map(address => (
            <Card key={address.id} style={{ width: '30rem', margin: '10px' }}>
              <img src={'https://maps.googleapis.com/maps/api/staticmap?center=Downtown+Crossing,Boston,MA&zoom=11&size=350x350&maptype=roadmap&markers=color:blue%7Clabel:S%7C' + address.firstAddressLat + ',' + address.firstAddressLng + '&markers=color:green%7Clabel:F%7C' + address.secondAddressLat + ',' + address.secondAddressLng + '&key=AIzaSyCZOKfp7vh0jn2g0VUk7Pk8OHNJDQgtsm8'} />
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
                <Link to={'/home/' + address.id} >Click here to Change!</Link>
                <Button variant="danger" onClick={() => this.handleDelete(address.id)}>Delete the Address!</Button>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
      </Fragment>
    )
  } // ENDS render
} // ENDS class

export default Traffic
