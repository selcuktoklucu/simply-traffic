import React from 'react'
import Loader from 'react-loader-spinner'
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
// const LoadingSpinner = () => (
//   <div>
//     <i className="fa fa-spinner fa-spin" /> Loading...
//   </div>
// )

// export default LoadingSpinner
