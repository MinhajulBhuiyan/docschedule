import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for development
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Generate unique error ID for tracking
    const errorId = `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorId: errorId
    })

    // In production, you would send this to an error reporting service
    // Example: logErrorToService(error, errorInfo, errorId)
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    })
  }

  handleReportError = () => {
    // In production, this would open a form or send error details
    const errorReport = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }
    
    console.log('Error Report:', errorReport)
    
    // You could send this to your backend or error reporting service
    // Example: sendErrorReport(errorReport)
    
    alert('Error has been reported. Thank you for helping us improve!')
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
            
            {/* Error Icon */}
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            {/* Error Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>

            {/* Error Message */}
            <p className="text-lg text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix this issue.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left mb-6 p-4 bg-gray-50 rounded-lg">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Error Details (Development)
                </summary>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Error:</strong> {this.state.error.message}</p>
                  <p><strong>Error ID:</strong> {this.state.errorId}</p>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                    {this.state.error.stack}
                  </pre>
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleRetry}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Go Home
              </button>
              
              <button
                onClick={this.handleReportError}
                className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Report Error
              </button>
            </div>

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">
                If this problem persists, please contact our support team
              </p>
              <p className="text-sm text-gray-500">
                Error ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{this.state.errorId}</span>
              </p>
            </div>
          </div>
        </div>
      )
    }

    // If no error, render children normally
    return this.props.children
  }
}

export default ErrorBoundary
