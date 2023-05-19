import type { LoaderArgs } from '@remix-run/cloudflare'
import { contentfulGraphQLRequest, getAllPostsQuery, getPostBySlug } from './graphql'
import type { ContentfulPostsOutput, Post } from '~/lib/types'

export async function getPost(slug: string, { context }: LoaderArgs) {
  const { data } = await contentfulGraphQLRequest<ContentfulPostsOutput>(context, getPostBySlug, { slug })

  return data.postCollection.items
}

export async function getPosts({ context }: LoaderArgs): Promise<Post[]> {
  const { data } = await contentfulGraphQLRequest<ContentfulPostsOutput>(context, getAllPostsQuery)

  return data.postCollection.items
}
