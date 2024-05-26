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
        setTimeout(() => {
            this.setCurrentLocation()
        }, 2000)
    },
    methods: {
        setCurrentLocation() {
            var geojsonMarkerOptions = {
                radius: 10,
                fillColor: "#FF4433",
                color: "#fff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            };
            const map = findRealParent(this.$parent).leafletObject
            navigator.geolocation.getCurrentPosition((position) => {
                const latit = position.coords.latitude;
                const longit = position.coords.longitude;
                map.setView([latit, longit]);
                L.circleMarker([latit, longit], geojsonMarkerOptions).addTo(map)
            })
        }
    }
}

</script>