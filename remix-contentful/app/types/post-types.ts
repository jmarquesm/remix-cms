import type { Document } from '@contentful/rich-text-types'

export interface Body {
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
