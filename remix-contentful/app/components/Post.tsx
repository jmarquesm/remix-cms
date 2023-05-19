import type { Options } from '@contentful/rich-text-react-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import type { Post as ContentfulPost } from '~/lib/types'
import type { Body as PostBodyProps } from '~/types/post-types'

interface PostProps {
  post: ContentfulPost
}

export function Post({ post }: PostProps) {
  return (
    <div key={post.slug}>
      <h2>{post.title}</h2>

      <img src={post.image.url} alt={post.image.alt} />

      <PostBody body={post.body}></PostBody>

      <ul>
        {post.categories.items.map((category) => (
          <li key={category.slug}>{category.name}</li>
        ))}
      </ul>

      <div>{new Date(post.date).toLocaleDateString()}</div>
    </div>
  )
}

function PostBody({ body }: PostBodyProps) {
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = body.links.assets.block.find((asset) => asset.sys.id === node.data.target.sys.id)!

        return <img src={asset.url} alt={asset.description}></img>
      },
    },
  }

  return <div>{documentToReactComponents(body.json, options)}</div>
}
