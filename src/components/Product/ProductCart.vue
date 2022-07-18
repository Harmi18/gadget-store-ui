<template>
  <div
    class="modal fade modal-lg"
    id="cartModal"
    tabindex="-1"
    aria-labelledby=""
    aria-hidden="true"
    ref="modalEle"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Cart</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="cartItem.length === 0" class="text-muted">
          Your Cart is Empty
        </div>

        <div
          class="card mb-3"
          style="margin: 10px; padding: 20px"
          v-for="cart in cartItem"
          :key="cart"
          v-else
        >
          <div class="row g-0">
            <div class="col-md-4">
              <img
                :src="cart.product.image"
                class="img-fluid rounded-start cart-product-image"
                :alt="cart.product.image"
              />
            </div>
            <div class="col-md-8" style="font-size: 12px">
              <div class="card-body">
                <h5 class="card-title">
                  {{ cart.product.title }}
                </h5>
                <p class="card-text">
                  {{ cart.product.description }}
                </p>
                <p class="card-text">
                  <small class="text-muted">
                    Price:${{ cart.product.price }}<br />
                    Category:{{ cart.product.category }}<br /><br
                  /></small>
                </p>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm add_button"
                  @click="addProduct(cart.productId)"
                >
                  <i class="bi bi-plus-lg"></i>
                </button>
                {{ cart.quantity }}
                <button
                  type="button"
                  class="btn btn-secondary btn-sm add_button"
                  @click="removeProduct(cart.productId)"
                >
                  <i class="bi bi-dash"></i></button
                >&nbsp;
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="removeCartProduct(cart.productId)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="cartItem.length !== 0">
          <span class="float-right" style="padding-right: 60px"
            ><h4>Total:{{ calcSum }}$</h4></span
          >
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="closeCart"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="checkOutCart"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["open", "cartItem"],
  data() {
    return {
      productCartDetail: [],
      cartTotal: "",
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
  created() {},
  async mounted() {},
  methods: {
    closeCart() {
      this.$emit("toggle-modal", false);
    },
    addProduct(id) {
      const cartProduct = this.cartItem.findIndex((el) => el.productId === id);
      if (cartProduct !== -1) {
        this.$store.state.cart.productItem[cartProduct].quantity += 1;
      }
    },
    removeProduct(id) {
      const cartProduct = this.cartItem.findIndex((el) => el.productId === id);
      if (cartProduct !== -1 && this.cartItem[cartProduct].quantity) {
        this.$store.state.cart.productItem[cartProduct].quantity -= 1;
        if (this.cartItem[cartProduct].quantity === 0) {
          this.$store.state.cart.productItem.splice(cartProduct);
        }
      }
    },
    removeCartProduct(id) {
      const cartProduct = this.cartItem.findIndex((el) => el.productId === id);
      this.$store.state.cart.productItem.splice(cartProduct);
    },
    async checkOutCart() {
      this.$router.push({ path: "/checkout" });
      this.$emit("toggle-modal", false);
    },
  },
};
</script>

<style>
.cart-product-image {
  height: 210px;
  width: 190px;
}
/* .cart-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: solid 1px #000;
  display: none;
  z-index: 1000;
  background-color: #fff;
} */
/*#overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  background-color: #000;
  opacity: 0.5;
} */
/* .cart-popup {
  bottom: 0;
  left: 0;
  outline: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 200px;
  right: 180px;
  left: 180px;
  z-index: 10000;
} */
</style>