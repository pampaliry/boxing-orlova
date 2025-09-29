type PayloadList<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
}

type Post = {
  id: string
  title: string
  slug: string
  body?: string // ak vracias HTML z WYSIWYG
  hero?: { url?: string; alt?: string }
}

export function useCms() {
  async function listPosts(params?: Record<string, any>) {
    return $fetch<PayloadList<Post>>('/api/cms/api/posts', { query: params })
  }

  async function getPostBySlug(slug: string) {
    const res = await $fetch<PayloadList<Post>>('/api/cms/api/posts', {
      query: { where: { slug: { equals: slug } }, limit: 1, depth: 2 }
    })
    return res.docs[0] || null
  }

  // univerzalny helper, ked chces volat hocico:
  async function cms<T>(path: string, params?: Record<string, any>) {
    return $fetch<T>(`/api/cms/${path}`, { query: params })
  }

  return { listPosts, getPostBySlug, cms }
}
