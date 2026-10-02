import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = useState('app:sidebar-collapsed', () => false)
  const mobileNavigationOpen = useState('app:mobile-navigation-open', () => false)
  const commandPaletteOpen = useState('app:command-palette-open', () => false)
  const dataSourceNoticeDismissed = useState('app:data-source-notice-dismissed', () => false)
  const density = useState<'comfortable' | 'compact'>('app:density', () => 'comfortable')

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function openMobileNavigation() {
    mobileNavigationOpen.value = true
  }

  function closeMobileNavigation() {
    mobileNavigationOpen.value = false
  }

  function toggleCommandPalette() {
    commandPaletteOpen.value = !commandPaletteOpen.value
  }

  function dismissDataSourceNotice() {
    dataSourceNoticeDismissed.value = true
  }

  return {
    sidebarCollapsed,
    mobileNavigationOpen,
    commandPaletteOpen,
    dataSourceNoticeDismissed,
    density,
    toggleSidebar,
    openMobileNavigation,
    closeMobileNavigation,
    toggleCommandPalette,
    dismissDataSourceNotice
  }
})
