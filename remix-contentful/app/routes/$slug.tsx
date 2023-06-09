import type { LoaderArgs, V2_MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { getPost } from '~/lib/contentful'
import { Post } from '~/components/Post'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Contentful' }]
}

export async function loader(args: LoaderArgs) {
  const slug = args.params.slug as string

  const post = await getPost(slug, args)

  if (!post) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  return json({ post })
}

export default function Index() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <Post post={post}></Post>
    </div>
  )
}
