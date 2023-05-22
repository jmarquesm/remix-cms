import type { ContentfulBasePost, ContentfulPost } from '~/lib/types'

export interface BasePost extends Omit<ContentfulBasePost, 'categories'> {
  categories: ContentfulBasePost['categories']['items']
}

export interface Post extends Omit<ContentfulPost, 'categories'> {
  categories: ContentfulPost['categories']['items']
}
