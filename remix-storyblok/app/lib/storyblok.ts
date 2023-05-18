import type { LoaderArgs } from '@remix-run/cloudflare'
import type { ISbRichtext } from '@storyblok/js/dist/types'

export interface Post {
  name: string
  slug: string
  id: number
  created_at: string
  content: {
    body: ISbRichtext
    categories: {
      name: string
    }[]
    image: {
      alt: string
      filename: string
    }
  }
}

interface DataPost {
  data: {
    PostItems: {
      items: Post[]
    }
  }
}

export async function getPosts({ context }: LoaderArgs) {
  const STORYBLOK_TOKEN = context.STORYBLOK_TOKEN as string
  const url = `https://gapi-us.storyblok.com/v1/api`

  const getAllPostsQuery = /* GraphQL */ `
    query {
      PostItems {
        items {
          id
          name
          slug
          created_at
          content {
            body
            image {
              alt
              filename
            }
            categories {
              name
            }
          }
        }
      }
    }
  `

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Token': STORYBLOK_TOKEN,
    },
    body: JSON.stringify({ query: getAllPostsQuery }),
  })

  const { data }: DataPost = await response.json()

  return data.PostItems.items
}
