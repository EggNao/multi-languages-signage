import { createClient } from 'microcms-js-sdk'
import { ContentsType } from '@/types/microcms'

export const client = createClient({
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY ?? '',
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN ?? '',
})

export const getMicroCMSContents = async(language: 'japanese' | 'english'): Promise<ContentsType[]> => {
  const data = await client.get({
    endpoint: 'contents',
    queries: { filters: `language[contains]${language}` }
  })
  return data.contents
}

