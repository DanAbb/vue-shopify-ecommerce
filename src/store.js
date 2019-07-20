import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collections: [],
    basket: [],
    checkout: null,
    loggedIn: false,
    user: null
  },
  mutations: {
    updateCollections (state, payload) {
      state.collections = payload
    },
    addToBasket (state, payload) {
      state.basket.push(payload)
    },
    removeFromBasket (state, payload) {
      state.basket = state.basket.filter(item => item.id !== payload.id)
    },
    emptyBasket (state) {
      state.basket = []
    },
    updateCheckout (state, payload) {
      state.checkout = payload
    },
    setLoggedIn (state, payload) {
      state.loggedIn = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  getters: {
    collections: state => {
      return state.collections
    },
    basket: state => {
      return state.basket
    },
    checkout: state => {
      return state.checkout
    },
    loggedIn: state => {
      return state.loggedIn
    },
    user: state => state.user
  }
})
