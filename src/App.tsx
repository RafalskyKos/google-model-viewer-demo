import PhoneViewer from './components/PhoneViewer'
import './App.css'

/**
 * Main App component - displays the iPhone 3D viewer application
 */
function App() {
  return (
    <div className="app">
      <div className="app-container">
        <PhoneViewer />
      </div>
    </div>
  )
}

export default App
