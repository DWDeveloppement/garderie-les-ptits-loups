// Composant de test simple pour la sidebar
import React from 'react'

const TestSidebar: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      background: '#f0f0f0', 
      height: '100%',
      border: '2px solid red'
    }}>
      <h2>Test Sidebar</h2>
      <p>Si vous voyez ceci, la sidebar fonctionne !</p>
    </div>
  )
}

export default TestSidebar
