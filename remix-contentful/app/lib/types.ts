import type { Document } from '@contentful/rich-text-types'

export interface ContentfulBasePost {
  title: string
  slug: string
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

export interface ContentfulPost extends ContentfulBasePost {
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
}

export interface ContentfulPostsOutput<TPost extends ContentfulBasePost | ContentfulPost> {
  data: {
    postCollection: {
      items: TPost[]
    }
  }
}

export interface Category {
  name: string
  slug: string
}

export interface ContentfulCategoryOutput {
  data: {
    categoryCollection: {
      items: Category[]
    }
  }
}
