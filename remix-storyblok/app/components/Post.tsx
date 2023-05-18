import { renderRichText } from '@storyblok/js'
import type { Post as StoryblokPost } from '~/lib/storyblok'

interface Props {
  post: StoryblokPost
}

export function Post({ post }: Props) {
  const renderedRichText = renderRichText(post.content.body)

  return (
    <div key={post.slug}>
      <h2>{post.name}</h2>

      <img src={post.content.image.filename} alt={post.content.image.alt} />

      <div dangerouslySetInnerHTML={{ __html: renderedRichText }} />

      <ul>
        {post.content.categories.map((tag) => (
          <li key={tag.name}>{tag.name}</li>
        ))}
      </ul>

      <div>{new Date(post.created_at).toLocaleDateString()}</div>
    </div>
  )
}
