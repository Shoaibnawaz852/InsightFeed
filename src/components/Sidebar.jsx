import { Link } from "react-router-dom"

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
  return (
    <div
      style={{
        width: "220px",
        background: "#020617",
        color: "white",
        padding: "20px",
        borderRight: "1px solid #1e293b",
        height: "100vh"
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>
        InsightFeed
      </h2>

      {categories.map((cat) => (
        <Link
          key={cat.name}
          to={cat.tag ? `/category/${cat.tag}` : `/`}
          style={{
            display: "block",
            marginBottom: "12px",
            color: "#94a3b8",
            textDecoration: "none",
            cursor: "pointer"
          }}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )
}
