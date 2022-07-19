<template>
  <div>
    <!-- <div class="row"> -->
    <div class="justify-content-end d-flex">
      <span class="me-5">
        <select
          id="collection"
          class="filter-list bold category-box"
          v-model="selectedCategory"
          @change="selectCategory"
        >
          <option v-for="(option, index) in categoryOption" :key="index">
            {{ option }}
          </option>
        </select>
      </span>
    </div>
    <!-- </div> -->
    <div class="row">
      <div
        class="col-md-4"
        align="center"
        v-for="item in showProducts"
        :key="item"
      >
        <div class="card" style="width: 25rem; margin: 10px; height: 25rem">
          <div>
            <h5 class="card-header" style="font-size: 15px">
              {{ item.title }}
            </h5>
            <div class="card-body">
              <img
                :src="item.image"
                class="card-img-top"
                :alt="item.image"
                style="height: 180px; width: 180px"
                @click="productDetail(item.id)"
              />
              <p class="card-text text-muted product-text">
                Price:${{ item.price }}<br />
                Category:{{ item.category }}<br /><br />
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  @click="addCart(item)"
                >
                  <span><i class="bi bi-bag"></i></span>
                  Add to cart
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalProduct.data.length > productCount">
      <button type="button" class="btn btn-outline-primary" @click="loadMore">
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      totalProduct: { data: [] },
      productCount: 12,
      selectedItem: "",
      options: "",
      categoryOption: ["All Products"],
      selectedCategory: "All Products",
    };
  },
  computed: {
    showProducts() {
      return this.totalProduct.data.slice(0, this.productCount);
    },
  },
  async mounted() {
    this.options = await this.$store.dispatch("product/getCategory");
    this.options.data.map((el) => {
      return this.categoryOption.push(el);
    });
  },
  async created() {
    this.totalProduct = await this.$store.dispatch("product/getProduct");
  },
  methods: {
    productDetail(id) {
      this.$router.push({ path: `/ProductDetail/${id}` });
    },
    async loadMore() {
      try {
        await axios.get(
          `https://fakestoreapi.com/products?${this.productCount}`
        );

        if (this.productCount > this.totalProduct.data.length) return;
        this.productCount = this.productCount + 4;
      } catch (e) {
        return;
      }
    },
    async selectCategory() {
      try {
        if (this.selectedCategory === "All Products") {
          this.totalProduct = await this.$store.dispatch("product/getProduct");
        } else {
          this.totalProduct = await axios.get(
            `https://fakestoreapi.com/products/category/${this.selectedCategory}`
          );
        }
      } catch (e) {
        return;
      }
    },
    async addCart(item) {
      const findIndex = this.$store.state.cart.productItem.findIndex(
        (el) => el.productId === item.id
      );
      if (findIndex !== -1) {
        this.$store.state.cart.productItem[findIndex].quantity =
          this.$store.state.cart.productItem[findIndex].quantity + 1;
      } else {
        this.$store.state.cart.productItem.push({
          productId: item.id,
          quantity: 1,
          product: item,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.category-box {
  height: 32px;
  width: 223px;
  text-align: center;
  border: solid 1px;
  margin-bottom: 16px;
}
// .product-listing .col {
//   height: 5%;
// }
// .product-listing .col .card {
//   padding: 24px;
// }
// .col {
//   margin: 10px;
// }
// .row {
//   margin-left: 10px;
//   margin-right: 10px;
//   row-gap: 16px;
// }
// .product-text {
//   padding-top: 10px;
//   padding-bottom: 10px;
// }

//
</style>