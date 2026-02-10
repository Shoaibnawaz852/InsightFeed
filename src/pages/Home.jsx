import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const { tag } = useParams()   // <-- read category from URL

  useEffect(() => {
    fetchPosts()
  }, [tag])   // <-- refetch when category changes

  async function fetchPosts() {
    setLoading(true)

    let query = supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    // If category selected → filter
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
    return <div style={{ padding: "20px", color: "white" }}>Loading posts...</div>
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
        <div
          key={post.id}
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#020617",
            border: "1px solid #1e293b",
            borderRadius: "8px"
          }}
        >
          <h3>{post.title}</h3>

          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "5px" }}>
            {post.tech_tag || "General"} • {post.upvotes || 0} upvotes
          </div>
        </div>
      ))}
    </div>
  )
}
