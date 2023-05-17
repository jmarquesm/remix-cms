import type { PostHygraph } from '~/lib/hygraph'
import { RichText } from '@graphcms/rich-text-react-renderer'

interface Props {
  post: PostHygraph
}

export function Post({ post }: Props) {
  return (
    <div key={post.slug}>
      <h2>{post.title}</h2>

      <img src={post.image.asset.url} alt={post.image.alt} />

      <RichText references={post.body.references} content={post.body.json} />

      <ul>
        {post.categories.map((category) => (
          <li key={category.name}>{category.name}</li>
        ))}
      </ul>

      <div>{post.date}</div>
    </div>
  )
}
