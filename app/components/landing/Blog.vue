<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.blog.title"
    :description="page.blog.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
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
</template>
