<script>
export default {
  props: ['route'],
  methods: {
    switchHandler() {
      this.$router.push(this.route)
    }
  }
}
</script>

<template>
  <button
    type="button"
    class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
    @click.prevent="switchHandler"
  >
    Cancel
  </button>
</template>
