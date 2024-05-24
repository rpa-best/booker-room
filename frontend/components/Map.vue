<template>
    <div v-if="spinner" class="spinner">
        <i class="pi pi-spin pi-spinner" style="font-size: 5rem; opacity: 1; color: #3388FF;"></i>
    </div>
    <div class="map_container">
        <div style="height: 100vh; width:100vw">
            <l-map ref="map" :zoom="zoom" :center="[59.940627, 30.402991]"
                :options="{ zoomControl: false, preferCanvas: true, doubleClickZoom: false}" @ready="map_ready">
                <l-tile-layer :key="isDark" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" :className="isDark ? 'map_dark': 'map_light'"
                    name="LightMap">
                </l-tile-layer>
                <div v-if="isMounted">
                    <div class="right-center">
                        <ZoomControl/>
                        <CurrentLocation />
                    </div>
                    <div class="right-top">
                        <ThemaToggle />
                    </div>
                    <div class="left-top">
                        <ProfileToggle />
                        <LocationToggle />
                    </div>
                </div>
            </l-map>
        </div>
    </div>
</template>

<script>
import { isDark } from '@/composables/dark'

export default {
    name: "Map",
    data() {
        return {
            zoom: 12,
            spinner: false,
            isMounted: false,
        };
    },
    methods: {
        map_ready() {
            this.isMounted = true;
            this.init_spinner();
        },
        init_spinner() {
            this.$refs.map.leafletObject.spin = (val) => {
                this.spinner = val;
            };
        },
    },
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
    z-index: 1000;
}

.right-top {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
}

.left-top {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1000;
}

.right-center > * {
    margin-top: 0.5rem;
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