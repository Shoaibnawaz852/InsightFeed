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
      <div style={{ padding: "20px", color: "white" }}>
        Loading posts...
      </div>
    )
  }

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>
        Latest Insights {tag ? `- ${tag}` : ""}
      </h2>

      {posts.length === 0 && (
        <p style={{ marginTop: "20px", color: "#94a3b8" }}>
          No posts found for this category.
        </p>
      )}

      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/post/${post.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            <h3>{post.title}</h3>

            <div
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                marginTop: "5px"
              }}
            >
              {post.tech_tag || "General"} • {post.upvotes || 0} upvotes
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

