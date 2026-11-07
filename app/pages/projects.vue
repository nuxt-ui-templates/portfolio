<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const { data: page } = await useAsyncData('projects-page', () => {
  return content.get('/projects')
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

// Sorted by path, the order v3 returned them in.
const { data: projects } = await useAsyncData('projects', async () => {
  const projects = await content.list(['projects'])
  return projects.sort((a, b) => a.path.localeCompare(b.path)).map(project => project.data)
})

const { global } = useAppConfig()

const title = page.value.data.seo?.title || page.value.data.title
const description = page.value.data.seo?.description || page.value.data.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

// v4 types `content.config.ts` enums as plain strings, so the button `color`/`size`/`variant`
// enums need narrowing back to Nuxt UI's types.
const links = page.value.data.links as ButtonProps[]

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.data.title"
      :description="page.data.description"
      :links
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="links[0]?.label"
            :to="global.meetingLink"
            v-bind="links[0]"
          />
          <UButton
            :to="`mailto:${global.email}`"
            v-bind="links[1]"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          :to="project.url"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ new Date(String(project.date)).getFullYear() }}
            </span>
          </template>
          <template #footer>
            <ULink
              :to="project.url"
              class="text-sm text-primary flex items-center"
            >
              View Project
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </ULink>
          </template>
          <img
            :src="project.image"
            :alt="project.title"
            class="object-cover w-full h-48 rounded-lg"
          >
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
