import type { PostHygraph } from '~/lib/hygraph'
import { RichText } from '@graphcms/rich-text-react-renderer'

interface Props {
  post: PostHygraph
}

export function Post({ post }: Props) {
  return (
    <div key={post.slug}>
      <h2>{post.title}</h2>

      <img src={post.image.url} alt={post.image.fileName} />

      <RichText content={post.body.json} />

      <ul>
        {post.tag.map((tag: string) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div>{post.date}</div>
    </div>
  )
}
