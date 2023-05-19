import { Link } from '@remix-run/react'
import type { Post as ContentfulPost } from '~/lib/types'

interface PostCardProps {
  post: ContentfulPost
}

export default function PostsCard({ post }: PostCardProps) {
  return (
    <div>
      <Link to={post.slug}>
        <h2>{post.title}</h2>

        <img src={post.image.url} alt={post.image.alt} />
      </Link>

      <div>{post.categories.items.map((category) => category.name)}</div>

      <div>{new Date(post.date).toLocaleDateString()}</div>
    </div>
  )
}
