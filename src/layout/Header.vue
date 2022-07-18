<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="container-fluid float-right">
        <ul class="navbar-nav">
          <h4><li class="nav-item nav-link active">Gadget Store</li></h4>
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
      <div class="float-right">
        <button
          class="btn btn-dark"
          style="font-size: 25px"
          data-bs-toggle="modal"
          data-bs-target="#cartModal"
          @click="openCart"
        >
          <i class="fa fa-shopping-cart text-light"></i>
        </button>
      </div>
    </nav>
    <ProductCart
      :open="showModal"
      :cartItem="cart"
      @toggle-modal="showModal = !showModal"
      open.sync="display"
    />
    <router-view />
    <router-view name="helper" />
  </div>
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
  methods: {
    openCart() {
      // this.showModal = true;
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
</style>