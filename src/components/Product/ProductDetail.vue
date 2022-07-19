<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="float-start">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="
              this.$router.push({
                path: this.$router.options.history.state.back,
              })
            "
          >
            <i class="bi bi-arrow-left-circle"></i> Go Back
          </button>
        </div>
        <div class="product-card">
          <div class="card main-card">
            <div class="card-horizontal">
              <div class="img-square-wrapper">
                <img
                  :src="productdetail.image"
                  class="card-img-top"
                  style="height: 400px; width: 380px; padding-top: 12px"
                  alt=""
                />
              </div>
              <div class="card-body vl">
                <h4 class="card-title">{{ productdetail.title }}</h4>
                <br />
                <h6 class="card-subtitle mb-2">
                  Price:{{ productdetail.price }}
                </h6>
                <h6 class="card-subtitle mb-2">
                  Category:{{ productdetail.category }}
                </h6>
                <br /><br />
                <p class="card-text">
                  {{ productdetail.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import axios from "axios";
export default {
  data() {
    return {
      productdetail: "",
    };
  },
  async mounted() {
    let res = await axios.get(
      `https://fakestoreapi.com/products/${this.$route.params.id}`
    );
    this.productdetail = res.data;
  },
};
</script>

<style>
.card-horizontal {
  display: flex;
  flex: 1 1 auto;
}
.vl {
  border-left: 1px solid #d2d2d2;
  height: 428px;
  padding-right: 30px;
  margin-left: 10px;
  color: rgb(68, 67, 67);
}
.product-card {
  margin-top: 10rem !important;
  margin-left: 27rem !important;
}
.main-card {
  width: 970px;
  padding: 25px -30px 80px 100px;
}
</style>