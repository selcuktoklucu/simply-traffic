import React, { Component, Fragment } from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

class Traffic extends Component {
  constructor () {
    super()

    this.state = {
      addresses: [],
      tasks: [],
      edit: false
    }
  }

  componentDidMount () {
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
        })
        .catch(console.error)
    }
  }

  render () {
    console.log(this.state)
    const { user } = this.props
    const { tasks, addresses } = this.state

    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">See traffic situation in your Area</h3>
          {!user && <p className="m-0">Sign In to Observe Traffic</p>}
          { user && <Button variant="success" href="#/new-traffic-points">Add A Book</Button>}
        </div>
        <ListGroup>
          { user && tasks.map(task => (
            <ListGroup.Item key={task.id}>
              <span className="h5 d-block">{task.title}</span>
              <span className="d-block">{task.description}</span>
              <Button variant="Primary" onClick={() => this.handleDetatils(task.id)}>Show Steps</Button>
              <Button variant="danger" onClick={() => this.handleDelete(task.id)}>Delete the Task!</Button>
            </ListGroup.Item>
          )) }
          { user && addresses.map(address => (
            <ListGroup.Item key={address.id}>
              <span className="h5 d-block">From: {address.firstAddress}</span>
              <span>To: {address.secondAddress}</span>
              <Button variant="danger" onClick={() => this.handleDelete(address.id)}>Delete the Address!</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Fragment>
    )
  } // ENDS render
} // ENDS class

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
