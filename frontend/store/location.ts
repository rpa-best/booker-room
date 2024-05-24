import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLocation = defineStore('location', {
    state: () => ({
        show: ref(false),
    }),
    actions: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        }
    }
})
