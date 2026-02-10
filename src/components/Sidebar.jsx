import { Link, useLocation } from "react-router-dom"

const categories = [
  { name: "All", tag: "" },
  { name: "AI", tag: "MachineLearning" },
  { name: "Tech News", tag: "technology" },
  { name: "Startups", tag: "startups" },
  { name: "Programming", tag: "programming" },
  { name: "Web Dev", tag: "webdev" },
  { name: "Growth", tag: "growthhacking" }
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div
      style={{
        width: "240px",
        background: "#ffffff",
        color: "#0f172a",
        padding: "24px",
        borderRight: "1px solid #e2e8f0",
        height: "100vh",
        position: "sticky",
        top: 0
      }}
    >
      {/* Logo / Title */}
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          marginBottom: "30px",
          color: "#0f172a"
        }}
      >
        InsightFeed
      </h2>

      {/* Categories */}
      {categories.map((cat) => {
        const path = cat.tag ? `/category/${cat.tag}` : `/`
        const isActive = location.pathname === path

        return (
          <Link
            key={cat.name}
            to={path}
            style={{
              display: "block",
              padding: "10px 12px",
              marginBottom: "8px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: isActive ? "600" : "500",
              color: isActive ? "#2563eb" : "#475569",
              background: isActive ? "#eff6ff" : "transparent",
              transition: "all 0.2s"
            }}
          >
            {cat.name}
          </Link>
        )
      })}
    </div>
  )
}
