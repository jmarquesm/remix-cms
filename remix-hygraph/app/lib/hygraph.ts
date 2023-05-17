import type { RichTextContent, EmbedReferences } from '@graphcms/rich-text-types'
import type { LoaderArgs } from '@remix-run/cloudflare'

export interface PostHygraph {
  id: string
  title: string
  slug: string
  image: {
    asset: {
      id: string
      url: string
      width: number
      height: number
    }
    alt: string
  }
  body: {
    json: RichTextContent
    references: EmbedReferences
  }
  date: string
  categories: {
    name: string
    color: {
      hex: string
    }
  }[]
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
          asset {
            id
            url
            width
            height
          }
          alt
        }
        body {
          json
          references {
            ... on Asset {
              id
              url
              mimeType
            }
          }
        }
        date
        categories {
          name
          color {
            hex
          }
        }
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
