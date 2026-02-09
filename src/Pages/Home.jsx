import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

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
      <h2>Latest Insights</h2>

      {posts.length === 0 && (
        <p style={{ marginTop: "20px", color: "#94a3b8" }}>
          No posts yet. Add some data in Supabase.
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
