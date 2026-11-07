// `content.list()` returns the posts of the `blog` source unordered, so they are sorted here,
// newest first, as v3's `queryCollection('blog').order('date', 'DESC')` did.
export async function listBlogPosts() {
  const posts = await content.list(['blog'])
  return posts
    // v4 types `content.config.ts` dates as `unknown`; they are the frontmatter date strings.
    .map(post => ({ ...post, data: { ...post.data, date: String(post.data.date) } }))
    .sort((a, b) => b.data.date.localeCompare(a.data.date))
}
