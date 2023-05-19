import type { Document } from '@contentful/rich-text-types'

export interface Post {
  title: string
  slug: string
  body: {
    json: Document
    links: {
      assets: {
        block: {
          sys: { id: string }
          title: string
          url: string
          description: string
        }[]
      }
    }
  }
  date: string
  image: {
    title: string
    alt: string
    url: string
  }
  categories: {
    items: {
      name: string
      slug: string
    }[]
  }
}

export interface ContentfulPostsOutput {
  data: {
    postCollection: {
      items: Post[]
    }
  }
}
