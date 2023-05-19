import type { Env } from '~/types/env'

declare module '@remix-run/cloudflare' {
  export interface AppLoadContext extends Env {}
}
