import { PrismicRichText } from '@prismicio/react'
import type { Post as PrismicPost } from '~/lib/prismic'

interface PostProps {
  post: PrismicPost
}

export function Post({ post }: PostProps) {
  return (
    <div key={post.slug}>
      <h2>{post.title}</h2>

      <img src={post.image.url} alt={post.image.alt} />

      <PrismicRichText field={post.body} />

      <ul>
        {post.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div>{post.date}</div>
    </div>
  )
}
