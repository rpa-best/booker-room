<template>
    <div class="location" :class="$route.query.location ? 'location_open' : 'location_close'">
        <Card style="height: 100%;">
            <template #content>
                <div style="position: relative;">
                    <Galleria v-if="!loading" :value="location.images" containerStyle="width: 100%" :circular="true"
                        :autoPlay="true" :transitionInterval="2000" :showItemNavigators="true" :showThumbnails="false">
                        <template #item="slotProps">
                            <Image :src="slotProps.item.image" alt="Image" preview style="width: 100%; display: block" />
                        </template>
                    </Galleria>
                    <Button class="p-1" @click="close" style="position: absolute; top: 0px; left: 0px;" icon="pi pi-times"
                        text rounded />
                </div>
                <div v-if="!loading" class="mt-3">
                    <h2 class="mb-3 text-center" style="font-weight: bold; font-size: 25px;">{{ location.name }}</h2>
                    <Rating class="mb-1" v-model="location.rating" readonly :cancel="false" />
                    <i>{{ location.address }}</i>
                </div>
            </template>
        </Card>
    </div>
</template>
<script>
import { getLocation } from '~/services/location';
export default {
    name: 'Location',
    data() {
        return {
            loading: true,
            location: null
        }
    },
    computed: {
        location_id: function () {
            return this.$route.query.location
        }
    },
    watch: {
        location_id(value) {
            if (value) {
                this.init()
            } else {
                this.loading = true
            }
        }
    },
    async mounted() {
        await this.init()
    },
    methods: {
        setView() {
            for (let layer of Object.values(this.$parent.$refs.map.leafletObject._layers)) {
                if (layer.feature && (layer.feature.properties.id == this.$route.query.location)) {
                    for (let e of layer._events.click) {
                        e.fn()
                    }
                }
            }
        },
        async init() {
            this.loading = true
            try {
                if (this.$parent.$refs.map.ready) {
                    this.setView()
                } else {
                    setTimeout(() => {
                        this.setView()
                    }, 1000);      
                }
                this.location = await getLocation(this.$route.query.location)
            } catch (e) {
                console.log(e);
                delete this.$route.query.location
                await this.$router.push(this.$route)
            }
            this.loading = false
        },
        close() {
            this.$router.push("/")
            for (let layer of Object.values(this.$parent.$refs.map.leafletObject._layers)) {
                if (layer.feature && (layer.feature.properties.id == this.$route.query.location)) {
                    layer.setStyle(layer.defaultOptions)
                }
            }
        }
    }
}
</script>
<style>
.location {
    z-index: 1000;
    width: 360px;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    transition: 0.5s;
}

.location * {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.location_close {
    width: 0;
    overflow-x: hidden;
}
</style>