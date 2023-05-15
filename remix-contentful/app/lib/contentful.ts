import type { LoaderArgs } from '@remix-run/cloudflare'
import type { Document } from '@contentful/rich-text-types'

export interface Post {
  slug: string
  title: string
  body: Document
  tags: string[]
  date: string
  image: {
    url: string
    alt: string
  }
}

interface ContentfulAsset {
  fields: { file: { url: string }; title: string }
  sys: { id: string }
}

interface ContentfulPostsOutput {
  includes: { Asset: ContentfulAsset[] }
  items: {
    fields: {
      title: string
      slug: string
      image: { sys: { id: string } }
      body: Document
      date: string
      tag: string[]
    }
  }[]
}

// TODO: implement get single post from contentful
export async function getPost(id: number | string) {
  return {}
}

export async function getPosts({ context }: LoaderArgs): Promise<Post[]> {
  const ACCESS_TOKEN = context.ACCESS_TOKEN
  const SPACE_KEY = context.SPACE_KEY

  const url = `https://cdn.contentful.com/spaces/${SPACE_KEY}/entries?access_token=${ACCESS_TOKEN}`
  const response = await fetch(url)
  const data = await response.json<ContentfulPostsOutput>()

  const posts = data.items.map((item) => {
    const asset = data.includes.Asset.find((asset: any) => asset.sys.id === item.fields.image.sys.id)!

    return {
      title: item.fields.title,
      slug: item.fields.slug,
      body: item.fields.body,
      tags: item.fields.tag,
      date: item.fields.date,
      image: {
        url: getImageURL(asset),
        alt: asset.fields.title,
      },
    }
  })

  return posts
}

function getImageURL(asset: ContentfulAsset) {
  return asset.fields.file.url
}
