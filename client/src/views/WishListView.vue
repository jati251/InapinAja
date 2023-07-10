<script>
import navbar from '../components/Navbar.vue'
import card from '../components/card.vue'
import { mapActions,mapState } from 'pinia';
import { useLodgingStore } from '../stores/lodging';
export default {
    components:{
        navbar,
        card,
    },
    computed:{
        ...mapState(useLodgingStore,['wishlists'])
    },
    methods :{
        ...mapActions(useLodgingStore,['getWishlist'])
    },
    created() {
        this.getWishlist()
    },
}
</script>
<template>
    <div class="mx-20 my-4">
        <navbar></navbar>
        <div class="flex flex-wrap -m-4">
            <card v-for="lodging in wishlists" :key="lodging.id" :lodging="lodging"></card>
        </div>
        
    </div>
</template>