'use client'

import React from 'react'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error but don't crash the app
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when error occurs (e.g., from translation)
      return this.props.fallback || (
        <div className="min-h-screen bg-[#dedacf] flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0D1321] mb-4">
              Si è verificato un errore
            </h1>
            <p className="text-[#0D1321]/70 mb-6">
              Prova a ricaricare la pagina o disattivare la traduzione automatica.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#7353BA] text-white rounded-lg hover:bg-[#5a4299] transition-colors"
            >
              Ricarica pagina
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
