<script setup lang="ts">
import { computed } from 'vue'
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const items = computed(() => {
  const list = (props.page as any)?.experience?.items || []
  return list
})

const isSerpro = (experience: any) =>{
  const name = (experience.company?.name || '').toLowerCase();
  const logo = (experience.company?.logo || '').toLowerCase();
  return name.includes('serpro') || logo.includes('serpro');
}
</script>

<template>
  <UPageSection
    :title="page.experience.title"
    :ui="{
      container: '!p-0 gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'mt-2'
    }"
  >
    <template #description>
      <div class="flex flex-col gap-0">
        <Motion
          v-for="(experience, index) in items"
          :key="index"
          :initial="{ opacity: 0, transform: 'translateY(20px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.4 + 0.2 * Number(index) }"
          :in-view-options="{ once: true }"
          class="text-muted flex items-center text-nowrap gap-2"
        >
          <p class="text-sm">{{ experience.date }}</p>
          <USeparator />

          <template v-if="experience.company && experience.company.url">
            <ULink class="flex items-center gap-5" :to="experience.company.url" target="_blank">
              <span class="text-sm">{{ experience.position }}</span>

              <div
                v-if="experience.company.logo"
                class="relative shrink-0 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 overflow-visible"
                :style="{ color: experience.company.color }"
              >
                <template v-if="experience.company.logo.startsWith('/')">
                  <img
                    :src="experience.company.logo"
                    :alt="experience.company.name + ' logo'"
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full object-contain"
                    :class="isSerpro(experience) ? 'scale-[2]' : ''"
                  />
                </template>

                <template v-else>
                  <UIcon
                    :name="experience.company.logo"
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full"
                    :class="isSerpro(experience) ? 'scale-[2]' : ''"
                  />
                </template>
              </div>

            </ULink>
          </template>

          <template v-else>
            <div class="flex items-center gap-2">
              <span class="text-sm">{{ experience.position }}</span>

              <div v-if="experience.company && experience.company.logo" class="inline-flex items-center gap-1" :style="{ color: experience.company.color }">
                <template v-if="experience.company.logo.startsWith('/')">
                  <img
                    :src="experience.company.logo"
                    :alt="experience.company.name + ' logo'"
                    class="object-contain h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 xl:h-48 xl:w-48"
                  />
                </template>
                <template v-else>
                  <UIcon :name="experience.company.logo" class="object-contain h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 xl:h-48 xl:w-48" />
                </template>
              </div>
            </div>
          </template>
        </Motion>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>

</style>

