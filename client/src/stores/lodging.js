import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useLodgingStore = defineStore('lodging', {
  state: () => ({
    lodgings: [],
    page: 1,
    totalPage: 3,
    baseUrl: 'https://inapinaja-server.jatisuryo.com/',
    localUrl: 'http://localhost:3000/',
    lodging: [],
    wishlists: [],
    type: [],
    types: [],
    barcode: ''
  }),
  getters: {
    valuationFormat() {
      const price = this.lodging.price
      if (price) {
        return price.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR'
        })
      }
    }
  },
  actions: {
    async findLodging(id) {
      Swal.showLoading()
      try {
        let { data } = await axios({
          method: 'GET',
          url: this.baseUrl + 'inapinaja/lodging/' + id
        })
        // console.log(data.lodging);
        this.lodging = data.lodging
        this.type = data.lodging.Type
        Swal.close()
      } catch ({ response }) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },

    async fetchLodgings(query) {
      Swal.showLoading()

      try {

        let route = 'inapinaja/lodging'
        if (query) {
          route += query
        }
        console.log(route);
        let { data } = await axios({
          method: 'GET',
          url: this.baseUrl + route,
          headers: {
            page: this.page
          }
        })
        this.lodgings = data.lodging
        this.totalPage = Math.ceil(data.lodging.count / 9)
        Swal.close()
      } catch ({ response }) {
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },

    async addWishlist(id) {
      try {
        Swal.showLoading()
        let createWishlist = await axios({
          method: 'POST',
          url: this.baseUrl + 'inapinaja/wishlist',
          headers: { access_token: localStorage.access_token },
          data: { id }
        })
        Swal.close()
        Swal.fire({
          icon: 'success',
          title: 'Lodging added to wishlist',
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
      }
    },

    async getWishlist() {
      Swal.showLoading()
      try {
        let { data } = await axios({
          method: 'GET',
          headers: { access_token: localStorage.access_token },
          url: this.baseUrl + 'inapinaja/wishlist'
        })

        let wishlistLodging = []
        data.wishList.forEach(el => {
          wishlistLodging.push(el.Lodging)
        });
        this.wishlists = wishlistLodging
        Swal.close()
      } catch ({ response }) {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },
    async fetchTypes() {
      try {
        let { data } = await axios({
          method: 'GET',
          url: this.baseUrl + 'inapinaja/types',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.types = data.type
      } catch ({ response }) {
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },

    async getBarcode(id) {
      try {
        const page = `https://inapinaja.web.app/detail/${id}`
        let { data } = await axios({
          method: 'POST',
          data: {
            page
          },
          url: this.baseUrl + 'inapinaja/barcode'
        })
        // console.log(data.barcode);
        this.barcode = data.barcode
      } catch ({ response }) {
        // console.log(response);
        Swal.fire({
          icon: 'error',
          title: `Error ${response.status}`,
          text: response.data.message
        })
      }
    },


  },
})
