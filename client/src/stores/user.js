import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useUserStore = defineStore('user', {
  state: () => ({
    baseUrl: 'https://inapinaja-server.jatisuryo.com/',
    access_token: ''
  }),
  getters: {},
  actions: {
    async register(lodging) {
      Swal.showLoading()
      const { username, email, password, phoneNumber, address } = lodging

      try {
        await axios({
          method: 'post',
          url: this.baseUrl + 'inapinaja/register',
          data: {
            username,
            email,
            password,
            phoneNumber,
            address
          }
        })
        Swal.close()
        this.router.push('/login')
        Swal.fire({
          icon: 'success',
          title: 'Success Register, you can login now',
          showConfirmButton: false,
          timer: 1500
        })
      } catch ({ response }) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message[0]
        })
      }
    },

    async googleAuthServer(token) {
      // console.log(token);
      try {
        Swal.showLoading()

        let { data } = await axios({
          method: 'POST',
          url: this.baseUrl + 'inapinaja/google-sign',
          headers: {
            google_token: token
          }
        })
        localStorage.access_token = data.access_token
        this.access_token = data.access_token
        Swal.close()
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'Success logged in',
          showConfirmButton: false,
          timer: 1500
        })
      } catch ({ response }) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
        // const status = response.status
        // const message = response.data.message[0]
      }
    },

    async login(login) {
      // console.log(login);
      Swal.showLoading()
      try {
        let { data } = await axios({
          method: 'POST',
          url: this.baseUrl + 'inapinaja/login',
          data: {
            email: login.email,
            password: login.password
          }
        })
        // console.log(response);
        localStorage.access_token = data.access_token
        this.access_token = data.access_token
        Swal.close()
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'Success logged in',
          showConfirmButton: false,
          timer: 2000
        })
      } catch ({ response }) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    }
  }
})
