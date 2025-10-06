// Test simple sans imports Sanity UI
import React from 'react'

const SimpleTest: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'lightblue', 
      height: '100%',
      border: '3px solid green'
    }}>
      <h1>Simple Test</h1>
      <p>Test sans @sanity/ui</p>
    </div>
  )
}

export default SimpleTest
