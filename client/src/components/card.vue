<script>
import { mapActions } from 'pinia'
import { useLodgingStore } from '../stores/lodging'
export default {
    data() {
        return {
            token:localStorage.access_token
        }
    },
    props: ['lodging','homeFlag'],
    computed: {
        valuationFormat() {
            const price = this.lodging.price
            return price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR'
            })
        }
    },
    methods: {
        ...mapActions(useLodgingStore,['addWishlist']),
        detailHandler() {
            this.$router.push('/detail/' + this.lodging.id)
        },
        wishlistHandler(){
            if(!this.token){
                this.$router.push('/login')
            }
            this.addWishlist(this.lodging.id)
        }
    }
}
</script>

<template>
    <div class="p-5 md:w-1/3">
        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img class="lg:h-48 md:h-36 w-full object-cover object-center" :src="lodging.imgUrl" alt="blog">
            <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{{ lodging.Type.name }}</h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{{ lodging.name }}</h1>
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Location</h2>
                <p class="leading-relaxed mb-3"> {{ lodging.location }}</p>
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Price</h2>
                <p class="leading-relaxed mb-3">{{ valuationFormat }}</p>
                <div class="flex items-center flex-wrap ">
                    <a @click.prevent="detailHandler" href=""
                        class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>

                    </a>
                    <span
                        class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <a 
                        v-if="homeFlag"
                        @click.prevent="wishlistHandler"
                        href="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>

                        </a>

                    </span>
                </div>
            </div>
        </div>
    </div>
</template>