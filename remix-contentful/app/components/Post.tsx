import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types'
import { useEffect, useState } from 'react'
import type { Post as ContentfulPost } from '~/lib/contentful'

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
        {post.tags.map((tag: any) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <div>{post.date}</div>
    </div>
  )
}

function PostBody({ body }: any) {
  const [options, setOptions] = useState({})

  useEffect(() => {
    setOptions({
      renderNode: {
        [INLINES.HYPERLINK]: (node: any) => {
          if (node.data.uri.includes('youtube.com/embed')) {
            return (
              <div>
                <iframe
                  title={node.content[0].value}
                  src={node.data.uri}
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )
          }
        },
      },
    })
  }, [])

  return <div>{documentToReactComponents(body, options)}</div>
}
