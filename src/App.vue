<template>
  <div id="app">
    <site-header></site-header>
    <router-view/>
  </div>
</template>

<script>
import SiteHeader from '@/components/Header'
import CookieStorage from '@/services/cookie.storage'

import { api } from '@/services/api'

export default {
  created () {
    const id = CookieStorage.getUserId()

    if (id) {
      this.getUser(id)
    }
  },
  methods: {
    async getUser (id) {
      this.$store.commit('setLoggedIn', true)
      
      try {
        const user = await api('GET', `User/GetUser/${id}`)
        this.$store.commit('setUser', user.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    SiteHeader
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/_reset.scss';
  @import '@/assets/scss/_main.scss';
  @import '@/assets/scss/_buttons.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
