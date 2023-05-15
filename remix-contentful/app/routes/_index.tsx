import type { LoaderArgs, V2_MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { getPosts } from '~/lib/contentful'
import { Post } from '~/components/Post'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Contentful' }]
}

export async function loader(args: LoaderArgs) {
  const posts = await getPosts(args)

  return json({ posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix Contentful</h1>

      {posts.map((post) => {
        return <Post key={post.slug} post={post}></Post>
      })}
    </div>
  )
}
