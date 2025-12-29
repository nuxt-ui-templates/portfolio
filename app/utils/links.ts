import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'Home',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'Projects',
  icon: 'i-lucide-folder',
  to: '/projects'
}, {
  label: 'Blog',
  icon: 'i-lucide-file-text',
  to: '/blog'
}, {
  label: 'About',
  icon: 'i-lucide-user',
  to: '/about'
}]
