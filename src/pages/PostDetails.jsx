import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetchPost()
  }, [id])

  async function fetchPost() {
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
  }

  if (!post) {
    return <div style={{ padding: "20px", color: "white" }}>Loading...</div>
  }

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>{post.title}</h2>

      <div style={{ color: "#94a3b8", marginTop: "10px" }}>
        {post.tech_tag} • {post.upvotes} upvotes
      </div>

      {post.content && (
        <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
          {post.content}
        </p>
      )}

      {post.source_url && (
        <a
          href={post.source_url}
          target="_blank"
          rel="noreferrer"
          style={{ marginTop: "20px", display: "inline-block", color: "#38bdf8" }}
        >
          View on Reddit →
        </a>
      )}
    </div>
  )
}
