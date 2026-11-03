import { posts } from '@/data/posts'
import type { Post, PostTag } from '@/types'

export const allPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)

export const latestPosts = allPosts.slice(0, 3)

export const postTags = Array.from(new Set(posts.map((post) => post.tag))) as PostTag[]

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function getRelatedPosts(post: Post, limit = 2) {
  const sameTag = allPosts.filter(
    (candidate) => candidate.tag === post.tag && candidate.slug !== post.slug,
  )
  const rest = allPosts.filter(
    (candidate) => candidate.tag !== post.tag && candidate.slug !== post.slug,
  )

  return [...sameTag, ...rest].slice(0, limit)
}
