export type ContentsType = {
  data: {
    content: {
      height: number
      width: number
      url: string
    }
    createAt: String
    language: ['japanese' | 'english']
    id: string
    publishedAt: string
    revisedAt: string
    updatedAt: string
  }[]
}
