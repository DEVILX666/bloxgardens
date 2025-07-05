"use client"

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-[var(--soft-beige)]">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-4 text-center">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-2xl font-bold text-[var(--forest-green)] mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              Don't worry, this is just a temporary issue. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[var(--forest-green)] text-white px-6 py-3 rounded-lg hover:bg-[var(--forest-green)]/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 