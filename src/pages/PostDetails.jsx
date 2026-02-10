import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [id])

  async function fetchPost() {
    setLoading(true)

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error(error)
    } else {
      setPost(data)
    }

    setLoading(false)
  }

  // Loading state
  if (loading) {
    return (
      <div style={{ padding: "30px", color: "#334155" }}>
        Loading post...
      </div>
    )
  }

  // Not found state
  if (!post) {
    return (
      <div style={{ padding: "30px", color: "#334155" }}>
        Post not found
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
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          border: "1px solid #e2e8f0"
        }}
      >
        {/* Title */}
        <h2 style={{ marginBottom: "10px", color: "#0f172a" }}>
          {post.title}
        </h2>

        {/* Meta */}
        <div style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
          {post.tech_tag || "General"} • {post.upvotes || 0} upvotes
        </div>

        {/* Content */}
        {post.content && post.content.trim().length > 0 ? (
          <p style={{ lineHeight: "1.7", color: "#334155" }}>
            {post.content}
          </p>
        ) : (
          <p style={{ color: "#94a3b8", fontStyle: "italic" }}>
            This post doesn’t have detailed text content.
          </p>
        )}

        {/* Source Button */}
        {post.source_url && (
          <a
            href={post.source_url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "25px",
              padding: "10px 18px",
              background: "#2563eb",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500"
            }}
          >
            View on Reddit →
          </a>
        )}
      </div>
    </div>
  )
}
