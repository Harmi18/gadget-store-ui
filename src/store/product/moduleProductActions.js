import axios from "axios";
export default {
  getProduct({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          commit("GET_PRODUCT", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCategory({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("https://fakestoreapi.com/products/categories")
        .then((response) => {
          commit("GET_CATEGORY", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
