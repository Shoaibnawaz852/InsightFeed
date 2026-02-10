import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import PostDetails from "./pages/PostDetails"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div
      style={{
        display: "flex",
        background: "#f8fafc",   // light background
        minHeight: "100vh"
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Category filter */}
          <Route path="/category/:tag" element={<Home />} />

          {/* Post Details */}
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
