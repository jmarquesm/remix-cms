import type { Options } from '@contentful/rich-text-react-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { Link } from '@remix-run/react'
import type { Post as IPost } from '~/types/Post'

interface PostProps {
  post: IPost
}

export function Post({ post }: PostProps) {
  return (
    <div key={post.slug}>
      <h3>{post.title}</h3>

      <img src={post.image.url} alt={post.image.alt} />

      <PostBody body={post.body}></PostBody>

      <ul>
        {post.categories.map((category) => (
          <li key={category.slug}>
            <Link to={`/categoria/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>

      <div>{new Date(post.date).toLocaleDateString()}</div>
    </div>
  )
}

interface PostBodyProps {
  body: IPost['body']
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
