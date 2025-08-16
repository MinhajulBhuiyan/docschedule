import React from 'react'

const LoadingSpinner = ({ size = 'large', text = 'Loading...', variant = 'primary' }) => {
  // Size variants
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  }

  // Color variants
  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  }

  // Text size variants
  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-6">
      {/* Main Spinner Container */}
      <div className="relative">
        {/* Outer Ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-pulse`}></div>
        
        {/* Spinning Ring */}
        <div 
          className={`${sizeClasses[size]} absolute top-0 left-0 border-4 border-transparent border-t-current rounded-full animate-spin ${colorClasses[variant]}`}
          style={{ animationDuration: '1s' }}
        ></div>
        
        {/* Inner Pulse */}
        <div className={`${sizeClasses[size]} absolute top-0 left-0 border-4 border-current rounded-full animate-ping opacity-20 ${colorClasses[variant]}`}></div>
      </div>

      {/* Loading Text */}
      {text && (
        <div className="text-center">
          <p className={`font-medium text-gray-700 ${textSizeClasses[size]}`}>
            {text}
          </p>
          
          {/* Animated Dots */}
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}

      {/* Optional Progress Bar */}
      <div className="w-48 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse`}
          style={{ 
            animationDuration: '2s',
            width: '60%'
          }}
        ></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
