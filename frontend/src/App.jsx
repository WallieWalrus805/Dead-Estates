// import { useState, useEffect } from 'react'
// import { getItems, getItem, createItem, updateItem, deleteItem} from "./assets/data"
import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Ah } from './pages/ah'
import { Ct } from './pages/Ct'
import { Home } from './pages/Home'
import { Landing } from './pages/Landing'
import { Leaderboard } from './pages/Leaderboard'
import { Map } from './pages/Map'
import { Settings } from './pages/Settings'
// import { Navbar } from './components/navbar'
import { Layout } from './components/Layout'

function App() {

  // Pages
  // Landing page
  // Home page (start menu)
  // Map page
  // Auction House page
  // Commodities Trade page
  // Leaderboards page
  // Settings/Profile page

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