<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <br />
          <button
            class="btn btn-default pull-right"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="toggleButton = 'Add'"
          >
            <i class="fa fa-plus"></i>&nbsp;&nbsp; Add Row
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <table class="table table-bordered" id="editableTable">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr data-id="1" v-for="productItem in product" :key="productItem">
                <td>
                  {{ productItem.id }}
                </td>
                <td>
                  {{ productItem.title }}
                </td>
                <td>
                  {{ productItem.category }}
                </td>
                <td>
                  {{ productItem.description }}
                </td>
                <td>{{ productItem.price }}</td>
                <td>
                  <img :src="productItem.image" class="img-thumbnail" />
                </td>
                <td>
                  <div style="display: inline-flex">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      @click="editProduct(productItem)"
                    >
                      <i class="bi bi-pencil"></i></button
                    >&nbsp;
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
                <div class="modal" tabindex="-1" role="dialog" id="deleteModal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Delete</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>Do you want to delete product ?</p>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                          @click="removeProduct(productItem)"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <UpdateProduct
      :mode="toggleButton"
      open.sync="display"
      :fields="productFields"
      @add="addProduct"
      @update="updateProduct"
    />
  </div>
</template>

<script>
import axios from "axios";
import UpdateProduct from "./UpdateProduct.vue";
export default {
  components: {
    UpdateProduct,
  },
  data() {
    return {
      product: [],
      toggleButton: "",
      productFields: {
        Title: "",
        Category: "",
        Description: "",
        Price: "",
        Image: "",
      },
      removeItem: false,
    };
  },
  async mounted() {
    let res = await this.$store.dispatch("product/getProduct");
    this.product = res.data;

    // localStorage
    // let data = localStorage.getItem("productItem");
    // this.product = JSON.parse(data);
  },
  methods: {
    async addProduct(res) {
      this.product.push(res);
      this.$store.commit("product/GET_PRODUCT", this.product);
    },
    async updateProduct(res) {
      let findProduct = this.product.findIndex((el) => el.id === res.id);
      if (findProduct !== -1) {
        this.product.splice(findProduct, 1, res);
        this.$store.commit("product/GET_PRODUCT", this.product);
      }
    },
    editProduct(products) {
      this.toggleButton = "Update";
      this.productFields = {
        id: products.id,
        title: products.title,
        category: products.category,
        description: products.description,
        price: products.price,
        image: products.image,
      };
    },
    async removeProduct(item) {
      try {
        let findProduct = this.product.findIndex((el) => el.id === item.id);
        await axios
          .delete(`https://fakestoreapi.com/products/${item.id}`)
          .then((response) => {
            console.log(response);
            this.product.splice(findProduct, 1);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        return e;
      }
    },
  },
};
</script>

<style>
.row {
  margin-bottom: 20px;
}

.button.button-small {
  height: 30px;
  line-height: 30px;
  padding: 0px 10px;
}

td input[type="text"],
td select {
  width: 100%;
  height: 30px;
  margin: 0;
  padding: 2px 8px;
}

th:last-child {
  text-align: right;
}

td:last-child {
  text-align: right;
}

td:last-child .button {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0px;
  margin-bottom: 0px;
  margin-right: 5px;
  background-color: #fff;
}

td:last-child .button .fa {
  line-height: 30px;
  width: 30px;
}
</style>