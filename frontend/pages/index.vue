<template>
  <div class="index">
    <client-only>
      <Map></Map>
    </client-only>
  </div>
</template>

<script lang="ts">
import auth from '~/middleware/auth';
export default {
  async mounted() {
    auth()    
  }
}
</script>

<style>
.index {
  background-color: var(--surface-card);
}
.leaflet-control-attribution {
  display: none;
}

</style>
