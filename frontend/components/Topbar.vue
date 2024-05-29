<template>
    <div class="topbar">
        <Menubar :model="items" :buttonProps="{ style: 'right: 100px; position: absolute' }" style="background-color: var(--surface-ground); border: none; width: 100%;">
            <template #start>
                <a href="/" class="flex">
                    <img src="/images/logo.svg" style="height: 50px;" />
                    <div class="pl-2">
                        <h1 style="font-weight: 900; font-size: 25px;">HRANILKIN</h1>
                        <p style="font-size: 10px;">УДОБНОЕ ХРАНЕНИЕ РЯДОМ</p>
                    </div>
                </a>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a v-ripple class="flex align-items-center" v-bind="props.action" :href="item.href" @click="item.click">
                    <font-awesome-icon v-if="item.icon" :icon="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <i v-if="hasSubmenu"
                        :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                </a>
            </template>
            <template #end>
                <div class="flex align-items-center gap-2">
                    <ThemaToggle />
                    <ProfileToggle />
                </div>
            </template>
        </Menubar>
    </div>
    <Sidebar position="left" v-model:visible="invite_show" style="width: 360px; border-bottom-right-radius: 15px; border-top-right-radius: 15px;">
        <template #header>{{ $t('Документы для юр. лиц') }}</template>

    </Sidebar>

    <Sidebar position="left" v-model:visible="phone_show" style="width: 360px; border-bottom-right-radius: 15px; border-top-right-radius: 15px;">
        <template #header>{{ $t('Оставьте телефон для связи') }}</template>
        
    </Sidebar>
</template>
<script>
export default {
    data() {
        let types = [
            {
                id: 1,
                label: 'Хранение для интернет магазинов',
            },
            {
                id: 2,
                label: 'Аренда склада для хранения',
            },
            {
                id: 3,
                label: 'Временное хранение вещей',
            },
            {
                id: 4,
                label: 'Склад ответственного хранения',
            },
            {
                id: 5,
                label: 'Склад СПб',
            },
            {
                id: 6,
                label: 'Хранение шин',
            },
            {
                id: 7,
                label: 'Хранение колес',
            },
            {
                id: 8,
                label: 'Хранение велосипедов',
            },
            {
                id: 9,
                label: 'Хранение мебели',
            },
        ]
        for (let type of types) {
            type.href = `/locations?type=${type.id}`
        }
        types = [{
                label: 'Все хранилкини',
                href: "/locations"
            }, ...types]

        return {
            invite_show: false,
            phone_show: false,
            items: [
                {
                    label: 'ХРАНЕНИЕ ВЕЩЕЙ',
                    icon: ["fas", "warehouse"],
                    items: types,
                },
                {
                    label: 'Цены',
                    icon: ["fas", "hand-holding-dollar"],
                    href: "/#price"
                },
                {
                    label: 'Отзывы',
                    icon: ["fas", "comment"],
                },
                {
                    label: 'Документы для юр. лиц',
                    icon: ["fas", "file-invoice"],
                    click: () => {

                    }
                }
            ]
        }
    }
}
</script>
<style> .topbar {
     position: fixed;
     z-index: 1001;
     width: 100vw;
     height: 70px;
     display: flex;
     background-color: var(--surface-ground);
     align-items: center;
 }
 </style>