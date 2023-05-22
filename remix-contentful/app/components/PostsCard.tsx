import { Link } from '@remix-run/react'
import type { BasePost } from '~/types/Post'

interface PostCardProps {
  post: BasePost
}

export default function PostsCard({ post }: PostCardProps) {
  return (
    <div>
      <Link to={`/${post.slug}`}>
        <h3>{post.title}</h3>

        <img src={post.image.url} alt={post.image.alt} />
      </Link>

      <div>
        {post.categories.map((category) => (
          <li key={category.slug}>
            <Link to={`/categoria/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </div>

      <div>{new Date(post.date).toLocaleDateString()}</div>
    </div>
  )
}
