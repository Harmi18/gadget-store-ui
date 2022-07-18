export default {
  GET_PRODUCT(state, products) {
    state.products = products;
    // localStorage
    // products = localStorage.setItem("productItem", JSON.stringify(products));
  },
  GET_CATEGORY(state, categories) {
    state.categories = categories;
  },
};
