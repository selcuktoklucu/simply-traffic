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
    console.log('this.props.user is ', this.props.user)
    if (this.props.user) {
      this.setState({ loading: true })
    }
    console.log('component did mount', this.props.user)
    // axios(`${apiUrl}/tasks`)
    if (this.props.user) {
      axios({
        method: 'GET',
        url: `${apiUrl}/addresses`,
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
        .then(res => {
          console.log('response is', res)
          this.setState({ addresses: res.data.addresses })
          this.setState({ loading: false })
        })
        .catch(() => console.log('Error in trafficJs'))
    }
    // Axios for Google Maps
    // if (this.props.user && this.state.addresses) {
    //   this.state.addresses.forEach((x) => {
    //     axios({
    //       method: 'GET',
    //       url: `https://maps.googleapis.com/maps/api/directions/json?origin=${x.firstAddress}&destination=${x.secondAddress}&departure_time=now&key=AIzaSyCZOKfp7vh0jn2g0VUk7Pk8OHNJDQgtsm8`
    //     })
    //   })
    // }
  }

  handleDelete = (id) => {
    deleteAddress(id, this.props.user.token)
      .finally(() => alert('Delete Address Successful', 'success'))
  }

  render () {
    console.log(this.state)
    const { user } = this.props
    const { addresses, loading } = this.state
    console.log('addresses are ', addresses)
    return (
      <Fragment >
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">See traffic situation in your Area</h3>
          {!user && <p className="m-0">Sign In to Observe Traffic</p>}
          { user && <Button variant="success" href="#/new-traffic-points">Add A Book</Button>}
        </div>
        {loading ? <LoadingSpinner /> : null }
        <ListGroup style={{ display: 'flex', flexDirection: 'row' }}>
          { user && addresses.map(address => (
            <Card style={{ width: '30rem', margin: '10px' }} key={addresses.id}>
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

// { user && addresses.map(address => (
//   <ListGroup.Item key={address.id}>
//   <span className="h5 d-block">From: {address.firstAddress}</span>
//   <span>To: {address.secondAddress}</span>
//   <p>Total Traffic: {address.trafficTime}</p>
//   <p>Total Traffic: {address.firstAddressLat}</p>
//   <p>Total Traffic: {address.firstAddressLng}</p>
//   <img src={'https://maps.googleapis.com/maps/api/staticmap?center=Downtown+Crossing,Boston,MA&zoom=11&size=600x600&maptype=roadmap&markers=color:blue%7Clabel:S%7C' + address.firstAddressLat + ',' + address.firstAddressLng + '&markers=color:green%7Clabel:G%7C' + address.secondAddressLat + ',' + address.secondAddressLng + '&key=AIzaSyCZOKfp7vh0jn2g0VUk7Pk8OHNJDQgtsm8'} />
//   <p>Uber Estimated Price: {address.uberEstimatedPrice}</p>
//   <Button variant="danger" onClick={() => this.handleDelete(address.id)}>Delete the Address!</Button>
//   <Link to={'/home/' + address.id} >Click here to Change!</Link>
//   <Button variant="danger" href='#/home/'>Change the Address!</Button>
//   <p>This card created by using Google and Uber APIs </p>
//   </ListGroup.Item>
// ))}

// <ListGroup>
// { user && steps.map(step => (
//   <ListGroup.Item key={step.id}>
//   <span className="h5 d-block">{step.title}</span>
//   <span className="d-block">{step.description}</span>
//   <Button variant="notification" onClick={() => this.handleDetails(step.id)}>Details Task</Button>
//   <Button variant="danger" onClick={() => this.handleDelete(step.id)}>Delete the Task!</Button>
//   </ListGroup.Item>
// )) }
// { !user && steps.map(step => (
//   <ListGroup.Item key={step.id}>
//   <span className="h5 d-block">{step.title}</span>
//   <span>{step.description}</span>
//   </ListGroup.Item>
// ))}
// </ListGroup>

// render () {
//   const { user } = this.props
//   const { tasks } = this.state
//
//   return (
//     <Fragment>
//       <div className="d-flex justify-content-between align-items-center py-3">
//         <h3 className="m-0">Adress currently in the Library</h3>
//         {!user && <p className="m-0">Sign in to edit tasks</p>}
//         {user && <Button variant="success" href="#create-task">Add A Book</Button>}
//         {user && <span>{user.token}</span>}
//       </div>
//       <ListGroup>
//         { user && tasks.map(task => (
//           <ListGroup.Item key={task.id} action>
//             <h1>Your task!</h1>
//             <span className="h5 d-block">{task.title}</span>
//             <span className="d-block">{task.description} {task.description}</span>
//             <Button variant="danger" onClick={() => this.destroy(task.id)}>Delete Task</Button>
//           </ListGroup.Item>
//         )) }
//         { !user && tasks.map(task => (
//           <ListGroup.Item key={task.id}>
//             <h1>You are not allow to be here!</h1>
//             <span className="h5 d-block">{task.title}</span>
//             <span>{task.description}</span>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Fragment>
//   )
// }

export default Traffic
