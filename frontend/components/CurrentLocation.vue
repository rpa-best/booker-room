<template>
    <Card style="border-radius: 12px; width: 42px; height: 42px; margin-top: 1rem"  @click="setCurrentLocation">
        <template #content>
            <div class="flex justify-content-center align-items-center">
                <font-awesome-icon style="font-size: 25px; opacity: 0.7;" :icon="['fas', 'location-arrow']" />
            </div>
        </template>
    </Card>
</template>
<script>
import {findRealParent} from "./utils"
export default {
    name: "CurrentLocation",
    mounted() {
        this.setCurrentLocation()
    },
    methods: {
        setCurrentLocation() {
            const map = findRealParent(this.$parent).leafletObject
            navigator.geolocation.getCurrentPosition((position) => {
                const latit = position.coords.latitude;
                const longit = position.coords.longitude;
                map.setView([latit, longit]);
            })
        }
    }
}

</script>