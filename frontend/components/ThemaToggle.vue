<template>
    <div class="flex justify-content-center align-items-center p-3" @click="toggleDark">
        <font-awesome-icon style="font-size: 25px; opacity: 0.7;" :icon="['fas', isDark ? 'sun' : 'moon']" />
    </div>
</template>
<script>
import { toggleDark, isDark } from "~/composables/dark"

export default {
    name: "ThemaToggle",
    data() {
        return {
            isDark
        }
    },
    methods: {
        toggleDark,
    },
}
</script>