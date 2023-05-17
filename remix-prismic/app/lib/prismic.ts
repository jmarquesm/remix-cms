import type { RichTextField } from '@prismicio/client'
import type { LoaderArgs } from '@remix-run/cloudflare'

export interface Post {
  id: string
  title: string
  slug: string
  body: RichTextField
  tags: string[]
  date: string
  image: {
    url: string
    alt: string
    height: string
    width: string
  }
}

interface Data {
  results: {
    id: string
    slugs: string[]
    data: {
      title: {
        text: string
      }[]
      tags: {
        tag: {
          slug: string
        }
      }[]
      image: {
        url: string
        name: string
        height: string
        width: string
      }
      date: string
      body: RichTextField
    }
  }[]
}

interface RefData {
  refs: { ref: string }[]
}

async function getRef(PRISMIC_API_URL: string) {
  const response = await fetch(PRISMIC_API_URL)
  const data = await response.json<RefData>()

  return data.refs[0].ref
}

export async function getPosts({ context }: LoaderArgs) {
  const PRISMIC_API_URL = context.PRISMIC_API_URL as string

  const REF = await getRef(PRISMIC_API_URL)
  const url = `${PRISMIC_API_URL}/documents/search?ref=${REF}&q=%5B%5Bat(document.type%2C"posts")%5D%5D`
  const response = await fetch(url)
  const data = await response.json<Data>()

  const posts = data.results.map(
    (post): Post => ({
      id: post.id,
      title: post.data.title[0].text,
      slug: post.slugs[0],
      body: post.data.body,
      tags: post.data.tags.map((tag) => tag.tag.slug),
      date: post.data.date,
      image: {
        url: post.data.image.url,
        alt: post.data.image.name,
        height: post.data.image.height,
        width: post.data.image.width,
      },
    })
  )

  return posts
}
