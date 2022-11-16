import { createClient } from 'microcms-js-sdk'

export const client = createClient({
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY ?? '',
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN ?? '',
})
