<template>
  <div class="basket-wrapper">
    <div class="basket">
      <h1 class="title">Shopping Cart</h1>
      <div v-for="product in checkout" :key="product.id" class="cart-item">
        <div class="item-image">
          <img :src="product.images[0].src" alt="image">
        </div>
        <div class="item-title">
          {{ product.title }}
        </div>
        <div class="item-amount">
          <span @click="decrementNumber(product.handle)">-</span>
          <input :id="product.handle" type="text" :value="product.number">
          <span @click="incrementNumber(product.handle)">+</span>
        </div>
        <div class="item-price">
          {{ product.variants[0].price }}
        </div>
        <div class="item-remove">
          <img @click="removeItem(product.handle)" src="@/assets/error.svg" alt="remove">
        </div>
      </div>
    </div>
    <div class="payment">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created () {
    this.filterCart(this.basket)
  },
  data () {
    return {
      cart: []
    }
  },
  computed: {
    ...mapGetters({
      checkout: 'checkout'
    })
  },
  methods: {
    filterCart (value) {
      this.cart = value.reduce((accum, current) => {
        const exists = accum.find(item => item.handle === current.handle)
        if (exists) {
          exists.number = ++exists.number
          return accum
        }

        current.number = 1          
        accum.push(current)
        return accum
      }, [])
    },
    incrementNumber (handle) {
      const input = this.$el.querySelector(`#${handle}`)
      input.value = ++input.value
    },
    decrementNumber (handle) {
      const input = this.$el.querySelector(`#${handle}`)
      if (+input.value === 1) return
      input.value = --input.value
    },
    removeItem (handle) {
      this.cart = this.cart.filter(item => item.handle !== handle)
    }
  }
}
</script>


<style lang="scss" scoped>
  .basket-wrapper {
    padding: 50px;
    box-sizing: border-box;
    display: flex;
    // background: $white;
    // box-shadow: 0 0 20px 2px darken($color: $background-grey, $amount: 5%);
  }

  .payment {
    background: black;
  }

  .cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid darken($color: $background-grey, $amount: 5%);

    > * {
      padding: 10px 30px;

      &:first-child {
        padding: 10px 30px 10px 0;
      }

      &:last-child {
        padding: 10px 0 10px 30px;
      }
    }
  }

  .title {
    text-align: left;
    padding: 0;
  }

  .item-image {
    img {
      height: 120px;
    }
  }

  .item-title {
    font-size: 1.6rem;
    text-transform: lowercase;
    white-space: wrap;
  }

  .item-amount {
    input {
      width: 20px;
      font-size: 2rem;
      text-align: center;
      margin: 0 10px;
    }

    span {
      cursor: pointer;
    }
  }

  .item-price {

  }

  .item-remove {
    img {
      height: 30px;
      cursor: pointer;
    }
  }

</style>
