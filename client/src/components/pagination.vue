<script>
export default {
  emits: ['pageHandler'],
  props: ['page', 'currentPage'],
  methods: {
    pageHandler() {
      this.$emit('pageHandler', this.page)
      this.$router.push('/')
    }
  }
}
</script>
<template>
  <li v-if="page === currentPage">
    <button
      @click.prevent="pageHandler()"
      class="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white"
    >
      {{ page }}
    </button>
  </li>
  <li v-else>
    <button
      @click.prevent="pageHandler()"
      class="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
    >
      {{ page }}
    </button>
  </li>
</template>
