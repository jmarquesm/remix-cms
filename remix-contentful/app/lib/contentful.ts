import type { LoaderArgs } from '@remix-run/cloudflare'
import {
  contentfulGraphQLRequest,
  getAllPostsQuery,
  getCategoriesQuery,
  getCategoryBySlugQuery,
  getCategoryPostsQuery,
  getPostBySlugQuery,
} from './graphql'
import type {
  ContentfulPostsOutput,
  ContentfulBasePost,
  ContentfulPost,
  ContentfulCategoryOutput,
  Category,
} from '~/lib/types'
import type { BasePost, Post } from '~/types/Post'

function transformContentfulPostToPost<
  TPost extends ContentfulBasePost | ContentfulPost,
  R = TPost extends ContentfulPost ? Post : BasePost
>(post: TPost): R {
  return {
    ...post,
    categories: post.categories.items.filter(Boolean),
  } as R
}

export async function getPost(slug: string, { context }: LoaderArgs): Promise<Post | null> {
  const { data } = await contentfulGraphQLRequest<ContentfulPostsOutput<ContentfulPost>>(
    context,
    getPostBySlugQuery,
    {
      slug,
    }
  )

  if (data.postCollection.items.length === 0) {
    return null
  }

  return transformContentfulPostToPost(data.postCollection.items[0])
}

export async function getPosts({ context }: LoaderArgs): Promise<BasePost[]> {
  const { data } = await contentfulGraphQLRequest<ContentfulPostsOutput<ContentfulBasePost>>(
    context,
    getAllPostsQuery
  )

  return data.postCollection.items.map(transformContentfulPostToPost)
}

export async function getCategoryPosts(slug: string, { context }: LoaderArgs): Promise<Post[] | null> {
  const { data } = await contentfulGraphQLRequest<ContentfulPostsOutput<ContentfulPost>>(
    context,
    getCategoryPostsQuery,
    {
      slug,
    }
  )

  if (data.postCollection.items.length === 0) {
    return null
  }

  return data.postCollection.items.map(transformContentfulPostToPost)
}

export async function getCategory(slug: string, { context }: LoaderArgs): Promise<Category> {
  const { data } = await contentfulGraphQLRequest<ContentfulCategoryOutput>(context, getCategoryBySlugQuery, {
    slug,
  })

  return data.categoryCollection.items[0]
}

export async function getCategories({ context }: LoaderArgs): Promise<Category[]> {
  const { data } = await contentfulGraphQLRequest<ContentfulCategoryOutput>(context, getCategoriesQuery)

  return data.categoryCollection.items
}
