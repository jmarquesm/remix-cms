import type { LoaderArgs, V2_MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { Post } from '~/components/Post'
import { getPosts } from '~/lib/hygraph'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Hygraph' }]
}

export async function loader(args: LoaderArgs) {
  const posts = await getPosts(args)

  return json({ posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix Hygraph</h1>

      {posts.posts.map((post) => {
        return <Post key={post.slug} post={post}></Post>
      })}
    </div>
  )
}
