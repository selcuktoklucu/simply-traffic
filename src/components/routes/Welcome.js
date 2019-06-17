import React, { Component, Fragment } from 'react'
import Carousel from 'react-bootstrap/Carousel'

import '../shared/Welcome.scss'

class Welcome extends Component {
  constructor () {
    super()

    this.state = {
      addresses: [],
      tasks: [],
      edit: false,
      loading: false
    }
  }
  render () {
    return (
      <Fragment >
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://st-third.s3.amazonaws.com/carousel-pic-1.png"
              alt="First slide"
            />
            <Carousel.Caption>
              <div className='description'>
                <h2>Welcome!</h2>
                <p>This is a Full Stack Web Application, where organizations such as hotels or dorms can display nearby attractions and commuting information on their lobby displays.</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://st-third.s3.amazonaws.com/carousel-pic-2.png"
              alt="Third slide"
            />

            <Carousel.Caption>
              <div className='description carousel-img'>
                <p>In this project, I have used modern libraries and frameworks such as React.js and Ruby on Rails. Building this application improved my self-learning skills by diving into docs and dividing problems into smaller pieces.</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://st-third.s3.amazonaws.com/carousel-pic-2.png"
              alt="Third slide"
            />

            <Carousel.Caption>
              <div className='description'>
                <p>Simply-Traffic combines Google Maps API and Uber API to collect live traffic data and estimated Uber prices.
                Key technologies used: ReactJS, Ruby on Rails, Google Directions API, Maps Static API, AWS S3.</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Fragment>
    )
  }
}

export default Welcome
