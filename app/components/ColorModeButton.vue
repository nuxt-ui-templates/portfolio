<script setup lang="ts">
const colorMode = useColorMode()

const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))

const switchTheme = () => {
  colorMode.preference = nextTheme.value
}

const transitionOrigin = (event?: MouseEvent) => {
  // Keyboard activation dispatches a click with detail 0 and zeroed coordinates.
  if (event && event.detail > 0) return { x: event.clientX, y: event.clientY }

  const target = event?.currentTarget
  if (target instanceof Element) {
    const rect = target.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }

  return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
}

const startViewTransition = (event?: MouseEvent) => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (typeof document.startViewTransition !== 'function' || prefersReduced) {
    switchTheme()
    return
  }

  const { x, y } = transitionOrigin(event)

  const transition = document.startViewTransition(() => {
    switchTheme()
  })

  transition.ready
    .then(() => {
      const w = window.innerWidth
      const h = window.innerHeight
      // Percentages resolve against the pseudo-element's own box, so the reveal stays
      // anchored to the click even when the ::view-transition tree is scaled (browser
      // zoom / high-DPI), where raw px land at `click * scale` instead.
      const cx = (x / w) * 100
      const cy = (y / h) * 100
      const radius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y))
      const r = (radius / (Math.hypot(w, h) / Math.SQRT2)) * 100
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0% at ${cx}% ${cy}%)`,
            `circle(${r}% at ${cx}% ${cy}%)`
          ]
        },
        {
          duration: 900,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
    .catch(() => {})
}
</script>

<template>
  <ClientOnly>
    <UButton
      :aria-label="`Switch to ${nextTheme} mode`"
      :icon="`i-lucide-${nextTheme === 'dark' ? 'sun' : 'moon'}`"
      color="neutral"
      variant="ghost"
      size="sm"
      class="rounded-full"
      @click="startViewTransition"
    />
    <template #fallback>
      <div class="size-4" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
