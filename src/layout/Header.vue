<template>
  <!-- <div> -->
  <div class="navbar-static">
    <nav class="navbar navbar-expand-sm bg-dark">
      <div class="container-fluid float-right">
        <ul class="navbar-nav">
          <h4>
            <li class="nav-item nav-link active" style="color: #fbfbfb">
              Gadget Store
            </li>
          </h4>
        </ul>
      </div>

      <div class="float-right" v-if="user">
        <button type="button" class="btn btn-secondary" @click="logout">
          Logout
        </button>
      </div>
      <div class="float-right" v-else>
        <button
          type="button"
          class="btn btn-secondary"
          @click="this.$router.push({ path: '/loginUser' })"
        >
          Login
        </button>
      </div>
      <!-- <div class="float-right"> -->
      <button
        class="btn btn-secondary position-relative logout-button"
        style="margin-right: 30px"
        data-bs-toggle="modal"
        data-bs-target="#cartModal"
        @click="openCart"
      >
        <i class="fa fa-shopping-cart text-light"></i>
        <span
          class="
            position-absolute
            top-0
            start-100
            translate-middle
            badge
            rounded-pill
            bg-danger
          "
        >
          {{ cartProductCount }}
        </span>
      </button>
    </nav>
  </div>
  <div>
    <ProductCart
      :open="showModal"
      :cartItem="cart"
      @toggle-modal="showModal = !showModal"
      open.sync="display"
    />
  </div>
  <router-view class="router-view" />
</template>


<script>
import ProductCart from "../components/Product/ProductCart.vue";

export default {
  components: {
    ProductCart,
  },
  data() {
    return {
      showModal: false,
      user: "",
      cart: "",
    };
  },
  created() {
    this.user = localStorage.getItem("token");
  },
  computed: {
    cartProductCount() {
      let sum = 0;
      this.$store.state.cart.productItem.map((el) => {
        sum += el.quantity;
      });
      return sum;
    },
  },
  methods: {
    openCart() {
      this.cart = this.$store.state.cart.productItem;
    },
    closeCart() {
      this.showModal = false;
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push({ path: "/loginUser" });
    },
  },
};
</script>

<style>
.login-button {
  border-radius: 10px;
  background: rgb(184, 180, 180);
}
.logout-button {
  margin-left: 15px;
  margin-bottom: 4px;
}
html,
body {
  max-width: 100%;
  overflow-x: hidden;
  padding-right: 0px !important;
}
.navbar {
  margin-bottom: 0px !important;
}
.navbar-static {
  position: fixed;
  width: 100%;
  z-index: 20;
}
</style>