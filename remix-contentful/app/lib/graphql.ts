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

export const getPostBySlug = /* GraphQL */ `
  query getPostBySlug($slug: String!) {
    postCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        image {
          title
          alt: description
          url
        }
        date
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
        categories: categoriesCollection {
          items {
            name
            slug
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
        sys {
          id
        }
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
      }
    }
  }
`
