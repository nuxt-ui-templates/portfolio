<script setup lang="ts">
import { computed } from 'vue'
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const colorMode = useColorMode()

const items = computed(() => {
  const list = (props.page as any)?.experience?.items || []
  return list
})

const isSerpro = (experience: any) =>{
  const name = (experience.company?.name || '').toLowerCase();
  const logo = (experience.company?.logo || '').toLowerCase();
  return name.includes('serpro') || logo.includes('serpro');
}

const isDWCorp = (experience: any) =>{
  const name = (experience.company?.name || '').toLowerCase();
  const logo = (experience.company?.logo || '').toLowerCase();
  return name.includes('dw corp') || logo.includes('dw-corp');
}

const getLogoPath = (experience: any) => {
  const isClient = typeof window !== 'undefined'
  const hasStoredPref = isClient && (
    localStorage.getItem('color-mode') !== null ||
    localStorage.getItem('nuxt-color-mode') !== null
  )
  const prefersDark = isClient && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const isInitialDark = !hasStoredPref && prefersDark

  if (isDWCorp(experience)) {
    return (colorMode.value === 'dark' || isInitialDark)
      ? '/logos/DW-Corp-logo-white-transparent.png'
      : experience.company.logo
  }

  return experience.company.logo
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
            <ULink class="flex items-center gap-3" :to="experience.company.url" target="_blank">
              <span class="text-sm font-normal">{{ experience.position }}</span>

              <div
                v-if="experience.company.logo"
                :class="['relative shrink-0 h-7 w-7 sm:h-8 sm:w-8 overflow-visible', isDWCorp(experience) ? 'ml-4' : 'ml-3']"
                :style="{ color: experience.company.color }"
              >
                <template v-if="experience.company.logo.startsWith('/')">
                  <img
                    :src="getLogoPath(experience)"
                    :alt="experience.company.name + ' logo'"
                    :class="[
                      isDWCorp(experience)
                        ? 'absolute left-1/2 top-[4%] -translate-x-1/2'
                        : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                      'h-full w-full object-contain',
                      isDWCorp(experience) ? 'scale-[4]' : (isSerpro(experience) ? 'scale-[2]' : '')
                    ]"
                  />
                </template>

                <template v-else>
                  <UIcon
                    :name="experience.company.logo"
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full"
                  />
                </template>
              </div>
            </ULink>
          </template>

          <template v-else>
            <div class="flex items-center gap-3">
              <span class="text-sm font-normal">{{ experience.position }}</span>

              <div 
                v-if="experience.company && experience.company.logo" 
                class="relative shrink-0 h-7 w-7 sm:h-8 sm:w-8 overflow-visible"
                :style="{ color: experience.company.color }"
              >
                <template v-if="experience.company.logo.startsWith('/')">
                  <img
                    :src="getLogoPath(experience)"
                    :alt="experience.company.name + ' logo'"
                    :class="[
                      isDWCorp(experience)
                        ? 'absolute left-1/2 top-[54%] -translate-x-1/2'
                        : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                      'h-full w-full object-contain',
                      isDWCorp(experience) || isSerpro(experience) ? 'scale-[2]' : ''
                    ]"
                  />
                </template>
                <template v-else>
                  <UIcon 
                    :name="experience.company.logo" 
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full"
                  />
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

