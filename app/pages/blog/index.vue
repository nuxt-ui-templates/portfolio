<script setup lang="ts">
const { data: page } = await useAsyncData('blog-page', () => {
  return queryCollection('pages').path('/blog').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
// posts listing removed — show "Coming Soon" instead

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    />
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <div class="flex flex-col items-center justify-center py-16 lg:py-20">
        <div class="text-center space-y-4">
          <div class="flex items-center justify-center gap-2">
            <h3 class="text-3xl lg:text-4xl font-semibold animate-pulse">Coming Soon</h3>
            <span class="flex gap-1">
              <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
              <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
              <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
            </span>
          </div>
          <p class="text-muted text-sm lg:text-base max-w-lg px-4">
            Exciting articles are on the way. Stay tuned for insights on development, design, and technology.
          </p>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
