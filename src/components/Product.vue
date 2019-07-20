<template>
  <div class="product-wrapper">
    <span v-if="promo" class="promo">PROMO</span>
    <div class="image">
      <img :src="image" alt="">
    </div>
    <h1>{{ product.title }}</h1>
    <div class="bottom">
      <p class="price">£{{ price }}</p>
      <div class="button-container">
        <button @click="addToBasket(product)" class="primary">Add to basket</button>
      </div>
    </div>
  </div>
</template>

<script>
import shopify from '@/services/shopify'
import { mapGetters } from 'vuex'

export default {
  props: {
    product: Object,
    promo: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.setProductDetails()
  },
  data () {
    return {
      image: ''
    }
  },
  computed: {
    ...mapGetters({
      checkout: 'checkout'
    }),
    price () {
      return this.product.variants[0].price
    }
  },
  methods: {
    setProductDetails () {
      this.setImages()
    },
    setImages () {
      this.image = this.product.images[0].src
    },
    async addToBasket (product) {
      const checkoutId = this.checkout.id
      const { id } = product.variants[0]
      const lineItemsToAdd = [{
        variantId: id,
        quantity: 1
      }]

      try {
        const updatedCheckout = await shopify.checkout.addLineItems(checkoutId, lineItemsToAdd)
        this.$store.commit('updateCheckout', updatedCheckout)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-wrapper {
    margin: 20px 0;
    padding: 20px;
    box-sizing: border-box;
    max-width: 300px;
    display: flex;
    justify-content: space-between;
    flex-flow: column nowrap;
    position: relative;

    > * {
      flex: 1 1 100%;
    }
  }

  .image {
    img {
      height: 250px;
      box-shadow: 0 0 20px 2px darken($color: $background-grey, $amount: 5%);
    }
  }

  h1 {
    text-transform: lowercase;
    font-size: 1.6rem;
    font-style: italic;
    margin-bottom: 10px;
    text-align: center;
  }

  .price {
    color: $green;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .promo {
    position: absolute;
    top: 10px;
    background: $green-dark;
    color: $white;
    padding: 5px 10px;
    font-size: 1.4rem;
    right: 10px;
    border-radius: 20px;
  }
</style>
