import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Ah } from './pages/Ah'
import { Ct } from './pages/Ct'
import { Home } from './pages/Home'
import { Landing } from './pages/Landing'
import { Leaderboard } from './pages/Leaderboard'
import { Map } from './pages/Map'
import { Settings } from './pages/Settings'
import { Navbar } from './components/navbar'
import { Layout } from './components/Layout'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  useEffect(() => {
    let token = sessionStorage.getItem("User")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route element={<Layout />}>
          <Route path="/ah" element={<Ah />}/>
          <Route path="/ct" element={<Ct />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/leaderboard" element={<Leaderboard />}/>
          <Route path="/map" element={<Map />}/>
          <Route path="/settings" element={<Settings />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App