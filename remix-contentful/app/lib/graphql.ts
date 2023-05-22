import type { Env } from '~/types/env'

export async function contentfulGraphQLRequest<T>(
  env: Env,
  query: string,
  variables?: Record<string, unknown>
) {
  const url = `https://graphql.contentful.com/content/v1/spaces/${env.SPACE_KEY}/environments/master`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  })

  const data = await response.json<T>()

  return data
}

const PostFragment = `
  title
  slug
  image {
    title
    alt: description
    url
  }
  date
  categories: categoriesCollection {
    items {
      name
      slug
    }
  }
`

export const getPostBySlugQuery = /* GraphQL */ `
  query getPostBySlug($slug: String!) {
    postCollection(where: { slug: $slug }, limit: 1) {
      items {
        ${PostFragment}
        body {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                description
              }
            }
          }
        }
      }
    }
  }
`

export const getAllPostsQuery = /* GraphQL */ `
  query getPosts {
    postCollection(limit: 50) {
      items {
        ${PostFragment}
      }
    }
  }
`

export const getCategoryPostsQuery = /* GraphQL */ `
  query getCategoryPosts($slug: String!) {
    postCollection(where: { categories: { slug: $slug } }) {
      items {
        ${PostFragment}
      }
    }
  }
`

export const getCategoryBySlugQuery = /* GraphQL */ `
  query getCategoryBySlug($slug: String!) {
    categoryCollection(where: { slug: $slug }) {
      items {
        name
        slug
      }
    }
  }
`
export const getCategoriesQuery = /* GraphQL */ `
  query getCategories {
    categoryCollection {
      items {
        name
        slug
      }
    }
  }
`
