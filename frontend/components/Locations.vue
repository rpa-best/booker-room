<template>
    <div class="locations" :class="locations.show ? 'locations_open' : 'locations_close'">
        <Card style="height: 100%;background-color: var(--surface-ground)" v-if="locations.show">
            <template #content>
                <div class="flex align-items-center justify-content-between">
                    <div class="flex align-items-center gap-2">
                        <!-- <Avatar image="/images/avatar/amyelsner.png" shape="circle" /> -->
                        <span class="font-bold">{{ $t('Locations') }}</span>
                    </div>
                    <Button @click="locations.close" icon="pi pi-times" text rounded />
                </div>
                <Card class="mb-3 location-card" v-for="location in locations.features.features" :key="location">
                    <template #content>
                        <div class="row p-2">
                            <div class="col-12 col-lg-4 flex justify-content-center align-items-center mb-3">
                                <Image :src="location.properties.image.image" alt="Image" preview style="width: 100%" />
                            </div>
                            <div class="col-12 col-lg-8" @click="() => select_location(location)">
                                <h2 class="mb-3" style="overflow: hidden; font-weight: bold; font-size: 23px;">{{ location.properties.name }}</h2>
                                <Rating class="mb-1" v-model="location.properties.rating" readonly :cancel="false" />
                                <i>{{ location.properties.address }}</i>
                            </div>
                        </div>
                    </template>
                </Card>
            </template>
        </Card>
    </div>
</template>
<script>
import { useLocation } from "~/store/location"

export default {
    name: 'Locations',
    data() {
        return {
            loading: true,
            locations: useLocation(),
        }
    },
    async mounted() {
        await this.locations.fetch_features()
    },
    methods: {
        select_location(location) {
            this.$router.push({name: this.$route.name, query: {location: location.properties.id}})
        }
    },
}
</script>
<style>
.locations {
    z-index: 1000;
    width: 360px;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.5s;
}

.locations * {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.locations_close {
    width: 0;
    overflow-x: hidden;

}

.location-card:hover {
    background-color: var(--surface-hover);
}
</style>