import { useEffect } from 'react'
import axios from 'axios'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { PausedProvider } from './assets/contexts/PausedProvider'
import { UserProvider } from './assets/contexts/UserProvider'
import './css/App.css'
import { Landing } from './pages/Landing'
import { Map } from './pages/Map'
import { Layout } from './components/Layout'

function App() {

  useEffect(() => {
    let token = sessionStorage.getItem("User")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])

  return (
    <PausedProvider>
      <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route element={<Layout />}>
                <Route path="/map" element={<Map className="Frame" />} />
              </Route>
            </Routes>
          </Router>
      </UserProvider>
    </PausedProvider>
  )
}

export default App