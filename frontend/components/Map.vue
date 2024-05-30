<template>
    <div v-if="spinner" class="spinner">
        <i class="pi pi-spin pi-spinner" style="font-size: 5rem; opacity: 1; color: #3388FF;"></i>
    </div>
    <div class="map_container">
        <div style="height: 100vh; width:100vw;">
            <l-map ref="map" :zoom="zoom" :center="[59.940627, 30.402991]"
                :options="{ zoomControl: false, preferCanvas: true, doubleClickZoom: false}" @ready="map_ready">
                <l-tile-layer v-if="!isDark" url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" layer-type="base"
                    name="LightMap">
                </l-tile-layer>
                <l-tile-layer v-if="isDark" url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" layer-type="base"
                    name="DarkMap">
                </l-tile-layer>
                <div v-if="isMounted">
                    <div class="right-center">
                        <ZoomControl/>
                        <CurrentLocation />
                    </div>
                    <div class="right-top">
                        <ProfileToggle />
                        <ThemaToggle />
                    </div>
                    <div class="bottom-center">
                        <LocationsToggle />
                    </div>
                </div>
                <LGeoJson v-if="location.features.features"
                    :geojson="location.features"
                    :options="locationGeojsonOption"
                />
            </l-map>
        </div>
    </div>
    <Locations />
    <Location />
    <Rooms />
</template>

<script>
import { isDark } from '@/composables/dark'
import { useLocation } from "@/store/location"

export default {
    name: "Map",
    data() {
        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#196DFF",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        };
        return {
            zoom: 12,
            spinner: false,
            isMounted: false,
            location: useLocation(),
            locationGeojsonOption: {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                onEachFeature: (feature, layer) => {
                    layer.on("click", () => {
                        this.$refs.map.leafletObject.setView(layer._latlng, 16);
                        layer.setStyle({
                            radius: 12,
                            fillColor: "#FF4433",
                            color: "#fff",
                            weight: 2,
                            opacity: 1,
                            fillOpacity: 0.8
                        })
                        const query = JSON.parse(JSON.stringify(this.$route.query))
                        query.location = feature.properties.id
                        this.$router.push({name: this.$route.name, query})
                    })
                }
            }
        };
    },
    methods: {
        async map_ready() {
            this.isMounted = true;
            this.init_spinner();
        },
        init_spinner() {
            this.$refs.map.leafletObject.spin = (val) => {
                this.spinner = val;
            };
        },
    },
    computed: {
        location_show() {
            return this.$route.query.location
        }
    }
}
</script>
<style>
.spinner {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 3000;
    background-color: var(--surface-card);
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
}
.map_container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
}

html::-webkit-scrollbar {
    display: none;
}

html {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.leaflet-tooltip {
    background-color: var(--surface-card) !important;
    border-color: var(--surface-border) !important;
}

.leaflet-tooltip::before {
    border-top-color: var(--surface-card);
}
.map_dark img {
    filter: invert(100%) hue-rotate(180deg) brightness(100%) contrast(90%);
}

.right-center {
    position: fixed;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 899;
}

.right-top {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 899;
    display: flex;
    flex-direction: row;
}
.bottom-center {
    position: fixed;
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
    z-index: 1000;
}

.left-top {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 899;
}

.right-center > * {
    margin-top: 0.5rem;
}

.right-top > * {
    margin-left: 0.5rem;
}

.left-top > * {
    margin-bottom: 1rem;
}

.p-card-body {
    padding: 0.5rem !important;
    cursor: pointer !important;
}

.p-card-content {
    padding: 0 !important;
}
</style>