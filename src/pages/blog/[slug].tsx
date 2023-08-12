import React from "react"
import { useParam } from "@blitzjs/next"
import { useStringParam } from "../../utils/utils"

const BlogPostPage = () => {
  const slug = useStringParam("slug")
  return <div>Blog post: ${slug}</div>
}

export default BlogPostPage
