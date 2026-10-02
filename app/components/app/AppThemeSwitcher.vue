<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})
</script>

<template>
  <USwitch
    v-model="isDark"
    :aria-label="isDark ? 'Switch to light appearance' : 'Switch to dark appearance'"
  />
</template>
