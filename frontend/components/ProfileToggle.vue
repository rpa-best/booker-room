<template>
    <Card style="border-radius: 12px; width: 42px; height: 42px;" @click="profile.open">
        <template #content>
            <div class="flex justify-content-center align-items-center">
                <font-awesome-icon style="font-size: 22px; opacity: 0.7;" :icon="['fas', 'user']" />
            </div>
        </template>
    </Card>
    <Sidebar position="left" v-model:visible="profile.show" :header="$t('Profile')" style="width: 360px; border-bottom-right-radius: 15px; border-top-right-radius: 15px;">
        <template #header>
            <div class="flex align-items-center gap-2">
                <!-- <Avatar image="/images/avatar/amyelsner.png" shape="circle" /> -->
                <div style="width: 35px; height: 35px; border: 2px solid var(--surface-500); border-radius: 50%;" class="text-center flex justify-content-center align-items-center">
                    <font-awesome-icon style="font-size: 22px;" :icon="['fas', 'user']" />
                </div>
                <span class="font-bold">Карижонов Хусниддин</span>
            </div>
        </template>
        <Profile />
    </Sidebar>
</template>
<script>
import { useProfile } from "~/store/profile"

export default {
    name: "ProfileToggle",
    data() {
        return {
            profile: useProfile()
        }
    },
}
</script>