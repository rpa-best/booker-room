import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProfile = defineStore('profile', {
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
