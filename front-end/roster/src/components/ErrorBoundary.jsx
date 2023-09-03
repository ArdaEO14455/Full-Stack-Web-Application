import React, { Component } from 'react'

// Component to catch errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  // if error is present, set hasError to true
  static getDerivedStateFromError(error) {
    // updating the state 
    return { hasError: true }
  }
  // displaying the error in dev tools
  componentDidCatch(error, errorInfo) {
    console.error("Error captured by ErrorBoundary:", error, errorInfo)
  }
  // if there is an error, display this message
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children 
  }
}

export default ErrorBoundary