import type { LoaderArgs } from '@remix-run/cloudflare'
import { contentfulGraphQLRequest, getAllPostsQuery, getPostBySlug } from './graphql'
import type { ContentfulPostsOutput, Post } from '~/lib/types'

export async function getPost(slug: string, { context }: LoaderArgs): Promise<Post | null> {
  const { data } = await contentfulGraphQLRequest<ContentfulPostsOutput>(context, getPostBySlug, { slug })

  if (data.postCollection.items.length === 0) {
    return null
  }
  return data.postCollection.items[0]
}

export async function getPosts({ context }: LoaderArgs): Promise<Post[]> {
  const { data } = await contentfulGraphQLRequest<ContentfulPostsOutput>(context, getAllPostsQuery)

  return data.postCollection.items
}
