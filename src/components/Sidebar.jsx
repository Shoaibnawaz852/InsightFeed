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

  const isMobile = window.innerWidth < 768

  return (
    <div
      style={{
        width: isMobile ? "100%" : "240px",
        background: "#ffffff",
        color: "#0f172a",
        padding: isMobile ? "12px 16px" : "24px",
        borderRight: isMobile ? "none" : "1px solid #e2e8f0",
        borderBottom: isMobile ? "1px solid #e2e8f0" : "none",
        height: isMobile ? "auto" : "100vh",
        position: isMobile ? "static" : "sticky",
        top: 0,
        overflowX: isMobile ? "auto" : "visible",
        whiteSpace: isMobile ? "nowrap" : "normal"
      }}
    >
      {/* Title (only for desktop) */}
      {!isMobile && (
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
      )}

      {/* Categories */}
      {categories.map((cat) => {
        const path = cat.tag ? `/category/${cat.tag}` : `/`
        const isActive = location.pathname === path

        return (
          <Link
            key={cat.name}
            to={path}
            style={{
              display: isMobile ? "inline-block" : "block",
              padding: "10px 14px",
              marginRight: isMobile ? "8px" : "0",
              marginBottom: isMobile ? "0" : "8px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: isActive ? "600" : "500",
              color: isActive ? "#2563eb" : "#475569",
              background: isActive ? "#eff6ff" : "transparent",
              border: isMobile ? "1px solid #e2e8f0" : "none",
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
