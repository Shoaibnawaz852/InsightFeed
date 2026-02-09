const categories = [
  "AI",
  "Tech News",
  "Startups",
  "Big Tech",
  "Cloud",
  "Global Market",
  "Cybersecurity",
  "Innovation"
]

export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#020617",
      color: "white",
      padding: "20px",
      borderRight: "1px solid #1e293b",
      height: "100vh"
    }}>
      <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>
        InsightFeed
      </h2>

      {categories.map((cat) => (
        <div
          key={cat}
          style={{
            marginBottom: "12px",
            cursor: "pointer",
            color: "#94a3b8"
          }}
        >
          {cat}
        </div>
      ))}
    </div>
  )
}
