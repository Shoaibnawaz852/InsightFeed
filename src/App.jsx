import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import PostDetails from "./pages/PostDetails"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div style={{ display: "flex", background: "#020617", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:tag" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
