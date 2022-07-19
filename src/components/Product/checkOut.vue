<template>
  <div>
    <span> <h4>Order Details</h4></span>
    <div class="md-12" align="center">
      <div
        class="card mb-3 float-center"
        align-center
        style="max-width: 796px"
        v-for="item in checkOutItem"
        :key="item"
      >
        <div class="row g-0">
          <div class="col-md-4">
            <img
              :src="item.product.image"
              class="img-fluid rounded-start"
              alt=""
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.product.title }}</h5>
              <p class="card-text">
                {{ item.product.description }}
              </p>
              <p class="card-text" style="margin-right: 10px">
                <small class="text-muted"
                  >Price:{{ item.product.price }}$</small
                >
              </p>
              <p class="card-text" style="margin-right: 10px">
                <small class="text-muted">Quantity:{{ item.quantity }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="float-right">
      Total:{{ calcSum }}$
      <button type="button" class="btn btn-primary" @click="checkOut">
        Checkout
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      checkOutItem: [],
    };
  },
  computed: {
    calcSum() {
      let total = 0;
      this.$store.state.cart.productItem.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      return total;
    },
  },
  mounted() {
    this.checkOutItem = this.$store.state.cart.productItem;
  },
  methods: {
    async checkOut() {
      const productDetails = this.$store.state.cart.productItem.map(
        ({ quantity, productId }) => ({
          quantity,
          productId,
        })
      );
      try {
        await axios.post("https://fakestoreapi.com/carts", {
          userId: 5,
          date: new Date(),
          products: productDetails,
        });
        this.$router.push({ path: "/ThankYou" });
      } catch (e) {
        return;
      }
    },
  },
};
</script>

<style>
</style>