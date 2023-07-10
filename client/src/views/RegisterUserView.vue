<script>
import reusableBtn from '../components/btn.vue'
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  components: {
    reusableBtn
  },
  emits: ['pageHandler', 'register'],
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['register']),

    registerHandler() {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        address: this.address
      }
      this.register(newUser)
    }
  }
}
</script>

<template>
  <section>
    <div class="container mx-auto h-screen">
      <div class="flex items-center justify-center px-6 my-12">
        <!-- Row -->
        <div class="w-full xl:w-3/4 lg:w-11/12 flex">
          <!-- Col -->
          <div
            class="w-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style="
              background-image: url('https://images.unsplash.com/photo-1604709177595-ee9c2580e9a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80');
            "
          ></div>
          <!-- Col -->
          <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <form action="" class="space-y-4">
              <div>
                <label class="block mb-2 text-sm font-bold text-gray-700" for="Username"
                  >Username</label
                >
                <input
                  v-model="username"
                  class="w-full rounded-lg border border-gray-400 p-3 text-sm"
                  placeholder="Insert your username here"
                  type="text"
                  id="username"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-bold text-gray-700" for="password"
                  >Password</label
                >
                <input
                  v-model="password"
                  class="w-full rounded-lg border border-gray-400 p-3 text-sm"
                  placeholder="Insert your password here"
                  type="password"
                  id="password"
                />
              </div>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label class="block mb-2 text-sm font-bold text-gray-700" for="email"
                    >Email</label
                  >
                  <input
                    v-model="email"
                    class="w-full rounded-lg border border-gray-400 p-3 text-sm"
                    placeholder="Insert your email address here"
                    type="email"
                    id="email"
                  />
                </div>

                <div>
                  <label class="block mb-2 text-sm font-bold text-gray-700" for="phone"
                    >Phone</label
                  >
                  <input
                    v-model="phoneNumber"
                    class="w-full rounded-lg border border-gray-400 p-3 text-sm"
                    placeholder="Insert your phone Number here"
                    type="tel"
                    id="phone"
                  />
                </div>
              </div>

              <div>
                <label class="block mb-2 text-sm font-bold text-gray-700" for="Address"
                  >Address</label
                >

                <textarea
                  v-model="address"
                  class="border border-gray-400 w-full rounded-lg p-3 text-sm"
                  placeholder="Insert your address here"
                  rows="8"
                  id="message"
                ></textarea>
              </div>

              <div class="mt-4">
                <button
                  type="submit"
                  class="inline-block w-full m-1 rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  @click.prevent="registerHandler"
                >
                  Register
                </button>

                <reusableBtn :route="'/'"></reusableBtn>
              </div>
              <div class="text-center">
                <p class="text-sm text-gray-500">
                  Already have an account?
                  <a class="underline" href="#" @click.prevent="$router.push('/login')"
                    >Login now</a
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
