<template>
    <Dialog v-model:visible="room_id" modal :header="room.name" :style="{ width: '80%' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <Galleria style="height: 40vh;" :value="room.images" :numVisible="5" containerStyle="width: 100%">
            <template #item="slotProps">
                <img :src="slotProps.item.image" :alt="slotProps.item.alt" style="max-height: 40vh" />
            </template>
            <template #thumbnail="slotProps">
                <img :src="slotProps.item.image" :alt="slotProps.item.alt" style="max-height: 100px" />
            </template>
        </Galleria>
        <div class="mt-3">
            <p> Номер помееееешение: <strong>{{ room.name }}</strong></p>
            <p> Размер помешение: <strong v-if="room.size">{{ room.size.toUpperCase() }}</strong></p>
            <p> Тип: <strong v-if="room.type">{{ room.type.name }}</strong></p>
            <div>
                <div class="col-4">
                    <Calendar style="border: none;" :minDate="minDate" v-model="booking.date" inline showWeek />
                </div>
                <div class="col-8">

                </div>
            </div>
        </div>
    </Dialog>
</template>
<script>
import { getRoom } from '~/services/floor'
export default {
    name: "Room",
    data() {
        return {
            loading: true,
            room: {},
            minDate: new Date(),
            booking: {
                date: new Date()
            }
        }
    },
    async mounted() {
        this.loading = true
        try {
            this.room = await getRoom(this.$route.query.location, this.$route.query.room)
        } catch (e) {
            console.log(e);
            delete this.$route.query.room
            await this.$router.push("/")
        }
        this.loading = false
    },
    computed:{
        room_id: {
            get(){
                return this.$route.query.room
            },
            set(v) {
                console.log(v);
                if (!v) {
                    this.$router.push(`/locations?location=${this.$route.query.location}`)
                }
            }
        }
    }
}
</script>