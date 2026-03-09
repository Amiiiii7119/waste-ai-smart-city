import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Leaderboard from "./pages/Leaderboard"
import Marketplace from "./pages/Marketplace"
import EducationHub from "./pages/EducationHub"
import ARGame from "./pages/ARGame"
import History from "./pages/History"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import ImpactReport from "./pages/ImpactReport"
import routes from "./pages/routes"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/education" element={<EducationHub />} />
        <Route path="/game" element={<ARGame />} />
        <Route path="/routes" element={<Routes />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/impact" element={<ImpactReport />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App