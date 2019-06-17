import React from 'react'
import Loader from 'react-loader-spinner'
import '../shared/loadSpinner.scss'
export default class App extends React.Component {
  // other logic
  render () {
    return (
      <Loader
        className="indicator"
        type="Puff"
        color="#00BFFF"
        height="100"
        width="100"
      />
    )
  }
}
