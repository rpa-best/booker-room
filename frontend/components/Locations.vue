<template>
    <div class="locations" :class="locations.show ? 'locations_open' : 'locations_close'">
        <Card style="height: 100%;background-color: var(--surface-ground); border-radius: 0;" v-if="locations.show">
            <template #content>
                <Card class="mb-3 location-card" v-for="location in locations.features.features" :key="location">
                    <template #content>
                        <div class="row p-2">
                            <div class="col-12 flex justify-content-center align-items-center mb-3">
                                <Image :src="location.properties.image.image" alt="Image" preview style="width: 100%" />
                            </div>
                            <div class="col-12" @click="() => select_location(location)">
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
        await this.locations.fetch_features(this.$route.query)
    },
    methods: {
        select_location(location) {
            const query = JSON.parse(JSON.stringify(this.$route.query))
            query.location = feature.properties.id
            this.$router.push({name: this.$route.name, query: {location: location.properties.id}})
        }
    },
}
</script>
<style>
.locations {
    z-index: 900;
    width: 400px;
    height: calc(100vh - 65px);
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 0.5s;
}


@media screen and (max-width: 460px) {
    .locations {
        top: auto;
        bottom: 0;
        width: 100%;
        height: 94vh;
    }
    .locations_close {
        height: 0;
        overflow-x: hidden;
    }
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