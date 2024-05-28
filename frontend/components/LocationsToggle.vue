<template>
    <Button class="locations-toggle p-2" style="border-radius: 20px; font-size: 18px;" :label="location.show ? $t('На карте') : $t('Показать список')" rounded @click="toggle" />
</template>
<script>
import { useLocation } from "~/store/location"

export default {
    name: "LocationToggle",
    data() {
        return {
            location: useLocation(),
        }
    },
    methods: {
        toggle() {
            this.location.show ? this.location.close() : this.location.open()
        }
    }
}
</script>
<style>
@media screen and (min-width: 460px) {
    .locations-toggle   {
        display: none;
    }
}
</style>