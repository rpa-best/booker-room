<template>
  <div>
    <Topbar/>
    <Toast />
    <NuxtPage />
  </div>
</template>

<script lang="ts">
import '@unocss/reset/tailwind-compat.css'

export default {
  name: "App",
  beforeMount() {
    const theme: string = isDark.value ? "lara-dark-indigo" : "lara-light-indigo"
    useHead({
        link: [
            {
                rel: "stylesheet",
                id: "theme",
                href: `/themes/${theme}/theme.css`,
          }
        ]
    })
  }
}
</script>
<style>
body, .map_container, .leaflet-container {
  background-color: var(--surface-card);
}
.leaflet-control-attribution {
  display: none;
}
</style>