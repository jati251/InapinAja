<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useLodgingStore } from '../stores/lodging'
import card from '../components/card.vue'
import pagination from '../components/pagination.vue'
import navbar from '../components/Navbar.vue'

export default {
  data() {
    return {
      search:''
    }
  },
  components: {
    card,
    pagination,
    navbar
  },
  methods: {
    ...mapActions(useLodgingStore, ['fetchLodgings', 'fetchTypes']),
    pageHandler(val) {
      this.page = val
      this.fetchLodgings()
    },
    filterLodging(event) {
      this.fetchLodgings(`?type=${event.target.value}`)
    },
    searchLodging(){
      this.fetchLodgings(`?search=${this.search}`)
    }
  },
  computed: {
    ...mapState(useLodgingStore, ['lodgings', 'totalPage', 'valuationFormat', 'types']),
    ...mapWritableState(useLodgingStore, ['page'])
  },
  created() {
    this.fetchLodgings()
    this.fetchTypes()
  }
}
</script>

<template>
  <div class="mx-40 my-4">
    <navbar></navbar>

    <div class="flex gap-8 mx-10">
      <select @change="filterLodging($event)"
        class="relative cursor-pointer pb-1 border-b  border-gray-400 text-sm font-medium transition hover:border-gray-600 ">
        <option selected disabled>Filter by type</option>
        <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
      </select>

      <div class="flex gap-4">
        <input
          v-model="search"
          type="search"
          class="w-auto rounded-lg border border-gray-300 text-sm shadow-sm px-4"
          placeholder="Search Lodging"
        />
        <button
              @click.prevent="searchLodging"
              class="block rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
            >
              Search
            </button>
      </div>
    </div>

    <ol class="flex justify-center gap-1 text-xs font-medium py-8">
      <li v-if="page > 1">
        <button @click.prevent="pageHandler(page - 1)"
          class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
          <span class="sr-only">Prev Page</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </li>

      <pagination v-for="n in totalPage" :currentPage="page" :page="n" @pageHandler="pageHandler"></pagination>

      <li v-if="page < totalPage">
        <button @click.prevent="pageHandler(page + 1)"
          class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
          <span class="sr-only">Next Page</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </li>
    </ol>
    
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-10 mx-auto">
        <div class="flex flex-wrap -m-4">
          <card v-for="lodging in lodgings.rows" :lodging="lodging" :valuationFormat="valuationFormat" :key="lodging.id"
            :homeFlag="true"></card>
        </div>
      </div>
    </section>

    <ol class="flex justify-center gap-1 text-xs font-medium py-10">
      <li v-if="page > 1">
        <button @click.prevent="pageHandler(page - 1)"
          class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
          <span class="sr-only">Prev Page</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </li>

      <pagination v-for="n in totalPage" :currentPage="page" :page="n" @pageHandler="pageHandler"></pagination>

      <li v-if="page < totalPage">
        <button @click.prevent="pageHandler(page + 1)"
          class="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
          <span class="sr-only">Next Page</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </li>
    </ol>
  </div>
</template>
