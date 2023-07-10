<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink,
    RouterView
  }
}
</script>

<template>
  <RouterView />

<footer aria-label="Site Footer" class="bg-white">
  <hr>
  <div class=" m-10 sm:px-6 lg:px-8">
    <div class="mt-16">
      <div class="mt-16 sm:flex sm:items-center sm:justify-between">
        <div class="flex justify-center text-teal-600 sm:justify-start">
         <img class="h-8" src="./assets/InapinAja_name.svg" alt="">
        </div>

        <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-right">
          Copyright &copy; 2023. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</footer>
</template>
