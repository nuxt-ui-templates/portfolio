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
  useAsyncData('navigation', () => {
    return Promise.all([
      queryCollectionNavigation('blog')
    ])
  }, {
    transform: data => data.flat()
  }),
  useLazyAsyncData('search', () => {
    return Promise.all([
      queryCollectionSearchSections('blog')
    ])
  }, {
    server: false,
    transform: data => data.flat()
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
