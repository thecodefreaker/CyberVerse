'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class CyberErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by CyberErrorBoundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-base flex items-center justify-center p-4">
          <motion.div
            className="max-w-md w-full p-6 bg-dark-secondary rounded-lg border border-cyber-blue relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Matrix rain effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="matrix-rain"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                >
                  {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                </div>
              ))}
            </div>

            {/* Error content */}
            <div className="relative z-10">
              <motion.div
                className="text-red-500 text-4xl font-cyber mb-4 glitch-text"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ERROR DETECTED
              </motion.div>

              <div className="font-terminal text-gray-300 mb-6">
                <div className="mb-2">
                  <span className="text-cyber-blue">&gt;</span> Status: Critical
                </div>
                <div className="mb-2">
                  <span className="text-cyber-blue">&gt;</span> Error Code: {this.state.error?.name || 'Unknown'}
                </div>
                <div className="mb-4">
                  <span className="text-cyber-blue">&gt;</span> Message: {this.state.error?.message || 'An unexpected error occurred'}
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  className="cyber-button-blue font-cyber text-sm"
                  onClick={this.handleRetry}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  INITIATE RECOVERY SEQUENCE
                </motion.button>
              </div>
            </div>

            {/* Scan line effect */}
            <div className="absolute inset-0 scan-line pointer-events-none" />
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CyberErrorBoundary;
