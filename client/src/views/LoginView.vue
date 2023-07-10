<script>
import { GoogleLogin } from 'vue3-google-login'
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  components: {
    GoogleLogin
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    googleSignIn({ credential }) {
      // This callback will be triggered when user click on the One Tap prompt
      // This callback will be also triggered when user click on login button
      // and selects or login to his Google account from the popup
      this.googleAuthServer(credential)
    },
    ...mapActions(useUserStore, ['login', 'googleAuthServer']),

    loginHandler() {
      const data = {
        email: this.email,
        password: this.password
      }
      // console.log(data)
      this.login(data)
    }
  }
}
</script>

<template>
  <div class="relative flex flex-wrap lg:h-screen lg:items-center">
    <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div class="mt-4"></div>
      <div class="mt-auto mx-auto max-w-lg text-center">
        <RouterLink to="/">
          <img src="../assets/logo.svg" class="inline-block w-1/3" alt="InapinAja"
        /></RouterLink>

        <!-- <h1 class="text-2xl font-bold sm:text-3xl">InapinAja</h1> -->

        <p class="mt-4 text-gray-500">We believe in a world where anyone can belong anywhere.</p>
      </div>

      <form action="" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <input
              v-model="email"
              type="email"
              class="w-full rounded-lg p-4 pe-12 text-sm shadow-sm ring-1 ring-inset ring-gray-400"
              placeholder="Enter email"
            />

            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>

          <div class="relative">
            <input
              v-model="password"
              type="password"
              class="w-full rounded-lg p-4 pe-12 text-sm shadow-sm ring-1 ring-inset ring-gray-400"
              placeholder="Enter password"
            />

            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-500">
            No account?
            <a class="underline" href="#" @click.prevent="$router.push('/register')">Sign up</a>
          </p>

          <button
            type="submit"
            @click.prevent="loginHandler"
            class="inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
          
        </div>
        <GoogleLogin :callback="googleSignIn" prompt></GoogleLogin>
      </form>
    </div>

    <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
      <img
        alt="Welcome"
        src="https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  </div>
</template>
