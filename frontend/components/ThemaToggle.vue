<template>
    <Card style="border-radius: 12px; width: 42px; height: 42px;" @click="toggleDark">
        <template #content>
            <div class="flex justify-content-center align-items-center">
                <font-awesome-icon style="font-size: 25px; opacity: 0.7;" :icon="['fas', isDark.value ? 'sun' : 'moon']" />
            </div>
        </template>
    </Card>
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