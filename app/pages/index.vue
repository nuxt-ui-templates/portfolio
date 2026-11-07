<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => content.get('/'))
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const title = page.value.data.seo?.title || page.value.data.title
const description = page.value.data.seo?.description || page.value.data.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png'
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page="page.data" />
    <UPageSection
      :ui="{
        container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page="page.data" />
      <LandingWorkExperience :page="page.data" />
    </UPageSection>
    <LandingBlog :page="page.data" />
    <LandingTestimonials :page="page.data" />
    <LandingFAQ :page="page.data" />
  </UPage>
</template>
