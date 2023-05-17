import type { V2_MetaFunction } from '@remix-run/cloudflare'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Prismic' }]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Remix Prismic</h1>
    </div>
  )
}
