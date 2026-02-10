import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div style={{ display: "flex", background: "#020617", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:tag" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
