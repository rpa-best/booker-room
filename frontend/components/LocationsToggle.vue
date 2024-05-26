<template>
    <Card style="border-radius: 12px; width: 42px; height: 42px;" @click="location.open">
        <template #content>
            <div class="flex justify-content-center align-items-center">
                <font-awesome-icon style="font-size: 22px; opacity: 0.7; margin-top: 0.1rem" :icon="['fas', 'building']" />
            </div>
        </template>
    </Card>
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
}
</script>