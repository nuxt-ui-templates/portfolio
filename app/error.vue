<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  // v4 builds one navigation tree across every source; search covers the blog only.
  useAsyncData('navigation', async () => {
    const navigation = await content.navigation()
    return navigation.filter(item => item.path === '/blog')
  }),
  // v4 has no native search-sections API, so this stays on the v3 compatibility layer.
  useLazyAsyncData('search', () => queryCollectionSearchSections('blog'), {
    server: false
  })
])
</script>

<template>
  <UApp>
    <AppHeader :links="navLinks" />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
