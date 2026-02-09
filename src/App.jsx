import Sidebar from "./components/sidebar"
import Home from "./pages/Home"

function App() {
  return (
    <div style={{ display: "flex", background: "#020617", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Home />
      </div>
    </div>
  )
}

export default App
