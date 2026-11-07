<script setup lang="ts">
import type { IndexPage } from '~/types/content'

defineProps<{
  page: IndexPage
}>()
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :description="page.about.description"
    :ui="{
      container: 'p-0!',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-3 text-sm sm:text-base lg:text-sm text-muted'
    }"
  />
</template>

<style scoped>

</style>
