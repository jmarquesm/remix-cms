import type { LoaderArgs, V2_MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { getCategories, getPosts } from '~/lib/contentful'
import PostsCard from '~/components/PostsCard'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Contentful' }]
}

export async function loader(args: LoaderArgs) {
  const posts = await getPosts(args)
  const categories = await getCategories(args)

  return json({ posts, categories })
}

export default function Index() {
  const { posts, categories } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <div>
        <h2>Noticias por Categoria</h2>

        {categories.map((category) => (
          <li key={category.slug}>
            <Link to={`/categoria/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </div>

      <div>
        <h2>Ultimas Noticias</h2>

        {posts.map((post) => (
          <PostsCard key={post?.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
