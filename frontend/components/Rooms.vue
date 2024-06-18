<template>
    <Dialog v-model:visible="date" modal :header="`${$t('Бранирование на')} ${$route.query.date}`" :style="{ width: '80%' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="row justify-content-between">
            <div v-for="size in Object.values(sizes)" class="col-1 p-1 m-2 cursor-pointer flex justify-content-center" :key="size"
            style="flex-direction: column; width: 150px; height: 200px; border: 1px solid var(--surface-border); border-radius: 10%;"
            @click="() => selectedSize = (selectedSize == size ? null : size)" 
            :style="(selectedSize && (selectedSize.name == size.name)) ? 'background-color: var(--surface-card)' : 'background-color: var(--surface-ground)'">
                <img :src="size.image" style="width: 100%;">
                <strong class="text-center mt-3" style="display: block; font-size: 18px;">
                    {{ size.name }}
                </strong>
            </div>
        </div>
        <form v-if="selectedSize" @submit.prevent="booking">
            <p>
                {{ selectedSize.desc }}
            </p>
            <div class="row mt-3">
                <div class="col">
                    <label class="mr-3 mb-2" for="from_date">{{ $t('Цена за день') }}:</label>
                    <strong>{{ selectedSize.price }} ₽</strong>
                </div>
                <div class="col">
                    <label class="mr-3 mb-2" for="from_date">{{ $t('Размер') }}:</label>
                    <strong>{{ selectedSize.name }}</strong>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label class="mr-3 mb-2" for="from_date">{{ $t('Дата начало') }}:</label>
                    <Calendar disabled dateFormat="dd-mm-yy" v-model="data.from_date" inputId="from_date" />
                </div>
                <div class="col">
                    <label class="mr-3 mb-2" for="end_date">{{ $t('Дата оканчание') }}:</label>
                    <Calendar aria-required :minDate="data.from_date" dateFormat="dd-mm-yy" v-model="data.end_date" inputId="end_date" @date-select="(v) => data.end_date = date_select(v)" />
                </div>
            </div>
            <div class="mt-3 flex justify-content-center">
                <Button :icon="'pi pi-send'" type="submit" :label="$t('Бранировать')" class="w-full p-2" style="max-width: 400px; border-radius: 5px;"></Button>
            </div>
        </form>
    </Dialog>
</template>
<script>
import { getRooms, getRoomSizes } from '~/services/floor'
export default {
    name: "Rooms",
    data() {
        return {
            loading: true,
            rooms: [],
            sizes: {},
            selectedSize: null,
            data: {
                from_date: new Date(this.$route.query.date)
            }
        }
    },
    async mounted() {
        this.loading = true
        try {
            this.rooms = await getRooms({location: this.$route.query.location})
            const sizes = await getRoomSizes()
            for (let size of sizes) {
                this.sizes[size.name] = size
            }
        } catch (e) {
            console.log(e);
            await this.$router.push({name: this.$route.name})
        }
        this.loading = false
    },
    computed:{
        date:{
            get (){
                return this.$route.query.date ? new Date(this.$route.query.date) : false
            },
            set (v) {
                if (v == false) {
                    this.close()
                }
            }
        },
    },
    methods: {
        date_select(v) {
            v.setDate(v.getDate() + 1)
            return v
        },
        close() {
            const query = JSON.parse(JSON.stringify(this.$route.query))
            query.date = undefined
            this.$router.push({name: this.$route.name, query})
        },
        booking() {
            console.log(this.data);
        }
    }
}
</script>
<style>

</style>