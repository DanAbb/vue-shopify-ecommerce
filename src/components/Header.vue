<template>
  <div id="nav">
    <div class="top-nav">
      <div class="logo">
        <img src="@/assets/liosislogo.png" alt="liosis cafe">
        <h1>Liosis Sicilian Cafe Bar</h1>
      </div>
      <div class="links">
        <router-link to="/">Home</router-link>
        <router-link to="/food">Food Menu</router-link>
        <router-link to="/products">Shop</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link class="social-icon" to="https://www.facebook.com"><img src="@/assets/facebook.svg" alt="facebook"></router-link>
        <router-link class="social-icon" to="https://www.twitter.com"><img src="@/assets/twitter.svg" alt="twitter"></router-link>
        <router-link v-if="checkout" class="social-icon basket" to="/basket">
          <span v-if="checkoutNum">{{ checkoutNum }}</span>
          <img src="@/assets/shopping-cart.svg" alt="cart">
        </router-link>
        <router-link v-if="!loggedIn" to="/login">Log in</router-link>
        <span v-if="loggedIn" class="username">{{ fullName }}</span>
        <a href="#" v-if="loggedIn" @click.prevent="signout">Sign out</a>
      </div>
    </div>
    <div class="sub-nav">
      <ul>
        <router-link to="/" tag="li">Pantry</router-link>
        <router-link to="/products/sweet" tag="li">Sweet</router-link>
        <router-link to="/products/drinks" tag="li">Drinks</router-link>
        <router-link to="/products/household" tag="li">Household</router-link>
        <router-link to="/products/offers" tag="li">Offers</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CookieStorage from '@/services/cookie.storage'
import { api } from '@/services/api'

export default {
  name: 'Header',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters({
      checkout: 'checkout',
      loggedIn: 'loggedIn',
      user: 'user'
    }),
    checkoutNum () {
      if (this.checkout) {
        return this.checkout.lineItems.length
      }
    },
    fullName () {
      if (this.user) {
        return `${this.user.firstName} ${this.user.lastName}`
      }
    }
  },
  methods: {
    async signout () {
      try {
        const refreshToken = CookieStorage.getRefreshToken()
        await api('post', 'signout', { refreshToken })
  
        CookieStorage.setUserId('')
        CookieStorage.setAuthToken('')
        CookieStorage.setRefreshToken('')

        this.$store.commit('setLoggedIn', false)
        this.$router.push({ name: 'login' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #nav {
    width: 100%;
    // border-bottom: 1px solid $green;
    box-sizing: border-box;
  }

  .top-nav {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    padding: 30px;
  }

  .sub-nav {
    background: $green-dark;
    padding: 0 30px 0 25px;

    ul {
      display: flex;

      li {
        color: $white;
        padding: 5px 10px;
        cursor: pointer;

        &.router-link-exact-active {
          background: lighten($color: $green-dark, $amount: 10%);
        }

        &:first-child {
        }
      }
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 40px;
      margin-right: 10px;
    }
  }

  .links {
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: $green-dark;
      padding: 0 10px;
      text-decoration: none;

      &.router-link-exact-active {
        color: $green;
      }
    }

    .social-icon {
      display: flex;
      align-items: center;
      padding: 0 5px;

      img {
        height: 30px;
      }
    }

    .basket {
      display: flex;
      align-items: center;
      border: 1px dashed $green-dark;
      border-radius: 20px;
      padding: 5px 15px;
      margin: 0 10px;

      span {
        margin-right: 10px;
        font-size: 2rem;
      }

      img {
        height: 25px;
      }

      &.router-link-exact-active {
        border: 1px dashed $green;
      }
    }
  }

  .username {
    text-transform: capitalize;
    font-size: 1.6rem;
    line-height: 1;
  }
</style>
