import type { LoaderArgs, V2_MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import PostsCard from '~/components/PostsCard'
import { getCategory, getCategoryPosts } from '~/lib/contentful'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Contentful' }]
}

export async function loader(args: LoaderArgs) {
  const slug = args.params.slug as string
  const category = await getCategory(slug, args)
  const posts = await getCategoryPosts(slug, args)

  if (!posts) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  return json({ posts, category })
}

export default function Index() {
  const { posts, category } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h2>Noticias sobre {category.name}</h2>

      {posts.map((post) => (
        <PostsCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
