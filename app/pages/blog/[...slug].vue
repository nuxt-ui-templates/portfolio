<script setup lang="ts">
import type { ContentSurroundLink } from '@nuxt/ui'
import { withoutTrailingSlash } from 'ufo'
import type { BlogPost } from '~/types/content'

const route = useRoute()
const routePath = computed(() => withoutTrailingSlash(route.path))

const { data: page } = await useAsyncData(routePath.value, () => content.get<BlogPost>(routePath.value))
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

// v4 has no surround API. The blog is flat, so the previous and next posts in path order,
// the order v3's `queryCollectionItemSurroundings` used, come straight from `content.list()`.
const { data: surround } = await useAsyncData(`${routePath.value}-surround`, async () => {
  const posts = (await content.list(['blog'])).sort((a, b) => a.path.localeCompare(b.path))
  const index = posts.findIndex(post => post.path === routePath.value)
  return [posts[index - 1], posts[index + 1]].map(post => post
    ? { title: post.data.title, description: post.data.description, path: post.path }
    : null)
})
// `UContentSurround` renders an empty column for a missing side, but its type doesn't allow `null`.

const title = page.value.data.seo?.title || page.value.data.title
const description = page.value.data.seo?.description || page.value.data.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

if (page.value.data.image) {
  useSeoMeta({ ogImage: page.value.data.image })
} else {
  defineOgImage('Portfolio', {
    title,
    description,
    headline: 'Blog'
  })
}

const articleLink = computed(() => `${window?.location}`)

const formatDate = (dateString: unknown) => {
  return new Date(String(dateString)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          to="/blog"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          Blog
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div class="flex text-xs text-muted items-center justify-center gap-2">
            <span v-if="page.data.date">
              {{ formatDate(page.data.date) }}
            </span>
            <span v-if="page.data.date && page.data.minRead">
              -
            </span>
            <span v-if="page.data.minRead">
              {{ page.data.minRead }} MIN READ
            </span>
          </div>
          <NuxtImg
            v-if="page.data.image"
            :src="page.data.image"
            :alt="page.data.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.data.title }}
          </h1>
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ page.data.description }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="justify-center items-center text-center"
              v-bind="page.data.author"
            />
          </div>
        </div>
        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer
            v-if="page.nodes.length"
            :value="page"
          />

          <div class="flex items-center justify-end gap-2 text-sm text-muted">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
              @click="copyToClipboard(articleLink, 'Article link copied to clipboard')"
            />
          </div>
          <UContentSurround :surround="surround as ContentSurroundLink[]" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
