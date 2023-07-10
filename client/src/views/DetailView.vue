<script>
import { mapActions, mapState } from 'pinia'
import { useLodgingStore } from '../stores/lodging'
import navbar from '../components/Navbar.vue'

export default {
  components: {
    navbar
  },
  data() {
    return {
      token:localStorage.access_token
    }
  },
  methods: {
    ...mapActions(useLodgingStore, ['findLodging', 'addWishlist','getBarcode']),
    wishListHandler(){
      if(localStorage.access_token){
        this.addWishlist(lodging.id)
      }else {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    ...mapState(useLodgingStore, ['lodging', 'type', 'valuationFormat','barcode']),
  },
  created() {
    this.findLodging(this.$route.params.id)
    this.getBarcode(this.$route.params.id)
  }
}
</script>
<template>
  <div class="mx-20 my-4">
    <navbar></navbar>
    <section>
      <div class="relative mx-auto max-w-screen-xl px-10 py-8">
        <div>
          <h1 class="text-2xl font-bold lg:text-3xl">{{ lodging.name }}</h1>

          <h2 class="mt-1 text-lg text-gray-500">{{ type.name }}</h2>
        </div>

        <div class="grid gap-8 lg:grid-cols-4 lg:items-start">
          <div class="lg:col-span-3">
            <div class="relative mt-4">
              <img alt="Tee" :src="lodging.imgUrl" />
            </div>
          </div>

          <div class="lg:sticky lg:top-0">
            <form class="space-y-4 lg:pt-8">
              <fieldset>
                <legend class="text-lg font-bold">Share with Barcode</legend>
                <div class="rounded border bg-gray-100 p-4">
                  <div v-html="barcode"></div>
              </div>
              </fieldset>

              <div class="rounded border bg-gray-100 p-4">
                <p class="text-sm">
                  <span class="block"> Use coupon code STAY24 for 20% first time book discount !</span>

                </p>
              </div>

              <div>
                <p class="text-lg font-bold">Price</p>
                <p class="text-xl ">{{ valuationFormat }}</p>
              </div>

              <button
              v-if="token"
              type="submit" @click.prevent="wishListHandler()"
                class="w-full rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
                Add to wishlist
              </button>
            </form>
          </div>
          <div class="lg:col-span-3">
            <div class="flex justify-end md:justify-between mx-10">
              <div>
                <h3 class="text-l font-bold">Facility:</h3>
                <p style="white-space: pre-line">
                  {{ lodging.facility }}
                </p>
              </div>
              <div>
                <h3 class="text-l font-bold">Location:</h3>
                <p style="white-space: pre-line">
                  {{ lodging.location }}
                </p>
                <br>
                <h3 class="text-l font-bold">Capacity:</h3>
                <p style="white-space: pre-line">
                  {{ lodging.roomCapacity }} Rooms
                </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  </div>
</template>
