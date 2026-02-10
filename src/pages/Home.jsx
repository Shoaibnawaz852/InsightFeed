import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const { tag } = useParams()

  useEffect(() => {
    fetchPosts()
  }, [tag])

  async function fetchPosts() {
    setLoading(true)

    let query = supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    // Filter by category if present
    if (tag) {
      query = query.eq("tech_tag", tag)
    }

    const { data, error } = await query

    if (error) {
      console.error(error)
    } else {
      setPosts(data)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "#475569" }}>
        Loading posts...
      </div>
    )
  }

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8fafc",
        minHeight: "100vh"
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "700",
            color: "#0f172a"
          }}
        >
          Latest Insights {tag ? `- ${tag}` : ""}
        </h2>

        {/* Empty State */}
        {posts.length === 0 && (
          <p
            style={{
              marginTop: "20px",
              color: "#64748b"
            }}
          >
            No posts found for this category.
          </p>
        )}

        {/* Posts List */}
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                transition: "all 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 1px 2px rgba(0,0,0,0.05)")
              }
            >
              {/* Title */}
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#0f172a",
                  marginBottom: "8px"
                }}
              >
                {post.title}
              </h3>

              {/* Meta */}
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b"
                }}
              >
                <span
                  style={{
                    background: "#eff6ff",
                    color: "#2563eb",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    marginRight: "8px",
                    fontWeight: "500"
                  }}
                >
                  {post.tech_tag || "General"}
                </span>
                {post.upvotes || 0} upvotes
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
