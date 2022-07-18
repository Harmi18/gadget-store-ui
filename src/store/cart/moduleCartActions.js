import axios from "axios";
export default {
  addCartItem({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("https://fakestoreapi.com/carts")
        .then((response) => {
          commit("GET_CART_ITEMS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
