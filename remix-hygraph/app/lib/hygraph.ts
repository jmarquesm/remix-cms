import type { LoaderArgs } from '@remix-run/cloudflare'

export interface PostHygraph {
  id: string
  title: string
  slug: string
  image: {
    id: string
    url: string
    width: number
    height: number
    fileName: string
  }
  body: {
    json?: any
  }
  date: string
  tag: string[]
}

export interface DataProps {
  data: {
    posts: PostHygraph[]
  }
}

export interface PostProps {
  posts: PostHygraph[]
}

export async function getPosts({ context }: LoaderArgs): Promise<PostProps> {
  const HYGRAPH_CONTENT_API_URL = context.HYGRAPH_CONTENT_API_URL as string

  const getAllPostsQuery = /* GraphQL */ `
    query Posts {
      posts {
        id
        title
        slug
        image {
          id
          url
          width
          height
          fileName
        }
        body: description {
          json
        }
        date
        tag
      }
    }
  `

  const response = await fetch(HYGRAPH_CONTENT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: getAllPostsQuery }),
  })

  const { data }: DataProps = await response.json()

  return data
}
