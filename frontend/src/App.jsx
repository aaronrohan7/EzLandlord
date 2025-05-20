import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tenants from './pages/Tenants'
import Maintenance from './pages/Maintenance'
import Payments from './pages/Payments'
import Leases from './pages/Leases'

// Components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar />}
        <div className="main-container">
          {isAuthenticated && <Sidebar />}
          <div className="content">
            <Routes>
              <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/leases" element={<Leases />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
