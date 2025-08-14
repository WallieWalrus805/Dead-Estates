import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Ah } from './pages/Ah'
import { Ct } from './pages/Ct'
import { Landing } from './pages/Landing'
import { Leaderboard } from './pages/Leaderboard'
import { Map } from './pages/Map'
import { Settings } from './pages/Settings'
import { Layout } from './components/Layout'
import { useEffect } from 'react'
import axios from 'axios'
import { PausedProvider } from './assets/contexts/PausedContext'
import { UserProvider } from './assets/contexts/UserContext'

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
              <Route path="/ah" element={<Ah className="Frame" />} />
              <Route path="/ct" element={<Ct className="Frame" />} />
              <Route path="/leaderboard" element={<Leaderboard className="Frame" />} />
              <Route path="/map" element={<Map className="Frame" />} />
              <Route path="/settings" element={<Settings className="Frame" />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </PausedProvider >
  )
}

export default App