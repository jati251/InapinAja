<script>
import Swal from 'sweetalert2'
export default {
  component: {
    Swal
  },
  data() {
    return {
      token: localStorage.access_token
    }
  },
  methods: {
    logoutHandler() {
      localStorage.clear()
      this.token = null
      this.$router.push('/')
      Swal.fire({
        title: 'Account has been logged out',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
</script>

<template>
  <header v-if="!token" aria-label="Site Header" class="bg-white my-8 sticky top-0 z-30">
    <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <img class="h-11" src="../assets/logo.svg" alt="" />

      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Site Nav" class="hidden md:block">
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <RouterLink to="/" class="text-gray-500 transition hover:text-gray-500/75"
                >Home</RouterLink
              >
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <RouterLink
              class="block rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
              to="/login"
              >Login</RouterLink
            >
            <RouterLink
              class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-500 transition hover:text-blue-700 sm:block"
              to="/register"
              >Register</RouterLink
            >
          </div>

          <button
            class="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
          >
            <span class="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <hr />
  </header>

  <header v-else-if="token" aria-label="Site Header" class="bg-white my-8 sticky top-0 z-30">
    <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <img class="h-11" src="../assets/logo.svg" alt="" />

      <div class="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Site Nav" class="hidden md:block">
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <RouterLink to="/" class="text-gray-500 transition hover:text-gray-500/75"
                >Home</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/wishlist" class="text-gray-500 transition hover:text-gray-500/75"
                >Wishlist
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-4">
          <div class="sm:flex sm:gap-4">
            <button
              @click.prevent="logoutHandler"
              class="block rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </header>
</template>
