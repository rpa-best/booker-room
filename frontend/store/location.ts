import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLocations } from '~/services/location'


export const useLocation = defineStore('location', {
    state: () => ({
        show: ref(true),
        features: ref({})
    }),
    actions: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        },
        async fetch_features(params: any) {
            this.features = await getLocations(params)
        }
    }
})
