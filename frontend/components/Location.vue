<template>
    <div class="location" :class="$route.query.location ? 'location_open' : 'location_close'">
        <Card style="height: 100%;">
            <template #content>
                <div class="flex justify-content-between align-items-center" v-if="location">
                    <Button class="p-1" @click="close" style="position: relative; top: 0px; left: 0px;" icon="pi pi-times"
                        text rounded />
                    <h2 class="mb-3 text-center" style="font-weight: bold; font-size: 25px; overflow-y: hidden;">{{
                        location.name }}</h2>
                    <div style="width: 50px"></div>
                </div>
                <div style="position: relative;">
                    <Galleria v-if="!loading" :value="location.images" containerStyle="width: 100%" :circular="true"
                        :autoPlay="true" :transitionInterval="2000" :showItemNavigators="true" :showThumbnails="false">
                        <template #item="slotProps">
                            <Image :src="slotProps.item.image" alt="Image" preview style="width: 100%; display: block" />
                        </template>
                    </Galleria>
                </div>
                <div v-if="!loading" class="mt-3">
                    
                    <Rating class="mb-1" v-model="location.rating" readonly :cancel="false" />
                    <p style="color: var(--surface-400);" class="mb-3"><font-awesome-icon :icon="['fas', 'location-dot']" />
                        {{ location.address }}</p>
                    <div>
                        <strong>{{ $t('Описвние') }}</strong>
                        <p class="location_desc" :class="desc_open ? 'location_desc_open' : null">{{ location.desc }}</p>

                        <div  @click="desc_open = !desc_open" text
                            style="color: var(--primary-color); font-weight: bold;" class="mt-2"> {{ !desc_open ? $t('Смотреть все') : $t('Меньше') }}</div>
                    </div>
                    <div class="mt-3">
                        <!-- <div v-for="floor in location.floors">
                            <strong>{{ floor.name }}</strong>
                            <div class="row justify-content-between px-3">
                                <div v-for="room in floor.rooms" class="col-1 p-0 m-2 flex justify-content-center align-items-center" 
                                style="background-color: var(--surface-ground); width: 11.5%; height: 50px; border: 1px solid var(--surface-border); border-radius: 10%;"
                                @click="(e) => select_room(e, room)">
                                    {{ room.name }}
                                </div>
                            </div>
                        </div> -->
                        <div>
                            <!-- <Calendar style="border: none;" :minDate="minDate" v-model="booking.date" inline showWeek /> -->
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>
<script>
import { isDark } from '@/composables/dark'
import { getLocation } from '~/services/location';

export default {
    name: 'Location',
    data() {
        return {
            minDate: new Date(),
            loading: true,
            location: null,
            desc_open: false,
            isDark,
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
        map_ready() {
            this.isMounted = true;
            this.$refs.map.leafletObject.spin = (val) => {
                this.spinner = val;
            };
        },
        select_room(e, room) {
            this.$router.push(`/locations?location=${this.$route.query.location}&room=${room.id}`)
        },
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
                await this.$router.push("/")
            }
            this.loading = false
        },
        close() {
            this.$router.push({name: this.$route.name})
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
    height: calc(100vh - 70px);
    position: absolute;
    bottom: 0;
    right: 0;
    transition: 0.5s;
}


@media screen and (max-width: 460px) {
    .location {
        top: auto;
        bottom: 0;
        width: 100%;
    }

    .locations_close {
        height: 0;
        overflow-x: hidden;
    }
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

.location_desc {
    overflow-x: auto;
    text-overflow: ellipsis;
    white-space: wrap;
    color: var(--surface-400);
    height: 190px;
    transition: 0.5s;
    overflow-y: hidden;
}

.location_desc_open {
    height: auto;
}</style>