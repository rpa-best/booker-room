<template>
    <Card style="border-radius: 12px; width: 42px; height: 42px;" @click="zoomPlus">
        <template #content>
            <div class="flex justify-content-center align-items-center">
                <font-awesome-icon style="font-size: 25px; opacity: 0.7;" :icon="['fas', 'plus']" />
            </div>
        </template>
    </Card>
    <Card style="border-radius: 12px; width: 42px; height: 42px;" @click="zoomMinus">
        <template #content>
            <div class="flex justify-content-center align-items-center">
                <font-awesome-icon style="font-size: 25px; opacity: 0.7;" :icon="['fas', 'minus']" />
            </div>
        </template>
    </Card>
</template>
<script>
import {findRealParent} from "./utils"
export default {
    name: "ZoomControl",
    methods: {
        zoomPlus() {
            const map = findRealParent(this.$parent).leafletObject
            map.setZoom(map._zoom + 0.5)
        },
        zoomMinus() {
            const map = findRealParent(this.$parent).leafletObject
            map.setZoom(map._zoom - 1)
        }
    }
}

</script>