<template>
    <Card style="border-radius: 12px; width: 42px; height: 42px;" @click="location.open">
        <template #content>
            <div class="flex justify-content-center align-items-center">
                <font-awesome-icon style="font-size: 22px; opacity: 0.7; margin-top: 0.1rem" :icon="['fas', 'building']" />
            </div>
        </template>
    </Card>
    <Sidebar position="bottom" v-model:visible="location.show" style="height: 90vh; border-top-left-radius: 15px; border-top-right-radius: 15px;">
        <template #header>
            <div class="flex align-items-center gap-2">
                <!-- <Avatar image="/images/avatar/amyelsner.png" shape="circle" /> -->
                <span class="font-bold">{{ $t('Locations') }}</span>
            </div>
        </template>
        <Locations />
    </Sidebar>
</template>
<script>
import { useLocation } from "~/store/location"

export default {
    name: "LocationToggle",
    data() {
        return {
            location: useLocation()
        }
    },
}
</script>