import type { LoaderArgs, V2_MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Post } from '~/components/Post'
import { getPosts } from '~/lib/prismic'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Prismic' }]
}

export async function loader(args: LoaderArgs) {
  const posts = await getPosts(args)

  return json({ posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix Prismic</h1>

      {posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </div>
  )
}
