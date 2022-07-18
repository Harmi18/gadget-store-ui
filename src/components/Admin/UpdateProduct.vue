<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby=""
    aria-hidden="true"
    ref="modalEle"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group row">
            <label class="col-lg-3 col-form-label form-control-label"
              >Title</label
            >
            <div class="col-lg-9">
              <input class="form-control" type="text" v-model="title" />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Category</label
            >
            <div class="col-lg-9">
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="selectedCategory"
              >
                <option v-for="(option, index) in categoryOption" :key="index">
                  {{ option }}
                </option>
              </select>
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Price</label
            >
            <div class="col-lg-9">
              <input class="form-control" type="text" v-model="price" />
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Description</label
            >
            <div class="col-lg-9">
              <textarea
                class="form-control"
                rows="3"
                v-model="description"
              ></textarea>
            </div>
            <br />
            <br />
            <label class="col-lg-3 col-form-label form-control-label"
              >Image</label
            >
            <div class="col-lg-9">
              <input
                type="file"
                id="bannerImg"
                @change="onFileUpload($event)"
              />
              <div id="preview">
                <img v-if="image" id="tableBanner" :src="image" />
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="mode === 'Update' ? editProduct() : addProduct()"
          >
            {{ mode }}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["mode", "fields"],
  data() {
    return {
      categoryOfProduct: "",
      selectedCategory: "Select Category",
      categoryOption: [],
      title: "",
      price: "",
      description: "",
      image: null,
    };
  },
  async mounted() {
    this.categoryOfProduct = await this.$store.dispatch("product/getCategory");
    this.categoryOfProduct.data.map((el) => {
      return this.categoryOption.push(el);
    });
  },
  watch: {
    fields: function (newVal) {
      this.title = newVal.title;
      this.description = newVal.description;
      this.price = newVal.price;
      this.selectedCategory = newVal.category;
    },
  },
  methods: {
    removeData() {
      this.title = "";
      this.description = "";
      this.price = "";
      this.selectedCategory = "";
    },
    async addProduct() {
      try {
        await axios
          .post("https://fakestoreapi.com/products", {
            title: this.title,
            price: this.price,
            description: this.description,
            category: this.selectedCategory,
            // image: this.image,
          })
          .then((response) => {
            this.$emit("add", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        return e;
      }
      this.removeData();
    },
    async editProduct() {
      try {
        await axios
          .patch(`https://fakestoreapi.com/products/${this.fields.id}`, {
            title: this.title,
            price: this.price,
            description: this.description,
            category: this.selectedCategory,
          })
          .then((response) => {
            this.$emit("update", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
        return e;
      }
      this.removeData();
    },
    closeModal() {
      this.removeData();
      this.$emit("toggle-modal", false);
    },
  },
};
</script>

<style>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>